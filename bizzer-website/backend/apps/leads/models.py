"""
Lead Models for Bizzer Website
"""

import uuid
from django.db import models
from django.conf import settings


class LeadProfile(models.Model):
    """Extended lead profile with all collected information"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lead_profile'
    )

    # Company data collected in wizard
    company_description = models.TextField(blank=True)
    main_pain_point = models.TextField(blank=True)
    current_solutions = models.TextField(blank=True)
    budget_range = models.CharField(max_length=50, blank=True)
    timeline = models.CharField(max_length=50, blank=True)
    decision_maker = models.BooleanField(default=False)

    # Diagnosis result
    recommended_solution = models.CharField(max_length=100, blank=True)
    secondary_solutions = models.JSONField(default=list)
    diagnosis_summary = models.TextField(blank=True)
    diagnosis_date = models.DateTimeField(null=True, blank=True)

    # Engagement tracking
    wizard_completed = models.BooleanField(default=False)
    wizard_completed_date = models.DateTimeField(null=True, blank=True)
    total_interactions = models.IntegerField(default=0)
    total_chat_messages = models.IntegerField(default=0)
    last_interaction = models.DateTimeField(auto_now=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'lead_profiles'
        verbose_name = 'Lead Profile'
        verbose_name_plural = 'Lead Profiles'
        ordering = ['-created_at']

    def __str__(self):
        return f"Lead Profile: {self.user.email}"

    def increment_interactions(self):
        """Increment the total interactions counter"""
        self.total_interactions += 1
        self.save(update_fields=['total_interactions', 'last_interaction'])

    def increment_chat_messages(self):
        """Increment the total chat messages counter"""
        self.total_chat_messages += 1
        self.save(update_fields=['total_chat_messages', 'last_interaction'])


class LeadInteraction(models.Model):
    """History of all lead interactions"""

    class InteractionType(models.TextChoices):
        WIZARD_START = 'wizard_start', 'Started Wizard'
        WIZARD_STEP = 'wizard_step', 'Completed Wizard Step'
        WIZARD_COMPLETE = 'wizard_complete', 'Completed Wizard'
        CHAT_MESSAGE = 'chat_message', 'Chat Message'
        PAGE_VIEW = 'page_view', 'Page View'
        DOCUMENT_DOWNLOAD = 'document_download', 'Document Download'
        CTA_CLICK = 'cta_click', 'CTA Click'
        EMAIL_OPEN = 'email_open', 'Email Open'
        EMAIL_CLICK = 'email_click', 'Email Click'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(
        LeadProfile,
        on_delete=models.CASCADE,
        related_name='interactions'
    )
    interaction_type = models.CharField(
        max_length=30,
        choices=InteractionType.choices
    )
    data = models.JSONField(default=dict)  # Specific interaction data
    session_id = models.CharField(max_length=100, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    referrer = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'lead_interactions'
        verbose_name = 'Lead Interaction'
        verbose_name_plural = 'Lead Interactions'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['lead', '-created_at']),
            models.Index(fields=['interaction_type']),
            models.Index(fields=['session_id']),
        ]

    def __str__(self):
        return f"{self.lead.user.email} - {self.interaction_type}"


class LeadNote(models.Model):
    """Internal notes about leads (for sales team)"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lead = models.ForeignKey(
        LeadProfile,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='lead_notes'
    )
    content = models.TextField()
    is_pinned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'lead_notes'
        verbose_name = 'Lead Note'
        verbose_name_plural = 'Lead Notes'
        ordering = ['-is_pinned', '-created_at']

    def __str__(self):
        return f"Note for {self.lead.user.email}"
