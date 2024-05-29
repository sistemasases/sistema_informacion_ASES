from rest_framework.routers import DefaultRouter
from modulo_correos.views import *

router = DefaultRouter()

router.register(r'enviar_correos', enviar_correos_viewset, basename = 'enviar_correos')

urlpatterns = router.urls