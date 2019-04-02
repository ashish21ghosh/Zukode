from rest_framework import serializers
from .models import Coretext


class CoretextSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Coretext
        fields = (
            'id', 'user_id', 'head', 'content', 'content_type', 'child',
            'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')
