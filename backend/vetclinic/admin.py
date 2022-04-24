from django.contrib import admin
from .models import CustomUser
from .models import Animal
from .models import Visit


class VisitAdmin(admin.ModelAdmin):
    list_display = ['doctor_id', 'date']
    ordering = ['date']


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email']
    ordering = ['id']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Animal)
admin.site.register(Visit, VisitAdmin)
