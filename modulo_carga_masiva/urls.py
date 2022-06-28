from django.urls import path
from modulo_carga_masiva import views

urlpatterns = [
    path('prueba_carga/', views.carga_test),
    path('prueba_carga/carga/', views.carga),
    
]