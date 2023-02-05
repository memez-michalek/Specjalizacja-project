import uuid

from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from specjalizacja.images.models import Image
from specjalizacja.users.models import User


class Community(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(_("community name"), max_length=128, blank=False)
    bio = models.CharField(_("community bio"), max_length=1024, blank=True, null=True)
    background_image = models.ForeignKey(Image, related_name="community_image", on_delete=models.CASCADE)
    created = models.DateTimeField(editable=False, blank=True, null=True)
    owner = models.ForeignKey(User, related_name="community_owner", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('api:community-detail', kwargs={'id': self.id})
