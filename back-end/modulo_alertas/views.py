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
from modulo_seguimiento.models import inasistencia, seguimiento_individual, riesgo_individual


from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models import F, OuterRef, Subquery, Max

from datetime import datetime, timedelta

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

            list_id_estudiantes = asignacion.objects.filter(
                id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "practicante":
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "profesional":
            list_id_practicantes = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)
            return Response(serializer_estudiantes.data)

        elif data_usuario_rol == "super_ases":

            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)
            return Response(serializer_estudiante.data)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico":

            list_id_programas = programa.objects.filter(
                id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(
                id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)
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

    def get_fecha_seguimiento(self, fecha, inasistencia):
        # print(fecha)
        # print(inasistencia)

        fech_actual = datetime.now()
        fecha_ = timedelta(days=7)
        fecha_limite = fech_actual - fecha_
        if fecha == None or fecha == 'None' or fecha == '' or fecha == ' ' or fecha == 'Null' or fecha == 'null' or fecha == 'NULL' or fecha == 'null' or fecha == 'NoneType':
            if inasistencia == None or inasistencia == '' or inasistencia == 'None':
                # print("el supuesto None")
                # print(inasistencia)

                return "FICHA FALTANTE"
            else:
                otra_inasistencia = datetime.strptime(inasistencia, "%Y-%m-%d")
                if otra_inasistencia.date() <= fecha_limite.date():
                    return "INASISTENCIA"
                else:
                    return "INASISTENCIA"
        else:
            date_obj = datetime.strptime(
                fecha, "%Y-%m-%d")
            if inasistencia == None or inasistencia == '':
                if date_obj.date() <= fecha_limite.date():
                  
                    # print("AQUI NO FUE")

                    return "FICHA FALTANTE"
            else:
                ina = datetime.strptime(inasistencia, "%Y-%m-%d")
                if date_obj.date() <= ina.date():
                    return "INASISTENCIA"
                elif (date_obj.date() > fecha_limite.date()):
                    return "SEGUIMIENTO RECIENTE"
                else:
                    return "FICHA FALTANTE"
            return "SEGUIMIENTO RECIENTE"

                
                
             

    def get_firma(self, firma):
        if firma:
            if firma['autoriza_tratamiento_datos'] == True:
                return 'AUTORIZA'
            elif firma['autoriza_tratamiento_datos'] == False:
                return 'NO AUTORIZA'
        else:
            return "SIN FIRMAR"

    def get_encuesta_admitido(self, encuesta):
        if encuesta == None:
            return "SIN DILIGENCIAR"
        if encuesta == True or encuesta == "True" or encuesta == "true":
            return "DILIGENCIADO"
        else:
            return "SIN DILIGENCIAR"

    def retrieve(self, request, pk):
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        list_conteo = list()
        list_estudiantes = list()

        if data_usuario_rol == "monitor":
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "practicante":
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "profesional":
            list_id_practicantes = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "super_ases":
            serializer_estudiantes = estudiante_serializer(
                estudiante.objects.all(), many=True)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo":
            list_id_programas = programa.objects.filter(
                id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(
                id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == None:
            return Response("Comunicate con el administrador para que te asigne un rol", status=status.HTTP_400_BAD_REQUEST)

        estudiantes_ids = [data['id'] for data in serializer_estudiantes.data]
        # Obtener los datos relacionados con el último seguimiento de una vez
        seguimientos_recientes = riesgo_individual.objects.filter(id_estudiante__in=estudiantes_ids).values(
            'id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad', 'fecha')

        firma_tratamientos = firma_tratamiento_datos.objects.filter(
            id_estudiante__in=estudiantes_ids).values()

        inasistencias_registradas = inasistencia.objects.filter(
            id_estudiante__in=estudiantes_ids).values()

        # # # # print(inasistencias_registradas)


        for i in serializer_estudiantes.data:

            # try:
            estudiante_id = i['id']

            try:
                # Obtener el seguimiento más reciente del estudiante especificado
                seguimiento_reciente = next(
                    (s for s in seguimientos_recientes if s['id_estudiante'] == estudiante_id), None)
                # Obtener firma de tratamiento de datos del estudiante
                firma_tratamiento = next(
                    (s for s in firma_tratamientos if s['id_estudiante_id'] == estudiante_id), None)

                # # # # print(firma_tratamiento_datos.objects.filter(

                #     id_estudiante=i['id']))

                inasistencia_regs = max(
                    (ina for ina in inasistencias_registradas if ina['id_estudiante_id'] == estudiante_id), 
                    key=lambda x: x['fecha'],
                    default=None
                )

                encuesta_admitido = i['encuesta_admitido']

                # Crear un diccionario con los datos de riesgo del seguimiento

                if seguimiento_reciente and firma_tratamiento and inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente['fecha']), str(inasistencia_regs['fecha']))),
                        # 'registra_inasistencia': ,
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }

                    # # # print("CASE 1")
                elif seguimiento_reciente and not firma_tratamiento and inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente['fecha']), str(inasistencia_regs['fecha']))),
                        # 'registra_inasistencia': ,
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                    # # # print("CASE 2")
                elif seguimiento_reciente and firma_tratamiento and not inasistencia_regs:

                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente['fecha']), '')),
                        # 'registra_inasistencia': '',
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                    # # # print("CASE 3")
                elif not seguimiento_reciente and not firma_tratamiento and inasistencia_regs:
                    riesgo = {

                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': (self.get_fecha_seguimiento('', str(inasistencia_regs['fecha']))),
                        # 'registra_inasistencia': '',
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                    # # # print("new CASE 6")

                elif not seguimiento_reciente and not firma_tratamiento and not inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': 'FICHA FALTANTE',
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                    # # # print("CASE 4")
                elif not seguimiento_reciente and firma_tratamiento_datos and inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': (self.get_fecha_seguimiento('', str(inasistencia_regs['fecha']))),
                        # 'registra_inasistencia': '',
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                else:
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': 'FICHA FALTANTE',
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                    # # # print("CASE NOT FOUND")

                # Devolver el riesgo en la respuesta
            except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist or encuesta_admitido.DoesNotExist:
                # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                riesgo = {
                    'riesgo_individual': 'SIN REGISTRAR',
                    'riesgo_familiar': 'SIN REGISTRAR',
                    'riesgo_academico': 'SIN REGISTRAR',
                    'riesgo_economico': 'SIN REGISTRAR',
                    'riesgo_vida_universitaria_ciudad': 'SIN REGISTRAR',
                    'fecha_seguimiento': 'FICHA FALTANTE',
                    'encuesta_admitido': self.get_encuesta_admitido(str(False)),
                    'firma_tratamiento_datos': 'SIN FIRMAR'
                }
            data = dict(i, **riesgo)

            # # # # print(cont_riesgos)
            # # # # print(cont_riesgos)
            list_conteo.append(data)
        # # # # # print(list_conteo)
        # # # # print(list_conteo)
        # cont_riesgos = self.get_counter_riesgo(list_conteo)
        return Response(list_conteo)


class alert_counter_viewsets(viewsets.ModelViewSet):

    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()

    # Contador de:
    # Riesgos - *DONE
    # Tratamiento de Datos - *DONE
    # Encuesta de admitidos - *DONE
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
        date_obj = datetime.strptime(fecha, "%Y-%m-%d").date
        return date_obj

    def get_firma(self, firma):
        if firma:
            if firma['autoriza_tratamiento_datos'] == True:
                return 'AUTORIZA'
            elif firma['autoriza_tratamiento_datos'] == False:
                return 'NO AUTORIZA'
        else:
            return "SIN FIRMAR"

    def get_encuesta_admitido(self, encuesta):
        if encuesta:
            if encuesta == True or encuesta == "True" or encuesta == "true":
                return "DILIGENCIADO"
            else:
                return "SIN DILIGENCIAR"
        else:
            return "SIN DILIGENCIAR"

    def get_counter_riesgo(self, riesgo):
        counter_riesgo_individual = 0
        counter_riesgo_familiar = 0
        counter_riesgo_academico = 0
        counter_riesgo_economico = 0
        counter_riesgo_vida_universitaria_ciudad = 0

        counter_fecha_seguimiento = 0
        
        counter_inasistencia = 0

        counter_empty_date = 0

        counter_firma_datos = 0

        counter_encuesta_admitido = 0

        fech_actual = datetime.now()
        fecha_ = timedelta(days=7)
        fecha_limite = fech_actual - fecha_
        # print(riesgo)
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

                # Creo que la está funcionando bien, pero hay que revisar.
                # Espero que un alma caritativa ayude a verificar que funcione, y si no... que los corderos sean los
                # Los Usuarios >:D
            if i['fecha_seguimiento'] == '' or i['fecha_seguimiento'] == None:
                if i['registra_inasistencia'] == None or i['registra_inasistencia'] == '':
                    counter_empty_date += 1
                    

                else:
                    otra_inasistencia = datetime.strptime(
                        i['registra_inasistencia'], "%Y-%m-%d")
                    if otra_inasistencia.date() <= fecha_limite.date():
                        counter_inasistencia += 0
            else:
                date_obj = datetime.strptime(
                    i['fecha_seguimiento'], "%Y-%m-%d")
                if i['registra_inasistencia'] == None or i['registra_inasistencia'] == '':
                    if date_obj.date() <= fecha_limite.date():
                        # # print("ENTRO")
                        # # print(date_obj)
                        # # print("ina")
                        # # print(otra_inasistencia)
                        # # print(fecha_limite)
                        counter_fecha_seguimiento += 1
                else:
                    # print(i['registra_inasistencia'])
                    ina = datetime.strptime(
                        i['registra_inasistencia'], "%Y-%m-%d")
                    if date_obj.date() <= ina.date():
                        # # print(date_obj.date())
                        # # print("diff")
                        # # print(ina.date())
                        # print("actual")
                        # print(fecha_limite.date())
                        if ina.date() <= fecha_limite.date():
                            counter_inasistencia += 1
                    else: 
                        if date_obj.date() <= fecha_limite.date():
                            
                            # return str(ina.date())
                            counter_fecha_seguimiento +=1
                            # counter_inasistencia += 1
                    # else:
                    #     counter_fecha_seguimiento += 1
            if i['firma_tratamiento_datos'] == 'NO AUTORIZA' or i['firma_tratamiento_datos'] == None or i['firma_tratamiento_datos'] == 'SIN FIRMAR':
                counter_firma_datos += 1
                # # # print(i)

            if i['encuesta_admitido'] == 'SIN DILIGENCIAR':
                counter_encuesta_admitido += 1

        # contador_riesgo = {
        #     'riesgo_individual': counter_riesgo_individual,
        #     'riesgo_familiar': counter_riesgo_familiar,
        #     'riesgo_academico': counter_riesgo_academico,
        #     'riesgo_economico': counter_riesgo_economico,
        #     'riesgo_vida_universitaria_ciudad': counter_riesgo_vida_universitaria_ciudad,
        #     'fecha_seguimiento': counter_fecha_seguimiento,
        #     'firma_tratamiento_datos': counter_firma_datos
        # }
        # print(counter_riesgo_individual)
        # print(counter_riesgo_familiar)
        # print(counter_riesgo_academico)
        # print(counter_riesgo_economico)
        # print(counter_riesgo_vida_universitaria_ciudad)
        # print("seguimiento Faltante:")
        # print(counter_fecha_seguimiento)
        # print("inasistencia")
        # print(counter_inasistencia)
        # print(counter_empty_date)
        # print(counter_firma_datos)
        # print(counter_encuesta_admitido)


        contador_total = counter_riesgo_individual + counter_riesgo_familiar + counter_riesgo_academico + counter_riesgo_economico + \
            counter_riesgo_vida_universitaria_ciudad + \
            counter_fecha_seguimiento + counter_empty_date + \
            counter_firma_datos + counter_encuesta_admitido + counter_inasistencia
        # # # # print(riesgo)
        # # # # print(contador_total)
        # # # # print(contador_riesgo)
        return contador_total

    def retrieve(self, request, pk, *args, **kwargs):

        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        list_conteo = []
        cont_riesgos = []
        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        # list_estudiantes = list()

        if data_usuario_rol == "monitor":
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario=pk, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "practicante":
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "profesional":
            list_id_practicantes = usuario_rol.objects.filter(
                id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores = usuario_rol.objects.filter(
                id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(
                id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        elif data_usuario_rol == "super_ases":
            serializer_estudiantes = estudiante_serializer(
                estudiante.objects.filter(estudiante_elegible = True), many=True)

        elif data_usuario_rol == "socioeducativo_reg" or data_usuario_rol == "socioeducativo":
            list_id_programas = programa.objects.filter(
                id_sede=data_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(
                id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(
                id__in=list_id_estudiantes,estudiante_elegible = True )
            serializer_estudiantes = estudiante_serializer(
                list_estudiantes, many=True)

        estudiantes_ids = [data['id'] for data in serializer_estudiantes.data]
        # Obtener los datos relacionados con el último seguimiento de una vez
        seguimientos_recientes = riesgo_individual.objects.filter(id_estudiante__in=estudiantes_ids).values(
            'id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad', 'fecha')

        firma_tratamientos = firma_tratamiento_datos.objects.filter(
            id_estudiante__in=estudiantes_ids).values()

        inasistencias_registradas = inasistencia.objects.filter(
            id_estudiante__in=estudiantes_ids).values()
        # # # # print(inasistencias_registradas)

        for i in serializer_estudiantes.data:

            estudiante_id = i['id']

            try:
                # Obtener el seguimiento más reciente del estudiante especificado
                seguimiento_reciente = next(
                    (s for s in seguimientos_recientes if s['id_estudiante'] == estudiante_id), None)
                # Obtener firma de tratamiento de datos del estudiante
                firma_tratamiento = next(
                    (s for s in firma_tratamientos if s['id_estudiante_id'] == estudiante_id), None)
                # # # # print(seguimiento_reciente)

                inasistencia_regs = max(
                    (ina for ina in inasistencias_registradas if ina['id_estudiante_id'] == estudiante_id), 
                    key=lambda x: x['fecha'],
                    default=None
                )
                encuesta_admitido = i['encuesta_admitido']

                # Crear un diccionario con los datos de riesgo del seguimiento
                if seguimiento_reciente and firma_tratamiento and inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': str(seguimiento_reciente['fecha'], ),
                        'registra_inasistencia': str(inasistencia_regs['fecha']),
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))

                    }
                elif seguimiento_reciente and firma_tratamiento and not inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': str(seguimiento_reciente['fecha']),
                        'registra_inasistencia': '',
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                elif seguimiento_reciente and not firma_tratamiento and inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': str(seguimiento_reciente['fecha']),
                        'registra_inasistencia': str(inasistencia_regs['fecha']),
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                elif seguimiento_reciente and not firma_tratamiento and not inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente['riesgo_individual']),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente['riesgo_familiar']),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_academico']),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente['riesgo_economico']),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente['riesgo_vida_universitaria_ciudad']),
                        'fecha_seguimiento': str(seguimiento_reciente['fecha']),
                        'registra_inasistencia': '',
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                elif not seguimiento_reciente and not firma_tratamiento and not inasistencia_regs:
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'registra_inasistencia': '',
                        'firma_tratamiento_datos': 'SIN FIRMAR',
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }
                else:
                    riesgo = {
                        'riesgo_individual': 'N/A',
                        'riesgo_familiar': 'N/A',
                        'riesgo_academico': 'N/A',
                        'riesgo_economico': 'N/A',
                        'riesgo_vida_universitaria_ciudad': 'N/A',
                        'fecha_seguimiento': '',
                        'registra_inasistencia': '',
                        'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
                        'encuesta_admitido': self.get_encuesta_admitido(str(encuesta_admitido))
                    }

                # Devolver el riesgo en la respuesta
            except seguimiento_individual.DoesNotExist or firma_tratamiento_datos.DoesNotExist or encuesta_admitido.DoesNotExist:
                # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                riesgo = {
                    'riesgo_individual': 'N/A',
                    'riesgo_familiar': 'N/A',
                    'riesgo_academico': 'N/A',
                    'riesgo_economico': 'N/A',
                    'riesgo_vida_universitaria_ciudad': 'N/A',
                    'fecha_seguimiento': '',
                    'registra_inasistencia': '',
                    'firma_tratamiento_datos': 'NO AUTORIZA',
                    'encuesta_admitido': self.get_encuesta_admitido(str(False)),
                }
            data = dict(i, **riesgo)
            list_conteo.append(data)
        cont_riesgos = self.get_counter_riesgo(list_conteo)
        return Response(cont_riesgos)
