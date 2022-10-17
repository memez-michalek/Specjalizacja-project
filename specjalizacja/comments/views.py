from rest_framework import viewsets

from specjalizacja.utils.permissions import IsOwnerOrReadOnly

from .models import Comment
from .serializers import CommentSerializer


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
