"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define dos viewsets, 'instancia_viewsets' y 'semestre_viewsets', los cuales manejan las operaciones CRUD
para los modelos de 'instancia' y 'semestre' usando sus respectivos serializers. 'semestre_viewsets' también define métodos adicionales
para la creación, actualización y recuperación del actual objeto 'semestre' basado en el parametro 'id_instancia_id'.
"""

from .models import semestre
from rest_framework.response import Response
from .serializers import  semestre_serializer, instancia_serializer
from rest_framework import viewsets

class instancia_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'instancia'.
    """
    serializer_class = instancia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = instancia_serializer.Meta.model.objects.all()

class semestre_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'semestre'.
    """
    serializer_class = semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        """
        Recupera la información del 'semestre' actual para una instancia especifica.
        """
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual)
        return Response (semestreActual_serializer.data)

    def create(self, request, pk=None):
        """
        Crea un nuevo 'semestre' para una instancia especifica.
        """
        semestreActual_serializer = semestre_serializer(data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

    def update(self, request, pk):
        """
        Actualiza la información del 'semestre' actual para una instancia especifica.
        """
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual, data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)
