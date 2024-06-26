""" from django.urls import path
from .views import SeguimientoListCreateView, SeguimientoRetrievelUpdateDestroyView

urlpatterns = [
    path('seguimiento/', SeguimientoListCreateView.as_view(), name='seguimiento-list-create'),
    path('seguimiento/<str:pk>/', SeguimientoRetrievelUpdateDestroyView.as_view(), name='seguimiento-retrieve-update-destroy'), 
] """