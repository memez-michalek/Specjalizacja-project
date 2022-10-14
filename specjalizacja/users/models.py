import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import (
    CharField,
    ImageField,
    ManyToManyField,
    TextField,
    UUIDField,
)
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Default custom user model for Specjalizacja.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    #: First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    quote = TextField(_("Users bio"), blank=True)
    profile_picture = ImageField(
        _("Profile picture"), blank=True, upload_to="profile_pictures/"
    )
    friends = ManyToManyField("User", blank=True)

    first_name = None  # type: ignore
    last_name = None  # type: ignore

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.


        #return reverse("users:detail", kwargs={"username": self.username})
        """
        return reverse("api:user-detail", kwargs={"id": self.id})


class Friend(models.Model):
    from_user = models.ForeignKey(User, related_name="from_user", on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name="to_user", on_delete=models.CASCADE)

    def get_absolute_url(self):
        return reverse("api:friend-detail", kwargs={"id": self.id})

    def validate_unique(self):
        if Friend.objects.filter("from_user" == self.from_user) and \
           Friend.objects.filter("to_user" == self.to_user) or \
           Friend.objects.filter("to_user" == self.from_user) and Friend.objects.filter("from_user" == self.to_user):

            print("testing")

    def save(self, *args, **kwargs):
        super().validate_unique()
        super().save(*args, **kwargs)
