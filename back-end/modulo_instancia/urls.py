"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define las URLs para el manejo de instancias, semestres y finalización del semestre.
También utiliza un 'TodoView' con las rutas que proporciona 'Django' 'rest_framework' para permitir las operaciones CRUD.
"""

from django.urls import path
from .views import instancia_manage
from .views import end_semestry_manage
from .views import semestre_manage
from modulo_instancia import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'tasks',views.TodoView, 'task')

urlpatterns = [
    path('all/', instancia_manage.as_view(), name='all_instances'),
    path('semestre_actual/<int:pk>/', end_semestry_manage.as_view(), name='end_semestre'),
    path('', semestre_manage.as_view(), name='all_semestres'),
]
