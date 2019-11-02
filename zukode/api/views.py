from django.http import Http404
from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import CoretextSerializer
from .models import Coretext
import json


class CoreTextList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    serializer_class = CoretextSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk, user_id):
        try:
            return Coretext.objects.get(pk=pk, user_id=user_id)
        except Coretext.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        coretext_list = Coretext.objects.filter(user_id=self.request.user).order_by('created_at')
        data = {obj.id: model_to_dict(obj) for obj in coretext_list}
        return Response({"data": data})

    def post(self, request, format=None):
        data = request.data
        user_id = request.user
        content_type = data['content_type']

        if 'parent' not in data:
            parent_id = None
        else:
            parent_id = data['parent']

        if 'child' not in data:
            child_id = None
        else:
            child_id = data['child']

        if not child_id:
            child_id = None

        parent_obj = None

        if parent_id is not None:
            parent_obj = self.get_object(data['parent'], user_id)

        serializer = CoretextSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user_id=user_id)
            data_id = serializer.data['id']

            if parent_obj:
                parent_child_id = parent_obj.child
                parent_obj.child = data_id
                parent_obj.save()
                if parent_child_id:
                    curr_obj = self.get_object(data_id, user_id)
                    curr_obj.child = parent_child_id
                    curr_obj.save()

                    child_obj = self.get_object(parent_child_id, user_id)
                    child_obj.parent = data_id
                    child_obj.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoreTextDetail(APIView):
    """This class defines the create behavior of our rest api."""
    serializer_class = CoretextSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk, user_id):
        try:
            return Coretext.objects.get(pk=pk, user_id=user_id)
        except Coretext.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        serializer = CoretextSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        serializer = CoretextSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def title_list(request):
    queryset = Coretext.objects.filter(user_id=request.user, parent=None).values()
    return Response(queryset)
