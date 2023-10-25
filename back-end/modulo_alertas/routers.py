from rest_framework.routers import DefaultRouter
from modulo_alertas.views import *
from modulo_reportes.views import *
router = DefaultRouter()

router.register(r'estudiantes_info',info_estudiante_viewsets,basename = 'estudiantes_info')
router.register(r'estudiante_datos_alertas',info_estudiante_alertas_viewsets, basename = 'estudiante_datos_alertas')

urlpatterns = router.urls