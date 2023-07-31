from django.contrib import admin
from modulo_programa.models import *

# Register your models here.
admin.site.register(programa)
admin.site.register(programa_estudiante)
admin.site.register(programa_monitor)
admin.site.register(facultad)
admin.site.register(estado_programa)
admin.site.register(historial_estado_programa_estudiante)
