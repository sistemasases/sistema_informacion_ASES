from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from .models import Seguimiento
from .serializers import SeguimientoSerializer
from app_registro.models import Persona
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import SeguimientoSerializer,ProfesionalSerializer
""" class SeguimientoListCreateView(generics.ListCreateAPIView):
    queryset = Seguimiento.objects.all()
    serializer_class = SeguimientoSerializer
    
class SeguimientoRetrievelUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Seguimiento.objects.all()
    serializer_class = SeguimientoSerializer
    
    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)
      
    # def get_object(self):
    #     id_persona = self.kwargs['id_persona']
    #     persona = get_object_or_404(Persona, numero_documento=id_persona)
    #     seguimientos = Seguimiento.objects.filter(numero_documento=persona)
    #     if seguimientos.exists():
    #         return seguimientos
    #     else:
    #         raise status.HTTP_404_NOT_FOUND  """
class profesional_viewsets (viewsets.ModelViewSet):
    serializer_class = ProfesionalSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ProfesionalSerializer.Meta.model.objects.all()



class SeguimientoViewSet(viewsets.ModelViewSet):
    serializer_class = SeguimientoSerializer
    queryset = Seguimiento.objects.all()

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        numero_documento = kwargs.get('pk')  # Asume que pk será el número de documento
        persona = get_object_or_404(Persona, numero_documento=numero_documento)
        seguimientos = Seguimiento.objects.filter(id_persona=persona)
        if not seguimientos.exists():
            return Response({'detail': 'No se encontraron seguimientos para esta persona.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = SeguimientoSerializer(seguimientos, many=True)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

