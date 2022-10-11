from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Comment
from .serializers import CommentSerializer


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permissions = [IsAuthenticated]
