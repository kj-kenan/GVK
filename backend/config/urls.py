"""
URL configuration for Göstepe Veteriner Kliniği project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.services.urls')),
    path('api/', include('apps.team.urls')),
    path('api/', include('apps.blog.urls')),
    path('api/', include('apps.testimonials.urls')),
    path('api/', include('apps.gallery.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.core.urls')),
    path('api/', include('apps.reviews.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Customize admin site
admin.site.site_header = "Göztepe Veteriner Kliniği Yönetim Paneli"
admin.site.site_title = "Göztepe Veteriner Kliniği Admin"
admin.site.index_title = "Yönetim Paneli"


