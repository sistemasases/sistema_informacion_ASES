from rest_framework.routers import DefaultRouter
from modulo_alertas.views import *
from modulo_reportes.views import *
router = DefaultRouter()

router.register(r'estudiantes_prueba',info_estudiante_viewsets,basename = 'estudiantes_prueba')
# router.register(r'estudiante_filtros',estudiante_filtros_viewsets, basename = 'estudiante_filtros')

urlpatterns = router.urls