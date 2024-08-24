from django.shortcuts import get_object_or_404

from .models import Persona, PertenenciaGrupoPoblacional
from .serializers import PersonaSerializer, PertenenciaGrupoPoblacionalSerializer, TipoDocumentoSerializer
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
    
class pertenencia_grupo_poblacional_viewsets (viewsets.ModelViewSet):
    serializer_class = PertenenciaGrupoPoblacionalSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PertenenciaGrupoPoblacionalSerializer.Meta.model.objects.all()

class tipo_documento_viewsets (viewsets.ModelViewSet):
    serializer_class = TipoDocumentoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = TipoDocumentoSerializer.Meta.model.objects.all()