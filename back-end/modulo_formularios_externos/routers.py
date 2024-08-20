from rest_framework.routers import DefaultRouter
from modulo_formularios_externos.views import *

router = DefaultRouter()

router.register(r'enviar_sedes', sede_viewsets, basename = 'enviar_sedes')
router.register(r'enviar_programas', enviar_programas_viewsets, basename = 'enviar_programas')
router.register(r'form_primer_ingreso', form_primer_ingreso, basename = 'form_primer_ingreso')
router.register(r'form_asistencia_academica', form_asistencia_academica, basename = 'form_asistencia_academica')
# router.register(r'enviar_correo_cambio_contra', enviar_correo_cambio_contra_viewset, basename = 'enviar_correo_cambio_contra')
# router.register(r'enviar_observaciones', enviar_correo_observaciones_viewsets, basename = 'enviar_observaciones')
# router.register(r'enviar_riesgo_editado', enviar_riesgo_editado_viewset, basename = 'enviar_riesgo_editado')
# router.register(r'enviar_codigo_otp_correo', enviar_codigo_otp_correo_viewsets, basename = 'enviar_codigo_otp_correo')
# router.register(r'verificar_clave_otp', verificar_clave_otp_viewsets, basename = 'verificar_clave_otp')
# router.register(r'verify_token_otp', VerifyTokenView, basename = 'verify_token_otp')

urlpatterns = router.urls