from rest_framework import serializers
from .models import Coretext, Directory


class CoretextSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Coretext
        fields = (
             'id', 'head', 'content', 'content_type', 'child', 'parent'
        )


class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Directory
        fields = (
            'id', 'content', 'level', 'child', 'parent'
        )
