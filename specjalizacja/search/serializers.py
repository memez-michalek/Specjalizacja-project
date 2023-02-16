from rest_framework import serializers

from specjalizacja.communities.models import Community
from specjalizacja.communities.serializers import CommunitySerializer
from specjalizacja.posts.models import Post
from specjalizacja.posts.serializers import PostSerializer
from specjalizacja.users.api.serializers import UserSerializer
from specjalizacja.users.models import User


class SearchSerializer(serializers.Serializer):
    def to_representation(self, instance):
        data = {}
        if isinstance(instance, Community):
            data.update(CommunitySerializer(instance, context=self.context).data)
            data['type'] = 'community'
        elif isinstance(instance, User):
            data.update(UserSerializer(instance, context=self.context).data)
            data['type'] = 'user'
        elif isinstance(instance, Post):
            data.update(PostSerializer(instance, context=self.context).data)
            data['type'] = 'post'

        return data
