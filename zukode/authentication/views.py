from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import password_reset, password_reset_confirm
from django.contrib import messages

from zukode.authentication.forms import SignUpForm


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if not form.is_valid():
            messages.add_message(request, messages.ERROR, 'There was some problems while creating your account. Please review some fields before submiting again.')
            return render(request, 'auth/signup.html', {'form': form })
        else:
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            User.objects.create_user(username=username, password=password, email=email)
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.add_message(request, messages.SUCCESS, 'Your account were successfully created.')
            return HttpResponseRedirect('/u/' + username + '/')
    else:
        return render(request, 'auth/signup.html', {'form': SignUpForm()})


def signin(request):
    print('requested')
    if request.user.is_authenticated:
        return HttpResponseRedirect('/u/' + request.user.username)
    else:
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            print('authenticating....')

            if user is not None:
                if user.is_active:
                    login(request, user)
                    if 'next' in request.GET:
                        return HttpResponseRedirect(request.GET['next'])
                    else:
                        return HttpResponseRedirect('/u/' + request.user.username)
                else:
                    messages.add_message(request, messages.ERROR, 'Your account is deactivated.')
                    return render(request, 'auth/signin.html')
            else:
                messages.add_message(request, messages.ERROR, 'Username or password invalid.')
                return render(request, 'auth/signin.html')
        else:
            return render(request, 'auth/signin.html')


def reset(request):
    pass
