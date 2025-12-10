"""
Diagnosis Types and Wizard Configuration
Shared constants for the diagnostic wizard
"""

from enum import Enum
from typing import Dict, List, Any


class SolutionType(str, Enum):
    DATA_ROOM_AUDIT = "data_room_audit"
    GAP_ANALYSIS = "gap_analysis"
    DEAL_TEASER = "deal_teaser"
    DATA_ROOM_PREP = "data_room_prep"
    DEAL_VISOR = "deal_visor"
    SMART_DATA_ROOM = "smart_data_room"


class SituationType(str, Enum):
    AUDITS = "audits"
    EXPANSION = "expansion"
    TENDERS = "tenders"
    DUE_DILIGENCE = "due_diligence"
    CONTRACTS = "contracts"
    SENSITIVE_CONTRACT = "sensitive_contract"


class UrgencyLevel(str, Enum):
    IMMEDIATE = "immediate"
    SHORT = "short"
    MEDIUM = "medium"
    EXPLORING = "exploring"


class DecisionRole(str, Enum):
    DECISION_MAKER = "decision_maker"
    INFLUENCER = "influencer"
    EVALUATOR = "evaluator"
    RESEARCHER = "researcher"


# Wizard Steps Configuration
WIZARD_STEPS: List[Dict[str, Any]] = [
    {
        "step": 1,
        "title_en": "What is your current situation?",
        "title_es": "¿Cuál es tu situación actual?",
        "description_en": "Select the option that best describes your current business situation",
        "description_es": "Selecciona la opción que mejor describe tu situación empresarial actual",
        "quick_win_en": "73% of companies that clearly identify their situation implement solutions 2x faster.",
        "quick_win_es": "El 73% de las empresas que identifican su situación claramente logran implementar soluciones 2x más rápido.",
        "question_type": "single_choice",
        "options": [
            {"id": "audits", "label_en": "I have frequent audits (ESG, risk, compliance, AI, privacy)", "label_es": "Tengo auditorías frecuentes (ESG, riesgos, compliance, IA, privacidad)"},
            {"id": "expansion", "label_en": "I want to expand operations to another country/market", "label_es": "Quiero expandir operaciones a otro país/mercado"},
            {"id": "tenders", "label_en": "I frequently participate in tenders", "label_es": "Me presento a licitaciones frecuentemente"},
            {"id": "due_diligence", "label_en": "I need to prepare for a due diligence", "label_es": "Necesito prepararme para una due diligence"},
            {"id": "contracts", "label_en": "I supervise multiple contracts in execution", "label_es": "Superviso múltiples contratos en ejecución"},
            {"id": "sensitive_contract", "label_en": "I'm about to sign a sensitive/important contract", "label_es": "Voy a firmar un contrato delicado/importante"},
        ],
    },
    {
        "step": 2,
        "title_en": "What is your organization size?",
        "title_es": "¿Cuál es el tamaño de tu organización?",
        "description_en": "This helps us tailor our recommendations to your scale",
        "description_es": "Esto nos ayuda a adaptar nuestras recomendaciones a tu escala",
        "quick_win_en": "Correctly sized compliance solutions reduce operational costs by up to 40%.",
        "quick_win_es": "Las soluciones de compliance correctamente dimensionadas reducen costos operativos hasta un 40%.",
        "question_type": "single_choice",
        "options": [
            {"id": "startup", "label_en": "Startup (1-10 employees)", "label_es": "Startup (1-10 empleados)"},
            {"id": "pyme", "label_en": "SMB (11-100 employees)", "label_es": "PyME (11-100 empleados)"},
            {"id": "midmarket", "label_en": "Midmarket (101-500 employees)", "label_es": "Midmarket (101-500 empleados)"},
            {"id": "enterprise", "label_en": "Enterprise (500+ employees)", "label_es": "Enterprise (500+ empleados)"},
        ],
    },
    {
        "step": 3,
        "title_en": "What industry do you operate in?",
        "title_es": "¿En qué industria operas?",
        "description_en": "Each industry has specific regulatory requirements",
        "description_es": "Cada industria tiene requisitos regulatorios específicos",
        "quick_win_en": "Each industry has specific regulatory requirements. Identifying them early avoids 65% of compliance issues.",
        "quick_win_es": "Cada industria tiene requisitos regulatorios específicos. Identificarlos temprano evita el 65% de los problemas de compliance.",
        "question_type": "single_choice",
        "options": [
            {"id": "finance", "label_en": "Financial Services / Banking", "label_es": "Servicios Financieros / Banca"},
            {"id": "tech", "label_en": "Technology / Software", "label_es": "Tecnología / Software"},
            {"id": "legal", "label_en": "Legal / Law Firms", "label_es": "Legal / Estudios Jurídicos"},
            {"id": "accounting", "label_en": "Accounting / Audit", "label_es": "Contabilidad / Auditoría"},
            {"id": "healthcare", "label_en": "Healthcare / Pharma", "label_es": "Salud / Pharma"},
            {"id": "manufacturing", "label_en": "Manufacturing / Industry", "label_es": "Manufactura / Industria"},
            {"id": "public", "label_en": "Public Sector / Government", "label_es": "Sector Público / Gobierno"},
            {"id": "other", "label_en": "Other industry", "label_es": "Otra industria"},
        ],
    },
    {
        "step": 4,
        "title_en": "What is your main pain point?",
        "title_es": "¿Cuál es tu principal dolor actual?",
        "description_en": "Describe your main challenge in compliance or governance",
        "description_es": "Describe tu principal desafío de compliance o gobernanza",
        "quick_win_en": "Defining the problem correctly is 50% of the solution. Companies that do this implement 3x more successfully.",
        "quick_win_es": "Definir el problema correctamente es el 50% de la solución. Las empresas que lo hacen implementan 3x más exitosamente.",
        "question_type": "text",
        "placeholder_en": "Briefly describe your main compliance or governance challenge...",
        "placeholder_es": "Describe brevemente tu principal desafío de compliance o gobernanza...",
    },
    {
        "step": 5,
        "title_en": "How urgent is it to solve this?",
        "title_es": "¿Qué tan urgente es resolver esto?",
        "description_en": "Understanding your timeline helps us prioritize",
        "description_es": "Entender tu timeline nos ayuda a priorizar",
        "quick_win_en": "82% of companies that act within the first month achieve better results than those that wait.",
        "quick_win_es": "El 82% de las empresas que actúan dentro del primer mes logran mejores resultados que las que esperan.",
        "question_type": "single_choice",
        "options": [
            {"id": "immediate", "label_en": "Immediate (less than 1 month)", "label_es": "Inmediato (menos de 1 mes)"},
            {"id": "short", "label_en": "Short term (1-3 months)", "label_es": "Corto plazo (1-3 meses)"},
            {"id": "medium", "label_en": "Medium term (3-6 months)", "label_es": "Mediano plazo (3-6 meses)"},
            {"id": "exploring", "label_en": "I'm exploring options", "label_es": "Estoy explorando opciones"},
        ],
    },
    {
        "step": 6,
        "title_en": "Are you the decision maker or influencer?",
        "title_es": "¿Eres el decisor o influenciador?",
        "description_en": "Understanding your role helps us tailor the proposal",
        "description_es": "Entender tu rol nos ayuda a diseñar la propuesta perfecta",
        "quick_win_en": "Understanding the decision process allows us to design the perfect proposal for your context.",
        "quick_win_es": "Entender el proceso de decisión nos permite diseñar la propuesta perfecta para tu contexto.",
        "question_type": "single_choice",
        "options": [
            {"id": "decision_maker", "label_en": "I'm the final decision maker", "label_es": "Soy el decisor final"},
            {"id": "influencer", "label_en": "I influence the decision", "label_es": "Influyo en la decisión"},
            {"id": "evaluator", "label_en": "I'm evaluating to recommend", "label_es": "Estoy evaluando para recomendar"},
            {"id": "researcher", "label_en": "I'm researching options", "label_es": "Estoy investigando opciones"},
        ],
    },
]


# Diagnosis Mapping - Situation to Solution
DIAGNOSIS_MAPPING: Dict[str, Dict[str, Any]] = {
    "audits": {
        "solution": SolutionType.DATA_ROOM_AUDIT,
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
        "solution": SolutionType.GAP_ANALYSIS,
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
        "solution": SolutionType.DEAL_TEASER,
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
        "solution": SolutionType.DATA_ROOM_PREP,
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
        "solution": SolutionType.DEAL_VISOR,
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
        "solution": SolutionType.SMART_DATA_ROOM,
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


# Urgency Score Mapping
URGENCY_SCORES: Dict[str, int] = {
    "immediate": 10,
    "short": 7,
    "medium": 4,
    "exploring": 2,
}


# Decision Role Score Mapping (for lead qualification)
DECISION_ROLE_SCORES: Dict[str, int] = {
    "decision_maker": 10,
    "influencer": 7,
    "evaluator": 5,
    "researcher": 3,
}


# Company Size Score Mapping
COMPANY_SIZE_SCORES: Dict[str, int] = {
    "startup": 3,
    "pyme": 5,
    "midmarket": 8,
    "enterprise": 10,
}
