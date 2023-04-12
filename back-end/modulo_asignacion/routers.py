from rest_framework.routers import DefaultRouter
from modulo_asignacion.views import *

router = DefaultRouter()

router.register(r'asignacion_estudiante',estudiante_asignacion_viewsets,basename = 'asignacion_estudiante')
router.register(r'asignacion_usuario',usuario_rol_asignacion_viewsets,basename = 'asignacion_usuario')

urlpatterns = router.urls