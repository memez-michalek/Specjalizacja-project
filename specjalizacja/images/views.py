# from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Image
from .serializers import ImageDetailSerializer


# Create your views here.
class ImageDetailViewset(
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):

    permission = [IsAuthenticated]
    queryset = Image.objects.all()
    serializer_class = ImageDetailSerializer
