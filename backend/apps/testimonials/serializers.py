from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    """Serializer for approved testimonials (public view)"""
    
    class Meta:
        model = Testimonial
        fields = ['id', 'pet_photo', 'owner_name', 'pet_name', 'description', 'approved_at']


class TestimonialSubmitSerializer(serializers.ModelSerializer):
    """Serializer for testimonial submission"""
    
    class Meta:
        model = Testimonial
        fields = ['pet_photo', 'owner_name', 'pet_name', 'description', 'email']
    
    def create(self, validated_data):
        testimonial = Testimonial.objects.create(**validated_data)
        # Send notification email to admin
        testimonial.send_notification_email()
        return testimonial




