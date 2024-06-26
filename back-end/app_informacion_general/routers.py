from rest_framework.routers import DefaultRouter
from .views import informacion_general_viewsets, actividad_tiempo_libre_viewsets, convivencia_vivienda_viewsets, encuentro_dia_hora_viewsets, factor_riesgo_viewsets, fuente_ingresos_viewsets, ocupacion_actual_viewsets, red_apoyo_viewsets, acompanamiento_recibido_viewsets, profesional_que_brindo_atencion_viewsets

router = DefaultRouter()

router.register(r'informacion-general', informacion_general_viewsets,basename="informacion-general")
router.register(r'ocupacion-actual', ocupacion_actual_viewsets, basename="ocupacion-actual")
router.register(r'acompanamiento-recibido', acompanamiento_recibido_viewsets, basename="acompanamiento-recibido")
router.register(r'profesional-que-brindo-atencion', profesional_que_brindo_atencion_viewsets, basename="profesional-que-brindo-atencion")
router.register(r'actividad-tiempo-libre', actividad_tiempo_libre_viewsets,basename="actividad-tiempo-libre")
router.register(r'fuente-ingresos', fuente_ingresos_viewsets,basename="fuente-ingresos")
router.register(r'convivencia-vivienda', convivencia_vivienda_viewsets,basename="convivencia-vivienda")
router.register(r'red-apoyo', red_apoyo_viewsets,basename="red-apoyo")
router.register(r'factor-riesgo', factor_riesgo_viewsets,basename="factor-riesgo")
router.register(r'encuentro-dia-hora', encuentro_dia_hora_viewsets,basename="encuentro-dia-hora")

urlpatterns = router.urls







