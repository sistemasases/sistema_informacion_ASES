from rest_framework.routers import DefaultRouter
from .views import persona_viewsets, pertenencia_grupo_poblacional_viewsets

router = DefaultRouter()

router.register(r'persona', persona_viewsets, basename='persona')
router.register(r'pertenencia_grupo_poblacional', pertenencia_grupo_poblacional_viewsets, basename='pertenencia_grupo_poblacional')

urlpatterns = router.urls