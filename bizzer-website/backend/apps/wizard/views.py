"""
Wizard Views for Bizzer Website
"""

import uuid
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

from .models import WizardStep, WizardSession, WizardResponse, DiagnosisResult
from .serializers import (
    WizardStepSerializer,
    WizardSessionSerializer,
    WizardSessionCreateSerializer,
    WizardResponseSerializer,
    WizardResponseCreateSerializer,
    DiagnosisResultSerializer,
)
from .diagnosis_engine import DiagnosisEngine
from apps.leads.models import LeadProfile, LeadInteraction


class WizardStepViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for wizard steps (read-only)"""

    queryset = WizardStep.objects.filter(is_active=True)
    serializer_class = WizardStepSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['language'] = self.request.user.preferred_language
        return context

    def list(self, request, *args, **kwargs):
        """Get all wizard steps"""
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'steps': serializer.data,
            'total_steps': queryset.count(),
        })


class WizardSessionViewSet(viewsets.ModelViewSet):
    """ViewSet for wizard sessions"""

    serializer_class = WizardSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WizardSession.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['language'] = self.request.user.preferred_language
        return context

    def create(self, request, *args, **kwargs):
        """Start a new wizard session"""
        serializer = WizardSessionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Generate session ID if not provided
        session_id = serializer.validated_data.get('session_id') or str(uuid.uuid4())

        # Check if user has an active session
        existing_session = WizardSession.objects.filter(
            user=request.user,
            status=WizardSession.Status.IN_PROGRESS
        ).first()

        if existing_session:
            # Return existing session
            return Response(
                WizardSessionSerializer(existing_session).data,
                status=status.HTTP_200_OK
            )

        # Create new session
        total_steps = WizardStep.objects.filter(is_active=True).count()
        session = WizardSession.objects.create(
            user=request.user,
            session_id=session_id,
            total_steps=total_steps,
        )

        # Create lead profile if doesn't exist
        lead_profile, _ = LeadProfile.objects.get_or_create(user=request.user)

        # Track interaction
        LeadInteraction.objects.create(
            lead=lead_profile,
            interaction_type=LeadInteraction.InteractionType.WIZARD_START,
            session_id=session_id,
            data={'wizard_session_id': str(session.id)}
        )

        return Response(
            WizardSessionSerializer(session).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current active wizard session"""
        session = WizardSession.objects.filter(
            user=request.user,
            status=WizardSession.Status.IN_PROGRESS
        ).first()

        if not session:
            return Response(
                {'detail': 'No active wizard session'},
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(WizardSessionSerializer(session).data)

    @action(detail=True, methods=['post'])
    def submit_response(self, request, pk=None):
        """Submit a response for a wizard step"""
        session = self.get_object()

        if session.status != WizardSession.Status.IN_PROGRESS:
            return Response(
                {'detail': 'Session is not active'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = WizardResponseCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        step_number = serializer.validated_data['step_number']
        step = get_object_or_404(WizardStep, step_number=step_number, is_active=True)

        # Create or update response
        response, created = WizardResponse.objects.update_or_create(
            session=session,
            step=step,
            defaults={
                'response_value': serializer.validated_data['response_value'],
                'response_data': serializer.validated_data.get('response_data', {}),
                'time_spent_seconds': serializer.validated_data.get('time_spent_seconds', 0),
            }
        )

        # Update session current step
        session.current_step = step_number + 1
        session.save(update_fields=['current_step', 'last_activity'])

        # Track interaction
        lead_profile, _ = LeadProfile.objects.get_or_create(user=request.user)
        LeadInteraction.objects.create(
            lead=lead_profile,
            interaction_type=LeadInteraction.InteractionType.WIZARD_STEP,
            session_id=session.session_id,
            data={
                'step_number': step_number,
                'response_value': serializer.validated_data['response_value'],
            }
        )

        return Response({
            'response': WizardResponseSerializer(response).data,
            'current_step': session.current_step,
            'progress_percentage': session.progress_percentage,
        })

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Complete the wizard and generate diagnosis"""
        session = self.get_object()

        if session.status != WizardSession.Status.IN_PROGRESS:
            return Response(
                {'detail': 'Session is not active'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if all required steps are completed
        responses = session.responses.all()
        if responses.count() < session.total_steps:
            return Response(
                {'detail': 'Not all steps have been completed'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate diagnosis
        response_data = [
            {
                'step_number': r.step.step_number,
                'response_value': r.response_value,
                'response_data': r.response_data,
            }
            for r in responses
        ]

        engine = DiagnosisEngine(response_data)
        diagnosis_data = engine.generate_diagnosis()

        # Create diagnosis result
        diagnosis = DiagnosisResult.objects.create(
            session=session,
            user=request.user,
            primary_solution=diagnosis_data.primary_solution,
            secondary_solutions=diagnosis_data.secondary_solutions,
            diagnosis_summary_en=diagnosis_data.diagnosis_summary_en,
            diagnosis_summary_es=diagnosis_data.diagnosis_summary_es,
            pain_points_identified=diagnosis_data.pain_points,
            recommended_features=diagnosis_data.recommended_features,
            urgency_score=diagnosis_data.urgency_score,
            fit_score=diagnosis_data.fit_score,
            personalized_pitch_en=diagnosis_data.personalized_pitch_en,
            personalized_pitch_es=diagnosis_data.personalized_pitch_es,
            next_steps=diagnosis_data.next_steps,
        )

        # Update session status
        session.status = WizardSession.Status.COMPLETED
        session.completed_at = timezone.now()
        session.save(update_fields=['status', 'completed_at'])

        # Update lead profile
        lead_profile, _ = LeadProfile.objects.get_or_create(user=request.user)
        lead_profile.wizard_completed = True
        lead_profile.wizard_completed_date = timezone.now()
        lead_profile.recommended_solution = diagnosis_data.primary_solution
        lead_profile.diagnosis_summary = diagnosis_data.diagnosis_summary_es

        # Update main pain point from step 4
        step4_response = responses.filter(step__step_number=4).first()
        if step4_response:
            lead_profile.main_pain_point = step4_response.response_value

        lead_profile.save()

        # Update user lead score
        request.user.lead_score = (diagnosis_data.urgency_score + diagnosis_data.fit_score) * 5
        request.user.lead_status = 'qualified'
        request.user.save(update_fields=['lead_score', 'lead_status'])

        # Track interaction
        LeadInteraction.objects.create(
            lead=lead_profile,
            interaction_type=LeadInteraction.InteractionType.WIZARD_COMPLETE,
            session_id=session.session_id,
            data={
                'primary_solution': diagnosis_data.primary_solution,
                'urgency_score': diagnosis_data.urgency_score,
                'fit_score': diagnosis_data.fit_score,
            }
        )

        # Return diagnosis
        serializer = DiagnosisResultSerializer(
            diagnosis,
            context={'language': request.user.preferred_language}
        )
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def abandon(self, request, pk=None):
        """Abandon the wizard session"""
        session = self.get_object()

        if session.status != WizardSession.Status.IN_PROGRESS:
            return Response(
                {'detail': 'Session is not active'},
                status=status.HTTP_400_BAD_REQUEST
            )

        session.status = WizardSession.Status.ABANDONED
        session.save(update_fields=['status'])

        return Response({'status': 'abandoned'})


class DiagnosisResultViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for diagnosis results (read-only)"""

    serializer_class = DiagnosisResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DiagnosisResult.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['language'] = self.request.user.preferred_language
        return context

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest diagnosis result"""
        diagnosis = self.get_queryset().first()

        if not diagnosis:
            return Response(
                {'detail': 'No diagnosis found'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(diagnosis)
        return Response(serializer.data)
