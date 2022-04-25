from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from .forms import LoginForm, SignUpForm
import json
from .models import CustomUser
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        firstName = data.get('firstName', "Anonim")
        lastName = data.get('lastName', "Anonim")
        email = data['email']
        password = data['password']
        # TODO: check if already existed
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            firstName=firstName,
            lastName=lastName
        )
        if user is not None:
            data = {'success': True}
            user['firstName'] = firstName
            user['lastName'] = lastName
            user.save()
        else:
            data = {'success': False, 'error': 'User already exist'}
        return JsonResponse(data)
        # return HttpResponse('This combination of username and password is not valid')

    elif request.method == 'GET':
        form = SignUpForm(request.POST)
        return render(request, 'register.html', {'form': form})


# temporary frontpage as the default one doesn't work
def frontpage_view(request):
    return HttpResponse('''
    /admin admin@admin.com:admin <br>
    /login test@test.com:TestPass123 <br>
    /register new user''')

@csrf_exempt
def login_view(request):
    form = None
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['email']
        password = data['password']
        print(f'{username} : {password}')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            data = {'success': True}
            print('Login successful')
        else:
            print('Login failed')
            data = {'success': False, 'error': 'Username and password combination incorrect'}
        return JsonResponse(data)

    # TODO: Remove later
    elif request.method == 'GET':
        form = LoginForm()
        return render(request, 'login.html', {'form': form})


# TODO: Remove later
def loggedin_view(request):
    return render(request, 'logged_in.html')


def logout_view(request):
    print('Loging out')
    logout(request)
    return JsonResponse({'success': True})
