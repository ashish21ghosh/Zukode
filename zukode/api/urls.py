from django.urls import path
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('coretext/', CreateView.as_view(), name='create_text'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
