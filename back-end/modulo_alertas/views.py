from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from modulo_usuario_rol.models import estudiante, firma_tratamiento_datos, usuario_rol, rol
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected

from modulo_asignacion.models import asignacion

from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cond_excepcion
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
from modulo_seguimiento.models import inasistencia, seguimiento_individual


from django.shortcuts import render, get_object_or_404
# import json
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
      
class alert_counter_viewsets(viewsets.ModelViewSet):
    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    
    # Contador de:
    # Riesgos - *DONE
    # Tratamiento de Datos - *DONE
    # Encuesta de admitidos - STAND BY
    # Semanal - Tabla de Inasistencias - *DONE
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
        date_obj = datetime.datetime.strptime(fecha, "%Y-%m-%d").date   
        return date_obj
    
    def get_firma(self, firma):
        # print(firma)
        for i in firma:
            if i.autoriza == True:
                # print("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                return 'AUTORIZA'
            elif i is None:
                # print("SEJODIOOOOOO")
                return 'NO AUTORIZA'
            
    def get_counter_riesgo(self, riesgo):
        counter_riesgo_individual = 0
        counter_riesgo_familiar = 0
        counter_riesgo_academico = 0
        counter_riesgo_economico = 0
        counter_riesgo_vida_universitaria_ciudad = 0
        
        counter_fecha_seguimiento = 0
        
        counter_empty_date = 0
        
        counter_firma_datos = 0
        
        fech_actual = datetime.datetime.now()
        fecha_ = datetime.timedelta(days=7)
        fecha_limite = fech_actual - fecha_
        
        for i in riesgo:
            
            if i['riesgo_individual'] == 'ALTO':
                counter_riesgo_individual += 1
            if i['riesgo_familiar'] == 'ALTO':
                counter_riesgo_familiar += 1
            if i['riesgo_academico'] == 'ALTO':
                counter_riesgo_academico += 1
            if i['riesgo_economico'] == 'ALTO':
                counter_riesgo_economico += 1
            if i['riesgo_vida_universitaria_ciudad'] == 'ALTO':
                counter_riesgo_vida_universitaria_ciudad += 1
            if i['fecha_seguimiento'] == '' or i['fecha_seguimiento'] == None:
                counter_empty_date += 1
            else:
                date_obj = datetime.datetime.strptime(i['fecha_seguimiento'], "%Y-%m-%d")
                if date_obj.date() <= fecha_limite.date():
                    counter_fecha_seguimiento += 1
            if i['firma_tratamiento_datos'] == 'NO AUTORIZA' or i['firma_tratamiento_datos'] == None:
                counter_firma_datos += 1
            
        contador_riesgo = {
            'riesgo_individual': counter_riesgo_individual,   
            'riesgo_familiar': counter_riesgo_familiar,
            'riesgo_academico': counter_riesgo_academico,
            'riesgo_economico': counter_riesgo_economico,
            'riesgo_vida_universitaria_ciudad': counter_riesgo_vida_universitaria_ciudad,
            'fecha_seguimiento': counter_fecha_seguimiento,
            'firma_tratamiento_datos': counter_firma_datos
        }
        
        contador_total = counter_riesgo_individual + counter_riesgo_familiar + counter_riesgo_academico + counter_riesgo_economico + counter_riesgo_vida_universitaria_ciudad + counter_fecha_seguimiento + counter_empty_date + counter_firma_datos
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
        # list_estudiantes = list()
 
        if data_usuario_rol == "super_ases":
            # ven todo
            list_estudiantes = []
            cont_riesgos = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)
            
            for i in serializer_estudiante.data:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                list_estudiantes.append(data)
            # print(list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "monitor":
            list_estudiantes = list()
            final_list_estudiantes = list()
            # serializer_estudiante = estudiante_serializer(asignacion.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = True ), many=True)
            # serializer_estudiante = asignacion.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = True).select_related('id_estudiante').values()

            for id_estudiante in asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values():
                var_estudiante = estudiante.objects.get(
                    id=id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)

                list_estudiantes.append(serializer_estudiante.data)

            # Añadiendo datos de consultas externas a los estudiantes

            for i in list_estudiantes:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                final_list_estudiantes.append(data)
            # print(final_list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(final_list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "practicante":
            list_estudiantes = list()
            final_list_estudiantes = list()
            for obj_monitor in usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():

                for id_estudiante in asignacion.objects.filter(id_usuario=obj_monitor['id_usuario_id'], id_semestre=var_semestre.id, estado=True).values():
                    var_estudiante = estudiante.objects.get(
                        id=id_estudiante['id_estudiante_id'])
                    serializer_estudiante = estudiante_serializer(
                        var_estudiante)
                    list_estudiantes.append(serializer_estudiante.data)
            # Añadiendo datos de consultas externas a los estudiantes
            
            for i in list_estudiantes:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                final_list_estudiantes.append(data)
            # print(final_list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(final_list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "profesional":
            list_estudiantes = list()
            final_list_estudiantes = list()
            for obj_programa in programa.objects.filter(id_sede=data_sede).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                    for obj_estudiante in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                        serializer_estudiante = estudiante_serializer(
                            obj_estudiante)
                        list_estudiantes.append(serializer_estudiante.data)

            for i in list_estudiantes:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                final_list_estudiantes.append(data)
            # print(final_list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(final_list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "socioeducativo" or data_usuario_rol == "sistemas":
            # ven todo
            list_estudiantes = []
            # list_programas = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)
            for i in serializer_estudiante.data:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                list_estudiantes.append(data)
            # print(list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(list_estudiantes)
            return Response(cont_riesgos)
        
        elif data_usuario_rol == "socioeducativo_reg":
            # Ve todos los estudiantes que no son de la sede "Melendez"
            list_estudiantes = []
            final_list_estudiantes = list()
            # for obj_programa in programa.objects.exclude(Q(id_sede=data_sede)).values():
            for obj_programa in programa.objects.filter(id_sede=data_sede).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                    for obj_estudiante in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                        serializer_estudiante = estudiante_serializer(
                            obj_estudiante)
                        list_estudiantes.append(serializer_estudiante.data)
                        
            for i in list_estudiantes:
                # print(i['id'])
                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                        
                    # Obtener firma de tratamiento de datos del estudiante
                    firma_tratamiento = firma_tratamiento_datos.objects.filter(id_estudiante = i['id'])
                    
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                        'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                        'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                        'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                        'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                        # 'fecha_seguimiento': self.get_fecha_seguimiento(str(seguimiento_reciente.fecha))
                        'fecha_seguimiento': str(seguimiento_reciente.fecha),
                        # 'fecha_seguimiento': seguimiento_reciente.fecha,
                        # 'fecha_seguimiento': (seguimiento_reciente.fecha).strftime("%Y-%m-%d"),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        
                    }
                    
                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'firma_tratamiento_datos': 'NO AUTORIZA'
                    }
                data = dict(i, **riesgo)
                # print(cont_riesgos)
                # print(cont_riesgos)
                final_list_estudiantes.append(data)
            # print(final_list_estudiantes)
            cont_riesgos = self.get_counter_riesgo(final_list_estudiantes)
            return Response(cont_riesgos)

    
