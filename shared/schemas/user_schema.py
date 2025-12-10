"""
Shared User Schema for Bizzer Network Stack
Used for cross-service communication
"""

from enum import Enum
from typing import Optional
from dataclasses import dataclass
from datetime import datetime


class CompanySize(str, Enum):
    STARTUP = "startup"
    PYME = "pyme"
    MIDMARKET = "midmarket"
    ENTERPRISE = "enterprise"


class LeadStatus(str, Enum):
    NEW = "new"
    QUALIFIED = "qualified"
    ENGAGED = "engaged"
    OPPORTUNITY = "opportunity"
    CUSTOMER = "customer"


class Language(str, Enum):
    ENGLISH = "en"
    SPANISH = "es"


@dataclass
class UserContext:
    """User context shared between services"""
    user_id: str
    email: str
    company: Optional[str] = None
    company_size: Optional[CompanySize] = None
    industry: Optional[str] = None
    country: Optional[str] = None
    job_title: Optional[str] = None
    preferred_language: Language = Language.SPANISH
    lead_score: int = 0
    lead_status: LeadStatus = LeadStatus.NEW

    # Diagnosis data
    recommended_solution: Optional[str] = None
    main_pain_point: Optional[str] = None
    wizard_completed: bool = False

    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "email": self.email,
            "company": self.company,
            "company_size": self.company_size.value if self.company_size else None,
            "industry": self.industry,
            "country": self.country,
            "job_title": self.job_title,
            "preferred_language": self.preferred_language.value,
            "lead_score": self.lead_score,
            "lead_status": self.lead_status.value,
            "recommended_solution": self.recommended_solution,
            "main_pain_point": self.main_pain_point,
            "wizard_completed": self.wizard_completed,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "UserContext":
        return cls(
            user_id=data.get("user_id", ""),
            email=data.get("email", ""),
            company=data.get("company"),
            company_size=CompanySize(data["company_size"]) if data.get("company_size") else None,
            industry=data.get("industry"),
            country=data.get("country"),
            job_title=data.get("job_title"),
            preferred_language=Language(data.get("preferred_language", "es")),
            lead_score=data.get("lead_score", 0),
            lead_status=LeadStatus(data.get("lead_status", "new")),
            recommended_solution=data.get("recommended_solution"),
            main_pain_point=data.get("main_pain_point"),
            wizard_completed=data.get("wizard_completed", False),
        )
