""" from django.urls import path 
from .views import InformacionGeneralListCreateView, InformacionGeneralRetrievelUpdateDestroyView, OcupacionActualListCreateView, OcupacionActualRetrievelUpdateDestroyView, ActividadTiempoLibreListCreateView, ActividadTiempoLibreRetrievelUpdateDestroyView, FuenteIngresosListCreateView, FuenteIngresosRetrievelUpdateDestroyView, ConvivenciaViviendaListCreateView, ConvivenciaViviendaRetrievelUpdateDestroyView, RedApoyoListCreateView, RedApoyoRetrievelUpdateDestroyView, FactorRiesgoListCreateView, FactorRiesgoRetrievelUpdateDestroyView, EncuentroDiaHoraListCreateView, EncuentroDiaHoraRetrievelUpdateDestroyView

urlpatterns = [ 
    path("informacion-general/", InformacionGeneralListCreateView.as_view(), name='informacion-general-list-create-view'),
    path('informacion-general/<str:id_persona>/', InformacionGeneralRetrievelUpdateDestroyView.as_view(), name='informacion-general-retrievel-update-destroy-view'),
    path("ocupacion-actual/", OcupacionActualListCreateView.as_view(), name='ocupacion-actual-list-create-view'),
    path('ocupacion-actual/<str:pk>/', OcupacionActualRetrievelUpdateDestroyView.as_view(), name='ocupacion-actual-retrievel-update-destroy-view'),
    path("actividad-tiempo-libre/", ActividadTiempoLibreListCreateView.as_view(), name='actividad-tiempo-libre-list-create-view'),
    path('actividad-tiempo-libre/<str:pk>/', ActividadTiempoLibreRetrievelUpdateDestroyView.as_view(), name='actividad-tiempo-libre-retrievel-update-destroy-view'),
    path('fuente-ingresos/', FuenteIngresosListCreateView.as_view(), name='fuente-ingresos-retrievel-update-destroy-view'),
    path('fuente-ingresos/<str:pk>/', FuenteIngresosRetrievelUpdateDestroyView.as_view(), name='fuente-ingresos-retrievel-update-destroy-view'),
    path('convivencia-vivienda/', ConvivenciaViviendaListCreateView.as_view(), name='convivencia-vivienda-retrievel-update-destroy-view'),
    path('convivencia-vivienda/<str:pk>/', ConvivenciaViviendaRetrievelUpdateDestroyView.as_view(), name='convivencia-vivienda-retrievel-update-destroy-view'),
    path('red-apoyo/', RedApoyoListCreateView.as_view(), name='red-apoyo-retrievel-update-destroy-view'),
    path('red-apoyo/<str:pk>/', RedApoyoRetrievelUpdateDestroyView.as_view(), name='red-apoyo-retrievel-update-destroy-view'),
    path('factor-riesgo/', FactorRiesgoListCreateView.as_view(), name='factor-riesgo-retrievel-update-destroy-view'),
    path('factor-riesgo/<str:pk>/', FactorRiesgoRetrievelUpdateDestroyView.as_view(), name='factor-riesgo-retrievel-update-destroy-view'),
    path('encuentro-dia-hora/', EncuentroDiaHoraListCreateView.as_view(), name='encuentro-dia-hora-retrievel-update-destroy-view'),
    path('encuentro-dia-hora/<str:pk>/', EncuentroDiaHoraRetrievelUpdateDestroyView.as_view(), name='encuentro-dia-hora-retrievel-update-destroy-view'),
] """