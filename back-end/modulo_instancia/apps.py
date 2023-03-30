"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define la configuración del modulo instancia.
Se importa la clase 'AppConfig' de 'Django' y se crea una subclase 'ModuloInstanciaConfig' que establece la configuración por defecto para el campo 'default_auto_field' y el nombre de la aplicación 'name'.
"""

from django.apps import AppConfig

class ModuloInstanciaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'modulo_instancia'
