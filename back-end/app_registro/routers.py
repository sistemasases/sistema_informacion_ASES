from rest_framework.routers import DefaultRouter
from .views import persona_viewsets, pertenencia_grupo_poblacional_viewsets, tipo_documento_viewsets, zona_residencia_viewsets, identidad_etnico_racial_viewsets,estado_civil_viewsets, sexo_asignado_viewsets

router = DefaultRouter()

router.register(r'persona', persona_viewsets, basename='persona')
router.register(r'pertenencia_grupo_poblacional', pertenencia_grupo_poblacional_viewsets, basename='pertenencia_grupo_poblacional')
router.register(r'tipo-documento', tipo_documento_viewsets, basename='tipo-documento')
router.register(r'estado-civil', estado_civil_viewsets, basename='estado-civil')
router.register(r'zona-residencia', zona_residencia_viewsets, basename='zona-residencia')
router.register(r'identidad-etnico-racial', identidad_etnico_racial_viewsets, basename='identidad-etnico-racial')
router.register(r'sexo-asignado', sexo_asignado_viewsets, basename='sexo-asignado')


urlpatterns = router.urls