from django.urls import path
from modulo_carga_masiva import views

urlpatterns = [
    path('', views.carga_test),
    path('carga/', views.Validador_carga.as_view()),
    
]

