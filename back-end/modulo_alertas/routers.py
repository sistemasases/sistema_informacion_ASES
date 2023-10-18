from rest_framework.routers import DefaultRouter
from modulo_alertas.views import *
from modulo_reportes.views import *
router = DefaultRouter()

router.register(r'estudiantes_prueba',info_estudiante_viewsets, basename = 'estudiantes_prueba')
router.register(r'contador_alertas',alert_counter_viewsets, basename = 'contador_alertas')

urlpatterns = router.urls