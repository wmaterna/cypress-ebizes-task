from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json
from json import JSONDecodeError
import datetime

from .models import CustomUser, Visit
from .forms import LoginForm, SignUpForm


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


@csrf_exempt
def add_visits_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            date_from = [int(x) for x in data['dateFrom'].split('-')]
            date_to = [int(x) for x in data['dateTo'].split('-')]
            time_from = [int(x) for x in data['timeFrom'].split(':')]
            time_to = [int(x) for x in data['timeTo'].split(':')]
            doctor_id = int(data['doctor'])
            visit_time = int(data['visitTime'])
            break_time = int(data['breakTime'])
            repeat = data['repeatEvery'].lower()
            if repeat == 'monday':
                repeat = 0
            elif repeat == 'tuesday':
                repeat = 1
            elif repeat == 'wednesday':
                repeat = 2
            elif repeat == 'thursday':
                repeat = 3
            elif repeat == 'friday':
                repeat = 4
            elif repeat == 'saturday':
                repeat = 5
            elif repeat == 'sunday':
                repeat = 6
            else:
                return JsonResponse({'success': False, 'error': 'Invalid weekday'})
        except JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})
        except KeyError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})

        start_date = datetime.date(date_from[0], date_from[1], date_from[2])
        end_date = datetime.date(date_to[0], date_to[1], date_to[2] + 1)
        date_range = end_date - start_date

        for i in range(date_range.days):
            date = start_date + datetime.timedelta(days=i)
            if date.weekday() != repeat:
                continue
            minutes = 0
            for hour in range(time_from[0], time_to[0]):
                while minutes < 60:
                    date_time = datetime.datetime(year=date.year, month=date.month, day=date.day,
                                                  hour=hour, minute=minutes)
                    try:
                        doctor = CustomUser.objects.get(id__exact=doctor_id)
                    except ObjectDoesNotExist:
                        return JsonResponse({'success': False, 'error': 'Wrong doctor id'})

                    visit = Visit.objects.create(date=date_time, doctor_id=doctor)
                    # TODO: check if that visit already exists?
                    visit.save()
                    minutes += visit_time + break_time
                minutes -= 60

        return JsonResponse({'success': True})
