from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import CoretextSerializer
from .models import Coretext


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Coretext.objects.all()
    serializer_class = CoretextSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save(user_id=self.request.user)


@api_view(['GET'])
def TitleList(request):
    queryset = Coretext.objects.values('head').distinct()
    # serializer = HeadsSerializer(queryset, many=True)
    return Response(queryset)
