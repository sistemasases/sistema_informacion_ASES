from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from modulo_seguimiento.serializers import *
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, basic_estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cohorte_estudiante
from modulo_asignacion.models import asignacion
from modulo_asignacion.serializers import asignacion_serializer
from modulo_programa.models import programa_estudiante, programa, estado_programa
from modulo_programa.serializers import *
from modulo_seguimiento.models import *
from modulo_instancia.models import *
from modulo_instancia.serializers import semestre_serializer
from modulo_formularios_externos.models import asistencia
from modulo_academico.models import monitoria_academica
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import (
    Case,
    CharField,
    Count,
    F,
    IntegerField,
    OuterRef,
    Q,
    Subquery,
    Sum,
    TextField,
    Value,
    When,
)
from django.db.models.functions import Coalesce, Concat
from django.contrib.postgres.aggregates import StringAgg
from modulo_seguimiento.utils.csv_utils import escape_quotes

from operator import and_
from functools import reduce
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from django.views import View
from django.shortcuts import get_object_or_404
from django.core.exceptions import MultipleObjectsReturned

import csv
from django.http import HttpResponse
from modulo_seguimiento.utils.csv_export import ExportarCSVBaseView
from .filters import build_filtros

# Create your views here.


class seguimiento_individual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    @action(detail=True, methods=['get'], url_path='trayectoria')
    def trayectoria(self, request, pk):
        request_sede = int(request.GET.get('id_sede'))
        list_semestre = semestre.objects.all().get(
            semestre_actual=True, id_sede=request_sede)
        fecha_inicio_semestre = list_semestre.fecha_inicio

        listas = []
        fechas = []
        riesgo_individual = []
        riesgo_familiar = []
        riesgo_academico = []
        riesgo_economico = []
        riesgo_vida_universitaria_ciudad = []

        try:
            seguimiento_reciente = seguimiento_individual.objects.filter(
                id_estudiante=pk, fecha__gt=fecha_inicio_semestre
            ).order_by('fecha')
            for i in seguimiento_reciente:
                seguimiento = seguimiento_individual_serializer(i)
                fechas.append(seguimiento.data['fecha'])
                riesgo_individual.append(seguimiento.data['riesgo_individual'])
                riesgo_familiar.append(seguimiento.data['riesgo_familiar'])
                riesgo_academico.append(seguimiento.data['riesgo_academico'])
                riesgo_economico.append(seguimiento.data['riesgo_economico'])
                riesgo_vida_universitaria_ciudad.append(
                    seguimiento.data['riesgo_vida_universitaria_ciudad'])

            fechas_lista = {'fechas': fechas}
            riesgo_individual_lista = {'riesgo_individual': riesgo_individual}
            riesgo_familiar_lista = {'riesgo_familiar': riesgo_familiar}
            riesgo_academico_lista = {'riesgo_academico': riesgo_academico}
            riesgo_economico_lista = {'riesgo_economico': riesgo_economico}
            riesgo_vida_universitaria_ciudad_lista = {
                'riesgo_vida_universitaria_ciudad': riesgo_vida_universitaria_ciudad}

            listas.append(fechas_lista)
            listas.append(riesgo_individual_lista)
            listas.append(riesgo_familiar_lista)
            listas.append(riesgo_academico_lista)
            listas.append(riesgo_economico_lista)
            listas.append(riesgo_vida_universitaria_ciudad_lista)
            return Response(listas)
        except seguimiento_individual.DoesNotExist:
            return Response({})


class inasistencia_viewsets (viewsets.ModelViewSet):
    serializer_class = inasistencia_serializer
    permission_classes = (IsAuthenticated,)
    queryset = inasistencia_serializer.Meta.model.objects.all()


class riesgo_individual_viewsets (viewsets.ModelViewSet):
    serializer_class = riesgo_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = riesgo_individual_serializer.Meta.model.objects.all()


class seguimientos_estudiante_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final = []
        request_sede = int(request.GET.get('id_sede'))
        list_seguimientos_individual = list(
            seguimiento_individual.objects.filter(id_estudiante=pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante=pk))

        for i in list_inasistencia:
            serializer_inasistencia = inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual:
            serializer_seguimiento_individual = seguimiento_individual_serializer(
                i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'], reverse=True)
        list_semestre = list(semestre.objects.all().filter(
            id_sede=request_sede).order_by('-fecha_inicio'),)
        for i in list_semestre:
            lista_semestre = []
            serializer_semestre = semestre_serializer(i)
            dicccionario = {
                "nombre": serializer_semestre.data['nombre'], "Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            if (len(lista_semestre) >= 2):
                list_final.append(lista_semestre)
        return Response(list_final, status=status.HTTP_200_OK)


class ficha_consulta_academico_viewsets (viewsets.ViewSet):
    @action(detail=False, methods=['post'], url_path='consulta_academico',
            # permission_classes=[IsAuthenticated]
            )
    def consulta_academico(self, request):
        """
        Recibes:
        {
            "id_estudiante": 2222222,
            "semestre_actual": 2025B,
            "id_sede": 1
        }
        """
        # print(request.data)
        try:
            semestre_data = semestre.objects.get(
                nombre=request.data['semestre_actual'],
                id_sede=request.data['id_sede']
            )
        except semestre.DoesNotExist:
            return Response({"error": "Semestre no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except MultipleObjectsReturned:
            return Response({"error": "Múltiples semestres encontrados"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Todas las asistencias del estudiante
            asistencias = asistencia.objects.filter(
                id_estudiante=request.data['id_estudiante']
            )

            # Solo las asistencias válidas (check_asistencia=True)
            asistencias_validas = asistencias.filter(check_asistencia=True)

            # Monitorías académicas asociadas
            monitorias = monitoria_academica.objects.filter(
                id__in=asistencias.values_list('id_monitoria', flat=True),
                estado=True,
                id_semestre=semestre_data.id
            ).select_related('id_monitor').values(
                'materia', 'id_monitor__first_name', 'id_monitor__last_name'
            )

        except monitoria_academica.DoesNotExist:
            return Response({"error": "Monitoria no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        asiste_monitorias = [{
            "asiste_monitoria": asistencias.exists(),
            "nombre_monitoria": [
                {"nombre": f"{m['materia']} - {m['id_monitor__first_name']} {m['id_monitor__last_name']}"}
                for m in monitorias
            ],
            "cantidad_asistencias": asistencias_validas.count(),
            "fecha_ult_asistencia": asistencias_validas.latest('fecha').fecha
            if asistencias_validas.exists() else None
        }]

        return Response(asiste_monitorias, status=status.HTTP_200_OK)


class seguimientos_estudiante_solo_semestre_actual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final = []
        request_sede = int(request.GET.get('id_sede'))
        list_seguimientos_individual = list(
            seguimiento_individual.objects.filter(id_estudiante=pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante=pk))

        for i in list_inasistencia:
            serializer_inasistencia = inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual:
            serializer_seguimiento_individual = seguimiento_individual_serializer(
                i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'], reverse=True)

        list_semestre = list(semestre.objects.all().filter(
            semestre_actual=True, id_sede=request_sede))

        for i in list_semestre:
            lista_semestre = []
            serializer_semestre = semestre_serializer(i)
            dicccionario = {
                "nombre": serializer_semestre.data['nombre'], "Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            list_final.append(lista_semestre)
        return Response(list_final, status=status.HTTP_200_OK)


class conteo_seguimientos_estudiante_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_inasistencia = []
        list_seguimientos = []
        list_final = []
        list_seguimientos_individual = list(
            seguimiento_individual.objects.filter(id_estudiante=pk))
        list_inasistencia_individual = list(
            inasistencia.objects.filter(id_estudiante=pk))

        for i in list_inasistencia_individual:
            serializer_inasistencia = inasistencia_serializer(i)
            list_inasistencia.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual:
            serializer_seguimiento_individual = seguimiento_individual_serializer(
                i)
            list_seguimientos.append(serializer_seguimiento_individual.data)

        list_semestre = list(
            semestre.objects.all().filter(semestre_actual=True))

        for i in list_semestre:
            lista_inasistencia = []
            inasistencias_revisados_practicante = []
            inasistencias_revisados_profesional = []

            lista_seguimientos = []
            seguimientos_revisados_practicante = []
            seguimientos_revisados_profesional = []

            serializer_semestre = semestre_serializer(i)

            for j in list_inasistencia:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_inasistencia.append(j)
                    if j['revisado_practicante'] == False:
                        inasistencias_revisados_practicante.append(j)
                    if j['revisado_profesional'] == False:
                        inasistencias_revisados_profesional.append(j)

            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_seguimientos.append(j)
                    if j['revisado_practicante'] == False:
                        seguimientos_revisados_practicante.append(j)
                    if j['revisado_profesional'] == False:
                        seguimientos_revisados_profesional.append(j)

            count_inasistencias = len(lista_inasistencia)
            count_seguimientos = len(lista_seguimientos)

            count_inasistencias_revisados_practicante = len(
                inasistencias_revisados_practicante)
            count_inasistencias_revisados_profesional = len(
                inasistencias_revisados_profesional)

            count_seguimientos_revisados_practicante = len(
                seguimientos_revisados_practicante)
            count_seguimientos_revisados_profesional = len(
                seguimientos_revisados_profesional)

            counts = {
                'count_inasistencias': count_inasistencias,
                'count_seguimientos': count_seguimientos,
                'count_inasistencias_pendientes_practicante': count_inasistencias_revisados_practicante,
                'count_inasistencias_pendientes_profesional': count_inasistencias_revisados_profesional,
                'count_seguimientos_pendientes_practicante': count_seguimientos_revisados_practicante,
                'count_seguimientos_pendientes_profesional': count_seguimientos_revisados_profesional,
            }

        return Response(counts, status=status.HTTP_200_OK)
#
#   * Descarga de los seguimientos según varios filtros.
#   * @author Deiby A. Rodriguez R.
#   * @param {ModelViewSet} viewsets.ModelViewSet, View set usada por django.
#   * @return {Json} seguimientos, inasistencias, Json con todos los seguimientos e inasistencias filtradas.
#


class consulta_DEXIA_viewsets (viewsets.GenericViewSet):
    serializer_class = basic_estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = basic_estudiante_serializer.Meta.model.objects.all()

    def get_nivel_riesgo(self, riesgo):
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo is None:
            return 'SIN RIESGO'

    def retrieve(self, request, pk=None):

        try:
            final_list_estudiantes = list()
            estudiante_consultado = estudiante.objects.filter(num_doc=pk)
            serializer_estudiantes = basic_estudiante_serializer(
                estudiante_consultado, many=True)

            estudiantes_ids = [data['id']
                               for data in serializer_estudiantes.data]
            # Obtener los datos relacionados a los programas y estados de una vez
            programas_estudiantes = programa_estudiante.objects.filter(
                id_estudiante__in=estudiante_consultado)
            programa_data = programa.objects.in_bulk(
                programas_estudiantes.values_list('id_programa_id', flat=True))
            sedes = sede.objects.in_bulk(
                [programa_data[programa_id].id_sede_id for programa_id in programa_data])

            # Obtener los datos relacionados con el último seguimiento de una vez
            seguimientos_recientes = riesgo_individual.objects.filter(id_estudiante__in=estudiantes_ids).values(
                'id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad')

            for data_del_estudiante in serializer_estudiantes.data:
                # serializer_estudiante_2 = estudiante_serializer(i)
                estudiante_id = data_del_estudiante['id']

                codigo = {
                    'codigo_univalle': data_del_estudiante['cod_univalle']
                }
                try:
                    seguimiento_reciente = next(
                        (s for s in seguimientos_recientes if s['id_estudiante'] == estudiante_id), None)
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    if seguimiento_reciente:
                        conteo_seguimiento_individual = seguimiento_individual.objects.filter(
                            id_estudiante=estudiante_id).count()
                        conteo_inasistencia = inasistencia.objects.filter(
                            id_estudiante=estudiante_id).count()

                        riesgo = {
                            'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                            'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                            'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                            'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                            'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad'])
                        }
                        if conteo_seguimiento_individual > 6:
                            conteo = {
                                'conteo_seguimientos': conteo_seguimiento_individual,
                                'conto_inasistencias': conteo_inasistencia,
                                'culmino_acompañamiento': True,
                            }
                        else:
                            conteo = {
                                'conteo_seguimientos': conteo_seguimiento_individual,
                                'conto_inasistencias': conteo_inasistencia,
                                'culmino_acompañamiento': False,
                            }

                    else:
                        riesgo = {
                            'riesgo_individual': 'SIN RIESGO',
                            'riesgo_familiar': 'SIN RIESGO',
                            'riesgo_academico': 'SIN RIESGO',
                            'riesgo_economico': 'SIN RIESGO',
                            'riesgo_vida_universitaria_ciudad': 'SIN RIESGO'
                        }
                        conteo = {
                            'conteo_seguimientos': '0',
                            'conto_inasistencias': '0',
                        }
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A'
                    }
                    conteo = {
                        'conteo_seguimientos': conteo_seguimiento_individual,
                        'conto_inasistencias': conteo_inasistencia,
                    }

                try:
                    programa_del_estudiante = programas_estudiantes.filter(
                        id_estudiante=data_del_estudiante['id']).first()

                    dic_programa = {
                        'cod_programa': programa_data[programa_del_estudiante.id_programa_id].codigo_univalle,
                        'programa_academico': programa_data[programa_del_estudiante.id_programa_id].nombre,
                        'sede': sedes[programa_data[programa_del_estudiante.id_programa_id].id_sede_id].nombre
                    }

                except:
                    dic_programa = {
                        'cod_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }
                try:
                    list_semestres = []
                    asignaciones = asignacion.objects.filter(
                        id_estudiante=estudiante_id, estado=True)
                    serializer_asignacion = asignacion_serializer(
                        asignaciones, many=True)
                    for data in serializer_asignacion.data:
                        semestre_acompañado = semestre.objects.filter(
                            id=data['id_semestre']).values('nombre')
                        list_semestres.append(semestre_acompañado[0]['nombre'])
                    periodos_acompañamiento = {
                        'periodos_acompañamiento': list_semestres
                    }
                except:
                    periodos_acompañamiento = {
                        'periodos_acompañamiento': []
                    }
                data = dict(codigo, **riesgo, **conteo, **
                            dic_programa, **periodos_acompañamiento)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes, status=status.HTTP_200_OK)

        except estudiante.DoesNotExist:
            final_list_estudiantes = list()
            return Response(final_list_estudiantes, status=status.HTTP_204_NO_CONTENT)


class ExportarSeguimientosCSV(ExportarCSVBaseView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return seguimiento_individual.objects.all()  # Para ExportarSeguimientosCSV
    serializer_class = seguimiento_individual_export_serializer
    filename = "seguimientos.csv"

    def post(self, request):
        self.filtros = build_filtros(request.data)
        return super().post(request)


class ExportarInasistenciasCSV(ExportarCSVBaseView):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return inasistencia.objects.all()  # Para ExportarInasistenciasCSV
    serializer_class = inasistencia_export_serializer
    filename = "inasistencias.csv"

    def post(self, request):
        self.filtros = build_filtros(request.data)
        return super().post(request) 

#helpers para sumar valores booleanos (True = 1, False = 0)
def _sum_bool(campo):
    return Coalesce(
        Sum(
            Case(
                When(**{campo: True}, then=1),
                default=0,
                output_field=IntegerField(),
            )
        ),
        0,
    )


def _sum_riesgo(campo, nivel):
    return Coalesce(
        Sum(
            Case(
                When(**{campo: nivel}, then=1),
                default=0,
                output_field=IntegerField(),
            )
        ),
        0,
    )


class ExportarConsolidadoSeguimientosCSV(APIView):
    permission_classes = (IsAuthenticated,)
    filename = "consolidado_seguimientos.csv"
    minimo_acompanamientos = 2 #Regla definida por la consulta SQL

    def _resolver_id_sede(self, valor_sede):
        if not valor_sede:
            return None
        try:
            return int(valor_sede)
        except (ValueError, TypeError):
            sede_obj = sede.objects.filter(nombre=valor_sede).first()
            return sede_obj.id if sede_obj else -1

    def post(self, request):
        data = request.data or {}

        estudiante_filtro = (data.get("estudiante") or "").strip() or None
        fecha_desde = data.get("fecha_inicio") or None
        fecha_hasta = data.get("fecha_fin") or None
        programa_filtro = (data.get("programa") or "").strip() or None
        id_sede_filtro = self._resolver_id_sede(data.get("sede"))
        cohorte_filtro = (data.get("cohorte") or "").strip() or None
        minimo_acompanamientos = max(1, int(self.minimo_acompanamientos))

        # Subqueries para el programa activo más reciente (traker=True) por estudiante
        prog_activo_base = programa_estudiante.objects.filter(
            id_estudiante=OuterRef("id_estudiante"),
            traker=True,
        ).order_by("-id")

        subq_cod_programa = Subquery(prog_activo_base.values("id_programa__codigo_univalle")[:1])
        subq_nom_programa = Subquery(prog_activo_base.values("id_programa__nombre")[:1])
        subq_facultad = Subquery(prog_activo_base.values("id_programa__id_facultad__nombre")[:1])
        subq_id_sede = Subquery(prog_activo_base.values("id_programa__id_sede_id")[:1])
        subq_sede_nombre = Subquery(prog_activo_base.values("id_programa__id_sede__nombre")[:1])

        # Subquery para semestre según sede del programa activo y fecha del seguimiento
        subq_semestre = Subquery(
            semestre.objects.filter(
                id_sede_id=OuterRef("id_sede_calc"),
                fecha_inicio__date__lte=OuterRef("fecha"),
                fecha_fin__date__gte=OuterRef("fecha"),
            )
            .order_by("-fecha_inicio")
            .values("nombre")[:1]
        )

        # Subquery para cohortes concatenadas por estudiante (no filtrada para no ocultar otras cohortes)
        subq_cohortes = Subquery(
            cohorte_estudiante.objects.filter(
                id_estudiante=OuterRef("id_estudiante")
            )
            .values("id_estudiante")
            .annotate(
                cohortes_str=StringAgg(
                    "id_cohorte__id_number",
                    delimiter=", ",
                    distinct=True,
                    ordering="id_cohorte__id_number",
                )
            )
            .values("cohortes_str")[:1]
        )

        qs = seguimiento_individual.objects.select_related(
            "id_estudiante",
            "id_estudiante__id_cond_excepcion",
        ).annotate(
            codigo_programa=subq_cod_programa,
            programa_academico=Coalesce(subq_nom_programa, Value("SIN PROGRAMA ACTIVO")),
            facultad=Coalesce(subq_facultad, Value("SIN FACULTAD")),
            id_sede_calc=subq_id_sede,
            sede_nombre=Coalesce(subq_sede_nombre, Value("SIN SEDE")),
            semestre_nombre=Coalesce(subq_semestre, Value("SIN SEMESTRE")),
            cohorte_ases=Coalesce(subq_cohortes, Value("SIN COHORTE", output_field=TextField()), output_field=TextField(),),
            nombre_completo=Concat(
                "id_estudiante__nombre", Value(" "), "id_estudiante__apellido",
                output_field=CharField(),
            ),
        )

        # Filtros dinámicos únicamente sobre campos diligenciados
        if estudiante_filtro:
            qs = qs.filter(
                Q(id_estudiante__cod_univalle__icontains=estudiante_filtro)
                | Q(id_estudiante__num_doc__icontains=estudiante_filtro)
                | Q(nombre_completo__icontains=estudiante_filtro)
            )

        if fecha_desde:
            qs = qs.filter(fecha__gte=fecha_desde)

        if fecha_hasta:
            qs = qs.filter(fecha__lte=fecha_hasta)

        if programa_filtro:
            qs = qs.filter(
                Q(codigo_programa__icontains=programa_filtro)
                | Q(programa_academico__icontains=programa_filtro)
            )

        if id_sede_filtro is not None:
            qs = qs.filter(id_sede_calc=id_sede_filtro)

        if cohorte_filtro:
            estudiantes_con_cohorte = cohorte_estudiante.objects.filter(
                id_cohorte__id_number__icontains=cohorte_filtro
            ).values("id_estudiante_id")
            qs = qs.filter(id_estudiante_id__in=estudiantes_con_cohorte)

        # Agrupación: 1 fila por estudiante y por semestre
        consolidado_qs = (
            qs.values(
                "id_estudiante_id",
                "id_estudiante__cod_univalle",
                "id_estudiante__num_doc",
                "id_estudiante__nombre",
                "id_estudiante__apellido",
                "cohorte_ases",
                "facultad",
                "codigo_programa",
                "programa_academico",
                "sede_nombre",
                "semestre_nombre",
                "id_estudiante__id_cond_excepcion_id",
            )
            .annotate(
                total_acompanamientos=Count("id"),
                # Riesgos por dimensión (2 = Alto, 1 = Medio, 0 = Bajo)
                riesgo_individual_alto=_sum_riesgo("riesgo_individual", 2),
                riesgo_individual_medio=_sum_riesgo("riesgo_individual", 1),
                riesgo_individual_bajo=_sum_riesgo("riesgo_individual", 0),
                riesgo_familiar_alto=_sum_riesgo("riesgo_familiar", 2),
                riesgo_familiar_medio=_sum_riesgo("riesgo_familiar", 1),
                riesgo_familiar_bajo=_sum_riesgo("riesgo_familiar", 0),
                riesgo_academico_alto=_sum_riesgo("riesgo_academico", 2),
                riesgo_academico_medio=_sum_riesgo("riesgo_academico", 1),
                riesgo_academico_bajo=_sum_riesgo("riesgo_academico", 0),
                riesgo_economico_alto=_sum_riesgo("riesgo_economico", 2),
                riesgo_economico_medio=_sum_riesgo("riesgo_economico", 1),
                riesgo_economico_bajo=_sum_riesgo("riesgo_economico", 0),
                riesgo_vida_univ_alto=_sum_riesgo("riesgo_vida_universitaria_ciudad", 2),
                riesgo_vida_univ_medio=_sum_riesgo("riesgo_vida_universitaria_ciudad", 1),
                riesgo_vida_univ_bajo=_sum_riesgo("riesgo_vida_universitaria_ciudad", 0),
                # Temáticas
                tem_autoconocimiento=_sum_bool("autoconocimiento"),
                tem_autonomia=_sum_bool("autonomia"),
                tem_proyecto_de_vida=_sum_bool("proyecto_de_vida"),
                tem_historia_de_vida=_sum_bool("historia_de_vida"),
                tem_salud=_sum_bool("salud"),
                tem_relacion_erotico_afectivas=_sum_bool("relación_eriótico_afectivas"),
                tem_documentos_identificacion=_sum_bool("identificación"),
                tem_aspectos_motivacionales=_sum_bool("aspectos_motivacionales"),
                tem_diversidad_sexual=_sum_bool("diversidad_sexual"),
                tem_red_de_apoyo=_sum_bool("red_de_apoyo"),
                tem_rasgos_personalidad=_sum_bool("rasgos_de_personalidad"),
                tem_relaciones_familiares=_sum_bool("relaciones_familiares"),
                tem_red_de_apoyo_familiar=_sum_bool("red_de_apoyo_familiar"),
                tem_rol_estudiante_familia=_sum_bool("rol_del_estudiante_en_la_familia"),
                tem_dinamica_familiar=_sum_bool("dinamica_familiar"),
                tem_desempeno_academico=_sum_bool("desempeño_académico"),
                tem_eleccion_vocacional=_sum_bool("elección_vocacional"),
                tem_autogestion_academica=_sum_bool("autogestion_academica"),
                tem_manejo_del_tiempo=_sum_bool("manejo_del_tiempo"),
                tem_apoyos_econ_institucionales=_sum_bool("apoyos_económicos_institucionales"),
                tem_manejo_finanzas=_sum_bool("manejo_finanzas"),
                tem_apoyo_econ_familiar=_sum_bool("apoyo_económico_familiar"),
                tem_situacion_laboral_ocupacional=_sum_bool("situación_laboral_ocupacional"),
                tem_motivacion_acompanamiento=_sum_bool("motivación_compañamiento"),
                tem_referencia_geografica=_sum_bool("referencia_geográfica"),
                tem_adaptacion_territorio_univ=_sum_bool("adaptación_ciudad_Universidad"),
                tem_movilidad_transporte=_sum_bool("movilidad_y_transporte"),
                tem_integracion_cultura_univ=_sum_bool("integracion_a_la_cultura_universitaria"),
                tem_vinculacion_grupos_extracurr=_sum_bool("vinculación_grupos_actividades_extracurriculares"),
                tem_uso_servicios_univ=_sum_bool("uso_de_los_servicios_universitarios"),
                tem_vivienda=_sum_bool("vivienda"),
                tem_oferta_servicios=_sum_bool("oferta_servicios"),
                # Acciones del monitor
                acc_apoyo_academico=_sum_bool("apoyo_académico"),
                acc_taller_par_par=_sum_bool("taller_par_par"),
                acc_reconocimiento_ciudad_u=_sum_bool("reconocimiento_ciudad_U"),
                acc_rem_profesional_se=_sum_bool("rem_profesional_SE"),
                acc_rem_practicante_se=_sum_bool("rem_racticante_SE"),
                acc_rem_oitel=_sum_bool("rem_OITEL"),
                acc_rem_actividades_grupales=_sum_bool("rem_actividades_grupales"),
                acc_rem_monitorias_academicas=_sum_bool("rem_monitorías_académicas"),
                acc_rem_proyectos_universidad=_sum_bool("rem_proyectos_Universidad"),
                acc_rem_servicio_salud=_sum_bool("rem_servicio_salud"),
                acc_rem_registro_academico=_sum_bool("rem_registro_académico"),
                acc_rem_rep_estudiantiles=_sum_bool("rem_rep_estudiantiles"),
                acc_rem_matricula_financiera=_sum_bool("rem_matrícula_financiera"),
                acc_rem_desarrollo_humano_se=_sum_bool("rem_desarrollo_humano_promoción_SE"),
                acc_rem_directores_programa=_sum_bool("rem_directores_programa"),
                acc_rem_grupos_universidad=_sum_bool("rem_grupos_universidad"),
                acc_rem_externa=_sum_bool("rem_externa"),
                acc_escucha_activa=_sum_bool("escucha_activa"),
                acc_ninguna_accion=_sum_bool("Ninguna_acción_realizada"),
            )
            .filter(total_acompanamientos__gte=minimo_acompanamientos)
            .order_by("sede_nombre", "id_estudiante__cod_univalle", "semestre_nombre")
        )

        rows = list(consolidado_qs)
        if not rows:
            return Response({"message": "No hay datos para exportar", "datos": []}, status=200)

        #nombres de columna para el CSV
        mapeo_columnas = {
            "id_estudiante_id": "id_estudiante",
            "id_estudiante__cod_univalle": "codigo_estudiante",
            "id_estudiante__num_doc": "documento",
            "id_estudiante__nombre": "nombre",
            "id_estudiante__apellido": "apellido",
            "sede_nombre": "sede",
            "semestre_nombre": "semestre",
            "id_estudiante__id_cond_excepcion_id": "condicion_excepcion_id",
        }

        formatted_rows = []
        for r in rows:
            nueva_fila = {}
            for k, v in r.items():
                col_name = mapeo_columnas.get(k, k)
                nueva_fila[col_name] = escape_quotes(v) if isinstance(v, str) else v
            formatted_rows.append(nueva_fila)

        fieldnames = list(formatted_rows[0].keys())

        response = HttpResponse(content_type="text/csv; charset=utf-8")
        response["Content-Disposition"] = f'attachment; filename="{self.filename}"'
        response.write("\uFEFF")

        writer = csv.DictWriter(response, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()
        for row in formatted_rows:
            writer.writerow(row)

        return response