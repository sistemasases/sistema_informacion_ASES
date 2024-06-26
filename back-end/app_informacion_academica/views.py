from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from app_registro.models import Persona
from .models import InformacionAcademica, Estamento
from .serializers import InformacionAcademicaSerializer, EstamentoSerializer
from rest_framework import viewsets 

# Estamento
""" class EstamentoListCreateView(generics.ListCreateAPIView):
    queryset = Estamento.objects.all()
    serializer_class = EstamentoSerializer
    
class EstamentoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Estamento.objects.all()
    serializer_class = EstamentoSerializer """
    
class estamento_viewsets(viewsets.ModelViewSet):
    serializer_class = EstamentoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = EstamentoSerializer.Meta.model.objects.all()
    

# InformacionAcademica
""" class InformacionAcademicaListCreateView(generics.ListCreateAPIView):
    queryset = InformacionAcademica.objects.all()
    serializer_class = InformacionAcademicaSerializer

class InformacionAcademicaRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InformacionAcademica.objects.all()
    serializer_class = InformacionAcademicaSerializer
    lookup_field = 'id_persona'
    
    def get_object(self):
        id_persona = self.kwargs['id_persona'] 
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_academica = get_object_or_404(InformacionAcademica, id_persona=persona)
        return informacion_academica
    
    def put(self, request, *args, **kwargs):
        id_persona = self.kwargs['id_persona']
        persona = Persona.objects.get(numero_documento=id_persona)
        informacion_academica = InformacionAcademica.objects.get(id_persona=persona)
        serializer = self.get_serializer(informacion_academica, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
      
    def delete(self):
        id_persona = self.kwargs['id_persona']
        persona = Persona.objects.get(numero_documento=id_persona)
        informacion_academica = InformacionAcademica.objects.get(id_persona=persona)
        self.perform_destroy(informacion_academica)
        return Response(status.HTTP_204_NO_CONTENT) """

class informacion_academica_viewsets(viewsets.ModelViewSet):
    serializer_class = InformacionAcademicaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = InformacionAcademicaSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def retrieve(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_academica = get_object_or_404(InformacionAcademica, id_persona=persona)
        informacion_academica_serializer = InformacionAcademicaSerializer(informacion_academica)
        return Response(informacion_academica_serializer.data)
    
    def update(self, request, id_persona=None):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_academica = get_object_or_404(InformacionAcademica, id_persona=persona)
        serializer = self.get_serializer(informacion_academica, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def destroy(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(Persona, numero_documento=id_persona)
        informacion_academica = get_object_or_404(InformacionAcademica, id_persona=persona)
        self.perform_destroy(informacion_academica)
        return Response(status=status.HTTP_204_NO_CONTENT)
