"""
Lead Admin Configuration
"""

from django.contrib import admin
from .models import LeadProfile, LeadInteraction, LeadNote


class LeadInteractionInline(admin.TabularInline):
    model = LeadInteraction
    extra = 0
    readonly_fields = ('interaction_type', 'data', 'session_id', 'created_at')
    can_delete = False
    max_num = 10

    def has_add_permission(self, request, obj=None):
        return False


class LeadNoteInline(admin.TabularInline):
    model = LeadNote
    extra = 1
    fields = ('content', 'is_pinned', 'author')
    readonly_fields = ('author',)


@admin.register(LeadProfile)
class LeadProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'recommended_solution',
        'wizard_completed',
        'total_interactions',
        'last_interaction',
        'created_at',
    )
    list_filter = (
        'wizard_completed',
        'recommended_solution',
        'decision_maker',
    )
    search_fields = ('user__email', 'user__company', 'main_pain_point')
    readonly_fields = (
        'total_interactions',
        'total_chat_messages',
        'last_interaction',
        'created_at',
        'updated_at',
    )
    inlines = [LeadNoteInline, LeadInteractionInline]

    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Company Information', {
            'fields': ('company_description', 'current_solutions', 'budget_range', 'timeline')
        }),
        ('Diagnosis', {
            'fields': (
                'main_pain_point',
                'decision_maker',
                'recommended_solution',
                'secondary_solutions',
                'diagnosis_summary',
                'diagnosis_date',
            )
        }),
        ('Engagement', {
            'fields': (
                'wizard_completed',
                'wizard_completed_date',
                'total_interactions',
                'total_chat_messages',
                'last_interaction',
            ),
            'classes': ('collapse',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )


@admin.register(LeadInteraction)
class LeadInteractionAdmin(admin.ModelAdmin):
    list_display = (
        'lead',
        'interaction_type',
        'session_id',
        'created_at',
    )
    list_filter = ('interaction_type', 'created_at')
    search_fields = ('lead__user__email', 'session_id')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(LeadNote)
class LeadNoteAdmin(admin.ModelAdmin):
    list_display = ('lead', 'author', 'is_pinned', 'created_at')
    list_filter = ('is_pinned', 'created_at')
    search_fields = ('lead__user__email', 'content')
    readonly_fields = ('created_at', 'updated_at')
