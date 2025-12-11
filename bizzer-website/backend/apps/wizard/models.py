"""
Wizard Models for Bizzer Website
"""

import uuid
from django.db import models
from django.conf import settings


class WizardStep(models.Model):
    """Definition of each wizard step"""

    class QuestionType(models.TextChoices):
        SINGLE_CHOICE = 'single_choice', 'Single Choice'
        MULTIPLE_CHOICE = 'multiple_choice', 'Multiple Choice'
        TEXT = 'text', 'Free Text'
        SCALE = 'scale', 'Scale 1-10'

    step_number = models.IntegerField(unique=True)
    title_en = models.CharField(max_length=255)
    title_es = models.CharField(max_length=255)
    description_en = models.TextField(blank=True)
    description_es = models.TextField(blank=True)

    # Quick win associated with this step
    quick_win_en = models.TextField(blank=True)
    quick_win_es = models.TextField(blank=True)

    # Configuration
    question_type = models.CharField(
        max_length=20,
        choices=QuestionType.choices
    )
    options = models.JSONField(default=list)  # Options if choice type
    placeholder_en = models.CharField(max_length=255, blank=True)
    placeholder_es = models.CharField(max_length=255, blank=True)
    is_required = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'wizard_steps'
        verbose_name = 'Wizard Step'
        verbose_name_plural = 'Wizard Steps'
        ordering = ['step_number']

    def __str__(self):
        return f"Step {self.step_number}: {self.title_en}"

    def get_title(self, language='es'):
        return self.title_es if language == 'es' else self.title_en

    def get_description(self, language='es'):
        return self.description_es if language == 'es' else self.description_en

    def get_quick_win(self, language='es'):
        return self.quick_win_es if language == 'es' else self.quick_win_en


class WizardSession(models.Model):
    """Wizard session for a user"""

    class Status(models.TextChoices):
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'
        ABANDONED = 'abandoned', 'Abandoned'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='wizard_sessions'
    )
    session_id = models.CharField(max_length=100, unique=True)

    current_step = models.IntegerField(default=1)
    total_steps = models.IntegerField(default=6)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.IN_PROGRESS
    )

    # Timestamps
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_activity = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'wizard_sessions'
        verbose_name = 'Wizard Session'
        verbose_name_plural = 'Wizard Sessions'
        ordering = ['-started_at']

    def __str__(self):
        return f"Wizard Session: {self.user.email} - {self.status}"

    @property
    def progress_percentage(self):
        if self.status == self.Status.COMPLETED:
            return 100
        if self.total_steps == 0:
            return 0
        return int((self.current_step - 1) / self.total_steps * 100)


class WizardResponse(models.Model):
    """User response to each wizard step"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(
        WizardSession,
        on_delete=models.CASCADE,
        related_name='responses'
    )
    step = models.ForeignKey(
        WizardStep,
        on_delete=models.CASCADE
    )

    response_value = models.TextField()  # User's response
    response_data = models.JSONField(default=dict)  # Additional metadata
    time_spent_seconds = models.IntegerField(default=0)  # Engagement metric

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'wizard_responses'
        verbose_name = 'Wizard Response'
        verbose_name_plural = 'Wizard Responses'
        unique_together = ['session', 'step']

    def __str__(self):
        return f"Response: {self.session.user.email} - Step {self.step.step_number}"


class DiagnosisResult(models.Model):
    """Diagnosis result after wizard completion"""

    class SolutionType(models.TextChoices):
        DATA_ROOM_AUDIT = 'data_room_audit', 'Data Room para Auditorías'
        GAP_ANALYSIS = 'gap_analysis', 'Corporate Doc Gap Analysis'
        DEAL_TEASER = 'deal_teaser', 'Deal Teaser para Licitaciones'
        DATA_ROOM_PREP = 'data_room_prep', 'Data Room Prep para Due Diligence'
        DEAL_VISOR = 'deal_visor', 'Deal Visor para Monitoreo de Contratos'
        SMART_DATA_ROOM = 'smart_data_room', 'Smart Data Room con Firma Digital'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.OneToOneField(
        WizardSession,
        on_delete=models.CASCADE,
        related_name='diagnosis'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='diagnoses'
    )

    primary_solution = models.CharField(max_length=50, choices=SolutionType.choices)
    secondary_solutions = models.JSONField(default=list)

    # Detailed diagnosis
    diagnosis_summary_en = models.TextField(blank=True)
    diagnosis_summary_es = models.TextField(blank=True)
    pain_points_identified = models.JSONField(default=list)
    recommended_features = models.JSONField(default=list)

    # Scoring
    urgency_score = models.IntegerField(default=0)  # 1-10
    fit_score = models.IntegerField(default=0)  # 1-10

    # Personalized content
    personalized_pitch_en = models.TextField(blank=True)
    personalized_pitch_es = models.TextField(blank=True)
    next_steps = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'diagnosis_results'
        verbose_name = 'Diagnosis Result'
        verbose_name_plural = 'Diagnosis Results'

    def __str__(self):
        return f"Diagnosis: {self.user.email} - {self.primary_solution}"

    def get_summary(self, language='es'):
        return self.diagnosis_summary_es if language == 'es' else self.diagnosis_summary_en

    def get_pitch(self, language='es'):
        return self.personalized_pitch_es if language == 'es' else self.personalized_pitch_en
