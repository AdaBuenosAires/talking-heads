"""
Content Admin Configuration
"""

from django.contrib import admin
from .models import Page, FAQ, Testimonial


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('slug', 'title_en', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('title_en', 'title_es')

    fieldsets = (
        ('Settings', {
            'fields': ('slug', 'is_active')
        }),
        ('English Content', {
            'fields': ('title_en', 'content_en')
        }),
        ('Spanish Content', {
            'fields': ('title_es', 'content_es')
        }),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question_en', 'category', 'order', 'is_active')
    list_filter = ('category', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('question_en', 'question_es', 'answer_en', 'answer_es')

    fieldsets = (
        ('Settings', {
            'fields': ('category', 'order', 'is_active')
        }),
        ('English Content', {
            'fields': ('question_en', 'answer_en')
        }),
        ('Spanish Content', {
            'fields': ('question_es', 'answer_es')
        }),
    )


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'rating', 'is_featured', 'is_active')
    list_filter = ('is_featured', 'is_active', 'rating')
    list_editable = ('is_featured', 'is_active')
    search_fields = ('name', 'company')

    fieldsets = (
        ('Person', {
            'fields': ('name', 'company', 'position', 'image')
        }),
        ('Content', {
            'fields': ('quote_en', 'quote_es', 'rating')
        }),
        ('Settings', {
            'fields': ('is_featured', 'is_active')
        }),
    )
