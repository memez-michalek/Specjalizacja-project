from rest_framework import serializers

from specjalizacja.images.models import Image
from specjalizacja.posts.serializers import PostSerializer
from specjalizacja.users.models import User

from .models import Community


class CommunitySerializer(serializers.HyperlinkedModelSerializer):
    background_image = serializers.HyperlinkedRelatedField(
        view_name="api:image-detail",
        queryset=Image.objects.all()
        )
    community = PostSerializer(many=True)
    owner = serializers.HyperlinkedRelatedField(
        view_name="api:user-detail",
        lookup_field="id",
        queryset=User.objects.all()
        )

    class Meta:
        model = Community
        fields = [
            'id',
            'name',
            'bio',
            'owner',
            'background_image',
            'created',
            'community'
            ]
