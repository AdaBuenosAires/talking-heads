"""
Lead Serializers for Bizzer Website
"""

from rest_framework import serializers
from .models import LeadProfile, LeadInteraction, LeadNote


class LeadProfileSerializer(serializers.ModelSerializer):
    """Serializer for lead profile"""

    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = LeadProfile
        fields = (
            'id',
            'user',
            'user_email',
            'user_name',
            'company_description',
            'main_pain_point',
            'current_solutions',
            'budget_range',
            'timeline',
            'decision_maker',
            'recommended_solution',
            'secondary_solutions',
            'diagnosis_summary',
            'diagnosis_date',
            'wizard_completed',
            'wizard_completed_date',
            'total_interactions',
            'total_chat_messages',
            'last_interaction',
            'created_at',
            'updated_at',
        )
        read_only_fields = (
            'id',
            'user',
            'user_email',
            'user_name',
            'diagnosis_date',
            'wizard_completed_date',
            'total_interactions',
            'total_chat_messages',
            'last_interaction',
            'created_at',
            'updated_at',
        )


class LeadProfileContextSerializer(serializers.ModelSerializer):
    """Serializer for lead context (shared with agents)"""

    email = serializers.EmailField(source='user.email', read_only=True)
    company = serializers.CharField(source='user.company', read_only=True)
    company_size = serializers.CharField(source='user.company_size', read_only=True)
    industry = serializers.CharField(source='user.industry', read_only=True)
    preferred_language = serializers.CharField(
        source='user.preferred_language',
        read_only=True
    )

    class Meta:
        model = LeadProfile
        fields = (
            'id',
            'email',
            'company',
            'company_size',
            'industry',
            'preferred_language',
            'main_pain_point',
            'recommended_solution',
            'diagnosis_summary',
            'wizard_completed',
        )
        read_only_fields = fields


class LeadInteractionSerializer(serializers.ModelSerializer):
    """Serializer for lead interactions"""

    class Meta:
        model = LeadInteraction
        fields = (
            'id',
            'lead',
            'interaction_type',
            'data',
            'session_id',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')


class LeadInteractionCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating lead interactions"""

    class Meta:
        model = LeadInteraction
        fields = (
            'interaction_type',
            'data',
            'session_id',
        )


class LeadNoteSerializer(serializers.ModelSerializer):
    """Serializer for lead notes"""

    author_name = serializers.CharField(source='author.full_name', read_only=True)

    class Meta:
        model = LeadNote
        fields = (
            'id',
            'lead',
            'author',
            'author_name',
            'content',
            'is_pinned',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('id', 'author', 'author_name', 'created_at', 'updated_at')
