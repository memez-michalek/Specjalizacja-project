from rest_framework import serializers

from specjalizacja.communities.models import Community

'''from specjalizacja.posts.models import Post
from specjalizacja.users.models import User
'''


class SearchSerializer(serializers.Serializer):
    community_id = serializers.UUIDField()
    community_name = serializers.CharField()
    community_bio = serializers.CharField()
    community_background_image = serializers.UUIDField()
    community_created = serializers.DateTimeField()
    community_owner = serializers.UUIDField()

    def to_respresentation(self, instance):
        if isinstance(instance, Community):
            return {
                'id': instance.id,
                'name': instance.name,
                'bio': instance.bio,
                'background_image': instance.background_image,
                'created': instance.created,
                'owner': instance.owner,
            }
