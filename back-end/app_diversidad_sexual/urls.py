""" from django.urls import path
from .views import DiversidadSexualListCreateView, DiversidadSexualRetrieveUpdateDestroyView, PronombreListCreateView, PronombreRetrievelUpdateDestroyView, IdentidadGeneroListCreateView, IdentidadGeneroRetrievelUpdateDestroyView, ExpresionGeneroListCreateView, ExpresionGeneroRetrievelUpdateDestroyView, OrientacionSexualListCreateView, OrientacionSexualRetrievelUpdateDestroyView, RespuestaCambioDocumentoListCreateView, RespuestaCambioDocumentoRetrievelUpdateDestroyView

urlpatterns = [
    path('diversidad-sexual/', DiversidadSexualListCreateView.as_view(), name='diversidad-sexual-list-create'),
    path('diversidad-sexual/<str:id_persona>/', DiversidadSexualRetrieveUpdateDestroyView.as_view(), name='diversidad-sexual-retrieve-update-destroy'),
    path('pronombre/', PronombreListCreateView.as_view(), name='pronombre-list-create'),
    path('pronombre/<str:pk>/', PronombreRetrievelUpdateDestroyView.as_view(),name='pronombre-retrieve-update-destroy'),
    path('identidad-genero/', IdentidadGeneroListCreateView.as_view(), name='identidad-genero-list-create'),
    path('identidad-genero/<str:pk>/', IdentidadGeneroRetrievelUpdateDestroyView.as_view(),name='identidad-genero-retrieve-update-destroy'),
    path('expresion-genero/', ExpresionGeneroListCreateView.as_view(), name='expresion-genero-list-create'),
    path('expresion-genero/<str:pk>/', ExpresionGeneroRetrievelUpdateDestroyView.as_view(),name='expresion-genero-retrieve-update-destroy'),
    path('orientacion-sexual/', OrientacionSexualListCreateView.as_view(), name='orientacion-sexual-list-create'),
    path('orientacion-sexual/<str:pk>/', OrientacionSexualRetrievelUpdateDestroyView.as_view(),name='orientacion-sexual-retrieve-update-destroy'),
    path('respuesta-cambio-documento/', RespuestaCambioDocumentoListCreateView.as_view(), name='respuesta-cambio-documento-list-create'),
    path('respuesta-cambio-documento/<str:pk>/', RespuestaCambioDocumentoRetrievelUpdateDestroyView.as_view(),name='respuesta-cambio-documento-retrieve-update-destroy'),
] """