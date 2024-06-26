from rest_framework.routers import DefaultRouter
from .views import informacion_academica_viewsets, estamento_viewsets

router = DefaultRouter()

router.register(r'informacion-academica', informacion_academica_viewsets, basename="informacion-academica")
router.register(r'estamento', estamento_viewsets, basename="estamento")

urlpatterns = router.urls