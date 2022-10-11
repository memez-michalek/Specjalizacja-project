from rest_framework import serializers


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(view_name="api:user-detail", lookup_field="id", read_only=True)
    post = serializers.HyperlinkedRelatedField(view_name="api:post-detail", read_only=True)

    class Meta:
        fields = ['user', 'post', 'text']
