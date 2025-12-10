"""
User Views for Bizzer Website
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import CustomUser
from .serializers import (
    CustomUserSerializer,
    UserProfileUpdateSerializer,
    UserContextSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user management"""

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own data
        if self.request.user.is_staff:
            return CustomUser.objects.all()
        return CustomUser.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get', 'patch'])
    def me(self, request):
        """Get or update current user profile"""
        user = request.user

        if request.method == 'GET':
            serializer = CustomUserSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            serializer = UserProfileUpdateSerializer(
                user,
                data=request.data,
                partial=True
            )
            if serializer.is_valid():
                serializer.save()
                # Recalculate lead score after profile update
                user.lead_score = user.calculate_lead_score()
                user.save(update_fields=['lead_score'])
                return Response(CustomUserSerializer(user).data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def context(self, request):
        """Get user context for agents service"""
        serializer = UserContextSerializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_language(self, request):
        """Update user's preferred language"""
        language = request.data.get('language')
        if language not in ['en', 'es']:
            return Response(
                {'error': 'Invalid language. Must be "en" or "es".'},
                status=status.HTTP_400_BAD_REQUEST
            )

        request.user.preferred_language = language
        request.user.save(update_fields=['preferred_language'])
        return Response({'language': language})

    @action(detail=False, methods=['post'])
    def update_marketing_consent(self, request):
        """Update marketing consent"""
        consent = request.data.get('consent', False)
        request.user.marketing_consent = consent
        request.user.save(update_fields=['marketing_consent', 'marketing_consent_date'])
        return Response({
            'marketing_consent': request.user.marketing_consent,
            'marketing_consent_date': request.user.marketing_consent_date
        })
