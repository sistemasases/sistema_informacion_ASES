"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define un enrutador de Django que se utiliza para crear rutas URL para las vistas basadas en 
conjuntos 'instancia_viewsets' y 'semestre_viewsets'. Luego, se crean URLs para estas vistas y se agrega a 'urlpatterns'.
"""

from rest_framework.routers import DefaultRouter
from modulo_instancia.views import instancia_viewsets, semestre_viewsets

router = DefaultRouter()

router.register(r'instancia',instancia_viewsets,basename = 'instancia')
router.register(r'semestre',semestre_viewsets,basename = 'semestre')

urlpatterns = router.urls