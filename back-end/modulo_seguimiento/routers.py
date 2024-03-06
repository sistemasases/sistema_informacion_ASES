from rest_framework.routers import DefaultRouter
from modulo_seguimiento.views import *
router = DefaultRouter()

router.register(r'seguimiento_individual',seguimiento_individual_viewsets,basename = 'seguimiento_individual')
router.register(r'inasistencia',inasistencia_viewsets,basename = 'inasistencia')
router.register(r'seguimientos_estudiante',seguimientos_estudiante_viewsets,basename = 'seguimientos_estudiante')
router.register(r'seguimientos_estudiante_solo_semestre_actual',seguimientos_estudiante_solo_semestre_actual_viewsets,basename = 'seguimientos_estudiante_solo_semestre_actual')
router.register(r'conteo_seguimientos_estudiante',conteo_seguimientos_estudiante_viewsets,basename = 'conteo_seguimientos_estudiante')
router.register(r'riesgo_individual',riesgo_individual_viewsets,basename = 'riesgo_individual')
router.register(r'seguimientos_individual',descarga_seguimientos_inasistencias_viewsets,basename = 'descarga_seguimientos_inasistencias')
router.register(r'consulta_DEXIA',consulta_DEXIA_viewsets,basename = 'consulta_DEXIA')
seguimientos_estudiante_viewsets

urlpatterns = router.urls