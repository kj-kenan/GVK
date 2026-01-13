from rest_framework import serializers
from .models import Service, ServiceImage


class ServiceImageSerializer(serializers.ModelSerializer):
    """Serializer for service gallery images"""
    
    class Meta:
        model = ServiceImage
        fields = ['id', 'image', 'order']


class ServiceListSerializer(serializers.ModelSerializer):
    """Serializer for service list view (minimal data)"""
    
    class Meta:
        model = Service
        fields = ['id', 'title_tr', 'title_en', 'cover_image', 'order']


class ServiceDetailSerializer(serializers.ModelSerializer):
    """Serializer for service detail view (complete data)"""
    images = ServiceImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'title_tr', 'title_en', 'description_tr', 
            'description_en', 'cover_image', 'images', 'order'
        ]




