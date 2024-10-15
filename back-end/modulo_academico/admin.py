from django.contrib import admin
from modulo_academico.models import *
# Register your models here.

class historial_academico_admin(admin.ModelAdmin):
    list_display = ('id','id_estudiante', 'id_programa_estudiante', 'id_semestre')  

class materia_admin(admin.ModelAdmin):
    list_display = ('id','cod_materia', 'nombre', 'franja','id_semestre','id_profesor') 

class matricula_admin(admin.ModelAdmin):
    list_display = ('id','id_curso', 'id_estudiante') 

class items_historico_admin(admin.ModelAdmin):
    list_display = ('id','id_curso', 'nombre') 

class items_semestre_admin(admin.ModelAdmin):
    list_display = ('id','id_curso', 'nombre') 

class notas_historico_admin(admin.ModelAdmin):
    list_display = ('id','id_item', 'calificacion','id_estudiante') 

class notas_semestre_admin(admin.ModelAdmin):
    list_display = ('id','id_item', 'calificacion','id_estudiante') 

class monitoria_academica_admin(admin.ModelAdmin):
    list_display = ('id','id_monitor', 'id_semestre','id_sede','materia') 


admin.site.register(historial_academico, historial_academico_admin)
admin.site.register(materia,materia_admin)
admin.site.register(matricula,matricula_admin)
admin.site.register(items_historico,items_historico_admin)
admin.site.register(items_semestre,items_semestre_admin)
admin.site.register(notas_historico,notas_historico_admin)
admin.site.register(notas_semestre,notas_semestre_admin)
admin.site.register(monitoria_academica,monitoria_academica_admin)


