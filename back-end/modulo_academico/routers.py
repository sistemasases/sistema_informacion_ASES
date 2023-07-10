from rest_framework.routers import DefaultRouter
from modulo_academico.views import *

router = DefaultRouter()

router.register(r'lista_de_facultades',lista_de_facultades_viewsets,basename = 'lista_de_facultades')
router.register(r'lista_de_profesores',lista_de_profesores_viewsets,basename = 'lista_de_profesores')
router.register(r'traer_cursos_del_profesor',traer_cursos_del_profesor_viewsets,basename = 'traer_cursos_del_profesor')
router.register(r'notas_estudiantes_calificador',notas_estudiantes_calificador_viewsets,basename = 'notas_estudiantes_calificador')

router.register(r'cursos_facultad',cursos_facultad_viewsets,basename = 'cursos_facultad')
router.register(r'franja_curso',franja_curso_viewsets,basename = 'franja_curso')
router.register(r'profesores_del_curso_sin_separar_por_franja',profesores_del_curso_sin_separar_por_franja_viewsets,basename = 'profesores_del_curso_sin_separar_por_franja')
router.register(r'profesores_del_curso',profesores_del_curso_viewsets,basename = 'profesores_del_curso')
router.register(r'alumnos_del_profesor',alumnos_del_profesor_viewsets,basename = 'alumnos_del_profesor')

router.register(r'lista_historiales_academicos',lista_historiales_academicos_viewsets,basename = 'lista_historiales_academicos')

urlpatterns = router.urls