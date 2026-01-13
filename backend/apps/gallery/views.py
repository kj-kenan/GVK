from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ClinicGallery
from .serializers import ClinicGallerySerializer


class ClinicGalleryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for clinic gallery
    Returns all gallery images ordered by category and order
    """
    permission_classes = [AllowAny]
    queryset = ClinicGallery.objects.all()
    serializer_class = ClinicGallerySerializer
    pagination_class = None  # No pagination for gallery
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by category if provided
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category_tr=category)
        
        return queryset




