from rest_framework import serializers
from .models import Coretext


class CoretextSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Coretext
        fields = (
             'head', 'content', 'content_type', 'child'
        )
        
