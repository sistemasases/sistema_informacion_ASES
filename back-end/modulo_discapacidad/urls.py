from django.urls import path
from modulo_discapacidad import views


urlpatterns = [
    path('estudiantes/',
            views.ListaEstudiantesDiscapacidad.as_view(),
            name="lista-estudiantes-discapacidad"),

    path('estudiantes-extra/',
            views.DatosExtraEstudiantesDiscapacidad.as_view(),
            name="datos-extra-estudiantes-discapacidad")
]
