import uuid

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from specjalizacja.communities.models import Community
# from specjalizacja.communities.models import Community
from specjalizacja.images.models import Image
from specjalizacja.users.models import User


class Post(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    title = models.CharField(_("post title"), max_length=255)
    description = models.TextField(
        _("post description"), max_length=1024, blank=True, null=True
    )
    images = models.ManyToManyField(Image, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    created = models.DateTimeField(auto_now_add=True)
    community = models.ForeignKey(Community, null=True, on_delete=models.CASCADE, related_name="community")

    '''def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        # This code only happens if the objects is
        # not in the database yet. Otherwise it would
        # have pk
        super(Post, self).save(*args, **kwargs)
    '''
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("api:post-detail", kwargs={"id", self.id})
