from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    images = serializers.HyperlinkedRelatedField(view_name="api:image-detail", many=False, read_only=True)
    user = serializers.HyperlinkedRelatedField(view_name="api:user-detail", read_only=True, lookup_field="id")

    class Meta:
        model = Post
        fields = ["id", "title", "description", "images", "user"]
