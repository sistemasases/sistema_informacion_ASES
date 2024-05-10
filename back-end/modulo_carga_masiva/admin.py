from django.contrib import admin
from modulo_carga_masiva.models import *
# Register your models here.


class motivo_admin(admin.ModelAdmin):
    list_display = ('id','descripcion','motivo_activo') 


class retiro_admin(admin.ModelAdmin):
    list_display = ('id','id_estudiante', 'id_motivo') 

admin.site.register(motivo,motivo_admin)
admin.site.register(retiro,retiro_admin)

