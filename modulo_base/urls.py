from django.urls import path
from modulo_base import views


urlpatterns = [
    path('login/', views.Api_login.as_view()),
    path('', views.carga_test),
]
