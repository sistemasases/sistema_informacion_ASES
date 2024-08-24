from rest_framework.routers import DefaultRouter
from .views import persona_viewsets, pertenencia_grupo_poblacional_viewsets, tipo_documento_viewsets

router = DefaultRouter()

router.register(r'persona', persona_viewsets, basename='persona')
router.register(r'pertenencia_grupo_poblacional', pertenencia_grupo_poblacional_viewsets, basename='pertenencia_grupo_poblacional')
router.register(r'tipo-documento', tipo_documento_viewsets, basename='tipo-documento')

urlpatterns = router.urls