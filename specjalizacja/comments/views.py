from rest_framework import status, viewsets
from rest_framework.response import Response

from specjalizacja.posts.models import Post
from specjalizacja.users.models import User
from specjalizacja.utils.permissions import IsOwnerOrReadOnly

from .models import Comment
from .serializers import CommentSerializer


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsOwnerOrReadOnly]

    def create(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data.get('user'))
        post = Post.objects.get(id=request.data.get('post'))
        comment_text = request.data.get('text')

        try:
            Comment.objects.create(
                user=user,
                post=post,
                text=comment_text
            )
            return Response({"Success": "Comment Created"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data=e, status=status.HTTP_400_BAD_REQUEST)
