from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics

from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected

from modulo_seguimiento.models import inasistencia, seguimiento_individual

from modulo_asignacion.models import asignacion

from modulo_instancia.models import semestre, sede

from django.shortcuts import render, get_object_or_404

import json
import datetime

# Create your views here.

class info_estudiante_viewsets(viewsets.ModelViewSet):
    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    
    def retrieve(self, request, pk, *args, **kwargs):
        
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')

        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
 
        list_estudiantes = list()
        
        if data_usuario_rol == "super_ases":

            # ven todo
            list_estudiantes = []
            # list_programas = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            return Response(serializer_estudiante.data)
        elif data_usuario_rol == "monitor":

            for id_estudiante in asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values():
                var_estudiante = estudiante.objects.get(
                    id=id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)
      
        
        # print(estudiante_serializer(self.get_object()).data)
        return Response(status=status.HTTP_200_OK, data=estudiante_serializer(self.get_object()).data)
    
    # 
class alert_counter_viewsets(viewsets.ModelViewSet):
    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # Contador de:
    # Riesgos - COMPLETADO
    # Tratamiento de Datos - -STAND BY
    # Encuesta de admitidos - STAND BY
    # Semanal - Tabla de Inasistencias - WIP
    # Academica - STAND BY
    
    def get_nivel_riesgo(self, riesgo):
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo == None or riesgo == 'None':
            return 'SIN RIESGO'
        
    def get_fecha_seguimiento(self, fecha):
        date_str = fecha
        # print(date_str)
        # date_format = ''
        date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
        # print(date_obj)aa
        return date_obj
        
    def get_counter_riesgo(self, riesgo):
        counter_riesgo_individual = 0
        counter_riesgo_familiar = 0
        counter_riesgo_academico = 0
        counter_riesgo_economico = 0
        counter_riesgo_vida_universitaria_ciudad = 0
        
        counter_fecha_seguimiento = 0
        none = list()
        fech_actual = datetime.datetime.now()
        fecha_ = datetime.timedelta(days=7)
        fecha_limite = fech_actual - fecha_
        # print(fech_actual - datetime.timedelta(days=7))
        # print(fecha_limite)
        
        for i in riesgo:
            # date_format = '%Y-%m-%d'
            # date_obj = datetime.datetime.strptime(date_str, "%Y-%m-%d")
            
            
            if i['riesgo_individual'] == 'ALTO':
                # print("HOLAAAAAA")
                counter_riesgo_individual += 1
            if i['riesgo_familiar'] == 'ALTO':
                counter_riesgo_familiar += 1
            if i['riesgo_academico'] == 'ALTO':
                counter_riesgo_academico += 1
            if i['riesgo_economico'] == 'ALTO':
                counter_riesgo_economico += 1
            if i['riesgo_vida_universitaria_ciudad'] == 'ALTO':
                counter_riesgo_vida_universitaria_ciudad += 1
            # date_str = i['fecha_seguimiento']
            # print(date_str)
            
            # print(date_obj)
            # if date_obj < fecha_limite:
            #     counter_fecha_seguimiento += 1
            # print (counter_riesgo_individual)
            # print(i['fecha_seguimiento'])
            
        contador_riesgo = {
            'riesgo_individual': counter_riesgo_individual,   
            'riesgo_familiar': counter_riesgo_familiar,
            'riesgo_academico': counter_riesgo_academico,
            'riesgo_economico': counter_riesgo_economico,
            'riesgo_vida_universitaria_ciudad': counter_riesgo_vida_universitaria_ciudad
        }
        
        contador_total = counter_riesgo_individual + counter_riesgo_familiar + counter_riesgo_academico + counter_riesgo_economico + counter_riesgo_vida_universitaria_ciudad + counter_fecha_seguimiento
        # print(riesgo)
        # print(contador_total)
        # print(contador_riesgo)
        return contador_total

    def retrieve(self, request, pk, *args, **kwargs):
        
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        # print("Hola")

        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
 
        if data_usuario_rol == "super_ases":
            # ven todo
            list_estudiantes = []
            cont_riesgos = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)
            
            for i in serializer_estudiante.data:
                # print(i['id'])
                try:
                    # print("Hola")
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # print(seguimiento_reciente.creacion)
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente.fecha)))
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': ''
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                list_estudiantes.append(data)
            # print(list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "monitor":
            list_estudiantes = []
            for id_estudiante in asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values():
                var_estudiante = estudiante.objects.get(
                    id=id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
                
            for i in list_estudiantes:
                # print(i['id'])
                try:
                    # print("Hola")
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad))
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                list_estudiantes.append(data)
            # print(list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(list_estudiantes)
            return Response(cont_riesgos)
            # return Response(list_estudiantes)
      
        
        # print(estudiante_serializer(self.get_object()).data)
        # return Response(status=status.HTTP_200_OK, data=estudiante_serializer(self.get_object()).data)
    
    #
    
    
