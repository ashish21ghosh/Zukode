from django.db import models
from django.conf import settings


class Coretext(models.Model):
    TEXT = u'text'
    IMAGE = u'image'
    VIDEO = u'video'
    HEAD = u'head'

    CONTENT_TYPES = (
        (TEXT, u'Text'),
        (IMAGE, u'Image'),
        (VIDEO, u'Video'),
        (HEAD, u'Head'),
        )

    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    head = models.CharField(max_length=255)
    content_type = models.CharField(max_length=5, choices=CONTENT_TYPES)
    content = models.TextField(null=True, blank=True)
    child = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.content)
