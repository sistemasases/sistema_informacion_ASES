from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
import time
import re
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected, basic_estudiante_serializer
from modulo_seguimiento.serializers import seguimiento_individual_serializer
from django.core import serializers

from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cond_excepcion, cohorte_estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
from modulo_seguimiento.models import inasistencia, seguimiento_individual, riesgo_individual 
from modulo_academico.models import monitoria_academica, materia
from modulo_formularios_externos.models import asistencia as asistencia_model
from datetime import datetime, timedelta, date
from django.db.models.functions import TruncWeek

from modulo_instancia.models import cohorte

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q, F, OuterRef, Subquery, Max, Count, Avg, DateField
from django.db.models.functions import TruncDate, TruncMonth
from rest_framework.decorators import action


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

        elif data_usuario_rol == "traer_todos_estudiantes":

            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

            # serializer_estudiante = estudiante_serializer(estudiante.objects.all(), many=True)
            # return Response(serializer_estudiante.data)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico" or data_usuario_rol == "super_ases":
            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes,estudiante_elegible=True)
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

        elif data_usuario_rol == "traer_todos_estudiantes":
            final_list_estudiantes = list()
            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico" or data_usuario_rol == "super_ases":
            final_list_estudiantes = list()
            list_id_programas = programa.objects.filter(id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes,estudiante_elegible=True)
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

        else:
            # Si el rol no coincide con ninguno de los casos anteriores, retornar lista vacía
            return Response([], status=status.HTTP_200_OK)

        # Verificar que serializer_estudiantes esté definido antes de continuar
        if not serializer_estudiantes:
            return Response([], status=status.HTTP_200_OK)

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
                # print(programa_del_estudiante)
                programa_estudiante_data = programa_estudiante.objects.filter(id_estudiante=data_del_estudiante['id']).values('id_programa', 'id_estado')
                # print(programa_estudiante_data)
                
                cohorte_estudiante_data = cohorte_estudiante.objects.filter(id_estudiante=data_del_estudiante['id']).values('id_cohorte')
                # print(cohorte_estudiante_data)
                cohorte_data = cohorte.objects.filter(id__in=cohorte_estudiante_data).values('id_number')
                # print(cohorte_data)

                # dic_programa = {
                #     'id_programa': programa_data[programa_del_estudiante.id_programa_id].codigo_univalle,
                #     'programa_academico': programa_data[programa_del_estudiante.id_programa_id].nombre,
                #     'sede': sedes[programa_data[programa_del_estudiante.id_programa_id].id_sede_id].nombre
                # }
                dic_programa = {
                    'programas': []
                }
                
                dic_reg_academico = {
                    'registro_academico': []
                }
                
                for programa_ in programa_estudiante_data:
                    # Obtiene la información del programa académico
                    id_programa = programa_['id_programa']
                    programa_info = programa_data.get(id_programa)  # Obtener información del programa
                    
                    # Obtiene el estado del registro académico de cada programa
                    id_estado = programa_['id_estado']
                    estado_info = estado_data.get(id_estado)  # Obtener información del estado
                    
                    if programa_info:
                        dic_programa['programas'].append({
                            'id_programa': programa_data[id_programa].codigo_univalle,
                            'programa_academico': programa_data[id_programa].nombre,
                            'sede': sedes[programa_data[id_programa].id_sede_id].nombre,
                        })
                        
                    if estado_info:
                        dic_reg_academico['registro_academico'].append({
                            'estado': estado_info.nombre
                        })          
                   
                
                dic_cohorte = {
                    'cohorte': list(cohorte_data.values_list('id_number', flat=True))
                }
                

            except Exception as e:
                print("Error en la consulta de programas")
                print(e)
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


class estadisticas_monitorias_viewset(viewsets.ViewSet):

    @action(detail=True, methods=['get'], url_path='facultades_sede')
    def facultades_sede(self, request, pk=None):
        """
        Devuelve las facultades asociadas a una sede (por programas o materias).
        """
        data = list(
            facultad.objects.filter(id_facultad_in_programa__id_sede_id=pk)
            .distinct()
            .order_by('nombre')
            .values('id', 'nombre')
        )
        return Response(data)   

    @action(detail=False, methods=['post'], url_path='estadisticas_monitorias')
    def estadisticas_monitorias(self, request):
        try:
            sede_id = request.data.get('sede_id')
            semestre_id = request.data.get('semestre')
            materia_filter = request.data.get('materia')
            programa_filter = request.data.get('programa')
            facultad_filter = request.data.get('facultad')

            # ------------------------------
            # Filtrado inicial de monitorías (activas e inactivas)
            # ------------------------------
            filters = {}
            if sede_id: filters['id_sede'] = sede_id
            if semestre_id: filters['id_semestre'] = semestre_id
            monitorias_queryset = monitoria_academica.objects.filter(**filters)

            # ------------------------------
            # Obtener fechas de semestre
            # ------------------------------
            def get_semestre_fechas(sem_obj):
                if not sem_obj:
                    return None, None
                inicio = getattr(sem_obj.fecha_inicio, 'date', lambda: sem_obj.fecha_inicio)()
                fin = getattr(sem_obj.fecha_fin, 'date', lambda: sem_obj.fecha_fin)()
                return inicio, fin

            if semestre_id:
                sem = semestre.objects.filter(id=semestre_id).first()
            else:
                # Semestre actual
                sem = semestre.objects.filter(
                    semestre_actual=True, id_sede_id=sede_id if sede_id else None
                ).first()
            fecha_inicio, fecha_fin = get_semestre_fechas(sem)

            # ------------------------------
            # Filtrado por materia
            # ------------------------------
            if materia_filter:
                monitorias_queryset = monitorias_queryset.filter(materia__icontains=materia_filter)

            monitoria_ids = list(monitorias_queryset.values_list('id', flat=True))

            # ------------------------------
            # Filtrado de asistencias dentro del rango de fechas
            # ------------------------------
            asistencias_queryset = asistencia_model.objects.filter(id_monitoria__in=monitoria_ids)
            if fecha_inicio and fecha_fin:
                asistencias_queryset = asistencias_queryset.filter(fecha__range=[fecha_inicio, fecha_fin])

            # ------------------------------
            # Filtrar por facultad o programa sobre los estudiantes
            # ------------------------------
            if facultad_filter:
                facultad_ids = facultad.objects.filter(
                    Q(id=facultad_filter) | Q(nombre__icontains=facultad_filter)
                ).values_list('id', flat=True)
                programas_ids = programa.objects.filter(id_facultad__in=facultad_ids).values_list('id', flat=True)
            elif programa_filter:
                # Intentar filtrar por ID primero (si es numérico)
                try:
                    programa_id = int(programa_filter)
                    programas_ids = programa.objects.filter(id=programa_id).values_list('id', flat=True)
                except (ValueError, TypeError):
                    # Si no es numérico, extraer el nombre sin la sigla (D) o (N) y filtrar por nombre
                    nombre_sin_sigla = programa_filter
                    # Remover patrones como " (D)" o " (N)" al final
                    nombre_sin_sigla = re.sub(r'\s*\([DN]\)\s*$', '', nombre_sin_sigla).strip()
                    programas_ids = programa.objects.filter(nombre__icontains=nombre_sin_sigla).values_list('id', flat=True)
            else:
                programas_ids = None

            if programas_ids:
                estudiantes_ids = programa_estudiante.objects.filter(
                    id_programa__in=programas_ids
                ).values_list('id_estudiante', flat=True)
                asistencias_queryset = asistencias_queryset.filter(id_estudiante__in=estudiantes_ids)

            # ------------------------------
            # KPIs globales
            # ------------------------------
            total_estudiantes = asistencias_queryset.values('id_estudiante').distinct().count()
            total_asistencias = asistencias_queryset.filter(check_asistencia=True).count()

            # ------------------------------
            # Estadísticas por materia (estudiantes y asistencias)
            # ------------------------------
            materias_distintas = monitorias_queryset.values_list('materia', flat=True).distinct()
            estudiantes_por_materia = []
            asistencias_por_materia = []
            
            for mat in materias_distintas:
                monitorias_materia_ids = monitorias_queryset.filter(materia=mat).values_list('id', flat=True)
                asistentes_qs = asistencia_model.objects.filter(id_monitoria__in=monitorias_materia_ids)
                if fecha_inicio and fecha_fin:
                    asistentes_qs = asistentes_qs.filter(fecha__range=[fecha_inicio, fecha_fin])
                
                count_estudiantes = asistentes_qs.values('id_estudiante').distinct().count()
                count_asistencias = asistentes_qs.filter(check_asistencia=True).count()

                estudiantes_por_materia.append({'materia': mat, 'estudiantes': count_estudiantes})
                asistencias_por_materia.append({'materia': mat, 'asistencias': count_asistencias})

            # Ordenar descendente por cantidad de asistentes
            estudiantes_por_materia = sorted(estudiantes_por_materia, key=lambda x: x['estudiantes'], reverse=True)
            asistencias_por_materia = sorted(asistencias_por_materia, key=lambda x: x['asistencias'], reverse=True)

            # Estudiantes y asistencias por programa
            distribucion_estudiantes_programa = []
            asistencias_por_programa = []

            # ------------------------------
            # Programas de la sede
            # ------------------------------
            programas_distintos = programa.objects.all()
            
            if sede_id:
                programas_distintos = programas_distintos.filter(id_sede=sede_id)
            
            # Filtrar por facultad si aplica
            if facultad_filter:
                facultad_ids = facultad.objects.filter(
                    Q(id=facultad_filter) | Q(nombre__icontains=facultad_filter)
                ).values_list('id', flat=True)
                programas_distintos = programas_distintos.filter(id_facultad__in=facultad_ids)

            # Filtrar por programa si aplica
            if programa_filter:
                # Intentar filtrar por ID primero (si es numérico)
                try:
                    programa_id = int(programa_filter)
                    programas_distintos = programas_distintos.filter(id=programa_id)
                except (ValueError, TypeError):
                    # Si no es numérico, extraer el nombre sin la sigla (D) o (N) y filtrar por nombre
                    nombre_sin_sigla = re.sub(r'\s*\([DN]\)\s*$', '', programa_filter).strip()
                    programas_distintos = programas_distintos.filter(nombre__icontains=nombre_sin_sigla)
            
            for prog in programas_distintos:
                # DIURNO / NOCTURNO → D / N
                jornada_label = "D" if "DIURNA" in prog.jornada.upper() else "N"
                nombre_programa = f"{prog.nombre} ({jornada_label})"                

                # Estudiantes asignados al programa
                estudiantes_prog = programa_estudiante.objects.filter(id_programa=prog.id, traker=True).values_list('id_estudiante', flat=True)
                asistencias_prog_qs = asistencias_queryset.filter(id_estudiante__in=estudiantes_prog)

                # Conteos
                total_est_prog = asistencias_prog_qs.values('id_estudiante').distinct().count()
                total_asist_prog = asistencias_prog_qs.filter(check_asistencia=True).count()

                if total_est_prog > 0:                    

                    distribucion_estudiantes_programa.append({
                        'programa': nombre_programa,
                        'valor': total_est_prog
                    })
                if total_asist_prog > 0:
                    asistencias_por_programa.append({
                        'programa': nombre_programa,
                        'valor': total_asist_prog
                    })
                    
            # ------------------------------
            # Evolución temporal mensual
            # ------------------------------
            estudiantes_por_mes_qs = asistencias_queryset.annotate(mes=TruncMonth('fecha')).values('mes').annotate(
                total_estudiantes=Count('id_estudiante', distinct=True)
            ).order_by('mes')
            asistencias_por_mes_qs = asistencias_queryset.filter(check_asistencia=True).annotate(mes=TruncMonth('fecha')).values('mes').annotate(
                total_asistencias=Count('id')
            ).order_by('mes')

            # Construir línea de tiempo mensual completa del semestre
            estudiantes_por_mes_map = {item['mes'].strftime('%Y-%m'): item['total_estudiantes'] for item in estudiantes_por_mes_qs if item['mes']}
            asistencias_por_mes_map = {item['mes'].strftime('%Y-%m'): item['total_asistencias'] for item in asistencias_por_mes_qs if item['mes']}

            estudiantes_por_mes = []
            asistencias_por_mes = []

            if fecha_inicio and fecha_fin:
                # Normalizar a primer día de mes
                start_month = fecha_inicio.replace(day=1)
                end_month = fecha_fin.replace(day=1)
                cur = start_month
                while cur <= end_month:
                    key = cur.strftime('%Y-%m')
                    estudiantes_por_mes.append({'fecha': key, 'valor': estudiantes_por_mes_map.get(key, 0)})
                    asistencias_por_mes.append({'fecha': key, 'valor': asistencias_por_mes_map.get(key, 0)})
                    # avanzar 1 mes
                    if cur.month == 12:
                        cur = cur.replace(year=cur.year + 1, month=1)
                    else:
                        cur = cur.replace(month=cur.month + 1)
            else:
                # fallback: usar solo los meses presentes en data
                for k in sorted(set(list(estudiantes_por_mes_map.keys()) + list(asistencias_por_mes_map.keys()))):
                    estudiantes_por_mes.append({'fecha': k, 'valor': estudiantes_por_mes_map.get(k, 0)})
                    asistencias_por_mes.append({'fecha': k, 'valor': asistencias_por_mes_map.get(k, 0)})

            # ------------------------------
            # Materia con mayor / menor asistencia
            # ------------------------------
            materia_mayor = asistencias_por_materia[0]['materia'] if asistencias_por_materia else "-"
            materia_menor = asistencias_por_materia[-1]['materia'] if asistencias_por_materia else "-"

            # ------------------------------
            # Retorno de datos
            # ------------------------------
            data = {
                "kpis": {
                    "totalEstudiantes": total_estudiantes,
                    "totalAsistencias": total_asistencias,
                    "materiaMayorAsistencia": materia_mayor,
                    "materiaMenorAsistencia": materia_menor
                },
                "estudiantesPorMateria": estudiantes_por_materia,
                "asistenciasPorMateria": asistencias_por_materia,
                "estudiantesPorPrograma": distribucion_estudiantes_programa,
                "asistenciasPorPrograma": asistencias_por_programa,
                "estudiantesPorMes": estudiantes_por_mes,
                "asistenciasPorMes": asistencias_por_mes,
            }

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)