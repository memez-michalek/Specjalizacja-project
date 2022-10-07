# from django.db import models
# from django.urls import reverse
# from django.utils import timezone
# from django.utils.translation import gettext_lazy as _

# from specjalizacja.communities.models import Community
# from specjalizacja.images.models import Image
# from specjalizacja.users.models import User

"""
class Post(models.Model):
    title = models.CharField(_('post title'), max_length=255)
    description = models.TextField(_('post description'), max_length=1024, blank=True, null=True)
    images = models.ForeignKey(Image, related_name='post-images', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='post-user', on_delete=models.CASCADE)
    pub_date = models.DateTimeField(_('post publication date'), modify=False)
    community = models.ManyToManyField(Community, related_name='post-community')

    def __str__(self):
        return self.title

    def __save__(self, *args, **kwargs):
        if not self.id:
            self.pub_date = timezone.now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('post-details', kwargs={'id', self.id})
"""
