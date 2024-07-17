from rest_framework.routers import DefaultRouter
from .views import SeguimientoViewSet, profesional_viewsets

router = DefaultRouter()

router.register(r'seguimiento', SeguimientoViewSet, basename="seguimiento")
router.register(r'profesional', profesional_viewsets, basename="profesional")


urlpatterns = router.urls

