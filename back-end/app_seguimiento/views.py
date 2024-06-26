from django.shortcuts import get_object_or_404

from rest_framework import generics, status
from .models import Seguimiento
from .serializers import SeguimientoSerializer
from app_registro.models import Persona
from rest_framework.response import Response
from rest_framework import viewsets

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
    
class seguimiento_viewsets(viewsets.ModelViewSet):
    serializer_class = SeguimientoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = SeguimientoSerializer.Meta.model.objects.all()
    
    def update(self, request, *args, pk=None, **kwargs): 
        segumiento = get_object_or_404(Seguimiento, id_seguimiento=pk)
        serializer = self.get_serializer(segumiento, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)

     