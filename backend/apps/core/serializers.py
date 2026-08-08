from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer for public site settings"""
    
    class Meta:
        model = SiteSettings
        fields = [
            'address_tr', 'address_en', 'phone', 'mobile', 'email',
            'working_hours_weekday_tr', 'working_hours_weekday_en',
            'working_hours_weekend_tr', 'working_hours_weekend_en',
            'google_maps_embed_url', 'facebook_url', 'instagram_url', 'twitter_url'
        ]
        # Exclude admin_email for security




