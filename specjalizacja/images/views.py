# from django.shortcuts import render
from rest_framework import mixins, status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Image
from .serializers import ImageDetailSerializer


# Create your views here.
class ImageDetailViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):

    permission = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageDetailSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request):
        print(request.user)
        images = request.FILES.getlist('image')
        photos = []
        for img in images:
            photo = Image.objects.create(image=img)
            photos.append(photo)

        return Response(self.serializer_class(photos, many=True).data, status=status.HTTP_201_CREATED)
