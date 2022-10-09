import uuid

from django.contrib.auth.models import AbstractUser
from django.db.models import CharField, ImageField, TextField, UUIDField
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
    first_name = None  # type: ignore
    last_name = None  # type: ignore

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})
