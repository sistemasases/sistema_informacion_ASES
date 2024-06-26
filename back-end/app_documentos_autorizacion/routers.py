from rest_framework.routers import DefaultRouter
from .views import documentos_autorizacion_viewsets

router = DefaultRouter()

router.register(r'documentos-autorizacion', documentos_autorizacion_viewsets, basename='documentos-autorizacion')

urlpatterns = router.urls