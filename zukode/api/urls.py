from django.urls import path, include
from django.conf import settings
import rest_framework
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    CoreTextList, CoreTextDetail, fileView, DirectoryList, DirectoryDetail,
    FileView, fileDirectoryView)
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('coretext', CoreTextList.as_view(), name='create_text'),
    path('coretext/<int:pk>', CoreTextDetail.as_view()),
    path('auth/', include('rest_framework.urls')),
    path('corehead', DirectoryList.as_view(), name='create_head'),
    path('corehead/<int:pk>', DirectoryDetail.as_view(), name='put_head'),
    path('upload', FileView.as_view(), name='file_upload'),
    path('upload/<int:pk>', fileView, name='file_serve'),
    path('files/<int:dir_id>', fileDirectoryView, name='file_list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
