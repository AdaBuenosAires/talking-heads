"""
URL Configuration for Bizzer Website
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Djoser authentication
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),

    # App URLs
    path('api/users/', include('apps.users.urls')),
    path('api/leads/', include('apps.leads.urls')),
    path('api/wizard/', include('apps.wizard.urls')),
    path('api/content/', include('apps.content.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
