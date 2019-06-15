from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import CoretextSerializer
from .models import Coretext


class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Coretext.objects.filter(user_id=1).order_by('created_at')
    serializer_class = CoretextSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Save the post data when creating a new bucketlist."""
        serializer.save(user_id=self.request.user)


@api_view(['GET'])
def title_list(request):
    queryset = Coretext.objects.filter(user_id=request.user).values('head').distinct()
    # serializer = HeadsSerializer(queryset, many=True)
    return Response(queryset)


@api_view(['GET', 'DELETE'])
def delete_entry(request, pk):
    try:
        entry = Coretext.objects.get(pk=pk, user_id=request.user)
    except Coretext.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serialize = CoretextSerializer(entry)
        return Response(serialize.data)
    elif request.method == 'DELETE':
        entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
