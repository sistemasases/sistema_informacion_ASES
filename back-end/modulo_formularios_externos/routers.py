from rest_framework.routers import DefaultRouter
from modulo_formularios_externos.views import *

router = DefaultRouter()

router.register(r'enviar_sedes', sede_viewsets, basename = 'enviar_sedes')
router.register(r'enviar_programas', enviar_programas_viewsets, basename = 'enviar_programas')
router.register(r'enviar_monitorias', enviar_monitorias_viewsets, basename = 'enviar_monitorias')
router.register(r'form_primer_ingreso', form_primer_ingreso, basename = 'form_primer_ingreso')
router.register(r'form_asistencia_academica', form_asistencia_academica, basename = 'form_asistencia_academica')
router.register(r'firma_tratamiento_datos', firma_tratamiento_datos_view, basename = 'firma_tratamiento_datos')

urlpatterns = router.urls