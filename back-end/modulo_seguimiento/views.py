from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from modulo_seguimiento.serializers import *
from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer,basic_estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cohorte_estudiante
from modulo_asignacion.models import asignacion
from modulo_asignacion.serializers import asignacion_serializer
from modulo_programa.models import programa_estudiante, programa, estado_programa
from modulo_programa.serializers import *
from modulo_seguimiento.models import *
from modulo_instancia.models import *
from modulo_instancia.serializers import semestre_serializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from operator import and_
from functools import reduce
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from django.views import View
from django.shortcuts import get_object_or_404
from django.core.exceptions import MultipleObjectsReturned

# Create your views here.

class seguimiento_individual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    @action(detail=True, methods=['get'], url_path='trayectoria')
    def trayectoria(self, request, pk):
        request_sede = int(request.GET.get('id_sede'))
        list_semestre = semestre.objects.all().get(semestre_actual=True,id_sede = request_sede)
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
                riesgo_vida_universitaria_ciudad.append(seguimiento.data['riesgo_vida_universitaria_ciudad'])

            fechas_lista = {'fechas': fechas}
            riesgo_individual_lista = {'riesgo_individual': riesgo_individual}
            riesgo_familiar_lista = {'riesgo_familiar': riesgo_familiar}
            riesgo_academico_lista = {'riesgo_academico': riesgo_academico}
            riesgo_economico_lista = {'riesgo_economico': riesgo_economico}
            riesgo_vida_universitaria_ciudad_lista = {'riesgo_vida_universitaria_ciudad': riesgo_vida_universitaria_ciudad}

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
    #permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final =[]
        request_sede = int(request.GET.get('id_sede'))
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'],reverse=True)
        list_semestre = list(semestre.objects.all().filter(id_sede=request_sede).order_by('-fecha_inicio'),)
        for i in list_semestre:
            lista_semestre = []
            serializer_semestre =semestre_serializer(i)
            dicccionario = {"nombre":serializer_semestre.data['nombre'],"Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            if(len(lista_semestre) >= 2):
                list_final.append(lista_semestre)
            else:
                list_semestre.remove(i)  
        return Response(list_final,status=status.HTTP_200_OK)
        
class seguimientos_estudiante_solo_semestre_actual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final =[]
        request_sede = int(request.GET.get('id_sede'))
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'],reverse=True)

        list_semestre = list(semestre.objects.all().filter(semestre_actual = True,id_sede=request_sede))
        
        for i in list_semestre:
            lista_semestre = []
            serializer_semestre =semestre_serializer(i)
            dicccionario = {"nombre":serializer_semestre.data['nombre'],"Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            list_final.append(lista_semestre)
        return Response(list_final,status=status.HTTP_200_OK)


class conteo_seguimientos_estudiante_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_inasistencia = []
        list_seguimientos = []
        list_final =[]
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia_individual = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia_individual: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_inasistencia.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)

        list_semestre = list(semestre.objects.all().filter(semestre_actual = True))
        
        for i in list_semestre:
            lista_inasistencia = []
            inasistencias_revisados_practicante = []
            inasistencias_revisados_profesional = []

            lista_seguimientos = []
            seguimientos_revisados_practicante = []
            seguimientos_revisados_profesional = []

            serializer_semestre =semestre_serializer(i)

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

            count_inasistencias_revisados_practicante = len(inasistencias_revisados_practicante)
            count_inasistencias_revisados_profesional = len(inasistencias_revisados_profesional)

            count_seguimientos_revisados_practicante = len(seguimientos_revisados_practicante)
            count_seguimientos_revisados_profesional = len(seguimientos_revisados_profesional)

            counts = {
            'count_inasistencias': count_inasistencias,
            'count_seguimientos': count_seguimientos,
            'count_inasistencias_pendientes_practicante': count_inasistencias_revisados_practicante,
            'count_inasistencias_pendientes_profesional': count_inasistencias_revisados_profesional,
            'count_seguimientos_pendientes_practicante': count_seguimientos_revisados_practicante,
            'count_seguimientos_pendientes_profesional': count_seguimientos_revisados_profesional,
            }

        return Response(counts,status=status.HTTP_200_OK)
#
#   * Descarga de los seguimientos según varios filtros.
#   * @author Deiby A. Rodriguez R.
#   * @param {ModelViewSet} viewsets.ModelViewSet, View set usada por django.
#   * @return {Json} seguimientos, inasistencias, Json con todos los seguimientos e inasistencias filtradas.
#
class descarga_seguimientos_inasistencias_viewsets (viewsets.ModelViewSet):

    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def post(self, request, pk=None):

        filters_and = []
        try:
            if request.data['estudiante']:
                estudiante_obj = estudiante.objects.get(cod_univalle=request.data['estudiante'])
                filters_and.append(Q(**{ "id_estudiante": estudiante_obj }))
            else:
                estudiante_obj = estudiante.objects.all()
                filters_and.append(Q(**{ "id_estudiante__in": estudiante_obj }))
        except:
                estudiante_obj = []
                filters_and.append(Q(**{ "id_estudiante__in": estudiante_obj }))
        try:
            if request.data['fecha_inicio']:
                filters_and.append(Q(**{ "fecha__gte": request.data['fecha_inicio'] }))
        except:
            pass
        try:
            if request.data['fecha_fin']:
                filters_and.append(Q(**{ "fecha__lte": request.data['fecha_fin'] }))
        except:
            pass
        try:
            if request.data['programa']:
                programa_obj = programa.objects.filter(codigo_univalle=request.data['programa'])
                estudiantes_del_programa = programa_estudiante.objects.filter(id_programa__in=programa_obj).values_list('id_estudiante', flat=True)
                filters_and.append(Q(**{ "id_estudiante__in": estudiantes_del_programa }))
        except:
            pass
        try:
            if request.data['sede']:
                sede_obj = sede.objects.filter(nombre=request.data['sede'])
                programa_obj = programa.objects.filter(id_sede__in=sede_obj)
                estudiantes_del_programa = programa_estudiante.objects.filter(id_programa__in=programa_obj).values_list('id_estudiante', flat=True)
                filters_and.append(Q(**{ "id_estudiante__in": estudiantes_del_programa }))
        except:
            pass
        try:
            if request.data['cohorte']:
                cohorte_obj = cohorte.objects.filter(id_number=request.data['cohorte'])
                estudiantes_del_programa = cohorte_estudiante.objects.filter(id_cohorte__in=cohorte_obj).values_list('id_estudiante', flat=True)
                filters_and.append(Q(**{ "id_estudiante__in": estudiantes_del_programa }))
        except:
            pass

        reduce_and = reduce(and_, filters_and)
        filters = []
        filters.append(reduce_and)

        seguimientos_data = seguimiento_individual_serializer(
            seguimiento_individual.objects.filter(*filters).select_related('id_estudiante').order_by("fecha"),
            many=True).data

        inasistencias_data = inasistencia_serializer(
            inasistencia.objects.filter(*filters).select_related('id_estudiante').order_by("fecha"),
            many=True).data

        # Diccionario de id_estudiante a cod_univalle para evitar múltiples consultas
        estudiante_cod_map = {e.id: e.cod_univalle for e in estudiante.objects.all()}

        # Agregar el código del estudiante a los resultados
        for seguimiento in seguimientos_data:
            seguimiento['codigo_estudiante'] = estudiante_cod_map.get(seguimiento['id_estudiante'])

        for inasistencia_obj in inasistencias_data:
            inasistencia_obj['codigo_estudiante'] = estudiante_cod_map.get(inasistencia_obj['id_estudiante'])

        return Response({"seguimientos": seguimientos_data, "inasistencias": inasistencias_data},status=status.HTTP_200_OK)

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
            serializer_estudiantes = basic_estudiante_serializer(estudiante_consultado, many=True)

            estudiantes_ids = [data['id'] for data in serializer_estudiantes.data]
            # Obtener los datos relacionados a los programas y estados de una vez
            programas_estudiantes = programa_estudiante.objects.filter(id_estudiante__in=estudiante_consultado)
            programa_data = programa.objects.in_bulk(programas_estudiantes.values_list('id_programa_id', flat=True))
            sedes = sede.objects.in_bulk([programa_data[programa_id].id_sede_id for programa_id in programa_data])

            # Obtener los datos relacionados con el último seguimiento de una vez
            seguimientos_recientes = riesgo_individual.objects.filter(id_estudiante__in=estudiantes_ids).values('id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad')
            
            for data_del_estudiante in serializer_estudiantes.data:
                # serializer_estudiante_2 = estudiante_serializer(i)
                estudiante_id = data_del_estudiante['id']

                codigo = {
                    'codigo_univalle' : data_del_estudiante['cod_univalle']
                }
                try:
                    seguimiento_reciente = next((s for s in seguimientos_recientes if s['id_estudiante'] == estudiante_id), None)
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    if seguimiento_reciente:
                        conteo_seguimiento_individual = seguimiento_individual.objects.filter(id_estudiante = estudiante_id).count()
                        conteo_inasistencia = inasistencia.objects.filter(id_estudiante = estudiante_id).count()
                        
                        riesgo = {
                            'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                            'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                            'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                            'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                            'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad'])
                        }
                        if conteo_seguimiento_individual > 6 :
                            conteo = {
                                'conteo_seguimientos': conteo_seguimiento_individual,
                                'conto_inasistencias': conteo_inasistencia,
                                'culmino_acompañamiento' : True,
                            }
                        else :
                            conteo = {
                                'conteo_seguimientos': conteo_seguimiento_individual,
                                'conto_inasistencias': conteo_inasistencia,
                                'culmino_acompañamiento' : False,
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
                    programa_del_estudiante = programas_estudiantes.filter(id_estudiante=data_del_estudiante['id']).first()

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
                    asignaciones = asignacion.objects.filter(id_estudiante = estudiante_id,estado = True)
                    serializer_asignacion = asignacion_serializer(asignaciones, many=True)
                    for data in serializer_asignacion.data :
                        semestre_acompañado = semestre.objects.filter(id = data['id_semestre']).values('nombre')
                        list_semestres.append(semestre_acompañado[0]['nombre'])
                    periodos_acompañamiento = {
                        'periodos_acompañamiento': list_semestres
                    }
                except:
                    periodos_acompañamiento = {
                        'periodos_acompañamiento': []
                    }
                data = dict(codigo, **riesgo,**conteo, **dic_programa, **periodos_acompañamiento)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes,status=status.HTTP_200_OK)

        except estudiante.DoesNotExist:
            final_list_estudiantes = list()
            return Response(final_list_estudiantes,status=status.HTTP_204_NO_CONTENT)
