from django.shortcuts import render
from django.db.models import Prefetch
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated

from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_discapacidad.serializers import estudiante_extra_serializer
from modulo_programa.models import programa_estudiante,programa


class ListaEstudiantesDiscapacidad(generics.ListAPIView):
    queryset = estudiante.objects.filter(es_discapacidad=True)
    serializer_class = estudiante_serializer
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [IsAuthenticated]


class DatosExtraEstudiantesDiscapacidad(generics.ListAPIView):
    authentication_classes = [JWTTokenUserAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        query_programa = programa_estudiante.objects.select_related('id_programa__id_sede')

        prefetch = Prefetch(
            'id_estudiante_in_programa_estudiante',
            query_programa,
            to_attr="programas")

        queryset = estudiante.objects \
            .select_related('discapacidad') \
            .prefetch_related(prefetch) \
            .filter(es_discapacidad=True)

        serializer = estudiante_extra_serializer(queryset, many=True)
        return Response(serializer.data)
