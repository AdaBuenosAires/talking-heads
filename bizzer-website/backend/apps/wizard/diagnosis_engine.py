"""
Diagnosis Engine for Bizzer Website
Core logic for analyzing wizard responses and generating recommendations
"""

from typing import Dict, List, Any, Optional
from dataclasses import dataclass


@dataclass
class DiagnosisData:
    """Data class for diagnosis results"""
    primary_solution: str
    secondary_solutions: List[str]
    diagnosis_summary_en: str
    diagnosis_summary_es: str
    pain_points: List[str]
    recommended_features: List[Dict[str, str]]
    urgency_score: int
    fit_score: int
    personalized_pitch_en: str
    personalized_pitch_es: str
    next_steps: List[Dict[str, str]]


# Solution mapping based on situation
SOLUTION_MAPPING = {
    "audits": {
        "solution": "data_room_audit",
        "title_en": "Data Room for Audits",
        "title_es": "Data Room para Auditorías",
        "description_en": "A Data Room solution with reusable templates by stakeholder to share documentation securely and efficiently during ESG, risk, regulatory compliance, AI governance, and data privacy audits.",
        "description_es": "Una solución de Data Room con templates reutilizables por stakeholder para compartir documentación de forma segura y eficiente durante auditorías de ESG, riesgos, compliance regulatorio, gobernanza de IA y privacidad de datos.",
        "features_en": [
            "Pre-configured templates by audit type",
            "Granular permissions by stakeholder/auditor",
            "Complete access traceability",
            "Automatic document updates",
            "Audit status dashboard",
        ],
        "features_es": [
            "Templates pre-configurados por tipo de auditoría",
            "Permisos granulares por stakeholder/auditor",
            "Trazabilidad completa de accesos",
            "Actualización automática de documentos",
            "Dashboard de estado de auditoría",
        ],
        "next_steps_en": [
            "Schedule personalized Data Room demo",
            "Receive documentation checklist by audit type",
            "Free 30-min consultation with specialist",
        ],
        "next_steps_es": [
            "Agendar demo personalizada de Data Room",
            "Recibir checklist de documentación por tipo de auditoría",
            "Consulta gratuita de 30 min con especialista",
        ],
    },
    "expansion": {
        "solution": "gap_analysis",
        "title_en": "Corporate Doc Gap Analysis",
        "title_es": "Corporate Doc Gap Analysis",
        "description_en": "An intelligent application that analyzes your current documentation and determines, based on your expansion goals, jurisdiction, vertical and industry, what documentation you'll need in the new market and what gaps you must cover.",
        "description_es": "Una aplicación inteligente que analiza tu documentación actual y establece, según tus objetivos de expansión, jurisdicción, vertical e industria, qué documentación necesitarás en el nuevo mercado y qué gaps debes cubrir.",
        "features_en": [
            "Automated analysis of existing documentation",
            "Requirements mapping by destination jurisdiction",
            "Document gap identification",
            "Compliance roadmap for expansion",
            "Regulatory change alerts",
        ],
        "features_es": [
            "Análisis automatizado de documentación existente",
            "Mapeo de requisitos por jurisdicción destino",
            "Identificación de gaps documentales",
            "Roadmap de compliance para expansión",
            "Alertas de cambios regulatorios",
        ],
        "next_steps_en": [
            "Schedule free preliminary analysis",
            "Receive requirements matrix by country",
            "International expansion workshop",
        ],
        "next_steps_es": [
            "Agendar análisis preliminar gratuito",
            "Recibir matriz de requisitos por país",
            "Workshop de expansión internacional",
        ],
    },
    "tenders": {
        "solution": "deal_teaser",
        "title_en": "Deal Teaser for Tenders",
        "title_es": "Deal Teaser para Licitaciones",
        "description_en": "A solution to prepare professional tender offers, strategically adjust counteroffers, and make associated documentation available based on NDAs and structured deal intent.",
        "description_es": "Una solución para preparar ofertas de licitación profesionales, ajustar contraofertas estratégicamente y disponibilizar la documentación asociada basada en NDAs y deal intent estructurado.",
        "features_en": [
            "Offer builder with templates",
            "Digital NDA management",
            "War room for offer preparation",
            "Historical competition analysis",
            "Tender status tracking",
        ],
        "features_es": [
            "Constructor de ofertas con templates",
            "Gestión de NDAs digitales",
            "War room para preparación de ofertas",
            "Análisis de competencia histórico",
            "Tracking de estado de licitaciones",
        ],
        "next_steps_en": [
            "Offer preparation demo",
            "Access to template library",
            "Tender strategy consulting",
        ],
        "next_steps_es": [
            "Demo de preparación de ofertas",
            "Acceso a biblioteca de templates",
            "Consultoría de estrategia de licitación",
        ],
    },
    "due_diligence": {
        "solution": "data_room_prep",
        "title_en": "Data Room Prep for Due Diligence",
        "title_es": "Data Room Prep para Due Diligence",
        "description_en": "An intensive Data Room preparation solution to arrive at due diligence with all documentation adjusted, organized, and ready for review according to M&A best practices.",
        "description_es": "Una solución de preparación intensiva de Data Room para llegar a la due diligence con toda la documentación ajustada, organizada y lista para revisión según las mejores prácticas M&A.",
        "features_en": [
            "Due diligence checklist by transaction type",
            "Automatic document organization",
            "Integrated Q&A management",
            "Real-time preparation index",
            "Pre-DD review simulation",
        ],
        "features_es": [
            "Checklist de due diligence por tipo de transacción",
            "Organización automática de documentos",
            "Q&A management integrado",
            "Índice de preparación en tiempo real",
            "Simulación de revisión pre-DD",
        ],
        "next_steps_en": [
            "Current preparation assessment",
            "DD preparation work plan",
            "Process accompaniment",
        ],
        "next_steps_es": [
            "Assessment de preparación actual",
            "Plan de trabajo de preparación DD",
            "Acompañamiento durante el proceso",
        ],
    },
    "contracts": {
        "solution": "deal_visor",
        "title_en": "Deal Visor for Contract Monitoring",
        "title_es": "Deal Visor para Monitoreo de Contratos",
        "description_en": "A continuous monitoring solution for contracts in execution that tracks conditions, milestones, requirements, and obligations that must be achieved or maintained over time.",
        "description_es": "Una solución de monitoreo continuo de contratos en ejecución que trackea condiciones, hitos, requisitos y obligaciones que deben alcanzarse o mantenerse en el tiempo.",
        "features_en": [
            "Active contracts dashboard",
            "Deadline and milestone alerts",
            "Contractual KPI tracking",
            "Obligations management",
            "Compliance reports",
        ],
        "features_es": [
            "Dashboard de contratos activos",
            "Alertas de vencimientos y hitos",
            "Tracking de KPIs contractuales",
            "Gestión de obligaciones",
            "Reportes de cumplimiento",
        ],
        "next_steps_en": [
            "Current contracts mapping",
            "Critical alerts configuration",
            "Contract management training",
        ],
        "next_steps_es": [
            "Mapeo de contratos actuales",
            "Configuración de alertas críticas",
            "Training de gestión contractual",
        ],
    },
    "sensitive_contract": {
        "solution": "smart_data_room",
        "title_en": "Smart Data Room with Digital Signature",
        "title_es": "Smart Data Room con Firma Digital",
        "description_en": "An intelligent Data Room for sensitive contracts with integrated digital signature, digital evidence registry of conformities, and complete consent management with legal validity.",
        "description_es": "Un Data Room inteligente para contratos delicados con firma digital integrada, registro de evidencias digitales de conformidades, y gestión completa de consentimientos con validez legal.",
        "features_en": [
            "Digital signature with legal validity",
            "Immutable evidence registry",
            "GDPR consent management",
            "Complete audit trail",
            "Legal systems integration",
        ],
        "features_es": [
            "Firma digital con validez legal",
            "Registro inmutable de evidencias",
            "Gestión de consentimientos GDPR",
            "Audit trail completo",
            "Integración con sistemas legales",
        ],
        "next_steps_en": [
            "Digital signature and evidence demo",
            "Legal requirements review",
            "Signature flow configuration",
        ],
        "next_steps_es": [
            "Demo de firma digital y evidencias",
            "Revisión legal de requisitos",
            "Configuración de flujos de firma",
        ],
    },
}

# Score mappings
URGENCY_SCORES = {
    "immediate": 10,
    "short": 7,
    "medium": 4,
    "exploring": 2,
}

DECISION_ROLE_SCORES = {
    "decision_maker": 10,
    "influencer": 7,
    "evaluator": 5,
    "researcher": 3,
}

COMPANY_SIZE_SCORES = {
    "startup": 3,
    "pyme": 5,
    "midmarket": 8,
    "enterprise": 10,
}

# Industry fit scores
INDUSTRY_FIT_SCORES = {
    "finance": 10,
    "legal": 10,
    "accounting": 9,
    "healthcare": 8,
    "tech": 7,
    "manufacturing": 6,
    "public": 8,
    "other": 5,
}


class DiagnosisEngine:
    """Engine for generating diagnosis from wizard responses"""

    def __init__(self, responses: List[Dict[str, Any]]):
        """
        Initialize with wizard responses

        Args:
            responses: List of response dictionaries with step_number and response_value
        """
        self.responses = {r['step_number']: r['response_value'] for r in responses}
        self.response_data = {r['step_number']: r.get('response_data', {}) for r in responses}

    def _get_response(self, step: int) -> Optional[str]:
        """Get response for a specific step"""
        return self.responses.get(step)

    def _calculate_urgency_score(self) -> int:
        """Calculate urgency score from step 5 response"""
        urgency = self._get_response(5)
        return URGENCY_SCORES.get(urgency, 5)

    def _calculate_fit_score(self) -> int:
        """Calculate fit score based on company size, industry, and decision role"""
        company_size = self._get_response(2)
        industry = self._get_response(3)
        decision_role = self._get_response(6)

        size_score = COMPANY_SIZE_SCORES.get(company_size, 5)
        industry_score = INDUSTRY_FIT_SCORES.get(industry, 5)
        role_score = DECISION_ROLE_SCORES.get(decision_role, 5)

        # Weighted average
        return int((size_score * 0.3 + industry_score * 0.3 + role_score * 0.4))

    def _get_primary_solution(self) -> str:
        """Determine primary solution based on step 1 response"""
        situation = self._get_response(1)
        mapping = SOLUTION_MAPPING.get(situation, SOLUTION_MAPPING["audits"])
        return mapping["solution"]

    def _get_secondary_solutions(self) -> List[str]:
        """Determine secondary solutions based on profile"""
        primary = self._get_primary_solution()
        secondary = []

        # Add complementary solutions based on industry and size
        industry = self._get_response(3)
        company_size = self._get_response(2)

        if industry in ["finance", "legal", "accounting"]:
            if "data_room_audit" not in [primary]:
                secondary.append("data_room_audit")

        if company_size in ["midmarket", "enterprise"]:
            if "deal_visor" not in [primary]:
                secondary.append("deal_visor")

        return secondary[:2]  # Max 2 secondary solutions

    def _generate_summary(self, situation: str, language: str = 'es') -> str:
        """Generate personalized diagnosis summary"""
        mapping = SOLUTION_MAPPING.get(situation, SOLUTION_MAPPING["audits"])

        company_size = self._get_response(2) or "company"
        industry = self._get_response(3) or "your industry"
        pain_point = self._get_response(4) or ""

        if language == 'es':
            summary = f"Basándose en tu situación actual ({mapping['title_es']}), "
            summary += f"el tamaño de tu organización ({company_size}) y tu industria ({industry}), "
            summary += f"hemos identificado que {mapping['description_es']} "
            if pain_point:
                summary += f"Esto abordará directamente tu principal desafío: {pain_point}"
        else:
            summary = f"Based on your current situation ({mapping['title_en']}), "
            summary += f"your organization size ({company_size}) and industry ({industry}), "
            summary += f"we've identified that {mapping['description_en']} "
            if pain_point:
                summary += f"This will directly address your main challenge: {pain_point}"

        return summary

    def _generate_pitch(self, situation: str, language: str = 'es') -> str:
        """Generate personalized pitch"""
        mapping = SOLUTION_MAPPING.get(situation, SOLUTION_MAPPING["audits"])
        urgency = self._get_response(5)

        if language == 'es':
            if urgency == 'immediate':
                pitch = f"Entendemos que tu necesidad es urgente. {mapping['title_es']} puede estar operativo en menos de una semana, permitiéndote abordar tu situación inmediatamente."
            elif urgency == 'short':
                pitch = f"{mapping['title_es']} te permitirá organizarte y estar preparado en el corto plazo. Podemos comenzar la implementación esta semana."
            else:
                pitch = f"Tienes tiempo para evaluar opciones, y {mapping['title_es']} es la solución ideal para tu contexto. Agenda una demo sin compromiso."
        else:
            if urgency == 'immediate':
                pitch = f"We understand your need is urgent. {mapping['title_en']} can be operational in less than a week, allowing you to address your situation immediately."
            elif urgency == 'short':
                pitch = f"{mapping['title_en']} will allow you to organize and be prepared in the short term. We can start implementation this week."
            else:
                pitch = f"You have time to evaluate options, and {mapping['title_en']} is the ideal solution for your context. Schedule a no-commitment demo."

        return pitch

    def generate_diagnosis(self) -> DiagnosisData:
        """Generate complete diagnosis from responses"""
        situation = self._get_response(1) or "audits"
        mapping = SOLUTION_MAPPING.get(situation, SOLUTION_MAPPING["audits"])

        # Get features formatted
        features = [
            {"en": en, "es": es}
            for en, es in zip(mapping["features_en"], mapping["features_es"])
        ]

        # Get next steps formatted
        next_steps = [
            {"en": en, "es": es}
            for en, es in zip(mapping["next_steps_en"], mapping["next_steps_es"])
        ]

        # Identify pain points from text response
        pain_point = self._get_response(4)
        pain_points = [pain_point] if pain_point else []

        return DiagnosisData(
            primary_solution=mapping["solution"],
            secondary_solutions=self._get_secondary_solutions(),
            diagnosis_summary_en=self._generate_summary(situation, 'en'),
            diagnosis_summary_es=self._generate_summary(situation, 'es'),
            pain_points=pain_points,
            recommended_features=features,
            urgency_score=self._calculate_urgency_score(),
            fit_score=self._calculate_fit_score(),
            personalized_pitch_en=self._generate_pitch(situation, 'en'),
            personalized_pitch_es=self._generate_pitch(situation, 'es'),
            next_steps=next_steps,
        )
