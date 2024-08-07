from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from django.shortcuts import get_object_or_404
from app_registro.models import Persona
from .models import InformacionGeneral, EncuentroDiaHora
from .serializers import InformacionGeneralSerializer,EncuentroDiaHoraSerializer, FactoresRiesgoSerializer, RedesApoyoSerializer, FuentesIngresoSerializer, ActividadesTiempoLibreSerializer
from rest_framework import viewsets


# EncuentroDiaHora
""" class EncuentroDiaHoraListCreateView(generics.ListCreateAPIView):
    queryset = EncuentroDiaHora.objects.all()
    serializer_class = EncuentroDiaHoraSerializer

class EncuentroDiaHoraRetrievelUpdateDestroyView (generics.RetrieveUpdateDestroyAPIView):
    queryset = EncuentroDiaHora.objects.all()
    serializer_class = EncuentroDiaHoraSerializer
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """

class encuentro_dia_hora_viewsets(viewsets.ModelViewSet):
    serializer_class = EncuentroDiaHoraSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = EncuentroDiaHoraSerializer.Meta.model.objects.all()
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def update(self, request, pk=None, *args, **kwargs):
        encuentro_dia_hora = get_object_or_404(EncuentroDiaHora, id_encuentro_dia_hora=pk)
        serializer = self.get_serializer(encuentro_dia_hora, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 


# FactorRiesgo
class factores_riesgo_viewset (viewsets.ModelViewSet):
    serializer_class = FactoresRiesgoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FactoresRiesgoSerializer.Meta.model.objects.all()

# Redes de apoyo

class redes_apoyo_viewsets (viewsets.ModelViewSet):
    serializer_class = RedesApoyoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RedesApoyoSerializer.Meta.model.objects.all()

# Fuentes de ingresos

class fuentes_ingresos_viewsets (viewsets.ModelViewSet):
    serializer_class = FuentesIngresoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FuentesIngresoSerializer.Meta.model.objects.all()

# Actividades tiempo libre

class actividades_tiempo_libre_viewsets (viewsets.ModelViewSet):
    serializer_class = ActividadesTiempoLibreSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ActividadesTiempoLibreSerializer.Meta.model.objects.all()




        
class informacion_general_viewsets (viewsets.ModelViewSet):
    serializer_class = InformacionGeneralSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = InformacionGeneralSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def retrieve(self, request, id_persona=None ): 
        persona = get_object_or_404(Persona, numero_documento=id_persona) 
        informacion_general = get_object_or_404(InformacionGeneral, id_persona=persona) 
        informacion_general_serializer = InformacionGeneralSerializer(informacion_general) 
        return Response(informacion_general_serializer.data)
    
    def update(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_general = get_object_or_404(InformacionGeneral, id_persona=persona)
        serializer = self.get_serializer(informacion_general, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def destroy(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_general = get_object_or_404(InformacionGeneral, id_persona=persona)
        self.perform_destroy(informacion_general)
        return Response(status=status.HTTP_204_NO_CONTENT)
