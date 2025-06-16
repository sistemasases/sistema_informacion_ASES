# from rest_framework.routers import DefaultRouter
# from modulo_admin.views import *

# router = DefaultRouter()

# # router.register(r'enviar_correos_riesgos', enviar_correos_riesgos_viewset, basename = 'enviar_correos_riesgos')

# router.register(r'panel_admin_usuarios', panel_admin_usuario_viewset, basename='panel_admin_usuarios')


# urlpatterns = router.urls

from rest_framework.routers import DefaultRouter
from modulo_admin.views import panel_admin_usuario_viewset

router = DefaultRouter()
router.register(r'panel_admin_usuarios', panel_admin_usuario_viewset, basename='panel_admin_usuarios')

urlpatterns = router.urls
