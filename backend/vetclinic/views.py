from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from .forms import LoginForm
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.


# temporary frontpage as the default one doesn't work
def frontpage_view(request):
    return HttpResponse('/admin admin:admin<br>/login test:TestPass123')


def login_view(request):
    form = None
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['email']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            data = {'success': True}
            # return redirect('members/')
        else:
            data = {'success': False, 'error': 'Username and password combination incorrect'}
        return JsonResponse(data)
        # return HttpResponse('This combination of username and password is not valid')

    elif request.method == 'GET':
        form = LoginForm()
        return render(request, 'login.html', {'form': form})


def loggedin_view(request):
    return render(request, 'logged_in.html')


def logout_view(request):
    logout(request)
    return redirect('/login')
