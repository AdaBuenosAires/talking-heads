"""
Wizard URLs for Bizzer Website
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WizardStepViewSet, WizardSessionViewSet, DiagnosisResultViewSet

router = DefaultRouter()
router.register(r'steps', WizardStepViewSet, basename='wizard-step')
router.register(r'sessions', WizardSessionViewSet, basename='wizard-session')
router.register(r'diagnoses', DiagnosisResultViewSet, basename='diagnosis-result')

urlpatterns = [
    path('', include(router.urls)),
]
