from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
import time
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected, basic_estudiante_serializer
from modulo_seguimiento.serializers import seguimiento_individual_serializer
from django.core import serializers

from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cond_excepcion, cohorte_estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
from modulo_seguimiento.models import inasistencia, seguimiento_individual, riesgo_individual 

from modulo_instancia.models import cohorte

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models import F, OuterRef, Subquery, Max


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
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

            serializer_estudiante = estudiante_serializer(estudiante.objects.all(), many=True)

            return Response(serializer_estudiante.data)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico":

            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "dir_programa":
            obj_dir = usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id')
            obj_dir_programa = dir_programa.objects.filter(id_usuario_rol=obj_dir[0]['id']).values()
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa=obj_dir_programa[0]['id_programa_id']).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "vcd_academico":
            obj_usuario_rol = usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id')
            obj_facultad = vcd_academico.objects.filter(id_usuario_rol=obj_usuario_rol[0]['id']).values('id_facultad')
            list_programas = programa.objects.filter(id_facultad = obj_facultad[0]['id_facultad']).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in =list_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)
        

        elif data_usuario_rol == None:
            return Response("Comunicate con el administrador para que te asigne un rol", status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response("caso no encontrado")


class estudiante_filtros_viewsets(viewsets.ModelViewSet):

    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # permission_classes = (IsAuthenticated,)

    def get_nivel_riesgo(self, riesgo):
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo is None:
            return 'SIN RIESGO'

    def retrieve(self, request, pk):

        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)

        if data_usuario_rol == "monitor":
            final_list_estudiantes = list()
            list_id_estudiantes = asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            
        elif data_usuario_rol == "practicante":
            final_list_estudiantes = list()
            list_id_monitores= usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            
        elif data_usuario_rol == "profesional":
            final_list_estudiantes = list()
            list_id_practicantes= usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores= usuario_rol.objects.filter(id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        elif data_usuario_rol == "super_ases":
            final_list_estudiantes = list()
            list_estudiantes = estudiante.objects.all()
            serializer_estudiantes = estudiante_serializer(estudiante.objects.all(), many=True)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico":
            final_list_estudiantes = list()
            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        elif data_usuario_rol == "dir_programa":
            final_list_estudiantes = []
            obj_dir = usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id')
            obj_dir_programa = dir_programa.objects.filter(id_usuario_rol=obj_dir[0]['id']).values()
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa=obj_dir_programa[0]['id_programa_id']).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        elif data_usuario_rol == "vcd_academico":
            final_list_estudiantes = []
            obj_usuario_rol = usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id')
            obj_facultad = vcd_academico.objects.filter(id_usuario_rol=obj_usuario_rol[0]['id']).values('id_facultad')
            list_programas = programa.objects.filter(id_facultad = obj_facultad[0]['id_facultad']).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in =list_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        estudiantes_ids = [data['id'] for data in serializer_estudiantes.data]

        # Obtener los datos relacionados a las condiciones de excepción de una vez
        condiciones_excepcion = cond_excepcion.objects.filter(id__in=[data['id_cond_excepcion'] for data in serializer_estudiantes.data])


        # Obtener los datos relacionados a los programas y estados de una vez
        programas_estudiantes = programa_estudiante.objects.filter(id_estudiante__in=list_estudiantes)
        programa_data = programa.objects.in_bulk(programas_estudiantes.values_list('id_programa_id', flat=True))
        estado_data = estado_programa.objects.in_bulk(programas_estudiantes.values_list('id_estado_id', flat=True))
        sedes = sede.objects.in_bulk([programa_data[programa_id].id_sede_id for programa_id in programa_data])

        # Obtener los datos relacionados con el último seguimiento de una vez
        seguimientos_recientes = riesgo_individual.objects.filter(id_estudiante__in=estudiantes_ids).values('id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad')


        for data_del_estudiante in serializer_estudiantes.data:
            # serializer_estudiante_2 = estudiante_serializer(i)
            estudiante_id = data_del_estudiante['id']

            try:
                seguimiento_reciente = next((s for s in seguimientos_recientes if s['id_estudiante'] == estudiante_id), None)
                # Crear un diccionario con los datos de riesgo del seguimiento
                if seguimiento_reciente:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad'])
                    }
                else:
                    riesgo = {
                    'riesgo_individual': 'SIN RIESGO',
                    'riesgo_familiar': 'SIN RIESGO',
                    'riesgo_academico': 'SIN RIESGO',
                    'riesgo_economico': 'SIN RIESGO',
                    'riesgo_vida_universitaria_ciudad': 'SIN RIESGO'
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

            try:
                programa_del_estudiante = programas_estudiantes.filter(id_estudiante=data_del_estudiante['id']).first()
                cohorte_estudiante_data = cohorte_estudiante.objects.filter(id_estudiante=data_del_estudiante['id']).values('id_cohorte')
                # print(cohorte_estudiante_data)
                cohorte_data = cohorte.objects.filter(id__in=cohorte_estudiante_data).values('id_number')
                # print(cohorte_data)

                dic_programa = {
                    'id_programa': programa_data[programa_del_estudiante.id_programa_id].codigo_univalle,
                    'programa_academico': programa_data[programa_del_estudiante.id_programa_id].nombre,
                    'sede': sedes[programa_data[programa_del_estudiante.id_programa_id].id_sede_id].nombre
                }

                dic_reg_academico = {
                    'registro_academico': estado_data[programa_del_estudiante.id_estado_id].nombre
                }
                
                dic_cohorte = {
                    'cohorte': cohorte_data[0]['id_number']
                }
                

            except:
                dic_programa = {
                    'id_programa': '',
                    'programa_academico': 'N/A',
                    'sede': 'N/A'
                } 
                dic_reg_academico = {
                    'registro_academico': 'N/A'
                }
                
                dic_cohorte = {   
                    'cohorte': 'N/A'
                }

            try:
                id_monitor_estudiante = asignacion.objects.filter(id_estudiante=data_del_estudiante['id'], estado=True,id_semestre=var_semestre.id).values('id_usuario')
                data_monitor = User.objects.filter(id=id_monitor_estudiante[0]['id_usuario']).values('id','first_name','last_name')
                consulta_jefe_monitor = usuario_rol.objects.filter(id_usuario=data_monitor[0]['id'],id_semestre=var_semestre.id, estado="ACTIVO").values('id_jefe')
                data_practicante = User.objects.filter(id=consulta_jefe_monitor[0]['id_jefe']).values('id','first_name','last_name')
                consulta_jefe_practicante = usuario_rol.objects.filter(id_usuario=data_practicante[0]['id'],id_semestre=var_semestre.id, estado="ACTIVO").values('id_jefe')
                data_profesional = User.objects.filter(id=consulta_jefe_practicante[0]['id_jefe']).values('first_name','last_name')

                dic_asignaciones = {
                    'asignacion_monitores':data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                    'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                    'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                }
                dic_estados = {
                        'estado_ases': 'ACTIVO/A'
                }
            except:
                dic_asignaciones = {
                    'asignacion_monitores': 'Sin Asignar',
                    'asignacion_practicante': 'Sin Asignar',
                    'asignacion_profesional': 'Sin Asignar'
                }
                dic_estados = {
                        'estado_ases': 'INACTIVO/A'
                }
                # pass

            try:
                cond_excepcion_data = [ce for ce in condiciones_excepcion if ce.id == data_del_estudiante['id_cond_excepcion']]
                dic_cond_excepcion = {
                "condicion_excepcion": cond_excepcion_data[0].alias
                }

            except:
                dic_cond_excepcion = {
                    "condicion_excepcion": ''
                }   

            data = dict(data_del_estudiante, **riesgo, **dic_programa, **dic_estados, **
                        dic_reg_academico, **dic_cohorte, **dic_asignaciones, **dic_cond_excepcion)
    
            final_list_estudiantes.append(data)
            # print(data)
        return Response(final_list_estudiantes)


class get_cohortes_viewsets(viewsets.GenericViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk):
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)

        if data_usuario_rol == "monitor":
            final_list_estudiantes = list()
            list_id_estudiantes = asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            
        estudiantes_ids = [data['id'] for data in serializer_estudiantes.data]
        # print("bfr fr loop")
        list_cohortes = []
        for data_del_estudiante in serializer_estudiantes.data:
            estudiante_id = data_del_estudiante['id']
            try:
                cohorte_estudiante_data = cohorte_estudiante.objects.filter(id_estudiante=data_del_estudiante['id']).values('id_cohorte')
                # print(cohorte_estudiante_data)
                cohorte_data = cohorte.objects.filter(id__in=cohorte_estudiante_data).values('id_number')
                # print(cohorte_data)
                dic_cohorte = {
                        'cohorte': cohorte_data[0]['id_number']
                    }
            except:
                dic_cohorte = {   
                        'cohorte': 'N/A'
                    }
            
            data = dict(dic_cohorte)
            list_cohortes.append(data)
        # print(list_cohortes)
        a_final_list_cohortes = list({v['cohorte']:v for v in list_cohortes}.values())
        
        # print(a_final_list_cohortes)

        new_cohorte  = list()
        new_cohorte_list = []
        cantidad_cohortes = 0
        last_list_cohortes = []
        for i in a_final_list_cohortes:
            new_cohorte.append(i.get('cohorte'))
            cantidad_cohortes += 1
            try:
                new_cohorte_list = {
                    'value': cantidad_cohortes,
                    'label': i.get('cohorte'),
                }
            except:
                new_cohorte_list = {
                    'label': 'N/A',
                    'value': 'N/A'
                }
            data = dict(new_cohorte_list)
            last_list_cohortes.append(data)

        
        return Response(last_list_cohortes)

