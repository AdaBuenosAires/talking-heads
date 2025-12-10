"""
Content URLs for Bizzer Website
"""

from django.urls import path
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Page, FAQ, Testimonial


@api_view(['GET'])
@permission_classes([AllowAny])
def get_page(request, slug):
    """Get a page by slug"""
    try:
        page = Page.objects.get(slug=slug, is_active=True)
        language = request.query_params.get('lang', 'es')
        return Response({
            'title': page.get_title(language),
            'content': page.get_content(language),
            'updated_at': page.updated_at,
        })
    except Page.DoesNotExist:
        return Response(
            {'detail': 'Page not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def get_faqs(request):
    """Get all active FAQs"""
    language = request.query_params.get('lang', 'es')
    category = request.query_params.get('category')

    faqs = FAQ.objects.filter(is_active=True)
    if category:
        faqs = faqs.filter(category=category)

    return Response([
        {
            'id': str(faq.id),
            'question': faq.get_question(language),
            'answer': faq.get_answer(language),
            'category': faq.category,
        }
        for faq in faqs
    ])


@api_view(['GET'])
@permission_classes([AllowAny])
def get_testimonials(request):
    """Get all active testimonials"""
    language = request.query_params.get('lang', 'es')
    featured_only = request.query_params.get('featured', 'false').lower() == 'true'

    testimonials = Testimonial.objects.filter(is_active=True)
    if featured_only:
        testimonials = testimonials.filter(is_featured=True)

    return Response([
        {
            'id': str(t.id),
            'name': t.name,
            'company': t.company,
            'position': t.position,
            'quote': t.get_quote(language),
            'image': t.image.url if t.image else None,
            'rating': t.rating,
        }
        for t in testimonials
    ])


urlpatterns = [
    path('pages/<slug:slug>/', get_page, name='page-detail'),
    path('faqs/', get_faqs, name='faq-list'),
    path('testimonials/', get_testimonials, name='testimonial-list'),
]
