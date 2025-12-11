"""
Management command to seed wizard steps
"""

from django.core.management.base import BaseCommand
from apps.wizard.models import WizardStep


class Command(BaseCommand):
    help = 'Seed initial wizard steps'

    def handle(self, *args, **options):
        steps_data = [
            {
                'step_number': 1,
                'title_en': 'Current Situation',
                'title_es': 'Situación Actual',
                'description_en': 'Tell us about your current document management situation',
                'description_es': 'Cuéntanos sobre tu situación actual de gestión documental',
                'quick_win_en': 'Tip: Companies that digitize their processes save up to 40% in operational costs',
                'quick_win_es': 'Tip: Las empresas que digitalizan sus procesos ahorran hasta un 40% en costos operativos',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'manual', 'label_en': 'Mostly manual/paper-based', 'label_es': 'Mayormente manual/en papel'},
                    {'value': 'mixed', 'label_en': 'Mixed (some digital, some paper)', 'label_es': 'Mixto (algo digital, algo en papel)'},
                    {'value': 'digital', 'label_en': 'Mostly digital but disorganized', 'label_es': 'Mayormente digital pero desorganizado'},
                    {'value': 'organized', 'label_en': 'Digital and organized, but need more features', 'label_es': 'Digital y organizado, pero necesito más funciones'},
                ],
                'placeholder_en': 'Select your current situation',
                'placeholder_es': 'Selecciona tu situación actual',
                'is_required': True,
            },
            {
                'step_number': 2,
                'title_en': 'Organization Size',
                'title_es': 'Tamaño de Organización',
                'description_en': 'How many employees does your organization have?',
                'description_es': '¿Cuántos empleados tiene tu organización?',
                'quick_win_en': 'Tip: Our solutions scale with your business, from startups to enterprises',
                'quick_win_es': 'Tip: Nuestras soluciones escalan con tu negocio, desde startups hasta grandes empresas',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'startup', 'label_en': '1-10 employees', 'label_es': '1-10 empleados'},
                    {'value': 'pyme', 'label_en': '11-100 employees', 'label_es': '11-100 empleados'},
                    {'value': 'midmarket', 'label_en': '101-500 employees', 'label_es': '101-500 empleados'},
                    {'value': 'enterprise', 'label_en': '500+ employees', 'label_es': '500+ empleados'},
                ],
                'placeholder_en': 'Select your organization size',
                'placeholder_es': 'Selecciona el tamaño de tu organización',
                'is_required': True,
            },
            {
                'step_number': 3,
                'title_en': 'Industry',
                'title_es': 'Industria',
                'description_en': 'What industry does your organization operate in?',
                'description_es': '¿En qué industria opera tu organización?',
                'quick_win_en': 'Tip: Each industry has specific compliance requirements we can help you meet',
                'quick_win_es': 'Tip: Cada industria tiene requisitos de cumplimiento específicos que podemos ayudarte a cumplir',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'finance', 'label_en': 'Finance & Banking', 'label_es': 'Finanzas y Banca'},
                    {'value': 'legal', 'label_en': 'Legal & Law Firms', 'label_es': 'Legal y Despachos'},
                    {'value': 'accounting', 'label_en': 'Accounting & Audit', 'label_es': 'Contabilidad y Auditoría'},
                    {'value': 'healthcare', 'label_en': 'Healthcare', 'label_es': 'Salud'},
                    {'value': 'real_estate', 'label_en': 'Real Estate', 'label_es': 'Inmobiliario'},
                    {'value': 'manufacturing', 'label_en': 'Manufacturing', 'label_es': 'Manufactura'},
                    {'value': 'technology', 'label_en': 'Technology', 'label_es': 'Tecnología'},
                    {'value': 'other', 'label_en': 'Other', 'label_es': 'Otro'},
                ],
                'placeholder_en': 'Select your industry',
                'placeholder_es': 'Selecciona tu industria',
                'is_required': True,
            },
            {
                'step_number': 4,
                'title_en': 'Main Pain Point',
                'title_es': 'Principal Desafío',
                'description_en': 'What is your main challenge with document management?',
                'description_es': '¿Cuál es tu principal desafío con la gestión documental?',
                'quick_win_en': 'Tip: Identifying the right problem is the first step to finding the right solution',
                'quick_win_es': 'Tip: Identificar el problema correcto es el primer paso para encontrar la solución correcta',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'audit_prep', 'label_en': 'Preparing for audits is time-consuming', 'label_es': 'Preparar auditorías consume mucho tiempo'},
                    {'value': 'doc_organization', 'label_en': 'Documents are scattered and hard to find', 'label_es': 'Los documentos están dispersos y son difíciles de encontrar'},
                    {'value': 'compliance', 'label_en': 'Meeting regulatory compliance requirements', 'label_es': 'Cumplir requisitos regulatorios'},
                    {'value': 'collaboration', 'label_en': 'Secure external collaboration is difficult', 'label_es': 'La colaboración externa segura es difícil'},
                    {'value': 'due_diligence', 'label_en': 'Preparing for M&A or investment due diligence', 'label_es': 'Preparar due diligence para M&A o inversión'},
                    {'value': 'contracts', 'label_en': 'Contract management and tracking', 'label_es': 'Gestión y seguimiento de contratos'},
                ],
                'placeholder_en': 'Select your main challenge',
                'placeholder_es': 'Selecciona tu principal desafío',
                'is_required': True,
            },
            {
                'step_number': 5,
                'title_en': 'Urgency Level',
                'title_es': 'Nivel de Urgencia',
                'description_en': 'How urgent is solving this problem for you?',
                'description_es': '¿Qué tan urgente es resolver este problema para ti?',
                'quick_win_en': 'Tip: We offer accelerated implementation for urgent cases',
                'quick_win_es': 'Tip: Ofrecemos implementación acelerada para casos urgentes',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'immediate', 'label_en': 'Immediate - need solution now', 'label_es': 'Inmediato - necesito solución ahora'},
                    {'value': 'this_quarter', 'label_en': 'This quarter', 'label_es': 'Este trimestre'},
                    {'value': 'this_year', 'label_en': 'Within this year', 'label_es': 'Dentro de este año'},
                    {'value': 'exploring', 'label_en': 'Just exploring options', 'label_es': 'Solo explorando opciones'},
                ],
                'placeholder_en': 'Select urgency level',
                'placeholder_es': 'Selecciona el nivel de urgencia',
                'is_required': True,
            },
            {
                'step_number': 6,
                'title_en': 'Decision Maker Role',
                'title_es': 'Rol en la Decisión',
                'description_en': 'What is your role in the purchasing decision?',
                'description_es': '¿Cuál es tu rol en la decisión de compra?',
                'quick_win_en': 'Tip: We provide ROI analysis and executive summaries to help with internal approvals',
                'quick_win_es': 'Tip: Proporcionamos análisis de ROI y resúmenes ejecutivos para ayudar con aprobaciones internas',
                'question_type': 'single_choice',
                'options': [
                    {'value': 'decision_maker', 'label_en': 'I am the decision maker', 'label_es': 'Soy quien toma la decisión'},
                    {'value': 'influencer', 'label_en': 'I influence the decision', 'label_es': 'Influyo en la decisión'},
                    {'value': 'evaluator', 'label_en': 'I evaluate options for others', 'label_es': 'Evalúo opciones para otros'},
                    {'value': 'user', 'label_en': 'I would be an end user', 'label_es': 'Sería un usuario final'},
                ],
                'placeholder_en': 'Select your role',
                'placeholder_es': 'Selecciona tu rol',
                'is_required': True,
            },
        ]

        for step_data in steps_data:
            step, created = WizardStep.objects.update_or_create(
                step_number=step_data['step_number'],
                defaults=step_data
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(
                self.style.SUCCESS(f'{action} step {step.step_number}: {step.title_en}')
            )

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully seeded {len(steps_data)} wizard steps')
        )
