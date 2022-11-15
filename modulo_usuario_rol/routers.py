from rest_framework.routers import DefaultRouter
from modulo_usuario_rol.views import user_viewsets,estudiante_viewsets,rol_viewsets,usuario_rol_viewsets

router = DefaultRouter()

router.register(r'user',user_viewsets,basename = 'user')
router.register(r'estudiante',estudiante_viewsets,basename = 'estudiante')
router.register(r'rol',rol_viewsets,basename = 'rol')
router.register(r'usuario_rol',usuario_rol_viewsets,basename = 'usuario_rol')

urlpatterns = router.urls