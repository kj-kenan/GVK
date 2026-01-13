from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for team members
    Returns all active team members ordered by their order field
    """
    permission_classes = [AllowAny]
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer




