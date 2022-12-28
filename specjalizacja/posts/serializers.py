from rest_framework import serializers

from specjalizacja.comments.models import Comment
from specjalizacja.communities.models import Community
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
    community = serializers.HyperlinkedRelatedField(
        view_name="api:community-detail",
        queryset=Community.objects.all(),
    )
    comments = serializers.HyperlinkedRelatedField(
        view_name="api:comment-detail",
        queryset=Comment.objects.all(),
        many=True,
    )

    class Meta:
        model = Post
        fields = ["id", "title", "description", "images", "user", "created", "community", "comments"]
