from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from modulo_seguimiento.serializers import *
from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_seguimiento.models import *
from modulo_instancia.models import *
from modulo_instancia.serializers import semestre_serializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
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
