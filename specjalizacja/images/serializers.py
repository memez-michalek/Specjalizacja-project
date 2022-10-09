from rest_framework import serializers

from .models import Image


class ImageDetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "image"]
