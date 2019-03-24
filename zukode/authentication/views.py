from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import password_reset, password_reset_confirm

def signup(request):
    return HttpResponse('Hello, World!')