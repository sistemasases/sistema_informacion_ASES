from django.contrib import admin
from modulo_programa.models import *

class programa_admin(admin.ModelAdmin):
    list_display = ('id','codigo_univalle', 'nombre', 'jornada','id_sede') 
    search_fields = ('id','codigo_univalle', 'nombre', 'jornada') 

class programa_estudiante_admin(admin.ModelAdmin):
    list_display = ('id','obtener_programa', 'obtener_estudiante') 
    list_filter = ('id', 'id_programa','id_estudiante')

    def obtener_programa(self, obj):
        return obj.id_programa.codigo_univalle
    def obtener_estudiante(self, obj):
        return obj.id_estudiante.cod_univalle
    obtener_programa.short_description = 'Programa'
    obtener_estudiante.short_description = 'Estudiante' 

class programa_monitor_admin(admin.ModelAdmin):
    list_display = ('id','id_programa', 'id_monitor')  

class facultad_admin(admin.ModelAdmin):
    list_display = ('id','nombre')  

class estado_programa_admin(admin.ModelAdmin):
    list_display = ('id','nombre')  

class historial_estado_programa_estudiante_admin(admin.ModelAdmin):
    list_display = ('id','id_programa', 'id_estudiante', 'id_Semestre') 

class vcd_academico_admin(admin.ModelAdmin):
    list_display = ('id','id_facultad', 'id_usuario_rol')   

class dir_programa_admin(admin.ModelAdmin):
    list_display = ('id','id_programa', 'id_usuario_rol') 


admin.site.register(programa,programa_admin)
admin.site.register(programa_estudiante,programa_estudiante_admin)
admin.site.register(programa_monitor,programa_monitor_admin)
admin.site.register(facultad,facultad_admin)
admin.site.register(estado_programa,estado_programa_admin)
admin.site.register(historial_estado_programa_estudiante,historial_estado_programa_estudiante_admin)
admin.site.register(vcd_academico,vcd_academico_admin)
admin.site.register(dir_programa,dir_programa_admin)