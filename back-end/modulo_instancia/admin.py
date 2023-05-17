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

admin.site.register(semestre)
admin.site.register(sede)
