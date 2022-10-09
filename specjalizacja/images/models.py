import uuid

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Image(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    image = models.ImageField(_("image"), blank=True, upload_to="images/")

    def get_absolute_url(self):
        return reverse("images:image_detail", kwargs={"id": self.id})

    def __str__(self):
        return str(self.id)
