from rest_framework import serializers

from specjalizacja.images.models import Image
from specjalizacja.posts.serializers import PostSerializer

from .models import Community


class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    background_image = serializers.HyperlinkedRelatedField(view_name="api:image-detail", queryset=Image.objects.all())
    community = PostSerializer(many=True)

    class Meta:
        model = Community
        fields = ['id', 'name', 'bio', 'background_image', 'created', 'community']
