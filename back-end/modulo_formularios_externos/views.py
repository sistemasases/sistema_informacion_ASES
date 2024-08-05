from modulo_instancia.models import sede
from rest_framework.response import Response
from modulo_instancia.serializers import sede_serializer
from modulo_programa.serializers import programa_serializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class sede_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'sede'.
    """
    serializer_class = sede_serializer

    queryset = sede_serializer.Meta.model.objects.all()


class enviar_programas_viewsets(viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'programa'.
    """
    serializer_class = sede_serializer

    queryset = programa_serializer.Meta.model.objects.all()
