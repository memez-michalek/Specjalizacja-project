from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from specjalizacja.comments.views import CommentViewset
from specjalizacja.communities.views import CommunityViewset
from specjalizacja.images.views import ImageDetailViewset
from specjalizacja.posts.views import PostViewset
from specjalizacja.search.views import SearchViewset
from specjalizacja.users.api.views import FriendViewset, UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("images", ImageDetailViewset)
router.register("posts", PostViewset)
router.register("comments", CommentViewset)
router.register("community", CommunityViewset)
router.register("friend", FriendViewset)
router.register("search", SearchViewset, basename="Search")

app_name = "api"
urlpatterns = router.urls
