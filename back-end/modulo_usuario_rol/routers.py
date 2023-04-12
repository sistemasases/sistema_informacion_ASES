from rest_framework.routers import DefaultRouter
from modulo_usuario_rol.views import *

router = DefaultRouter()

router.register(r'user',user_viewsets,basename = 'user')
router.register(r'estudiante',estudiante_viewsets,basename = 'estudiante')
router.register(r'rol',rol_viewsets,basename = 'rol')
router.register(r'usuario_rol',usuario_rol_viewsets,basename = 'usuario_rol')
router.register(r'profesional',profesional_viewsets,basename = 'profesional')
router.register(r'practicante',practicante_viewsets,basename = 'practicante')
router.register(r'monitor',monitor_viewsets,basename = 'monitor')
router.register(r'estudiante_selected',estudiante_selected_viewsets,basename = 'estudiante_selected')
router.register(r'estudiante_actualizacion',estudiante_actualizacion_viewsets,basename = 'estudiante_actualizacion')
urlpatterns = router.urls