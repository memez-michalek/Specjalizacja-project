from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Community
from .serializers import CommunitySerializer


class CommunityViewset(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    permissions = [IsAuthenticated]
