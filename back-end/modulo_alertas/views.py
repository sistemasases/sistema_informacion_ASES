from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
import time
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected
from modulo_seguimiento.serializers import seguimiento_individual_serializer
from django.core import serializers

from modulo_usuario_rol.models import estudiante, firma_tratamiento_datos, usuario_rol, rol
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
from modulo_seguimiento.models import inasistencia, seguimiento_individual


from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models import F, OuterRef, Subquery, Max

import datetime

# Create your views here.

class info_estudiante_viewsets(viewsets.ModelViewSet):
    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk):

        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        list_estudiantes = list()

        if data_usuario_rol == "monitor":
            list_id_estudiantes = asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "practicante":
            list_id_monitores= usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)
        
        elif data_usuario_rol == "profesional":
            list_id_practicantes= usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores= usuario_rol.objects.filter(id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "super_ases":
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)
            return Response(serializer_estudiante.data)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo":
            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)
        
        elif data_usuario_rol == None:
            return Response("Comunicate con el administrador para que te asigne un rol", status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response("caso no encontrado", status=status.HTTP_404_NOT_FOUND)
    
class info_estudiante_alertas_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    
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
        # print(fecha)
        if fecha == None or fecha == 'None' or fecha == '' or fecha == ' ' or fecha == 'Null' or fecha == 'null' or fecha == 'NULL' or fecha == 'null' or fecha == 'NoneType':
            return "FICHA FALTANTE"
        elif fecha:
            fech_actual = datetime.datetime.now()
            fecha_ = datetime.timedelta(days=7)
            fecha_limite = fech_actual - fecha_
            date_obj = datetime.datetime.strptime(
                    fecha, "%Y-%m-%d")
            if date_obj.date() <= fecha_limite.date():
                return "FICHA FALTANTE"
            else:
                return "SEGUIMIENTO RECIENTE"
        
        
    def get_firma(self, firma):
        # print(firma)
        if firma:
            for i in firma:
                if i.autoriza == True:
                    # print("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                    return 'AUTORIZA'
                elif i.autoriza == False:
                    # print("SEJODIOOOOOO")
                    return 'NO AUTORIZA'
        else:
            return "SIN FIRMAR"
            
    def retrieve(self, request, pk):
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        list_conteo = list()
        list_estudiantes = list()
        
        if data_usuario_rol == "super_ases":
            final_list_estudiantes = list()
            list_estudiantes = estudiante.objects.all()
            serializer_estudiantes = estudiante_serializer(estudiante.objects.all(), many=True)

        for i in serializer_estudiantes.data:
            
            try:
                # Obtener el seguimiento más reciente del estudiante especificado
                seguimiento_reciente = seguimiento_individual.objects.filter(
                    id_estudiante=i['id']).latest('fecha')

                # Obtener firma de tratamiento de datos del estudiante
                firma_tratamiento = firma_tratamiento_datos.objects.filter(
                    id_estudiante=i['id'])
                # print(firma_tratamiento_datos.objects.filter(
                #     id_estudiante=i['id']))
                
                # Crear un diccionario con los datos de riesgo del seguimiento
                riesgo = {
                    'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                    'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                    'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                    'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                    'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                    # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                    'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))),
                    # 'fecha_seguimiento': seguimiento_reciente.fecha,
                    # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                    'firma_tratamiento_datos': self.get_firma(firma_tratamiento),

                }

                # Devolver el riesgo en la respuesta
            except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                riesgo = {
                    'riesgo_individual': 'SIN REGISTRAR',
                    'riesgo_familiar': 'SIN REGISTRAR',
                    'riesgo_academico': 'SIN REGISTRAR',
                    'riesgo_economico': 'SIN REGISTRAR',
                    'riesgo_vida_universitaria_ciudad': 'SIN REGISTRAR',
                    'fecha_seguimiento': 'FICHA FALTANTE',
                    'firma_tratamiento_datos': 'SIN FIRMAR'
                }
            data = dict(i, **riesgo)
            # print(cont_riesgos)
            # print(cont_riesgos)
            list_conteo.append(data)
        # # print(list_conteo)
        # print(list_conteo)
        # cont_riesgos = self.get_counter_riesgo(list_conteo)
        return Response(list_conteo)
