from django.contrib import admin
from modulo_programa.models import *

class programa_admin(admin.ModelAdmin):
    list_display = ('id','codigo_univalle', 'nombre', 'jornada','id_sede') 

class programa_estudiante_admin(admin.ModelAdmin):
    list_display = ('id','id_programa', 'id_estudiante')  

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