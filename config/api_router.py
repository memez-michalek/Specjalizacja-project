from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from specjalizacja.images.views import ImageDetailViewset
from specjalizacja.posts.views import PostViewset
from specjalizacja.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("images", ImageDetailViewset)
router.register("posts", PostViewset)

app_name = "api"
urlpatterns = router.urls
