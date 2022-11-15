from rest_framework.routers import DefaultRouter
from modulo_instancia.views import instancia_viewsets, semestre_viewsets

router = DefaultRouter()

router.register(r'instancia',instancia_viewsets,basename = 'instancia')
router.register(r'semestre',semestre_viewsets,basename = 'semestre')

urlpatterns = router.urls