from rest_framework import serializers
from .models import ClinicGallery


class ClinicGallerySerializer(serializers.ModelSerializer):
    """Serializer for clinic gallery images"""
    
    class Meta:
        model = ClinicGallery
        fields = ['id', 'title_tr', 'title_en', 'image', 'category_tr', 'category_en', 'order']




