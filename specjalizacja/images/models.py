import uuid
from io import BytesIO

from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from PIL import Image as Img

# Create your models here.


class Image(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    image = models.ImageField(_("image"), blank=True, upload_to="images/")
    is_default = models.BooleanField(_("is_default"), default=False)

    def get_absolute_url(self):
        return reverse("api:image-detail", kwargs={"id": self.id})

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        image = Img.open(self.image)
        image.resize((300, 300), Img.ANTIALIAS)
        print(dir(self.image))
        print(dir(image))

        image_binary = BytesIO()
        image.save(image_binary, format="JPEG", optimize=True, quality=70)
        image_binary.seek(0)
        self.image.save(self.image.name, image_binary, save=False)

        super().save(*args, **kwargs)
