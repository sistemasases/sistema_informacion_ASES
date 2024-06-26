from rest_framework.routers import DefaultRouter
from .views import diversidad_sexual_viewsets, expresion_genero_viewsets, identidad_genero_viewsets, orientacion_sexual_viewsets, respuesta_cambio_documento_viewsets, pronombre_viewsets

router = DefaultRouter()

router.register(r'diversidad-sexual', diversidad_sexual_viewsets, basename='diversidad-sexual')
router.register(r'pronombre', pronombre_viewsets, basename='pronombre')
router.register(r'identidad-genero', identidad_genero_viewsets, basename='identidad-genero')
router.register(r'expresion-genero', expresion_genero_viewsets, basename='expresion-genero')
router.register(r'orientacion-sexual', orientacion_sexual_viewsets, basename='orientacion-sexual')
router.register(r'respuesta-cambio-documento', respuesta_cambio_documento_viewsets, basename='respuesta-cambio-documento')

urlpatterns = router.urls

 
