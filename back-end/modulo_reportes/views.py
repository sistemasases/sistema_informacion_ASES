from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre
from django.shortcuts import render, get_object_or_404


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):
        usuario_rol = request.data["usuario_rol"]
        print(usuario_rol)
        var_semestre = get_object_or_404(semestre, semestre_actual = True)
        list_estudiantes = list()
        list_monitores = list()
        list_practicantes = list()
        if usuario_rol == "monitor":
            for id_estudiante in asignacion.objects.filter(id_usuario=pk, id_semestre =var_semestre.id, estado = True ).values():
                var_estudiante = estudiante.objects.get(id= id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)

        elif usuario_rol == "Practicante":
            return Response("caso no encontrado")

        elif usuario_rol == "Profesional":
            return Response("caso no encontrado")

        elif usuario_rol == "Dir_socioed_reg":
            return Response("caso no encontrado")

        elif usuario_rol == "Dir_programa":
            return Response("caso no encontrado")

        elif usuario_rol == "Vc_academico":
            return Response("caso no encontrado")

        else:
            return Response("caso no encontrado")

