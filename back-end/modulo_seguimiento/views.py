from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from modulo_seguimiento.serializers import *
from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cohorte_estudiante
from modulo_programa.models import programa_estudiante, programa
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

# Create your views here.

class seguimiento_individual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()


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

        seguimientos =  seguimiento_individual_serializer(
                            seguimiento_individual.objects.filter(*filters).order_by("fecha"),
                            many=True
                        ).data
        inasistencias = inasistencia_serializer(
                            inasistencia.objects.filter(*filters).order_by("fecha"),
                            many=True
                        ).data

        return Response({"seguimientos": seguimientos, "inasistencias": inasistencias},status=status.HTTP_200_OK)
