from rest_framework import serializers
from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members"""
    
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'title_tr', 'title_en', 'specialty_tr', 
            'specialty_en', 'bio_tr', 'bio_en', 'photo', 'order'
        ]




