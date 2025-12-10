"""
Wizard Admin Configuration
"""

from django.contrib import admin
from .models import WizardStep, WizardSession, WizardResponse, DiagnosisResult


class WizardResponseInline(admin.TabularInline):
    model = WizardResponse
    extra = 0
    readonly_fields = ('step', 'response_value', 'time_spent_seconds', 'created_at')
    can_delete = False

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(WizardStep)
class WizardStepAdmin(admin.ModelAdmin):
    list_display = (
        'step_number',
        'title_en',
        'question_type',
        'is_required',
        'is_active',
    )
    list_filter = ('question_type', 'is_required', 'is_active')
    ordering = ('step_number',)
    search_fields = ('title_en', 'title_es')

    fieldsets = (
        ('Basic Info', {
            'fields': ('step_number', 'question_type', 'is_required', 'is_active')
        }),
        ('English Content', {
            'fields': ('title_en', 'description_en', 'quick_win_en', 'placeholder_en')
        }),
        ('Spanish Content', {
            'fields': ('title_es', 'description_es', 'quick_win_es', 'placeholder_es')
        }),
        ('Options', {
            'fields': ('options',),
            'classes': ('collapse',),
        }),
    )


@admin.register(WizardSession)
class WizardSessionAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'session_id',
        'current_step',
        'total_steps',
        'status',
        'started_at',
        'completed_at',
    )
    list_filter = ('status', 'started_at')
    search_fields = ('user__email', 'session_id')
    readonly_fields = ('started_at', 'completed_at', 'last_activity')
    inlines = [WizardResponseInline]

    fieldsets = (
        ('Session Info', {
            'fields': ('user', 'session_id', 'status')
        }),
        ('Progress', {
            'fields': ('current_step', 'total_steps')
        }),
        ('Timestamps', {
            'fields': ('started_at', 'completed_at', 'last_activity'),
            'classes': ('collapse',),
        }),
    )


@admin.register(WizardResponse)
class WizardResponseAdmin(admin.ModelAdmin):
    list_display = (
        'session',
        'step',
        'response_value',
        'time_spent_seconds',
        'created_at',
    )
    list_filter = ('step', 'created_at')
    search_fields = ('session__user__email', 'response_value')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(DiagnosisResult)
class DiagnosisResultAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'primary_solution',
        'urgency_score',
        'fit_score',
        'created_at',
    )
    list_filter = ('primary_solution', 'created_at')
    search_fields = ('user__email',)
    readonly_fields = ('created_at',)

    fieldsets = (
        ('User & Session', {
            'fields': ('user', 'session')
        }),
        ('Solutions', {
            'fields': ('primary_solution', 'secondary_solutions')
        }),
        ('Diagnosis', {
            'fields': (
                'diagnosis_summary_en',
                'diagnosis_summary_es',
                'pain_points_identified',
                'recommended_features',
            )
        }),
        ('Scoring', {
            'fields': ('urgency_score', 'fit_score')
        }),
        ('Personalized Content', {
            'fields': ('personalized_pitch_en', 'personalized_pitch_es', 'next_steps'),
            'classes': ('collapse',),
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )
