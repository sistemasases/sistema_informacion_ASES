from django.urls import path, include
from rest_framework.routers import DefaultRouter

from modulo_admin import views

router = DefaultRouter()
router.register(r'panel_admin_usuario', views.panel_admin_usuario_viewset, basename='panel_admin_usuario')
router.register(r'panel_admin_estudiante', views.panel_admin_estudiante_viewset, basename='panel_admin_estudiante')
router.register(r'panel_admin_roles', views.panel_admin_roles_viewset, basename='panel_admin_roles')
router.register(r'panel_admin_permisos', views.panel_admin_permisos_viewset, basename='panel_admin_permisos')
router.register(r'panel_admin_sedes', views.panel_admin_sedes_viewset, basename='panel_admin_sedes')
router.register(r'panel_admin_cohortes', views.panel_admin_cohortes_viewset, basename='panel_admin_cohortes')
router.register(r'panel_admin_facultades', views.panel_admin_facultades_viewset, basename='panel_admin_facultades')
router.register(r'panel_admin_asignaciones', views.panel_admin_asignaciones_viewset, basename='panel_admin_asignaciones')
router.register(r'panel_admin_asignaciones_monitores', views.panel_admin_asignaciones_monitores_viewset, basename='panel_admin_asignaciones_monitores')
router.register(r'panel_admin_programas', views.panel_admin_programas_viewset, basename='panel_admin_programas')
router.register(r'panel_admin_semestres', views.panel_admin_semestres_viewset, basename='panel_admin_semestres')


urlpatterns = [
    path('', include(router.urls)),
]