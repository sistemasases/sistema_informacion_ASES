from django.urls import path
from modulo_base import views

urlpatterns = [
    path('', views.login_test),
    path('ingresar/', views.ingresar),
]
