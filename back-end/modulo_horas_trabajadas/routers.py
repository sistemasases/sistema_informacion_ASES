from rest_framework.routers import DefaultRouter
from modulo_horas_trabajadas.views import *

router = DefaultRouter()

# rutas de modulo de horas trabajadas 

router.register(r'registrar_horas', registros_horas_viewset, basename = 'registrar_horas')
router.register(r'registrar_temporada_trabajo', temporada_trabajo_viewset, basename = 'temporada_trabajo')





urlpatterns = router.urls