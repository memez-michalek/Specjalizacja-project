from rest_framework import serializers

from specjalizacja.posts.models import Post
from specjalizacja.users.models import User

from .models import Comment


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="api:user-detail",
        lookup_field="id",
        queryset=User.objects.all()
        )
    post = serializers.HyperlinkedRelatedField(
        view_name="api:post-detail",
        queryset=Post.objects.all()
        )

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'created']
