"""
Bizzer Agent - Main Agent for Bizzer Platform
"""

from typing import Dict, Any, Optional, List
from app.agents.base_agent import BaseAgent
from app.llm.llm_factory import LLMFactory
from app.rag.retriever import RAGRetriever
from app.memory.session_manager import SessionManager
from app.memory.user_context import UserContextManager


class BizzerAgent(BaseAgent):
    """Main Bizzer Agent with RAG capabilities"""

    def __init__(self):
        self.llm = LLMFactory.get_client()
        self.retriever = RAGRetriever()
        self.session_manager = SessionManager()
        self.context_manager = UserContextManager()

    async def chat(
        self,
        user_id: str,
        session_id: str,
        message: str,
        user_context: Optional[Dict[str, Any]] = None,
    ) -> str:
        """Process a chat message and return a response"""
        # Get or update user context
        if not user_context:
            user_context = await self.context_manager.get_context(user_id)

        # Search relevant documents
        relevant_docs = await self.retriever.search(message, top_k=3)
        doc_contents = [doc.get("content", "") for doc in relevant_docs]

        # Build system prompt
        system_prompt = self._build_system_prompt(user_context or {}, doc_contents)

        # Get conversation history
        history = await self.session_manager.get_conversation_history(session_id)

        # Generate response
        response = await self.llm.generate(
            system_prompt=system_prompt,
            user_message=message,
            conversation_history=history[-10:],  # Last 10 messages
        )

        # Save to history
        await self.session_manager.add_to_history(
            session_id,
            {"role": "user", "content": message},
        )
        await self.session_manager.add_to_history(
            session_id,
            {"role": "assistant", "content": response},
        )

        return response

    def _build_system_prompt(
        self,
        user_context: Dict[str, Any],
        relevant_docs: List[str],
    ) -> str:
        """Build the system prompt with user context and relevant documents"""
        # Extract context values
        company = user_context.get("company", "No especificada")
        industry = user_context.get("industry", "No especificada")
        company_size = user_context.get("company_size", "No especificado")
        recommended_solution = user_context.get("recommended_solution", "Pendiente de diagnóstico")
        main_pain_point = user_context.get("main_pain_point", "No identificado")
        language = user_context.get("preferred_language", "es")

        # Format relevant docs
        docs_text = "\n\n".join(relevant_docs) if relevant_docs else "No hay documentación relevante disponible."

        # Build prompt based on language
        if language == "es":
            prompt = f"""Eres el asistente virtual de Bizzer, especialista en soluciones tecnológicas de compliance y gobernanza corporativa.

CONTEXTO DEL USUARIO:
- Empresa: {company}
- Industria: {industry}
- Tamaño: {company_size}
- Solución recomendada: {recommended_solution}
- Pain point principal: {main_pain_point}

DOCUMENTACIÓN RELEVANTE:
{docs_text}

INSTRUCCIONES:
1. Responde de forma profesional pero cercana
2. Usa la información del contexto del usuario para personalizar respuestas
3. Si preguntan sobre servicios, usa la documentación relevante
4. Si no tienes información específica, sugiere agendar una llamada con un especialista
5. Siempre orienta hacia la solución recomendada cuando sea relevante
6. Responde en español
7. Sé conciso pero informativo
8. Evita respuestas genéricas - personaliza según el contexto del usuario

SOLUCIONES DISPONIBLES:
- Data Room para Auditorías: Para empresas con auditorías frecuentes
- Corporate Doc Gap Analysis: Para expansión a nuevos mercados
- Deal Teaser: Para licitaciones
- Data Room Prep: Para due diligence
- Deal Visor: Para monitoreo de contratos
- Smart Data Room: Para contratos delicados con firma digital"""
        else:
            prompt = f"""You are Bizzer's virtual assistant, specializing in corporate compliance and governance technology solutions.

USER CONTEXT:
- Company: {company}
- Industry: {industry}
- Size: {company_size}
- Recommended solution: {recommended_solution}
- Main pain point: {main_pain_point}

RELEVANT DOCUMENTATION:
{docs_text}

INSTRUCTIONS:
1. Respond professionally but approachably
2. Use the user's context information to personalize responses
3. If asked about services, use the relevant documentation
4. If you don't have specific information, suggest scheduling a call with a specialist
5. Always guide towards the recommended solution when relevant
6. Respond in English
7. Be concise but informative
8. Avoid generic responses - personalize based on user context

AVAILABLE SOLUTIONS:
- Data Room for Audits: For companies with frequent audits
- Corporate Doc Gap Analysis: For expansion to new markets
- Deal Teaser: For tenders
- Data Room Prep: For due diligence
- Deal Visor: For contract monitoring
- Smart Data Room: For sensitive contracts with digital signature"""

        return prompt
