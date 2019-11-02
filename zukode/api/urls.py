from django.urls import path, include
from django.conf import settings
import rest_framework
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CoreTextList, CoreTextDetail, title_list
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('coretext', CoreTextList.as_view(), name='create_text'),
    path('coretext/<int:pk>', CoreTextDetail.as_view()),
    path('heads', title_list, name='heads'),
    path('auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
