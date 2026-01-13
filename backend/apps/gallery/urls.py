from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClinicGalleryViewSet

router = DefaultRouter()
router.register(r'gallery', ClinicGalleryViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),
]




