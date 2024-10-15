from rest_framework.routers import DefaultRouter
from modulo_usuario_rol.views import *
from modulo_discapacidad.views import *

router = DefaultRouter()
"""
    Endpoints Relacioandos con Usuarios.
"""
router.register(r'estudiante_discapacidad',estudiante_discapacidad_viewsets ,basename = 'estudiante_discapacidad')
router.register(r'sede_discapacidad',semestres_discapacidad_viewsets ,basename = 'sede_discapacidad')
   

urlpatterns = router.urls