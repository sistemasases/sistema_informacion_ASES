"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código importa el módulo 'admin' de Django y los modelos 'semestre' e 'instancia' del archivo de modelos.
Luego, registra estos modelos para que sean accesibles desde la interfaz de administración de Django.
"""

from django.contrib import admin
from modulo_instancia.models import *

class semestre_admin(admin.ModelAdmin):
    list_display = ('id','nombre', 'semestre_actual', 'id_sede')  

class sede_admin(admin.ModelAdmin):
    list_display = ('id', 'nombre')  

class cohorte_admin(admin.ModelAdmin):
    list_display = ('id','id_number', 'nombre')  

class cohorte_sede_admin(admin.ModelAdmin):
    list_display = ('id','id_cohorte', 'id_sede')  


admin.site.register(semestre,semestre_admin)
admin.site.register(sede,sede_admin)
admin.site.register(cohorte,cohorte_admin)
admin.site.register(cohorte_sede,cohorte_sede_admin)
