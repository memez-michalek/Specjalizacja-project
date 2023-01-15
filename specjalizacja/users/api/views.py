from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from specjalizacja.users.models import Friend

from .serializers import FriendSerializer, UserSerializer

User = get_user_model()


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "id"
    '''def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, uuid.UUID)
        return self.queryset.filter(id=self.request.user.id)
    '''
    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})

        return Response(status=status.HTTP_200_OK, data=serializer.data)


class FriendViewset(RetrieveModelMixin,
                    ListModelMixin,
                    UpdateModelMixin,
                    CreateModelMixin,
                    DestroyModelMixin,
                    GenericViewSet):

    serializer_class = FriendSerializer
    queryset = Friend.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        from_username = request.data.get('from_user')
        to_id = request.data.get('to_user')

        from_user = User.objects.get(username=from_username)
        to_user = User.objects.get(id=to_id)

        Friend.objects.create(
            from_user=from_user,
            to_user=to_user,
        )
        from_user.friends.add(to_user)
        to_user.friends.add(from_user)

        return Response({'success': True}, status=status.HTTP_201_CREATED)
