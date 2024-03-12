from rest_framework.routers import DefaultRouter
from modulo_reportes.views import *
router = DefaultRouter()

router.register(r'estudiante_por_rol',estudiante_por_rol_viewsets,basename = 'estudiante_por_rol')
router.register(r'estudiante_filtros',estudiante_filtros_viewsets, basename = 'estudiante_filtros')
router.register(r'cohortes_list',get_cohortes_viewsets, basename = 'cohortes_list')

urlpatterns = router.urls