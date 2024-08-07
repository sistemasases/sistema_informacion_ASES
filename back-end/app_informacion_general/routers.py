from rest_framework.routers import DefaultRouter
from .views import informacion_general_viewsets, redes_apoyo_viewsets, factores_riesgo_viewset,fuentes_ingresos_viewsets,actividades_tiempo_libre_viewsets,encuentro_dia_hora_viewsets 

router = DefaultRouter()

router.register(r'informacion-general', informacion_general_viewsets,basename="informacion-general")
router.register(r'actividad-tiempo-libre', actividades_tiempo_libre_viewsets,basename="actividad-tiempo-libre")
router.register(r'fuente-ingresos', fuentes_ingresos_viewsets,basename="fuente-ingresos")
router.register(r'red-apoyo', redes_apoyo_viewsets,basename="red-apoyo")
router.register(r'factor-riesgo', factores_riesgo_viewset,basename="factor-riesgo")
router.register(r'encuentro-dia-hora', encuentro_dia_hora_viewsets,basename="encuentro-dia-hora")

urlpatterns = router.urls







