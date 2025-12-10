"""
Lead Views for Bizzer Website
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from .models import LeadProfile, LeadInteraction, LeadNote
from .serializers import (
    LeadProfileSerializer,
    LeadProfileContextSerializer,
    LeadInteractionSerializer,
    LeadInteractionCreateSerializer,
    LeadNoteSerializer,
)


class LeadProfileViewSet(viewsets.ModelViewSet):
    """ViewSet for lead profiles"""

    serializer_class = LeadProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LeadProfile.objects.all().select_related('user')
        return LeadProfile.objects.filter(user=user).select_related('user')

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user's lead profile"""
        lead_profile, created = LeadProfile.objects.get_or_create(user=request.user)
        serializer = LeadProfileSerializer(lead_profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def context(self, request):
        """Get lead context for agents service"""
        lead_profile, created = LeadProfile.objects.get_or_create(user=request.user)
        serializer = LeadProfileContextSerializer(lead_profile)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def interactions(self, request, pk=None):
        """Get all interactions for a lead"""
        lead = self.get_object()
        interactions = lead.interactions.all()[:50]  # Limit to last 50
        serializer = LeadInteractionSerializer(interactions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def notes(self, request, pk=None):
        """Get all notes for a lead (staff only)"""
        if not request.user.is_staff:
            return Response(
                {'error': 'Not authorized'},
                status=status.HTTP_403_FORBIDDEN
            )
        lead = self.get_object()
        notes = lead.notes.all()
        serializer = LeadNoteSerializer(notes, many=True)
        return Response(serializer.data)


class LeadInteractionViewSet(viewsets.ModelViewSet):
    """ViewSet for lead interactions"""

    serializer_class = LeadInteractionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LeadInteraction.objects.all()
        return LeadInteraction.objects.filter(lead__user=user)

    def get_serializer_class(self):
        if self.action == 'create':
            return LeadInteractionCreateSerializer
        return LeadInteractionSerializer

    def create(self, request, *args, **kwargs):
        """Create a new interaction for the current user's lead"""
        lead_profile, _ = LeadProfile.objects.get_or_create(user=request.user)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get client info
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR', '').split(',')[0] or \
                     request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        referrer = request.META.get('HTTP_REFERER', '')

        interaction = LeadInteraction.objects.create(
            lead=lead_profile,
            interaction_type=serializer.validated_data['interaction_type'],
            data=serializer.validated_data.get('data', {}),
            session_id=serializer.validated_data.get('session_id', ''),
            ip_address=ip_address,
            user_agent=user_agent,
            referrer=referrer,
        )

        # Update lead profile counters
        lead_profile.increment_interactions()

        return Response(
            LeadInteractionSerializer(interaction).data,
            status=status.HTTP_201_CREATED
        )


class LeadNoteViewSet(viewsets.ModelViewSet):
    """ViewSet for lead notes (staff only)"""

    serializer_class = LeadNoteSerializer
    permission_classes = [IsAdminUser]
    queryset = LeadNote.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_pin(self, request, pk=None):
        """Toggle pin status of a note"""
        note = self.get_object()
        note.is_pinned = not note.is_pinned
        note.save(update_fields=['is_pinned'])
        return Response({'is_pinned': note.is_pinned})
