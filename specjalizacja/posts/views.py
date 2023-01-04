# from django.shortcuts import render
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from specjalizacja.communities.models import Community
from specjalizacja.users.models import User
from specjalizacja.utils.permissions import IsOwnerOrReadOnly

from .models import Post
from .serializers import PostSerializer


class PostViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def create(self, request, *args, **kwargs):
        user = User.objects.get(
            username=request.data.get('user')
            )
        community = Community.objects.get(
            id=request.data.get('community')
            )
        images = request.data.get('images')

        try:
            post = Post.objects.create(
                title=request.data.get('title'),
                description=request.data.get('description'),
                user=user, community=community)
            print(post.user.username)
            post.images.add(images)
            print(post)
            return Response(status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(data=e, status=status.HTTP_400_BAD_REQUEST)
