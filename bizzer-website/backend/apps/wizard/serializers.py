"""
Wizard Serializers for Bizzer Website
"""

from rest_framework import serializers
from .models import WizardStep, WizardSession, WizardResponse, DiagnosisResult


class WizardStepSerializer(serializers.ModelSerializer):
    """Serializer for wizard steps"""

    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    quick_win = serializers.SerializerMethodField()
    placeholder = serializers.SerializerMethodField()

    class Meta:
        model = WizardStep
        fields = (
            'step_number',
            'title',
            'title_en',
            'title_es',
            'description',
            'description_en',
            'description_es',
            'quick_win',
            'quick_win_en',
            'quick_win_es',
            'question_type',
            'options',
            'placeholder',
            'placeholder_en',
            'placeholder_es',
            'is_required',
        )

    def get_title(self, obj):
        language = self.context.get('language', 'es')
        return obj.get_title(language)

    def get_description(self, obj):
        language = self.context.get('language', 'es')
        return obj.get_description(language)

    def get_quick_win(self, obj):
        language = self.context.get('language', 'es')
        return obj.get_quick_win(language)

    def get_placeholder(self, obj):
        language = self.context.get('language', 'es')
        return obj.placeholder_es if language == 'es' else obj.placeholder_en


class WizardResponseSerializer(serializers.ModelSerializer):
    """Serializer for wizard responses"""

    step_number = serializers.IntegerField(source='step.step_number', read_only=True)

    class Meta:
        model = WizardResponse
        fields = (
            'id',
            'step',
            'step_number',
            'response_value',
            'response_data',
            'time_spent_seconds',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')


class WizardResponseCreateSerializer(serializers.Serializer):
    """Serializer for creating wizard responses"""

    step_number = serializers.IntegerField()
    response_value = serializers.CharField()
    response_data = serializers.JSONField(required=False, default=dict)
    time_spent_seconds = serializers.IntegerField(required=False, default=0)


class WizardSessionSerializer(serializers.ModelSerializer):
    """Serializer for wizard sessions"""

    responses = WizardResponseSerializer(many=True, read_only=True)
    progress_percentage = serializers.ReadOnlyField()

    class Meta:
        model = WizardSession
        fields = (
            'id',
            'session_id',
            'current_step',
            'total_steps',
            'status',
            'progress_percentage',
            'started_at',
            'completed_at',
            'last_activity',
            'responses',
        )
        read_only_fields = (
            'id',
            'session_id',
            'started_at',
            'completed_at',
            'last_activity',
        )


class WizardSessionCreateSerializer(serializers.Serializer):
    """Serializer for creating wizard sessions"""

    session_id = serializers.CharField(required=False)


class DiagnosisResultSerializer(serializers.ModelSerializer):
    """Serializer for diagnosis results"""

    diagnosis_summary = serializers.SerializerMethodField()
    personalized_pitch = serializers.SerializerMethodField()
    solution_details = serializers.SerializerMethodField()

    class Meta:
        model = DiagnosisResult
        fields = (
            'id',
            'primary_solution',
            'secondary_solutions',
            'diagnosis_summary',
            'diagnosis_summary_en',
            'diagnosis_summary_es',
            'pain_points_identified',
            'recommended_features',
            'urgency_score',
            'fit_score',
            'personalized_pitch',
            'personalized_pitch_en',
            'personalized_pitch_es',
            'next_steps',
            'created_at',
            'solution_details',
        )

    def get_diagnosis_summary(self, obj):
        language = self.context.get('language', 'es')
        return obj.get_summary(language)

    def get_personalized_pitch(self, obj):
        language = self.context.get('language', 'es')
        return obj.get_pitch(language)

    def get_solution_details(self, obj):
        """Get details about the recommended solution"""
        from .diagnosis_engine import SOLUTION_MAPPING

        language = self.context.get('language', 'es')
        solution_key = None

        # Find the solution key from SOLUTION_MAPPING
        for key, value in SOLUTION_MAPPING.items():
            if value['solution'] == obj.primary_solution:
                solution_key = key
                break

        if not solution_key:
            return None

        mapping = SOLUTION_MAPPING[solution_key]

        return {
            'title': mapping[f'title_{language}'],
            'description': mapping[f'description_{language}'],
            'features': mapping[f'features_{language}'],
            'next_steps': mapping[f'next_steps_{language}'],
        }
