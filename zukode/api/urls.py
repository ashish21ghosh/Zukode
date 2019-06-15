from django.urls import path, include
from django.conf import settings
import rest_framework
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateView, title_list, delete_entry
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('coretext', CreateView.as_view(), name='create_text'),
    path('heads', title_list, name='heads'),
    path('auth/', include('rest_framework.urls')),
    path('delete_entry/<int:pk>', delete_entry)
]

urlpatterns = format_suffix_patterns(urlpatterns)
