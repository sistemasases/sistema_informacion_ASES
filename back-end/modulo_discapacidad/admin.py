from django.contrib import admin
from modulo_discapacidad.models import *

class estudiante_discapacidad_admin(admin.ModelAdmin):
    list_display = ("_estudiante", "_codigo", "tipo_discapacidad", "adquisicion")

    @admin.display(empty_value='N/A', description="Nombre")
    def _estudiante(self, obj):
        return f"{obj.estudiante.nombre} {obj.estudiante.apellido}"
    
    @admin.display(empty_value='N/A', description="Codigo")
    def _codigo(self, obj):
        return f"{obj.estudiante.cod_univalle}"

# Register your models here.
admin.site.register(discapacidad_estudiante, estudiante_discapacidad_admin)
