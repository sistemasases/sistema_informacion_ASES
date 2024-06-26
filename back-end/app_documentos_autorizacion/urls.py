""" from django.urls import path
from .views import DocumentosAutorizacionListCreateView, DocumentosAutorizacionRetrievelUpdateDestroyView


urlpatterns = [
    path('documentos-autorizacion/', DocumentosAutorizacionListCreateView.as_view(), name='documentos-autorizacion-list-create'),
    path('documentos-autorizacion/<str:id_persona>/', DocumentosAutorizacionRetrievelUpdateDestroyView.as_view(), name='documentos-autorizacion-retrieve-update-destroy'), 
]
 """