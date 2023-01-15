from django.contrib.auth import get_user_model
from rest_framework import serializers

from specjalizacja.users.models import Friend

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    friends = serializers.HyperlinkedRelatedField(
        view_name="api:user-detail",
        queryset=User.objects.all(),
        lookup_field="id",
        many=True,
        )

    class Meta:
        model = User
        fields = ["id", "username", "name", "url", "profile_picture", "friends"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "id"}
        }


class FriendSerializer(serializers.HyperlinkedModelSerializer):
    to_user = serializers.HyperlinkedRelatedField(
        queryset=Friend.objects.all(),
        view_name="api:user-detail",
        many=False,
        lookup_field="id"
        )
    from_user = serializers.HyperlinkedRelatedField(
        queryset=Friend.objects.all(),
        view_name="api:user-detail",
        many=False,
        lookup_field="id"
        )

    class Meta:
        model = Friend
        fields = ["id", "to_user", "from_user"]
