from rest_framework.routers import DefaultRouter
from .views import informacion_general_viewsets, redes_apoyo_viewsets, factores_riesgo_viewset,fuentes_ingresos_viewsets,actividades_tiempo_libre_viewsets,encuentro_dia_hora_viewsets, regimen_eps_viewsets, decision_encuentro_inicial_viewsets

router = DefaultRouter()

router.register(r'informacion-general', informacion_general_viewsets,basename="informacion-general")
router.register(r'actividad-tiempo-libre', actividades_tiempo_libre_viewsets,basename="actividad-tiempo-libre")
router.register(r'fuente-ingresos', fuentes_ingresos_viewsets,basename="fuente-ingresos")
router.register(r'red-apoyo', redes_apoyo_viewsets,basename="red-apoyo")
router.register(r'factor-riesgo', factores_riesgo_viewset,basename="factor-riesgo")
router.register(r'encuentro-dia-hora', encuentro_dia_hora_viewsets,basename="encuentro-dia-hora")
router.register(r'regimen-eps', regimen_eps_viewsets,basename="regimen-eps")
router.register(r'decision-encuentro-inicial', decision_encuentro_inicial_viewsets,basename="decision-encuentro-inicial")

urlpatterns = router.urls







