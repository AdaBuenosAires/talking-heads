"""
Content Models for Bizzer Website
"""

import uuid
from django.db import models


class Page(models.Model):
    """Static page content"""

    SLUG_CHOICES = [
        ('terms', 'Terms of Service'),
        ('privacy', 'Privacy Policy'),
        ('cookies', 'Cookie Policy'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.CharField(max_length=50, choices=SLUG_CHOICES, unique=True)
    title_en = models.CharField(max_length=255)
    title_es = models.CharField(max_length=255)
    content_en = models.TextField()
    content_es = models.TextField()
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'pages'
        verbose_name = 'Page'
        verbose_name_plural = 'Pages'

    def __str__(self):
        return self.title_en

    def get_title(self, language='es'):
        return self.title_es if language == 'es' else self.title_en

    def get_content(self, language='es'):
        return self.content_es if language == 'es' else self.content_en


class FAQ(models.Model):
    """Frequently Asked Questions"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_en = models.CharField(max_length=500)
    question_es = models.CharField(max_length=500)
    answer_en = models.TextField()
    answer_es = models.TextField()
    category = models.CharField(max_length=50, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'faqs'
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.question_en[:50]

    def get_question(self, language='es'):
        return self.question_es if language == 'es' else self.question_en

    def get_answer(self, language='es'):
        return self.answer_es if language == 'es' else self.answer_en


class Testimonial(models.Model):
    """Customer testimonials"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    quote_en = models.TextField()
    quote_es = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'testimonials'
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.company}"

    def get_quote(self, language='es'):
        return self.quote_es if language == 'es' else self.quote_en
