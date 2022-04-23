from django.contrib import admin
from .models import CustomUser
from .models import Animal
from .models import Visit


admin.site.register(CustomUser)
admin.site.register(Animal)
admin.site.register(Visit)
