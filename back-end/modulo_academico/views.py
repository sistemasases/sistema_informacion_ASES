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
from modulo_academico.models import matricula, historial_academico, materia, items_semestre, notas_semestre
from modulo_formularios_externos.models import asistencia

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import *

from modulo_programa.serializers import programa_estudiante_serializer, programa_serializer, facultad_serializer
from modulo_instancia.serializers import semestre_serializer
from modulo_asignacion.serializers import asignacion_serializer
from modulo_seguimiento.serializers import seguimiento_individual_serializer, inasistencia_serializer
from modulo_usuario_rol.serializers import estudiante_serializer, user_serializer, usuario_rol_serializer
from modulo_academico.serializers import monitoria_academica_serializer, asistencia_serializer_lista, asistencia_serializer_fecha
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from rest_framework.decorators import action

class monitorias_viewset(viewsets.ModelViewSet):
    serializer_class = monitoria_academica_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = monitoria_academica_serializer.Meta.model.objects.all()

    @action(detail=False, methods=['post'], url_path='lista_asistencia')
    def lista_asistencia(self, request, pk=None):
        if (request.data["rol"] == "monitor_academico"):
            monitoria_monitor = monitoria_academica.objects.filter(id_monitor=request.data["id_user"]).first()
            lista_asistencia = asistencia.objects.filter(fecha=request.data["fecha"], id_monitoria=monitoria_monitor)
            serializer_asistencia = asistencia_serializer_lista(lista_asistencia,many=True)
            return Response(serializer_asistencia.data, status=status.HTTP_200_OK)

        else:
            lista_asistencia = asistencia.objects.filter(fecha=request.data["fecha"])
            serializer_asistencia = asistencia_serializer_lista(lista_asistencia,many=True)
            return Response(serializer_asistencia.data, status=status.HTTP_200_OK)
        
    @action(detail=False, methods=['post'], url_path='fecha_asistencia')
    def fecha_asistencia(self, request, pk=None):

        fecha_ini = request.data["fecha_ini"]
        fecha_final = request.data["fecha_final"]
        lista_asistencia = asistencia.objects.filter(fecha__range=[fecha_ini, fecha_final],)
        serializer_asistencia = asistencia_serializer_fecha(lista_asistencia,many=True)
        return Response(serializer_asistencia.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='check_asistencia')
    def check_asistencia(self, request, pk=None):

        asistencias_data = request.data
        # Para mantener un registro de los resultados de cada actualización
        updated_asistencias = []
        errores = []

        # Iteramos sobre cada item de la lista
        for asistencia_data in asistencias_data:
            try:
                # Obtener la asistencia por su ID
                asistencia_instance = asistencia.objects.get(id=asistencia_data['id'])

                # Actualizar los campos de la asistencia
                asistencia_instance.check_asistencia = asistencia_data.get("check_asistencia", asistencia_instance.check_asistencia)
                # Guardar cambios
                asistencia_instance.save()

                # Serializamos la asistencia actualizada y la agregamos a la lista de resultados
                serializer_asistencia = asistencia_serializer(asistencia_instance)
                updated_asistencias.append(serializer_asistencia.data)

            except asistencia.DoesNotExist:
                # Si la asistencia no existe, agregamos el error con el ID correspondiente
                errores.append({"error": f"Asistencia con id {asistencia_data['id']} no encontrada"})

        # Si hubo errores, los incluimos en la respuesta junto con las asistencias actualizadas
        if errores:
            return Response({
                "actualizadas": updated_asistencias,
                "errores": errores
            }, status=status.HTTP_207_MULTI_STATUS)

        # Si no hubo errores, devolvemos solo las asistencias actualizadas
        return Response(updated_asistencias, status=status.HTTP_200_OK)
class lista_de_facultades_viewsets(viewsets.ModelViewSet):
    serializer_class = facultad_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = facultad_serializer.Meta.model.objects.all()

    @action(detail=False, methods=['get'])
    def list_facultades(self, request):
        queryset = facultad_serializer.objects.all()
        serializer = facultad_serializer(queryset, many=True)
        return Response(serializer.data)


class lista_de_profesores_viewsets(viewsets.ModelViewSet):
    serializer_class = user_serializer
    queryset = user_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        nombre_rol = rol.objects.get(nombre='profesor')
        # Obtener los registros de usuario_rol que tengan el rol de "Profesor"
        profesores = usuario_rol.objects.filter(
            id_rol=nombre_rol.id).values('id_usuario_id')

        # Obtener los IDs de los profesores
        lista_profesores_ids = [profesor['id_usuario_id']
                                for profesor in profesores]

        # Filtrar los profesores según la relación con la materia
        profesores_con_materia = materia.objects.filter(
            id_profesor__in=lista_profesores_ids, id_sede=pk)

        # Obtener los IDs de los profesores que tienen relación con alguna materia
        profesores_con_materia_ids = [
            profesor_materia.id_profesor_id for profesor_materia in profesores_con_materia]

        # Filtrar los profesores según los IDs obtenidos
        lista_profesores = User.objects.filter(
            id__in=profesores_con_materia_ids)

        serializer = user_serializer(lista_profesores, many=True)
        return Response(serializer.data)


class cursos_facultad2_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = materia_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(
            id_facultad=pk).order_by('cod_materia')

        for curso_obj in cursos_de_la_facultad:
            serializer = materia_serializer(curso_obj)
            # serialized_curso = serializer.data
            diccionario_curso = {"tipo_dato": "curso", }
            data_curso = dict(serializer.data, **diccionario_curso)
            list_cursos.append(data_curso)

        return Response(list_cursos)


class cursos_facultad_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = materia_serializer.Meta.model.objects.all()

    def list(self, request):
        list_cursos = []

        cursos_de_la_facultad = materia.objects.all().order_by('cod_materia', 'franja')
        materias_dict = {}

        for curso_obj in cursos_de_la_facultad:
            # Crea una clave única para cada materia usando cod_materia y franja
            clave_unica = f"{curso_obj.cod_materia}"
            # Si la materia ya ha sido agregada al diccionario, omítela
            if clave_unica in materias_dict:
                continue
            serializer = materia_serializer(curso_obj)
            diccionario_curso = {
                "id": serializer.data['id'],
                "cod_materia": serializer.data['cod_materia'],
                "nombre": serializer.data['nombre'],
                "franja": serializer.data['franja'],
                "id_sede": serializer.data['id_sede'],
                "id_facultad": serializer.data['id_facultad'],
                "tipo_dato": "curso"
            }
            list_cursos.append(diccionario_curso)
            # Agrega la clave única al diccionario auxiliar
            materias_dict[clave_unica] = True

        return Response(list_cursos)

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(
            id_sede=pk).order_by('cod_materia', 'franja')
        # Diccionario auxiliar para mantener un registro de las materias
        materias_dict = {}

        for curso_obj in cursos_de_la_facultad:
            # Crea una clave única para cada materia usando cod_materia y franja
            clave_unica = f"{curso_obj.cod_materia}_{curso_obj.franja}"
            # Si la materia ya ha sido agregada al diccionario, omítela
            if clave_unica in materias_dict:
                continue
            serializer = materia_serializer(curso_obj)
            diccionario_curso = {
                "id": serializer.data['id'],
                "cod_materia": serializer.data['cod_materia'],
                "nombre": serializer.data['nombre'],
                "franja": serializer.data['franja'],
                "id_sede": serializer.data['id_sede'],
                "id_facultad": serializer.data['id_facultad'],
                "tipo_dato": "curso"
            }
            list_cursos.append(diccionario_curso)

            # Agrega la clave única al diccionario auxiliar
            materias_dict[clave_unica] = True

        return Response(list_cursos)


class traer_cursos_del_profesor_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = materia_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(
            id_profesor=pk).order_by('cod_materia')

        for curso_obj in cursos_de_la_facultad:
            serializer = materia_serializer(curso_obj)
            # serialized_curso = serializer.data
            diccionario_curso = {"tipo_dato": "curso", }
            data_curso = dict(serializer.data, **diccionario_curso)
            list_cursos.append(data_curso)

        return Response(list_cursos)


class traer_cursos_del_estudiante_viewsets(viewsets.ModelViewSet):
    serializer_class = matricula_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = matricula_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_del_estudiante = matricula.objects.filter(id_estudiante=pk)

        for curso_obj in cursos_del_estudiante:
            serializer = matricula_serializer(curso_obj)
            curso_id = curso_obj.id_curso.id
            curso_data_obj = materia.objects.get(id=curso_id)
            serializer_curso = materia_serializer(curso_data_obj)
            # serialized_curso = serializer.data
            diccionario_curso = {"tipo_dato": "curso",
                                 "curso_data": serializer_curso.data}
            data_curso = dict(serializer.data, **diccionario_curso)
            list_cursos.append(data_curso)

        return Response(list_cursos)


class franja_curso_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = materia_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_cursos = []
        cursos_de_la_facultad = materia.objects.filter(
            cod_materia=pk).distinct('franja')

        for curso_obj in cursos_de_la_facultad:
            serializer = materia_serializer(curso_obj)
            # Obtén el ID numérico del profesor
            profesor_id = curso_obj.id_profesor.id
            profesor_obj = User.objects.get(id=profesor_id)
            serializer_profesor = user_serializer(profesor_obj)
            diccionario_franja = {"tipo_dato": "franja",
                                  "profesor_data": serializer_profesor.data}
            data_franja = dict(serializer.data, **diccionario_franja)
            list_cursos.append(data_franja)

        return Response(list_cursos)


class profesores_del_curso_sin_separar_por_franja_viewsets(viewsets.ModelViewSet):
    serializer_class = user_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        list_profesores = []
        items_a_pintar = []
        # curso_param = request.GET.get('curso')
        # franja_param = request.GET.get('franja')

        profesores_ids = list(materia.objects.filter(
            cod_materia=pk).values('id_profesor', 'id', 'franja'))

        for i in profesores_ids:
            profesor_id = i['id_profesor']
            curso_del_profesor = i['id']
            franja_del_curso = i['franja']
            profesor_obj = User.objects.get(id=profesor_id)
            serializer = user_serializer(profesor_obj)
            parcelacion = items_semestre.objects.filter(
                id_curso=curso_del_profesor, id_profesor=profesor_id)
            for j in parcelacion:
                serialiazer_items = items_semestre_serializer(j)
                items_a_pintar.append(serialiazer_items.data)

            diccionario_franja = {"tipo_dato": "profesor",
                                  "curso_del_profesor": curso_del_profesor,
                                  "franja_del_curso": franja_del_curso,
                                  "items_materia": items_a_pintar
                                  }
            data_franja = dict(serializer.data, **diccionario_franja)
            list_profesores.append(data_franja)

        return Response(list_profesores)


class profesores_del_curso_viewsets(viewsets.ModelViewSet):
    serializer_class = user_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def list(self, request):
        list_profesores = []
        items_a_pintar = []
        curso_param = request.GET.get('curso')
        franja_param = request.GET.get('franja')

        profesores_ids = list(materia.objects.filter(
            cod_materia=curso_param, franja=franja_param).values('id_profesor', 'id'))

        for i in profesores_ids:
            profesor_id = i['id_profesor']
            curso_del_profesor = i['id']
            profesor_obj = User.objects.get(id=profesor_id)
            serializer = user_serializer(profesor_obj)
            parcelacion = items_semestre.objects.filter(
                id_curso=curso_del_profesor, id_profesor=profesor_id)
            for j in parcelacion:
                serialiazer_items = items_semestre_serializer(j)
                items_a_pintar.append(serialiazer_items.data)

            diccionario_franja = {"tipo_dato": "profesor",
                                  "curso_del_profesor": curso_del_profesor,
                                  "items_materia": items_a_pintar
                                  }
            data_franja = dict(serializer.data, **diccionario_franja)
            list_profesores.append(data_franja)

        return Response(list_profesores)


class traer_materias_del_profesor_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    queryset = materia.objects.all()

    def retrieve(self, request, pk):
        try:
            # Obtener información del profesor con el ID dado
            info_profesor = usuario_rol.objects.get(
                id_usuario=pk, estado="ACTIVO")
            id_semestre = info_profesor.id_semestre_id

            # Filtrar las materias del profesor en el semestre actual
            lista_de_materias = materia.objects.filter(
                id_profesor=pk, id_semestre=id_semestre)

            # Serializar y devolver la lista de materias
            serializer = materia_serializer(lista_de_materias, many=True)
            return Response(serializer.data)
        except usuario_rol.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class datos_del_curso_viewsets(viewsets.ModelViewSet):
    serializer_class = items_semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = items_semestre.objects.all()

    def list(self, request):
        items_a_pintar = []
        curso_param = request.GET.get('curso_id')

        items_de_la_materia = list(
            items_semestre.objects.filter(id_curso=curso_param).values())

        return Response(items_de_la_materia)


class curso_datos_generales_viewsets(viewsets.ModelViewSet):
    serializer_class = materia_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = materia.objects.all()

    def retrieve(self, request, pk):

        curso_seleccionado = materia.objects.get(id=pk)

        serializer = materia_serializer(curso_seleccionado)

        return Response(serializer.data)


class alumnos_del_profesor_viewsets(viewsets.ModelViewSet):
    serializer_class = notas_semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = notas_semestre_serializer.Meta.model.objects.all()

    def list(self, request):
        curso_param = request.GET.get('curso')
        proferos_param = request.GET.get('profesor')
        list_estudiantes = []
        list_notas = []
        estudiantes_ids = matricula.objects.filter(id_curso=curso_param)

        for i in estudiantes_ids:
            serializer = matricula_serializer(i)
            estudiante_info = estudiante.objects.filter(id=serializer.data['id_estudiante']).values(
                'id', 'nombre', 'apellido', 'cod_univalle', 'num_doc')
            programa_est = programa_estudiante.objects.filter(
                id_estudiante=serializer.data['id_estudiante']).values('id_programa')
            programa_data = programa.objects.filter(
                id=programa_est[0]['id_programa']).values('codigo_univalle')

            dicc_programa = {"programa": programa_data[0]["codigo_univalle"]}

            parcelacion = items_semestre.objects.filter(
                id_curso=curso_param, id_profesor=proferos_param)
            list_notas = []

            for j in parcelacion:
                serialiazer_items = items_semestre_serializer(j)
                notas_del_estudiante = notas_semestre.objects.filter(
                    id_estudiante=serializer.data['id_estudiante'], id_item=serialiazer_items.data['id'])

                for k in notas_del_estudiante:
                    serializer_notas = notas_semestre_serializer(k)
                    diccionario_nombre = {
                        'nombre': serialiazer_items.data['nombre']}
                    data_notas = dict(serializer_notas.data,
                                      **diccionario_nombre)
                    list_notas.append(data_notas)

                diccionario_estudiante = {
                    "tipo_dato": "estudiante", "notas": list_notas}

            # Verificar si se ha definido la variable diccionario_estudiante antes de intentar actualizarla
            if 'diccionario_estudiante' not in locals():
                # Inicializar diccionario_estudiante con el campo "tipo_dato"
                diccionario_estudiante = {"tipo_dato": "estudiante"}

            # Agregar los datos de estudiante_info al diccionario
            diccionario_estudiante.update(estudiante_info[0])
            data_estudiante = dict(
                serializer.data, **dicc_programa, **diccionario_estudiante)
            list_estudiantes.append(data_estudiante)

        # Creamos un diccionario vacío para organizar los estudiantes.
        estudiante_por_apellido = {}

        for x in list_estudiantes:
            apellido = x['apellido']  # Obtenemos el apellido del estudiante.
            if apellido in estudiante_por_apellido:
                estudiante_por_apellido[apellido].append(x)
            else:
                estudiante_por_apellido[apellido] = [x]
        estudiantes_organizados = []
        for y in sorted(estudiante_por_apellido):
            lista_estudiantes = estudiante_por_apellido[y]
            for e in lista_estudiantes:

                estudiantes_organizados.append(e)
        return Response(estudiantes_organizados)


class notas_estudiantes_calificador_viewsets(viewsets.ModelViewSet):
    serializer_class = notas_semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = notas_semestre_serializer.Meta.model.objects.all()

    def list(self, request):

        curso_param = request.GET.get('curso')
        proferos_param = request.GET.get('profesor')

        list_estudiantes = []
        list_notas = []
        estudiantes_ids = matricula.objects.filter(id_curso=curso_param)

        for i in estudiantes_ids:
            serializer = matricula_serializer(i)
            estudiante_info = estudiante.objects.filter(id=serializer.data['id_estudiante']).values(
                'id', 'nombre', 'apellido', 'cod_univalle')

            parcelacion = items_semestre.objects.filter(
                id_curso=curso_param, id_profesor=proferos_param)

            for j in parcelacion:
                serialiazer_items = items_semestre_serializer(j)
                notas_del_estudiante = notas_semestre.objects.filter(
                    id_estudiante=serializer.data['id_estudiante'], id_item=serialiazer_items.data['id'])
                for k in notas_del_estudiante:
                    serializer_notas = notas_semestre_serializer(k)
                    diccionario_nombre = {
                        'nombre': serialiazer_items.data['nombre']}
                    data_notas = dict(serializer_notas.data,
                                      **diccionario_nombre)

                    list_notas.append(data_notas)

            diccionario_estudiante = {"tipo_dato": "estudiante",
                                      "notas": list_notas
                                      }
            # Agregar los datos de estudiante_info al diccionario
            diccionario_estudiante.update(estudiante_info[0])
            data_estudainte = dict(serializer.data, **diccionario_estudiante)
            list_estudiantes.append(data_estudainte)

        return Response(list_estudiantes)


class lista_historiales_academicos_viewsets(viewsets.ModelViewSet):
    serializer_class = historial_academico_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = historial_academico_serializer.Meta.model.objects.all()

    def list(self, request):
        list_semestres_total = []
        request_sede = int(request.GET.get('id_sede'))
        semestres_ids = semestre.objects.all().filter(
            id_sede=request_sede).order_by('-id')

        for i in semestres_ids:
            serializer = semestre_serializer(i)
            historial_academico_estudiante = historial_academico.objects.all()
            serializer_historial = historial_academico_serializer(
                historial_academico_estudiante, many=True)

            semestre_data = serializer.data

            list_semestres_total.append(serializer_historial.data)
            # list_semestres_total.append([semestre_data, serializer_historial.data[0] if serializer_historial.data else {}])

        return Response(list_semestres_total)

    def retrieve(self, request, pk=None):
        request_sede = int(request.GET.get('id_sede'))
        list_semestres_total = []
        semestres_ids = semestre.objects.all().filter(
            id_sede=request_sede).order_by('-id')

        for i in semestres_ids:
            serializer = semestre_serializer(i)
            historial_academico_estudiante = historial_academico.objects.filter(
                id_estudiante=pk, id_semestre=serializer.data['id'])
            serializer_historial = historial_academico_serializer(
                historial_academico_estudiante, many=True)

            semestre_data = serializer.data

            list_semestres_total.append(
                [semestre_data, serializer_historial.data[0] if serializer_historial.data else {}])

        return Response(list_semestres_total)


# Cear item y notas  ///  # Cear item y notas  ///# Cear item y notas  ///  # Cear item y notas  ///# Cear item y notas  ///  # Cear item y notas  ///# Cear item y notas  ///  # Cear item y notas  ///


class todo_nota_viewsets(viewsets.ModelViewSet):
    queryset = notas_semestre.objects.all()
    serializer_class = notas_semestre_serializer


class todo_item_viewsets(viewsets.ModelViewSet):
    queryset = items_semestre.objects.all()
    serializer_class = items_semestre_serializer


class reporte_calificador_viewsets(viewsets.ModelViewSet):
    queryset = materia.objects.all()
    serializer_class = materia_serializer_full

    def retrieve(self, request, pk=None):
        # Filtrar materias por la sede proporcionada en la URL
        materias = materia.objects.filter(id_sede=pk)
        
        # Si no se encuentran materias, retorna un error 404
        if not materias.exists():
            return Response({"detail": "Materias no encontradas"}, status=status.HTTP_404_NOT_FOUND)
        
        # Serializar las materias
        serializer = self.get_serializer(materias, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class reporte_calificador_estudiante_viewsets(viewsets.ModelViewSet):
    serializer_class = items_estudiante_serializer

    # def get_queryset(self):

    #     estudiantes =  estudiante.objects.filter(
    #         matricula__isnull=False  # Filtrar todos los estudiantes con matrícula, sin importar las notas
    #     ).distinct()

    #     return estudiantes

    def retrieve(self, request, pk=None):
        # Obtener el ID de la sede desde la URL
        sede_id = pk  # En `retrieve`, pk es el parámetro pasado en la URL

        # Filtrar los programas asociados a esa sede
        list_id_programas = programa.objects.filter(
            id_sede=sede_id).values_list('id', flat=True)

        # Obtener los estudiantes que están en esos programas
        list_id_estudiantes = programa_estudiante.objects.filter(
            id_programa__in=list_id_programas).values_list('id_estudiante', flat=True)

        # Filtrar los estudiantes elegibles y con matrícula
        estudiantes = estudiante.objects.filter(
            id__in=list_id_estudiantes,
            matricula__isnull=False  # Filtrar los estudiantes con matrícula
            , estudiante_elegible=True
        ).distinct()

        # Serializar los estudiantes filtrados
        serializer = self.get_serializer(estudiantes, many=True)

        # Retornar los estudiantes en la respuesta
        return Response(serializer.data, status=status.HTTP_200_OK)


class estudiantes_academicos_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante.objects.all()

    def retrieve(self, request, pk, *args, **kwargs):
        # data_sede = request.GET.get('sede')
        data_sede = pk

        list_estudiantes = list()

        list_id_programas = programa.objects.filter(
            id_sede=data_sede).values('id')
        list_id_estudiantes = programa_estudiante.objects.filter(
            id_programa__in=list_id_programas).values('id_estudiante')
        list_estudiantes = estudiante.objects.filter(
            id__in=list_id_estudiantes, estudiante_elegible=True)
        serializer_estudiantes = estudiante_serializer(
            list_estudiantes, many=True)

        return Response(serializer_estudiantes.data)
