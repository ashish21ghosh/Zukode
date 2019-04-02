from django.shortcuts import render
from rest_framework import generics

from .serializers import CoretextSerializer
from .models import Coretext


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Coretext.objects.all()
    serializer_class = CoretextSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save()
