from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from specjalizacja.communities.models import Community
from specjalizacja.posts.models import Post
from specjalizacja.users.models import User
from specjalizacja.utils.permissions import IsOwnerOrReadOnly

from .serializers import SearchSerializer


class SearchViewset(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    serializer_class = SearchSerializer
    permission_classes = [IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly]

    def get_queryset(self):

        post = self.request.query_params.get('post')
        if post is not None:
            return Post.objects.filter(title=post)
        user = self.request.query_params.get('user')

        if user is not None:
            return User.objects.filter(username=user)
        else:
            community = self.request.query_params.get('community')
            return Community.objects.filter(name=community)

    def list(self, request):
        print(self.get_queryset())
        queryset = self.get_queryset()
        serialized = self.serializer_class(queryset, many=True, context={'request': request}).data

        return Response(serialized)


# Create your views here.
