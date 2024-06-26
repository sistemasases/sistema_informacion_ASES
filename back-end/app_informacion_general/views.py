from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from django.shortcuts import get_object_or_404
from app_registro.models import Persona
from .models import InformacionGeneral, OcupacionActual, AcompanamientoRecibido, ProfesionalQueBrindoAtencion, ActividadTiempoLibre, FuenteIngresos, ConvivenciaVivienda, RedApoyo, FactorRiesgo, EncuentroDiaHora
from .serializers import InformacionGeneralSerializer, OcupacionActualSerializer, AcompanamientoRecibidoSerializer, ProfesionalQueBrindoAtencionSerializer, ActividadTiempoLibreSerializer, FuenteIngresosSerializer, ConvivenciaViviendaSerializer, RedApoyoSerializer, FactorRiesgoSerializer, EncuentroDiaHoraSerializer
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
""" class FactorRiesgoListCreateView(generics.ListCreateAPIView):
    queryset = FactorRiesgo.objects.all()
    serializer_class = FactorRiesgoSerializer

class FactorRiesgoRetrievelUpdateDestroyView (generics.RetrieveUpdateDestroyAPIView):
    queryset = FactorRiesgo.objects.all()
    serializer_class = FactorRiesgoSerializer
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """

class factor_riesgo_viewsets(viewsets.ModelViewSet):
    serializer_class = FactorRiesgoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FactorRiesgoSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        factor_riesgo = get_object_or_404(FactorRiesgo, id_factor_riesgo=pk)
        serializer = self.get_serializer(factor_riesgo, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 


# RedApoyo
""" class RedApoyoListCreateView(generics.ListCreateAPIView):
    queryset = RedApoyo.objects.all()
    serializer_class = RedApoyoSerializer

class RedApoyoRetrievelUpdateDestroyView (generics.RetrieveUpdateDestroyAPIView):
    queryset = RedApoyo.objects.all()
    serializer_class = RedApoyoSerializer
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """
class red_apoyo_viewsets (viewsets.ModelViewSet):
    serializer_class = RedApoyoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RedApoyoSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        red_apoyo = get_object_or_404(RedApoyo, id_red_apoyo=pk)
        serializer = self.get_serializer(red_apoyo, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 


# ConvivenciaVivienda
""" class ConvivenciaViviendaListCreateView(generics.ListCreateAPIView):
    queryset = ConvivenciaVivienda.objects.all()
    serializer_class = ConvivenciaViviendaSerializer

class ConvivenciaViviendaRetrievelUpdateDestroyView (generics.RetrieveUpdateDestroyAPIView):
    queryset = ConvivenciaVivienda.objects.all()
    serializer_class = ConvivenciaViviendaSerializer
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """
class convivencia_vivienda_viewsets (viewsets.ModelViewSet):
    serializer_class = ConvivenciaViviendaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ConvivenciaViviendaSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        convivencia_vivienda = get_object_or_404(ConvivenciaVivienda, id_convivencia_vivienda=pk)
        serializer = self.get_serializer(convivencia_vivienda, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

# FuenteIngresos
""" class FuenteIngresosListCreateView(generics.ListCreateAPIView):
    queryset = FuenteIngresos.objects.all()
    serializer_class = FuenteIngresosSerializer

class FuenteIngresosRetrievelUpdateDestroyView (generics.RetrieveUpdateDestroyAPIView):
    queryset = FuenteIngresos.objects.all()
    serializer_class = FuenteIngresosSerializer
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """
class fuente_ingresos_viewsets (viewsets.ModelViewSet):
    serializer_class = FuenteIngresosSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FuenteIngresosSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        fuente_ingresos = get_object_or_404(FuenteIngresos, id_fuente_ingresos=pk)
        serializer = self.get_serializer(fuente_ingresos, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

# AcompanamientoRecibido
class acompanamiento_recibido_viewsets (viewsets.ModelViewSet):
    serializer_class = AcompanamientoRecibidoSerializer
    queryset = AcompanamientoRecibidoSerializer.Meta.model.objects.all()

    def partial_update(self, request, *args, **kwargs):
        print("EL PEPEPPE")
        return super().partial_update(request, *args, **kwargs)

    def update(self, request, pk=None, *args, **kwargs):
        acompanamiento_recibido = get_object_or_404(AcompanamientoRecibido, id_acompanamiento_recibido=pk)
        serializer = self.get_serializer(acompanamiento_recibido, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)

    def create(self, request: Request, *args, **kwargs):
        id_persona = request.data.get("id_persona")
        # print(request.data)
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_general = get_object_or_404(InformacionGeneral, id_persona=persona)
        print(informacion_general.id_informacion_general)
        # serializer = InformacionGeneralSerializer(informacion_general)
        return super().create(request, id_informacion_general=informacion_general.id_informacion_general, *args, **kwargs)
        # if serializer.is_valid(raise_exception=True):  
        #     self.create(serializer)
        #     return Response(serializer.data)
        # return Response(serializer.errors) 

# ActividadTiempoLibre
""" class ActividadTiempoLibreListCreateView(generics.ListCreateAPIView):
    queryset = ActividadTiempoLibre.objects.all()
    serializer_class = ActividadTiempoLibreSerializer
   
class ActividadTiempoLibreRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActividadTiempoLibre.objects.all()
    serializer_class = ActividadTiempoLibreSerializer 
    
    def get_serializer(self, *args, **kwargs): #! Para poder realizar las actualizaciones sin necesidad de todos los atributos
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """
class actividad_tiempo_libre_viewsets (viewsets.ModelViewSet):
    serializer_class = ActividadTiempoLibreSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ActividadTiempoLibreSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        actividad_tiempo_libre = get_object_or_404(ActividadTiempoLibre, id_actividad_tiempo_libre=pk)
        serializer = self.get_serializer(actividad_tiempo_libre, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 
  
# OcupacionActual
""" class OcupacionActualListCreateView(generics.ListCreateAPIView):
    queryset = OcupacionActual.objects.all()
    serializer_class = OcupacionActualSerializer
   
class OcupacionActualRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OcupacionActual.objects.all()
    serializer_class = OcupacionActualSerializer """

class ocupacion_actual_viewsets (viewsets.ModelViewSet):
    serializer_class = OcupacionActualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = OcupacionActualSerializer.Meta.model.objects.all()

# ProfesionalQueBrindoAtencion
class profesional_que_brindo_atencion_viewsets (viewsets.ModelViewSet):
    serializer_class = ProfesionalQueBrindoAtencionSerializer
    queryset = ProfesionalQueBrindoAtencionSerializer.Meta.model.objects.all()
  
# InformacionGeneral
""" class InformacionGeneralListCreateView(generics.ListCreateAPIView):
    queryset = InformacionGeneral.objects.all()
    serializer_class = InformacionGeneralSerializer

class InformacionGeneralRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InformacionGeneral.objects.all()
    serializer_class = InformacionGeneralSerializer
    lookup_field = 'id_persona'
    
    def get_object(self):
        id_persona = self.kwargs['id_persona'] 
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_academica = get_object_or_404(InformacionGeneral, id_persona=persona)
        return informacion_academica
    
    def put(self, request, *args, **kwargs):
        id_persona = self.kwargs['id_persona']
        persona = Persona.objects.get(numero_documento=id_persona)
        informacion_academica = InformacionGeneral.objects.get(id_persona=persona)
        serializer = self.get_serializer(informacion_academica, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
      
    def delete(self):
        id_persona = self.kwargs['id_persona']
        persona = Persona.objects.get(numero_documento=id_persona)
        informacion_academica = InformacionGeneral.objects.get(id_persona=persona)
        self.perform_destroy(informacion_academica)
        return Response(status.HTTP_204_NO_CONTENT) """
        
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
