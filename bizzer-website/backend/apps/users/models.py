"""
Custom User Model for Bizzer Website
"""

import uuid
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    """Custom user manager where email is the unique identifier"""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """Custom User Model with additional business fields"""

    class CompanySize(models.TextChoices):
        STARTUP = 'startup', 'Startup (1-10)'
        PYME = 'pyme', 'PyME (11-100)'
        MIDMARKET = 'midmarket', 'Midmarket (101-500)'
        ENTERPRISE = 'enterprise', 'Enterprise (500+)'

    class LeadStatus(models.TextChoices):
        NEW = 'new', 'New'
        QUALIFIED = 'qualified', 'Qualified'
        ENGAGED = 'engaged', 'Engaged'
        OPPORTUNITY = 'opportunity', 'Opportunity'
        CUSTOMER = 'customer', 'Customer'

    class Language(models.TextChoices):
        ENGLISH = 'en', 'English'
        SPANISH = 'es', 'Español'

    # Override id to use UUID
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Remove username, use email as identifier
    username = None
    email = models.EmailField('email address', unique=True)

    # Business fields
    company = models.CharField(max_length=255, blank=True)
    company_size = models.CharField(
        max_length=50,
        choices=CompanySize.choices,
        blank=True
    )
    industry = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    job_title = models.CharField(max_length=100, blank=True)

    # Compliance & Terms
    accepted_terms = models.BooleanField(default=False)
    accepted_terms_date = models.DateTimeField(null=True, blank=True)
    accepted_privacy = models.BooleanField(default=False)
    accepted_privacy_date = models.DateTimeField(null=True, blank=True)
    marketing_consent = models.BooleanField(default=False)
    marketing_consent_date = models.DateTimeField(null=True, blank=True)

    # Preferences
    preferred_language = models.CharField(
        max_length=2,
        choices=Language.choices,
        default=Language.SPANISH
    )

    # Lead scoring
    lead_score = models.IntegerField(default=0)
    lead_status = models.CharField(
        max_length=20,
        choices=LeadStatus.choices,
        default=LeadStatus.NEW
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # Update consent timestamps
        if self.accepted_terms and not self.accepted_terms_date:
            self.accepted_terms_date = timezone.now()
        if self.accepted_privacy and not self.accepted_privacy_date:
            self.accepted_privacy_date = timezone.now()
        if self.marketing_consent and not self.marketing_consent_date:
            self.marketing_consent_date = timezone.now()
        super().save(*args, **kwargs)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email

    def calculate_lead_score(self):
        """Calculate lead score based on various factors"""
        score = 0

        # Company size scoring
        size_scores = {
            self.CompanySize.STARTUP: 3,
            self.CompanySize.PYME: 5,
            self.CompanySize.MIDMARKET: 8,
            self.CompanySize.ENTERPRISE: 10,
        }
        if self.company_size:
            score += size_scores.get(self.company_size, 0)

        # Industry scoring (high-value industries)
        high_value_industries = ['finance', 'legal', 'accounting', 'healthcare']
        if self.industry and self.industry.lower() in high_value_industries:
            score += 5

        # Completeness scoring
        if self.company:
            score += 2
        if self.phone:
            score += 2
        if self.job_title:
            score += 2

        return score
