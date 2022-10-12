from rest_framework import serializers

from specjalizacja.images.models import Image
from specjalizacja.users.models import User

from .models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    images = serializers.HyperlinkedRelatedField(
        view_name="api:image-detail",
        many=True,
        queryset=Image.objects.all()
        )
    user = serializers.HyperlinkedRelatedField(
        view_name="api:user-detail",
        queryset=User.objects.all(),
        lookup_field="id"
        )

    class Meta:
        model = Post
        fields = ["id", "title", "description", "images", "user", "created"]
