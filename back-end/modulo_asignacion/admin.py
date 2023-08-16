from django.contrib import admin
from modulo_asignacion.models import *


class asignacion_admin(admin.ModelAdmin):
    list_display = ('id','obtener_estudiante', 'id_usuario','estado','obtener_semestre') 

    def obtener_estudiante(self, obj):
        return obj.id_estudiante.cod_univalle
    def obtener_semestre(self, obj):
        return obj.id_semestre.nombre
    obtener_estudiante.short_description = 'Estudiante'
    obtener_semestre.short_description = 'Semestre'

admin.site.register(asignacion, asignacion_admin)


# Register your models here.
