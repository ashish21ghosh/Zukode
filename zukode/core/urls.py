from django.urls import path
from django.conf import settings
from django.contrib.auth import logout
from . import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('', views.home, name='home_page'),
    path('<int:pk>', views.home, name='text_page'),
]
