from django.urls import path
from modulo_usuario_rol import views

urlpatterns = [
    path('firma_tratamiento_datos/', views.firma_tratamiento_datos_view.as_view()),
]

