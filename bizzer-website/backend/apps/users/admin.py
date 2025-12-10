"""
User Admin Configuration
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """Admin configuration for CustomUser"""

    model = CustomUser
    list_display = (
        'email',
        'first_name',
        'last_name',
        'company',
        'lead_status',
        'lead_score',
        'is_bizzer_employee',
        'is_active',
        'created_at',
    )
    list_filter = (
        'is_active',
        'is_staff',
        'is_bizzer_employee',
        'lead_status',
        'company_size',
        'industry',
        'preferred_language',
    )
    search_fields = ('email', 'first_name', 'last_name', 'company')
    ordering = ('-created_at',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'phone')
        }),
        ('Company Info', {
            'fields': ('company', 'company_size', 'industry', 'country', 'job_title')
        }),
        ('Lead Info', {
            'fields': ('lead_score', 'lead_status'),
            'classes': ('collapse',),
        }),
        ('Preferences', {
            'fields': ('preferred_language',),
        }),
        ('Compliance', {
            'fields': (
                'accepted_terms',
                'accepted_terms_date',
                'accepted_privacy',
                'accepted_privacy_date',
                'marketing_consent',
                'marketing_consent_date',
            ),
            'classes': ('collapse',),
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'is_bizzer_employee', 'groups', 'user_permissions'),
            'classes': ('collapse',),
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',),
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'first_name',
                'last_name',
                'company',
                'is_active',
                'is_staff',
            ),
        }),
    )
