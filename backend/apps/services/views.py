from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services
    - List: Returns all active services with basic info
    - Detail: Returns complete service data with gallery images
    Cached for 15 minutes to improve performance
    """
    permission_classes = [AllowAny]
    queryset = Service.objects.filter(is_active=True).prefetch_related('images')
    
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceDetailSerializer




