"""
User Serializers for Bizzer Website
"""

from rest_framework import serializers
from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import CustomUser


class CustomUserCreateSerializer(UserCreateSerializer):
    """Serializer for user registration"""

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = (
            'id',
            'email',
            'password',
            'first_name',
            'last_name',
            'company',
            'company_size',
            'industry',
            'country',
            'phone',
            'job_title',
            'preferred_language',
            'accepted_terms',
            'accepted_privacy',
            'marketing_consent',
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'accepted_terms': {'required': True},
            'accepted_privacy': {'required': True},
        }

    def validate_accepted_terms(self, value):
        if not value:
            raise serializers.ValidationError(
                "You must accept the terms of service to register."
            )
        return value

    def validate_accepted_privacy(self, value):
        if not value:
            raise serializers.ValidationError(
                "You must accept the privacy policy to register."
            )
        return value


class CustomUserSerializer(UserSerializer):
    """Serializer for user details"""

    full_name = serializers.ReadOnlyField()

    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'company',
            'company_size',
            'industry',
            'country',
            'phone',
            'job_title',
            'preferred_language',
            'lead_score',
            'lead_status',
            'accepted_terms',
            'accepted_terms_date',
            'accepted_privacy',
            'accepted_privacy_date',
            'marketing_consent',
            'created_at',
            'updated_at',
        )
        read_only_fields = (
            'id',
            'lead_score',
            'lead_status',
            'accepted_terms_date',
            'accepted_privacy_date',
            'created_at',
            'updated_at',
        )


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""

    class Meta:
        model = CustomUser
        fields = (
            'first_name',
            'last_name',
            'company',
            'company_size',
            'industry',
            'country',
            'phone',
            'job_title',
            'preferred_language',
            'marketing_consent',
        )


class UserContextSerializer(serializers.ModelSerializer):
    """Serializer for user context (shared with agents)"""

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'company',
            'company_size',
            'industry',
            'country',
            'job_title',
            'preferred_language',
            'lead_score',
            'lead_status',
        )
        read_only_fields = fields
