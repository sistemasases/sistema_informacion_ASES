from rest_framework.routers import DefaultRouter
from modulo_seguimiento.views import *
router = DefaultRouter()

router.register(r'seguimiento_individual',seguimiento_individual_viewsets,basename = 'seguimiento_individual')
router.register(r'inasistencia',inasistencia_viewsets,basename = 'inasistencia')
router.register(r'seguimientos_estudiante',seguimientos_estudiante_viewsets,basename = 'seguimientos_estudiante')
seguimientos_estudiante_viewsets

urlpatterns = router.urls