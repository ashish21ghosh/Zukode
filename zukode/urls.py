"""zukode URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from zukode.authentication import views as auth_view
from zukode.core import views as core_view

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', auth_view.signup, name='signup'),
    path('signin/', auth_view.signin, name='signin'),
    path('', core_view.home, name='home'),
    path('api/', include('zukode.api.urls')),
]