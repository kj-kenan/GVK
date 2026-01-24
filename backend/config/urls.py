"""
URL configuration for Göstepe Veteriner Kliniği project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# API v1 patterns
api_v1_patterns = [
    path('', include('apps.services.urls')),
    path('', include('apps.team.urls')),
    path('', include('apps.blog.urls')),
    path('', include('apps.testimonials.urls')),
    path('', include('apps.gallery.urls')),
    path('', include('apps.contact.urls')),
    path('', include('apps.core.urls')),
    path('', include('apps.reviews.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    # API v1 (versioned)
    path('api/v1/', include(api_v1_patterns)),
    # API (non-versioned, for backwards compatibility)
    path('api/', include(api_v1_patterns)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Customize admin site
admin.site.site_header = "Göztepe Veteriner Kliniği Yönetim Paneli"
admin.site.site_title = "Göztepe Veteriner Kliniği Admin"
admin.site.index_title = "Yönetim Paneli"


