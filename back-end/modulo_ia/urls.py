from django.urls import path
from modulo_ia import views

urlpatterns = [
    path('', views.carga_test),
    path('predictor/', views.predictor.as_view()),
    
]

