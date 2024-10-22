from django.contrib import admin
from modulo_formularios_externos.models import *
# Register your models here.


class asistencia_admin(admin.ModelAdmin):
    list_display = ('id','id_estudiante', 'id_monitoria','check_asistencia','fecha') 


admin.site.register(asistencia,asistencia_admin)