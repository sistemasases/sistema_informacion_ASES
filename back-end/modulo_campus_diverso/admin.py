"""
Autor: Juan D. Gil T.
Correo: juan.gil.trujillo@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-07-08
Descripción: Este código importa el módulo 'admin' de Django y los modelos 'campus_diverso' del archivo de modelos.
Luego, registra estos modelos para que sean accesibles desde la interfaz de administración de Django.
"""

from django.contrib import admin
from modulo_campus_diverso.models import *

# Register your models here.

# ====================== Módulo Persona ====================== #
admin.site.register(campus_diverso_pertenencia_grupo_poblacional)
admin.site.register(campus_diverso_persona)


# ====================== Módulo Diversidad Sexual ====================== #
admin.site.register(campus_diverso_respuesta_cambio_documento)
admin.site.register(campus_diverso_orientacion_sexual)
admin.site.register(campus_diverso_expresion_genero)
admin.site.register(campus_diverso_identidad_genero)
admin.site.register(campus_diverso_pronombre)
admin.site.register(campus_diverso_diversidad_sexual)


# ====================== Módulo Información General ====================== #
admin.site.register(campus_diverso_ocupacion_actual)
admin.site.register(campus_diverso_actividad_tiempo_libre)
admin.site.register(campus_diverso_fuente_ingresos)
admin.site.register(campus_diverso_convivencia_vivienda)
admin.site.register(campus_diverso_red_apoyo)
admin.site.register(campus_diverso_factor_riesgo)
admin.site.register(campus_diverso_informacion_general)
admin.site.register(campus_diverso_acompañamiento_recibido)

# ====================== Módulo Información Académica ====================== # 
admin.site.register(campus_diverso_estamento)
admin.site.register(campus_diverso_informacion_academica)


# ====================== Módulo Documentos Autorización ====================== # 

admin.site.register(campus_diverso_documentos_autorizacion)


# ====================== Módulo Seguimiento ====================== #   
admin.site.register(campus_diverso_seguimiento)
