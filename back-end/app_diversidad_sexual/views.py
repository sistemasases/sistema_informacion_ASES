from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import DiversidadSexual, Pronombre, IdentidadGenero, ExpresionGenero, OrientacionSexual, RespuestaCambioDocumento
from .serializers import DiversidadSexualSerializer,PronombreSerializer, IdentidadGeneroSerializer, ExpresionGeneroSerializer, OrientacionSexualSerializer, RespuestaCambioDocumentoSerializer
from app_registro.serializers import PersonaSerializer

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from app_registro.models import Persona 
from rest_framework import viewsets

# RespuestaCambioDocumento
""" class RespuestaCambioDocumentoListCreateView(generics.ListCreateAPIView):
    queryset = RespuestaCambioDocumento.objects.all()
    serializer_class = RespuestaCambioDocumentoSerializer
   
class RespuestaCambioDocumentoRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RespuestaCambioDocumento.objects.all()
    serializer_class = RespuestaCambioDocumentoSerializer """

class respuesta_cambio_documento_viewsets (viewsets.ModelViewSet):
    serializer_class = RespuestaCambioDocumentoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RespuestaCambioDocumentoSerializer.Meta.model.objects.all()

# OrientacionSexual
""" class OrientacionSexualListCreateView(generics.ListCreateAPIView):
    queryset = OrientacionSexual.objects.all()
    serializer_class = OrientacionSexualSerializer
   
class OrientacionSexualRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrientacionSexual.objects.all()
    serializer_class = OrientacionSexualSerializer """

class orientacion_sexual_viewsets (viewsets.ModelViewSet):
    serializer_class = OrientacionSexualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = OrientacionSexualSerializer.Meta.model.objects.all()

# ExpresionGenero
""" class ExpresionGeneroListCreateView(generics.ListCreateAPIView):
    queryset = ExpresionGenero.objects.all()
    serializer_class = ExpresionGeneroSerializer
    
class ExpresionGeneroRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExpresionGenero.objects.all()
    serializer_class = ExpresionGeneroSerializer """

class expresion_genero_viewsets (viewsets.ModelViewSet):
    serializer_class = ExpresionGeneroSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ExpresionGeneroSerializer.Meta.model.objects.all()

# IdentidadGenero
""" class IdentidadGeneroListCreateView(generics.ListCreateAPIView):
    queryset = IdentidadGenero.objects.all()
    serializer_class = IdentidadGeneroSerializer
    
class IdentidadGeneroRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IdentidadGenero.objects.all()
    serializer_class = IdentidadGeneroSerializer """

class identidad_genero_viewsets (viewsets.ModelViewSet):
    serializer_class = IdentidadGeneroSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = IdentidadGeneroSerializer.Meta.model.objects.all()

# Pronombre
""" class PronombreListCreateView(generics.ListCreateAPIView):
    queryset = Pronombre.objects.all()
    serializer_class = PronombreSerializer
    
class PronombreRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pronombre.objects.all()
    serializer_class = PronombreSerializer """

class pronombre_viewsets (viewsets.ModelViewSet):
    serializer_class = PronombreSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PronombreSerializer.Meta.model.objects.all()


# Diversidad Sexual
""" class DiversidadSexualListCreateView(generics.ListCreateAPIView):
    queryset = DiversidadSexual.objects.all()
    serializer_class = DiversidadSexualSerializer


class DiversidadSexualRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiversidadSexual.objects.all()
    serializer_class = DiversidadSexualSerializer
    lookup_field = 'id_persona'
    
    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)
    
    def get_object(self):
        id_persona = self.kwargs['id_persona']
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)
        return diversidad_sexual
    
    def put(self, request, *args, **kwargs):
        id_persona = self.kwargs['id_persona']
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)
        serializer = self.get_serializer(diversidad_sexual, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        id_persona = self.kwargs['id_persona']
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)
        self.perform_destroy(diversidad_sexual)
        return Response(status.HTTP_204_NO_CONTENT) """

class diversidad_sexual_viewsets (viewsets.ModelViewSet):
    serializer_class = DiversidadSexualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = DiversidadSexualSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
 
    def retrieve(self, request, id_persona=None): 
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)
        diversidad_sexual_serializer = DiversidadSexualSerializer(diversidad_sexual)
        return Response(diversidad_sexual_serializer.data) 
 
    def update(self, request, id_persona=None): 
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)  
        serializer = self.get_serializer(diversidad_sexual, data=request.data, partial=True) 
        if serializer.is_valid(raise_exception=True):  
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

    def destroy(self, request, id_persona=None):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        diversidad_sexual = get_object_or_404(DiversidadSexual, id_persona=persona)  
        self.perform_destroy(diversidad_sexual)
        return Response(status=status.HTTP_204_NO_CONTENT) 