from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for contact form submission"""
    
    class Meta:
        model = ContactMessage
        fields = ['full_name', 'email', 'phone', 'message']
    
    def create(self, validated_data):
        message = ContactMessage.objects.create(**validated_data)
        # Send notification email to admin
        message.send_notification_email()
        return message




