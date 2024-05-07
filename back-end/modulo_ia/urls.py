from django.urls import path
from modulo_ia import views

urlpatterns = [
    path('predictor/', views.predictor.as_view()),
    
]

