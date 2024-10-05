from django.contrib import admin
from .models import Comet,Planet,Satelite

# Register your models here.
admin.site.register(Comet)
admin.site.register(Planet)
admin.site.register(Satelite)