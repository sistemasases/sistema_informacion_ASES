from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import DiversidadSexual, Pronombre, IdentidadGenero, ExpresionGenero, OrientacionSexual, RespuestaCambioDocumento
from .serializers import DiversidadSexualSerializer,PronombreSerializer, IdentidadGeneroSerializer, ExpresionGeneroSerializer, OrientacionSexualSerializer, RespuestaCambioDocumentoSerializer
from app_registro.serializers import PersonaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from app_registro.models import Persona 
from rest_framework import viewsets

# RespuestaCambioDocumento
from rest_framework.permissions import AllowAny, IsAuthenticated

class respuesta_cambio_documento_viewsets(viewsets.ModelViewSet):
    serializer_class = RespuestaCambioDocumentoSerializer
    queryset = RespuestaCambioDocumentoSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class orientacion_sexual_viewsets(viewsets.ModelViewSet):
    serializer_class = OrientacionSexualSerializer
    queryset = OrientacionSexualSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class expresion_genero_viewsets(viewsets.ModelViewSet):
    serializer_class = ExpresionGeneroSerializer
    queryset = ExpresionGeneroSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class identidad_genero_viewsets(viewsets.ModelViewSet):
    serializer_class = IdentidadGeneroSerializer
    queryset = IdentidadGeneroSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class pronombre_viewsets(viewsets.ModelViewSet):
    serializer_class = PronombreSerializer
    queryset = PronombreSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


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
    
    def get_permissions(self):
        if self.action == 'create':  # Solo para el método POST (crear)
            self.permission_classes = [AllowAny]  # Permite acceso sin autenticación
        else:
            self.permission_classes = [IsAuthenticated]  # Requiere autenticación para otros métodos
        return super().get_permissions()   
    
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