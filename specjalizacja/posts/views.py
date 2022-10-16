# from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from specjalizacja.utils.permissions import IsOwnerOrReadOnly

from .models import Post
from .serializers import PostSerializer


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permissions_class = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
