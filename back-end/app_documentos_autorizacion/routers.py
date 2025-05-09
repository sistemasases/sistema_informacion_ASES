from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'documentos-autorizacion', documentos_autorizacion_viewsets, basename='documentos-autorizacion')
router.register(r'apgar-pregunta1', apgar_pregunta1_viewsets, basename='apgar-pregunta1')
router.register(r'apgar-pregunta2', apgar_pregunta2_viewsets, basename='apgar-pregunta2')
router.register(r'apgar-pregunta3', apgar_pregunta3_viewsets, basename='apgar-pregunta3')
router.register(r'apgar-pregunta4', apgar_pregunta4_viewsets, basename='apgar-pregunta4')
router.register(r'apgar-pregunta5', apgar_pregunta5_viewsets, basename='apgar-pregunta5')
router.register(r'apgar-pregunta6', apgar_pregunta6_viewsets, basename='apgar-pregunta6')
router.register(r'apgar-pregunta7', apgar_pregunta7_viewsets, basename='apgar-pregunta7')

urlpatterns = router.urls