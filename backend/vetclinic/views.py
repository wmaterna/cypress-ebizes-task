from __future__ import annotations

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError

import json
from json import JSONDecodeError
import datetime
from datetime import date

from .models import CustomUser, Visit, Animal
from .forms import LoginForm


# Create your views here.


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            firstName = data.get('firstName', "Anonim")
            lastName = data.get('lastName', "Anonim")
            email = data['email']
            password = data['password']
        except JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})
        except KeyError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})

        try:
            user = CustomUser.objects.create_user(
                email=email,
                password=password,
                first_name=firstName,
                last_name=lastName
            )
            if user is not None:
                user.save()
                return JsonResponse({'success': True})
        except IntegrityError:
            print('Error: Email exist in database')
            return JsonResponse({'success': False, 'error': 'User already exist'}, status=500)


# temporary frontpage as the default one doesn't work
@csrf_exempt
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
@csrf_exempt
def loggedin_view(request):
    return render(request, 'logged_in.html')


@csrf_exempt
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
            doctor_id = request.user.id
            visit_time = int(data['visitTime'])
            break_time = int(data['breakTime'])

            repeat = data['repeatEvery']
            for i in range(len(repeat)):
                if repeat[i].lower() == 'monday':
                    repeat[i] = 0
                elif repeat[i].lower() == 'tuesday':
                    repeat[i] = 1
                elif repeat[i].lower() == 'wednesday':
                    repeat[i] = 2
                elif repeat[i].lower() == 'thursday':
                    repeat[i] = 3
                elif repeat[i].lower() == 'friday':
                    repeat[i] = 4
                elif repeat[i].lower() == 'saturday':
                    repeat[i] = 5
                elif repeat[i].lower() == 'sunday':
                    repeat[i] = 6
                else:
                    return JsonResponse({'success': False, 'error': 'Invalid weekday'})

        except JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})
        except KeyError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})

        start_date = datetime.date(date_from[0], date_from[1], date_from[2])
        end_date = datetime.date(date_to[0], date_to[1], date_to[2] + 1)
        date_range = end_date - start_date

        try:
            doctor = CustomUser.objects.get(id=doctor_id)
        except ObjectDoesNotExist:
            return JsonResponse({'success': False, 'error': 'Wrong doctor id'})
        if not doctor.is_doctor:
            return JsonResponse({'success': False, 'error': 'User with this id is not a doctor'})

        for i in range(date_range.days):
            date = start_date + datetime.timedelta(days=i)
            if date.weekday() not in repeat:
                continue
            minutes = 0
            for hour in range(time_from[0], time_to[0]):
                while minutes < 60:
                    date_time = datetime.datetime(year=date.year, month=date.month, day=date.day,
                                                  hour=hour, minute=minutes)

                    visit = Visit.objects.create(date=date_time, doctor=doctor)
                    # TODO: check if that visit already exists?
                    visit.save()
                    minutes += visit_time + break_time
                minutes -= 60

        return JsonResponse({'success': True})


@csrf_exempt
def get_visits_view(request, doctor_id):
    try:
        CustomUser.objects.get(id__exact=doctor_id)
    except ObjectDoesNotExist:
        return JsonResponse({'success': False, 'error': 'Wrong doctor id'})

    if request.method == 'GET':
        try:
            date_from = [int(x) for x in request.GET.get("from").split('-')]
            date_to = [int(x) for x in request.GET.get("to").split('-')]
            # doctor_id = int(data['doctorId'])
        except JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})
        except KeyError:
            return JsonResponse({'success': False, 'error': 'Invalid body'})

        start_date = datetime.date(date_from[0], date_from[1], date_from[2])
        end_date = datetime.date(date_to[0], date_to[1], date_to[2])

        visits = None
        try:
            if request.user.is_doctor:
                visits = Visit.objects.filter(
                    doctor=doctor_id
                ).filter(
                    date__gte=start_date
                ).filter(
                    date__lt=end_date
                ).exclude(
                    animal_id=None
                )
        # TODO: Only serve logged in users?
        except AttributeError:
            pass  # pass this if when user is not authenticated

        if visits is None:
            visits = Visit.objects.filter(
                doctor_id=doctor_id
            ).filter(
                date__gte=start_date
            ).filter(
                date__lte=end_date
            ).filter(
                animal_id=None
            )

        data = list(visits.values())
        return JsonResponse(data, safe=False)


@csrf_exempt
def get_doctors_view(request):
    if request.method == 'GET':
        doctors = CustomUser.objects.filter(is_doctor=True)

        return JsonResponse([{'id': x.id, 'name': f'{x.first_name} {x.last_name}'} for x in doctors], safe=False)


@csrf_exempt
def add_animal_view(request):
    if request.method == "POST":
        try:
            print(request.body)
            body = json.loads(request.body)

            res = check_if_all_not_none(body, ["name", "weight", "height", "dateOfBirth"])
            if type(res) is str:
                return JsonResponse({"message": res}, status=400)

            animal = Animal.objects.create(
                name=body["name"],
                weight=float(body["weight"]),
                height=float(body["height"]),
            )
            print(type(body))

            if is_none(body, "speciesId"):
                animal.species_id = int(body["speciesId"])

            if is_none(body, "race"):
                animal.race = body["race"]

            if is_none(body, "dateOfBirth"):
                animal.date_of_birth = date(*map(int, body["dateOfBirth"].split('-')))

            animal.save()
            return JsonResponse({"message": "Created"}, status=201)
        except JSONDecodeError:
            return JsonResponse({"message": "Invalid body"}, status=400)


def check_if_all_not_none(body, fields) -> str | bool:
    for x in fields:
        try:
            if body[x] is None:
                return f"Required field is empty: {x}"
        except KeyError:
            return f"Missing required field: {x}"

    return True


def is_none(dict, field):
    return True if field in dict.keys() and dict[field] is not None else False

