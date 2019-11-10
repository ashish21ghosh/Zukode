from django.http import Http404
from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import CoretextSerializer, DirectorySerializer
from .models import Coretext, Directory
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
        coretext_list = Coretext.objects.filter(user_id=self.request.user)
        corehead_list = Directory.objects.filter(user_id=self.request.user)
        data_dict = {obj.id: model_to_dict(obj) for obj in coretext_list}
        data = {}

        for idx, elem in data_dict.items():
            if not elem["head"] in data:
                data[elem["head"]] = {
                    "head": None,
                    "data": {},
                }
            if elem["parent"] is None:
                data[elem["head"]]["head"] = idx
            data[elem["head"]]["data"][idx] = elem

        head = {obj.id: model_to_dict(obj) for obj in corehead_list}
        return Response({
            "data": data,
            "head": head, })

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
        
        if not parent_id:
            parent_id = None

        parent_obj = None
        # import pdb; pdb.set_trace()
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


class DirectoryList(APIView):
    serializer_class = DirectorySerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk, user_id):
        try:
            return Directory.objects.get(pk=pk, user_id=user_id)
        except Directory.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        directory_list = Directory.objects.filter(user_id=self.request.user)
        data_dict = {obj.id: model_to_dict(obj) for obj in directory_list}
        head = []
        data = data_dict

        for idx, elem in data_dict.items():
            if elem["level"] == 0:
                head.append(elem['id'])

        return Response({
            "data": data,
            "head": head, })

    def post(self, request, format=None):
        data = request.data
        user_id = request.user

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
        # import pdb; pdb.set_trace()
        if parent_id is not None:
            parent_obj = self.get_object(parent_id, user_id)

        serializer = DirectorySerializer(data=data)
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


class DirectoryDetail(APIView):
    serializer_class = DirectorySerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk, user_id):
        try:
            return Directory.objects.get(pk=pk, user_id=user_id)
        except Directory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        serializer = DirectorySerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        serializer = DirectorySerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk, self.request.user)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)