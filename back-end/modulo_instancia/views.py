"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define dos viewsets, 'sede_viewsets' y 'semestre_viewsets', los cuales manejan las operaciones CRUD
para los modelos de 'sede' y 'semestre' usando sus respectivos serializers. 'semestre_viewsets' también define métodos adicionales
para la creación, actualización y recuperación del actual objeto 'semestre' basado en el parametro 'id_sede_id'.
"""

from .models import semestre
from rest_framework.response import Response
from .serializers import  semestre_serializer, sede_serializer, cohorte_serializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

class sede_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'sede'.
    """
    serializer_class = sede_serializer
    permission_classes = (IsAuthenticated,)
    queryset = sede_serializer.Meta.model.objects.all()

class semestre_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'semestre'.
    """
    serializer_class = semestre_serializer
    permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    @action(detail=True, methods=['get'], url_path='semestre_sede')
    def semestre_sede(self, request, pk=None):
        lista_semestres_sede = semestre.objects.filter(id_sede = pk).distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_semestres_sede, many=True)
        return Response(respuesta.data)

    def list(self, request):
        lista_sedes_discapacidad = semestre.objects.filter().distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_sedes_discapacidad, many=True)
        return Response(respuesta.data)
    def retrieve(self, request, pk=None):
        """
        Recupera la información del 'semestre' actual para una sede especifica.
        """
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_sede_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual)
        return Response (semestreActual_serializer.data)

    def create(self, request, pk=None):
        """
        Crea un nuevo 'semestre' para una sede especifica.
        """
        semestreActual_serializer = semestre_serializer(data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

    def update(self, request, pk):
        """
        Actualiza la información del 'semestre' actual para una sede especifica.
        """
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_sede_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual, data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

class cohorte_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'cohorte'.
    """
    serializer_class = cohorte_serializer
    permission_classes = (IsAuthenticated,)
    queryset = cohorte_serializer.Meta.model.objects.all()