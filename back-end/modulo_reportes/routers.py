from rest_framework.routers import DefaultRouter
from modulo_reportes.views import *
router = DefaultRouter()

# router.register(r'reporte_estudiante',reporte_estudiante_viewsets,basename = 'reporte_estudiante')

urlpatterns = router.urls

