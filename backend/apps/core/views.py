from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


class SiteSettingsView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve public site settings
    Returns the singleton SiteSettings instance
    """
    permission_classes = [AllowAny]
    serializer_class = SiteSettingsSerializer
    
    def get_object(self):
        return SiteSettings.load()




