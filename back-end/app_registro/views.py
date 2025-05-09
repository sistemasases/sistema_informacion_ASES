from django.shortcuts import get_object_or_404

from .models import Persona, PertenenciaGrupoPoblacional
from .serializers import PersonaSerializer, PertenenciaGrupoPoblacionalSerializer, TipoDocumentoSerializer, EstadoCivilSerializer, ZonaResidenciaSerializer, IdentidadEtnicoRacialSerializer, SexoAsignadoSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

# Persona
""" class PersonaListCreateView(generics.ListCreateAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class PersonaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    lookup_field = 'numero_documento'
    
    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs) """

class persona_viewsets (viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PersonaSerializer.Meta.model.objects.all()
    lookup_field = 'numero_documento'

    def get_permissions(self):
        if self.action == 'create':  # Solo para el método POST (crear)
            self.permission_classes = [AllowAny]  # Permite acceso sin autenticación
        else:
            self.permission_classes = [IsAuthenticated]  # Requiere autenticación para otros métodos
        return super().get_permissions()    
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def update(self, request, numero_documento=None): 
        persona = get_object_or_404(Persona, numero_documento=numero_documento)  
        serializer = self.get_serializer(persona, data=request.data, partial=True) 
        if serializer.is_valid(raise_exception=True):  
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

    """ def destroy(self, request, *args, **kwargs):
        return Response({
            "error": 'It\'s forbidden to do this action'
        }, status=status.HTTP_403_FORBIDDEN) """

# Pertenencia grupo poblacional

""" class PertenenciaGrupoPoblacionalListCreateView(generics.ListCreateAPIView):
    queryset = PertenenciaGrupoPoblacional.objects.all()
    serializer_class = PertenenciaGrupoPoblacionalSerializer

class PertenenciaGrupoPoblacionalRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PertenenciaGrupoPoblacional.objects.all()
    serializer_class = PertenenciaGrupoPoblacionalSerializer  """
    
class pertenencia_grupo_poblacional_viewsets(viewsets.ModelViewSet):
    serializer_class = PertenenciaGrupoPoblacionalSerializer
    queryset = PertenenciaGrupoPoblacionalSerializer.Meta.model.objects.all()

    def get_permissions(self):
        # `list` y `retrieve` son los métodos GET en DRF
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]  # Permitir acceso sin token solo para GET
        else:
            self.permission_classes = [IsAuthenticated]  # Requiere autenticación para POST, PUT, PATCH, DELETE
        return super().get_permissions()

class tipo_documento_viewsets(viewsets.ModelViewSet):
    serializer_class = TipoDocumentoSerializer
    queryset = TipoDocumentoSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]  # No requiere autenticación para GET
        else:
            self.permission_classes = [IsAuthenticated]  # Requiere autenticación para POST, PUT, etc.
        return super().get_permissions()


class estado_civil_viewsets(viewsets.ModelViewSet):
    serializer_class = EstadoCivilSerializer
    queryset = EstadoCivilSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class zona_residencia_viewsets(viewsets.ModelViewSet):
    serializer_class = ZonaResidenciaSerializer
    queryset = ZonaResidenciaSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class identidad_etnico_racial_viewsets(viewsets.ModelViewSet):
    serializer_class = IdentidadEtnicoRacialSerializer
    queryset = IdentidadEtnicoRacialSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()


class sexo_asignado_viewsets(viewsets.ModelViewSet):
    serializer_class = SexoAsignadoSerializer
    queryset = SexoAsignadoSerializer.Meta.model.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()