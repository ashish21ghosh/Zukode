from django.urls import path
from django.conf import settings
from django.contrib.auth.views import logout
from . import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    path('<str:username>', views.home, name='home_page'),
    path('<str:username>/<int:pk>', views.home, name='text_page'),
]
