# coding: utf-8
from django.shortcuts import render
from django.utils.html import escape
from django.contrib.auth.decorators import login_required


def home(request, username):

    if request.user.is_authenticated:
        return render(request, 'core/home.html')
    else:
        return render(request, 'core/cover.html')


def cover(request):
    return render(request, 'core/cover.html')
