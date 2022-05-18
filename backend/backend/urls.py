"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path
from vetclinic import views

urlpatterns = [
    path('', views.frontpage_view),
    path('admin', admin.site.urls),
    path('login', views.login_view),
    path('login/members/', views.loggedin_view),
    path('logout', views.logout_view),
    path('register', views.register_view),
    path('visits/add', views.add_visits_view),
    path('doctors', views.get_doctors_view),
    path('doctors/<int:doctor_id>/visits', views.get_visits_view),
    path('pets', views.add_animal_view)
    # path('species/', views.get_species_view)
]
