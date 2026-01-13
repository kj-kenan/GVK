from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services
    - List: Returns all active services with basic info
    - Detail: Returns complete service data with gallery images
    """
    permission_classes = [AllowAny]
    queryset = Service.objects.filter(is_active=True).prefetch_related('images')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceDetailSerializer




