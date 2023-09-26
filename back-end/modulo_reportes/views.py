from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected
from modulo_seguimiento.serializers import seguimiento_individual_serializer
from django.core import serializers

from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cond_excepcion
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
from modulo_seguimiento.models import inasistencia, seguimiento_individual


from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q
from django.db.models import F, OuterRef, Subquery


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk):

        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')

        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        # var_semestre = 0;
        list_estudiantes = list()
        # list_monitores = list()
        # list_practicantes = list()
        # list_profesionales = list()

        if data_usuario_rol == "monitor":

            for id_estudiante in asignacion.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado=True).values():
                var_estudiante = estudiante.objects.get(
                    id=id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)
            # return Response("caso no encontrado")

        elif data_usuario_rol == "practicante":

            for obj_monitor in usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():

                # var_monitor_data = User.objects.get(id = obj_monitor['id_usuario_id'])
                # serializer_monitor = user_selected(var_monitor_data)
                # list_monitores.append(serializer_monitor.data)
                # var_id_usuario_monitor = obj_monitor['id_usuario_id']

                for id_estudiante in asignacion.objects.filter(id_usuario=obj_monitor['id_usuario_id'], id_semestre=var_semestre.id, estado=True).values():

                    var_estudiante = estudiante.objects.get(
                        id=id_estudiante['id_estudiante_id'])
                    serializer_estudiante = estudiante_serializer(
                        var_estudiante)
                    list_estudiantes.append(serializer_estudiante.data)

            return Response(list_estudiantes)

            # return Response("caso no encontrado")

        elif data_usuario_rol == "profesional":
            programas_sede = programa.objects.filter(id_sede=data_sede)
            estudiantes_sede = estudiante.objects.filter(
                id_estudiante_in_programa_estudiante__id_programa__in=programas_sede).distinct()
            serialized_estudiantes = estudiante_serializer(
                estudiantes_sede, many=True)
            return Response(serialized_estudiantes.data, status=status.HTTP_200_OK)

        elif data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico" or data_usuario_rol == "sistemas":
            # ven todo
            list_estudiantes = []
            # list_programas = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            return Response(serializer_estudiante.data)

        elif data_usuario_rol == "socioeducativo_reg":
            # Ve todos los estudiantes que no son de la sede "Melendez"
            list_estudiantes = []
            # for obj_programa in programa.objects.exclude(Q(id_sede=data_sede)).values():
            for obj_programa in programa.objects.filter(id_sede=data_sede).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                    for obj_estudiante in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                        serializer_estudiante = estudiante_serializer(
                            obj_estudiante)
                        list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)

        elif data_usuario_rol == "dir_programa":
            # Ve todos los estudiantes del programa y la sede
            # ven todo
            # print(data_sede)
            # print(var_semestre.id)
            list_estudiantes = []
            for obj_dir in usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():
                for obj_dir_programa in dir_programa.objects.filter(id_usuario_rol=obj_dir['id']).values():
                    # PROGRAMA PRUEBA 2724 -> id_programa = 257
                    # TRACKER = OPTIONAL ?
                    for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_dir_programa['id_programa_id']).values():
                        for obj_estudiantes in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                            # var_estudiante = estudiante.objects.get(
                            #     id=obj_estudiantes['id'])
                            serializer_estudiante = estudiante_serializer(
                                obj_estudiantes)
                            list_estudiantes.append(serializer_estudiante.data)

            return Response(list_estudiantes)

            # for obj_usuario_rol in usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():
            #     for obj_dir_programa in dir_programa.objects.filter(id_usuario_rol=obj_usuario_rol['id']).values():
            #         for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_dir_programa['id_programa']).values():
            #             for obj_estudiantes in estudiante.objects.filter(id_estudiante=obj_programa_estudiante['id_estudiante_id']).values():
            #                 var_estudiante = estudiante.objects.get(obj_estudiantes = id)
            #                 serializer_estudiante = estudiante_serializer(
            #                     var_estudiante)
            #                 list_estudiantes.append(serializer_estudiante.data)
            #             # serialized_estudiantes = estudiante_serializer(obj_estudiantes, many=True)

            # return Response(list_estudiantes)

            # return Response("caso no encontrado")

        elif data_usuario_rol == "vcd_academico":

            list_estudiantes = []
            
            for obj_usuario_rol in usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():
                for obj_vcd_academico in vcd_academico.objects.filter(id_usuario_rol=obj_usuario_rol['id']).values():
                    for obj_facultad in facultad.objects.filter(id=obj_vcd_academico['id_facultad_id']).values():
                        for obj_programa in programa.objects.filter(id_facultad=obj_facultad['id']).values():
                            for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                                for obj_estudiantes in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                                    serializer_estudiante = estudiante_serializer(
                                        obj_estudiantes)
                                    list_estudiantes.append(serializer_estudiante.data)

            return Response(list_estudiantes)

        elif data_usuario_rol == "super_ases":

            # ven todo
            list_estudiantes = []
            # list_programas = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            return Response(serializer_estudiante.data)

            # return Response("caso no encontrado")

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
        elif riesgo == None:
            return 'SIN RIESGO'

    def retrieve(self, request, pk):

        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
        # var_semestre = 0;

        if data_usuario_rol == "monitor":
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
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': seguimiento_reciente.riesgo_individual,
                        'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                        'riesgo_academico': seguimiento_reciente.riesgo_academico,
                        'riesgo_economico': seguimiento_reciente.riesgo_economico,
                        'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
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

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                try:

                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

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
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': seguimiento_reciente.riesgo_individual,
                        'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                        'riesgo_academico': seguimiento_reciente.riesgo_academico,
                        'riesgo_economico': seguimiento_reciente.riesgo_economico,
                        'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
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

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                try:

                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

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
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': seguimiento_reciente.riesgo_individual,
                        'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                        'riesgo_academico': seguimiento_reciente.riesgo_academico,
                        'riesgo_economico': seguimiento_reciente.riesgo_economico,
                        'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
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
                    # print('no riesgos')

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # print(cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

        elif data_usuario_rol == "socioeducativo" or data_usuario_rol == "dir_investigacion" or data_usuario_rol == "dir_academico" or data_usuario_rol == "sistemas":
            list_estudiantes = list()
            final_list_estudiantes = list()
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            for i in serializer_estudiante.data:

                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': seguimiento_reciente.riesgo_individual,
                        'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                        'riesgo_academico': seguimiento_reciente.riesgo_academico,
                        'riesgo_economico': seguimiento_reciente.riesgo_economico,
                        'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
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
                    # print('no riesgos')

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # (cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

        elif data_usuario_rol == "socioeducativo_reg":
            list_estudiantes = []
            final_list_estudiantes = list()
            # for obj_programa in programa.objects.exclude(Q(id_sede=data_sede)).values():
            for obj_programa in programa.objects.filter(id_sede=data_sede).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                    for obj_estudiante in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                        serializer_estudiante = estudiante_serializer(
                            obj_estudiante)
                        list_estudiantes.append(serializer_estudiante.data)

            # list_estudiantes = list()
            # serializer_estudiante = estudiante_serializer(estudiante.objects.all(), many=True)

            for i in list_estudiantes:
                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento
                    riesgo = {
                        'riesgo_individual': seguimiento_reciente.riesgo_individual,
                        'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                        'riesgo_academico': seguimiento_reciente.riesgo_academico,
                        'riesgo_economico': seguimiento_reciente.riesgo_economico,
                        'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
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
                    # print('no riesgos')

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # (cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)

                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

        elif data_usuario_rol == "dir_programa":
           # Ve todos los estudiantes del programa y la sede
            # ven todo
            # print(data_sede)
            # print(var_semestre.id)
            list_estudiantes = []
            final_list_estudiantes = []
            for obj_dir in usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():
                # print("obj_dir")
                # print(obj_dir)
                for obj_dir_programa in dir_programa.objects.filter(id_usuario_rol=obj_dir['id']).values():
                    # print("WTF")
                    # print(obj_dir_programa)
                    # PROGRAMA PRUEBA 2724 -> id_programa = 257
                    # TRACKER = OPTIONAL ?
                    for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_dir_programa['id_programa_id']).values():
                        # print("HELLO ?")
                        # print(obj_programa_estudiante)
                        for obj_estudiantes in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                            # print("hola, esto de Pute*")
                            # print(obj_estudiantes)
                            # var_estudiante = estudiante.objects.get(
                            #     id=obj_estudiantes['id'])
                            serializer_estudiante = estudiante_serializer(
                                obj_estudiantes)
                            list_estudiantes.append(serializer_estudiante.data)
                            
                        # serialized_estudiantes = estudiante_serializer(obj_estudiantes, many=True)

            # Añadiendo datos de consultas externas a los estudiantes

            for i in list_estudiantes:
                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento

                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)
                    }

                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'SIN RIESGO',
                        'riesgo_familiar': 'SIN RIESGO',
                        'riesgo_academico': 'SIN RIESGO',
                        'riesgo_economico': 'SIN RIESGO',
                        'riesgo_vida_universitaria_ciudad': 'SIN RIESGO'
                    }
                    # print('no riesgos')

                try:
                    # Trabaja Parcialmente
                    # ISSUE NOMBRE PROGRAMA
                    # programa_del_estudiante = programa_estudiante.objects.filter(id_estudiante=i['id']).first()
                    # Printea el primer programa del estudiante, aunque tenga varios
                    # print(programa_estudiante.objects.filter(id_estudiante = i['id'], traker=True).values())
                    # Solo printea aquellos cuyo traker es True
                    # VERIFICAR EN DB: SELECT * FROM modulo_programa_programa_estudiante where id_estudiante_id = 21702
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id'], traker = True).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # print(cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)
                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

        elif data_usuario_rol == "vcd_academico":

            list_estudiantes = []
            final_list_estudiantes = []
            for obj_usuario_rol in usuario_rol.objects.filter(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO").values():
                for obj_vcd_academico in vcd_academico.objects.filter(id_usuario_rol=obj_usuario_rol['id']).values():
                    for obj_facultad in facultad.objects.filter(id=obj_vcd_academico['id_facultad_id']).values():
                        # print(obj_facultad)
                        # R/    {'id': 8, 'codigo_univalle': '7', 'nombre': 'INGENIERÍA'}
                        for obj_programa in programa.objects.filter(id_facultad=obj_facultad['id']).values():
                            # print(obj_programa)
                            # INDICA QUE ESTUDIANTES DE FINANZAS Y ADINISTRACION PUBLICA ENTRE OTROS PERTENECEN A LA FACULTAD 8
                            # Culpemos a la base de datos
                            # Saludos.
                            for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa=obj_programa['id']).values():
                                # print(obj_programa_estudiante)
                                for obj_estudiantes in estudiante.objects.filter(id=obj_programa_estudiante['id_estudiante_id']).values():
                                    serializer_estudiante = estudiante_serializer(
                                        obj_estudiantes)
                                    list_estudiantes.append(serializer_estudiante.data)

            for i in list_estudiantes:
                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento

                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)
                    }

                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'SIN RIESGO',
                        'riesgo_familiar': 'SIN RIESGO',
                        'riesgo_academico': 'SIN RIESGO',
                        'riesgo_economico': 'SIN RIESGO',
                        'riesgo_vida_universitaria_ciudad': 'SIN RIESGO'
                    }
                    # print('no riesgos')

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # print(cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)
                final_list_estudiantes.append(data)

            return Response(final_list_estudiantes)

        elif data_usuario_rol == "super_ases":
            list_estudiantes = list()
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            # Añadiendo datos de consultas externas a los estudiantes

            for i in serializer_estudiante.data:
                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(
                        id_estudiante=i['id']).latest('fecha')
                    # Crear un diccionario con los datos de riesgo del seguimiento

                    riesgo = {
                        'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual),
                        'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar),
                        'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico),
                        'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico),
                        'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)
                    }

                    # Devolver el riesgo en la respuesta
                except seguimiento_individual.DoesNotExist:
                    # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
                    riesgo = {
                        'riesgo_individual': 'SIN RIESGO',
                        'riesgo_familiar': 'SIN RIESGO',
                        'riesgo_academico': 'SIN RIESGO',
                        'riesgo_economico': 'SIN RIESGO',
                        'riesgo_vida_universitaria_ciudad': 'SIN RIESGO'
                    }
                    # print('no riesgos')

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    var_programa = programa.objects.filter(
                        id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(
                        id=id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']

                    }

                except:
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                    }  # Agregar el estado del curso al diccionario

                try:
                    if asignacion.objects.filter(id_estudiante=i['id'], estado=True).exists():
                        dic_estados = {
                            'estado_ases': 'ACTIVO/A'
                        }
                    else:
                        dic_estados = {
                            'estado_ases': 'INACTIVO/A'
                        }
                except:
                    # dic_estados = {
                    #         'estado_ases': 'INACTIVO/A'
                    #     }
                    pass

                try:
                    programa_del_estudiante = programa_estudiante.objects.filter(
                        id_estudiante=i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(
                        id=programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass

                try:
                    asignaciones_estudiante = asignacion.objects.filter(
                        id_estudiante=i['id'], estado=True).first()
                    data_monitor = User.objects.filter(
                        id=asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(
                        id_usuario=asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(
                        id=asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(
                        id_usuario=asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(
                        id=asignacion_practicante[0]['id_jefe_id']).values()

                    dic_asignaciones = {
                        'asignacion_monitores': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                        'asignacion_practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                        'asignacion_profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name']
                    }
                except:
                    dic_asignaciones = {
                        'asignacion_monitores': 'Sin Asignar',
                        'asignacion_practicante': 'Sin Asignar',
                        'asignacion_profesional': 'Sin Asignar'
                    }
                    # pass

                # print(riesgo)

                try:

                    # print(cond_excepcion.objects.filter(id = i['id_cond_excepcion']).values())
                    var_excepcion = cond_excepcion.objects.filter(
                        id=i['id_cond_excepcion']).values()

                    # TRY #2

                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "P.D": '',
                        "P.D": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": '',
                    }

                    if var_excepcion[0]['alias'] == "I.N":
                        dic_cond_excepcion["i_n"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.A.P":
                        dic_cond_excepcion["m_a_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A":
                        dic_cond_excepcion["c_a"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.A.C":
                        dic_cond_excepcion["c_a_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "C.U":
                        dic_cond_excepcion["c_u"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.R":
                        dic_cond_excepcion["p_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.P.M":
                        dic_cond_excepcion["m_p_m"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "D.N.I":
                        dic_cond_excepcion["d_n_i"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "M.D.P":
                        dic_cond_excepcion["m_d_p"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "P.D":
                        dic_cond_excepcion["p_d"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "V.C":
                        dic_cond_excepcion["v_c"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "A.R":
                        dic_cond_excepcion["a_r"] = var_excepcion[0]['alias']
                    elif var_excepcion[0]['alias'] == "N/A":
                        dic_cond_excepcion["n_a"] = var_excepcion[0]['alias']
                    # else:
                    #     pass

                except:
                    dic_cond_excepcion = {
                        "i_n": '',
                        "m_a_p": '',
                        "c_a": '',
                        "c_a_c": '',
                        "c_u": '',
                        "p_r": '',
                        "m_p_m": '',
                        "d_n_i": '',
                        "m_d_p": '',
                        "p_d": '',
                        "v_c": '',
                        "a_r": '',
                        "n_a": 'N/A',
                    }

                data = dict(i, **riesgo, **dic_programa, **dic_estados, **
                            dic_reg_academico, **dic_asignaciones, **dic_cond_excepcion)
                list_estudiantes.append(data)

            return Response(list_estudiantes)
