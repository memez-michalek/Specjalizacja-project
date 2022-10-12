import uuid

from django.db import models
from django.urls import reverse
from django.utils import timezone
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(editable=False, blank=True, null=True)
    community = models.ForeignKey(Community, null=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.title:
            self.created = timezone.now()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("api:post-detail", kwargs={"id", self.id})
