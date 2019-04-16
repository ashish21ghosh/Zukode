from django.urls import path, include
from django.conf import settings
import rest_framework
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, TitleList
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('coretext', CreateView.as_view(), name='create_text'),
    path('heads', TitleList, name='heads'),
    path('auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
