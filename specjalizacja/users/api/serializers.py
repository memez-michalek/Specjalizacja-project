from django.contrib.auth import get_user_model
from rest_framework import serializers

from specjalizacja.users.models import Friend

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "name", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "id"}
        }


class FriendSerializer(serializers.HyperlinkedModelSerializer):
    to_user = serializers.HyperlinkedRelatedField(
        queryset=Friend.objects.all(),
        view_name="api:user-detail",
        many=False
        )
    from_user = serializers.HyperlinkedRelatedField(
        queryset=Friend.objects.all(),
        view_name="api:user-detail",
        many=False
        )

    class Meta:
        model = Friend
        fields = ["to_user", "from_user"]
