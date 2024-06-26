""" from django.urls import path 
from .views import InformacionAcademicaListCreateView, InformacionAcademicaRetrievelUpdateDestroyView, EstamentoListCreateView, EstamentoRetrieveUpdateDestroyView

urlpatterns = [ 
    path("informacion-academica/", InformacionAcademicaListCreateView.as_view(), name='informacion-academica-list-create-view'),
    path('informacion-academica/<str:id_persona>/', InformacionAcademicaRetrievelUpdateDestroyView.as_view(), name='informacion-academica-retrievel-update-destroy-view'),
    path('estamento/', EstamentoListCreateView.as_view(), name='estamento-list-create'),
    path('estamento/<str:pk>/', EstamentoRetrieveUpdateDestroyView.as_view(), name='estamento-retrieve-update-destroy')
] """