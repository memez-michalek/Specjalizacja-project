from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from specjalizacja.images.models import Image

from .models import Community
from .serializers import CommunitySerializer


class CommunityViewset(viewsets.ModelViewSet):
    serializer_class = CommunitySerializer
    queryset = Community.objects.all()
    permissions = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        background_image_id = request.data.get('background_image')
        print(background_image_id)
        background_image = Image.objects.get(id=background_image_id)
        name = request.data.get('name')
        bio = request.data.get('bio')
        owner = request.user

        try:
            Community.objects.create(name=name, bio=bio, owner=owner, background_image=background_image)
            return Response({"Success": "Community created"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"Error": e}, status=status.HTTP_400_BAD_REQUEST)
