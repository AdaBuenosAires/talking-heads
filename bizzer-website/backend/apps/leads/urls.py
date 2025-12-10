"""
Lead URLs for Bizzer Website
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadProfileViewSet, LeadInteractionViewSet, LeadNoteViewSet

router = DefaultRouter()
router.register(r'profiles', LeadProfileViewSet, basename='lead-profile')
router.register(r'interactions', LeadInteractionViewSet, basename='lead-interaction')
router.register(r'notes', LeadNoteViewSet, basename='lead-note')

urlpatterns = [
    path('', include(router.urls)),
]
