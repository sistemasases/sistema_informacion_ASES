""" from django.urls import path
from .views import PersonaListCreateView, PersonaRetrieveUpdateDestroyView, PertenenciaGrupoPoblacionalListCreateView, PertenenciaGrupoPoblacionalRetrieveUpdateDestroyView
#! This file is'nt used in the code
urlpatterns = [
    path('persona/', PersonaListCreateView.as_view(), name='persona-list-create'),
    path('persona/<str:numero_documento>/', PersonaRetrieveUpdateDestroyView.as_view(), name='persona-retrieve-update-destroy'),
    path('pertenencia_grupo_poblacional/', PertenenciaGrupoPoblacionalListCreateView.as_view(), name='pertenencia-grupo-poblacional-list-create'),
    path('pertenencia_grupo_poblacional/<str:pk>/', PertenenciaGrupoPoblacionalRetrieveUpdateDestroyView.as_view(), name='pertenencia-grupo-poblacional-retrieve-update-destroy'),
] """
