from ast import And
from operator import and_
from queue import Empty
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, act_simultanea, cond_excepcion, discap_men, estado_civil,  etnia, identidad_gen
from modulo_geografico.models import barrio, departamento, municipio
from modulo_programa.models import programa_estudiante, programa
from modulo_instancia.models import semestre
from modulo_asignacion.models import asignacion
from modulo_seguimiento.models import inasistencia, seguimiento_individual
from modulo_academico.models import profesor, matricula, historial_academico, materia

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import historial_academico_serializer, materia_serializer, profesor_serializer, matricula_serializer, matricula_serializer, items_historico_serializer, items_semestre_serializer, notas_historico_serializer, notas_semestre_serializer

from modulo_programa.serializers import  programa_estudiante_serializer, programa_serializer, facultad_serializer
from modulo_instancia.serializers import semestre_serializer
from modulo_asignacion.serializers import asignacion_serializer
from modulo_seguimiento.serializers import seguimiento_individual_serializer, inasistencia_serializer
from modulo_usuario_rol.serializers import estudiante_serializer

from django.contrib.auth.hashers import make_password
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import action



class lista_de_facultades_viewsets(viewsets.ModelViewSet):
    serializer_class = facultad_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = facultad_serializer.Meta.model.objects.all()

    @action(detail=False, methods=['get'])
    def list_profesores(self, request):
        queryset = facultad_serializer.objects.all()
        serializer = facultad_serializer(queryset, many=True)
        return Response(serializer.data)




class cursos_facultad_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    queryset = materia_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(facultad=pk).order_by('codigo').distinct('codigo')

        for curso_obj in cursos_de_la_facultad:
            serializer = materia_serializer(curso_obj)
            # serialized_curso = serializer.data
            diccionario_curso = {"tipo_dato":"curso",}
            data_curso = dict(serializer.data, **diccionario_curso)
            list_cursos.append(data_curso)

        return Response(list_cursos)




class franja_curso_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    queryset = materia_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(codigo = pk).distinct('franja')

        for curso_obj in cursos_de_la_facultad:
            serializer = materia_serializer(curso_obj)
            # serialized_curso = serializer.data
            diccionario_franja = {"tipo_dato":"franja",}
            data_franja = dict(serializer.data, **diccionario_franja)
            list_cursos.append(data_franja)

        return Response(list_cursos)




class profesores_del_curso_viewsets(viewsets.ModelViewSet):
    serializer_class = profesor_serializer
    queryset = profesor.objects.all()

    def list(self, request):
        list_profesores = []

        curso_param = request.GET.get('curso')
        franja_param = request.GET.get('franja')

        profesores_ids = list(materia.objects.filter(codigo=curso_param, franja=franja_param).values('id_profesor', 'id'))

        for i in profesores_ids:
            profesor_id = i['id_profesor']
            curso_del_profesor = i['id']
            profesor = profesor.objects.get(id=profesor_id)
            serializer = profesor_serializer(profesor)
            diccionario_franja = {"tipo_dato" : "profesor",
                                    "curso_del_profesor" : curso_del_profesor}
            data_franja = dict(serializer.data, **diccionario_franja)
            list_profesores.append(data_franja)

        return Response(list_profesores)



class alumnos_del_profesor_viewsets(viewsets.ModelViewSet):
    serializer_class = matricula_serializer
    queryset = matricula_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_estudiantes = []
        estudiantes_ids = matricula.objects.filter(id_curso = pk)

        for i in estudiantes_ids:
            serializer = matricula_serializer(i)
            estudiante_info = estudiante.objects.filter(id = serializer.data['id_estudiante']).values('id', 'nombre', 'apellido', 'cod_univalle')
            diccionario_estudiante = {"tipo_dato":"estudiante"}
            diccionario_estudiante.update(estudiante_info[0])  # Agregar los datos de estudiante_info al diccionario
            data_estudainte = dict(serializer.data, **diccionario_estudiante)
            list_estudiantes.append(data_estudainte)
            print(list_estudiantes)


        return Response(list_estudiantes)





class lista_historiales_academicos_viewsets(viewsets.ModelViewSet):
    serializer_class = historial_academico_serializer
    queryset = historial_academico_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_semestres_total = []
        semestres_ids = semestre.objects.all()

        for i in semestres_ids:
            list_semestres = []
            serializer = semestre_serializer(i)
            historial_academico_estudiante = historial_academico_serializer.objects.filter(id_estudiante = pk, id_semestre = serializer.data['id'])
            serializer_historial = historial_academico_serializer(historial_academico_estudiante, many=True)

            semestre_data = serializer.data

            # list_semestres.append(serializer)
            # list_semestres.append(serializer_historial)

            list_semestres_total.append([semestre_data, serializer_historial.data])

        return Response(list_semestres_total)

class lista_historiales_academicos_viewsets(viewsets.ModelViewSet):
    serializer_class = historial_academico_serializer
    queryset = historial_academico_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_semestres_total = []
        semestres_ids = semestre.objects.all().order_by('-id')

        for i in semestres_ids:
            list_semestres = []
            serializer = semestre_serializer(i)
            historial_academico_estudiante = historial_academico_serializer.objects.filter(id_estudiante=pk, id_semestre=serializer.data['id'])
            serializer_historial = historial_academico_serializer(historial_academico_estudiante, many=True)

            semestre_data = serializer.data

            list_semestres_total.append([semestre_data, serializer_historial.data[0] if serializer_historial.data else {}])

        return Response(list_semestres_total)
