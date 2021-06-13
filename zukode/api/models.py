from django.db import models
from django.conf import settings
from django.db.models import JSONField
import os

def get_upload_path(instance, filename):
    return os.path.join(
      f"user_{instance.user.id}", instance.file_type, filename)

class Directory(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    child = models.IntegerField(null=True)
    parent = models.IntegerField(null=True)
    level = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.PositiveSmallIntegerField(default=1)


class Coretext(models.Model):
    TEXT = u'text'
    IMAGE = u'image'
    VIDEO = u'video'
    HEAD = u'head'
    MATH = u'math'
    CODE = u'code'
    MD = u'md'
    LINK = u'link'

    CONTENT_TYPES = (
        (TEXT, u'Text'),
        (IMAGE, u'Image'),
        (VIDEO, u'Video'),
        (HEAD, u'Head'),
        (MATH, u'Math'),
        (CODE, u'Code'),
        (MD, u'Md'),
        (LINK, u'Link'),
        )

    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    head = models.ForeignKey(Directory, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=5, choices=CONTENT_TYPES)
    content = models.TextField(null=True, blank=True)
    child = models.IntegerField(null=True)
    parent = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.content)

class File(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255, null=False)
    file_path = models.FileField(upload_to=get_upload_path)
    directory = models.ForeignKey(Directory, on_delete=models.CASCADE)
    file_type = models.CharField(max_length=30)
    mime_type = models.CharField(max_length=50)
    description = models.CharField(max_length=255, null=True)
    size = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.PositiveSmallIntegerField(default=1)

class Link(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    subtype = models.CharField(max_length=30)
    metadata = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return f"Link id: {self.id}"
