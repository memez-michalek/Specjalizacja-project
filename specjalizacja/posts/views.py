# from django.shortcuts import render

from rest_framework import filters, mixins, status, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from specjalizacja.communities.models import Community
from specjalizacja.images.models import Image
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
    ordering_fields = ['created']
    filter_backends = [filters.OrderingFilter]

    def create(self, request, *args, **kwargs):
        user = User.objects.get(
            username=request.data.get('user')
            )
        community = Community.objects.get(
            id=request.data.get('community')
            )
        image_ids = request.data.getlist('images')
        images = Image.objects.filter(id__in=image_ids)
        print(image_ids)
        print(images)
        try:
            print(image_ids)
            print(images)
            post = Post.objects.create(
                title=request.data.get('title'),
                description=request.data.get('description'),
                user=user, community=community)
            post.images.set(images)
            return Response({"Success": "Post added successfully"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(data=e, status=status.HTTP_400_BAD_REQUEST)
