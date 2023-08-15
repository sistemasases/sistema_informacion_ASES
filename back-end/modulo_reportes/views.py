from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from modulo_usuario_rol.serializers import  user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected
from modulo_seguimiento.serializers import seguimiento_individual_serializer

from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa, programa_estudiante, estado_programa
from modulo_seguimiento.models import inasistencia, seguimiento_individual


from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    # print("entro a estudiante_por_rol_viewsets") 
    def retrieve(self, request, pk):
        # print("entro a retrieve")
        # print(pk)
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        # print("Este usuario_rol es:")
        # print(data_usuario_rol)
        
        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(semestre, semestre_actual = True, id_sede = data_sede)
        
        list_estudiantes = list()
        list_monitores = list()
        list_practicantes = list()
        list_profesionales = list()
        
        if data_usuario_rol == "monitor":
            print(pk)

            for id_estudiante in asignacion.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = True ).values():
                var_estudiante = estudiante.objects.get(id = id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)
            # return Response("caso no encontrado")

        elif data_usuario_rol == "Practicante":
            
            print("entro a practicante")
            print(pk)
            
            for obj_monitor in usuario_rol.objects.filter(id_jefe = pk, id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                print("entro a for")
                
                var_monitor_data = User.objects.get(id = obj_monitor['id_usuario_id'])
                serializer_monitor = user_selected(var_monitor_data)
                list_monitores.append(serializer_monitor.data)
                # var_id_usuario_monitor = obj_monitor['id_usuario_id']
                # print(var_id_usuario_monitor)
                # print(list_monitores)
                for id_estudiante in asignacion.objects.filter(id_usuario = obj_monitor['id_usuario_id'], id_semestre = var_semestre.id, estado = True ).values():
                    # print("entro a for2")
                    # print(id_estudiante)
                    var_estudiante = estudiante.objects.get(id = id_estudiante['id_estudiante_id'])
                    serializer_estudiante = estudiante_serializer(var_estudiante)
                    list_estudiantes.append(serializer_estudiante.data)

            # print(var_final)
            print("Monitores Asignados al practicante:")
            print(list_monitores)
            print("Estudiantes Asignados a monitores del Practicante:")
            # print(list_estudiantes)
            return Response(list_estudiantes)
        
            # return Response("caso no encontrado")

        elif data_usuario_rol == "Profesional":
            print("entro a profesional")
            print(pk)
            for obj_practicante in usuario_rol.objects.filter(id_jefe = pk, id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                print("entro a for")
                var_practicante_data = User.objects.get(id = obj_practicante['id_usuario_id'])
                serializer_practicante = user_selected(var_practicante_data)
                list_practicantes.append(serializer_practicante.data)
                for obj_monitor in usuario_rol.objects.filter(id_jefe = obj_practicante['id_usuario_id'], id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                    print("entro a for2")
                    var_monitor_data = User.objects.get(id = obj_monitor['id_usuario_id'])
                    serializer_monitor = user_selected(var_monitor_data)
                    list_monitores.append(serializer_monitor.data)
                    for id_estudiante in asignacion.objects.filter(id_usuario = obj_monitor['id_usuario_id'], id_semestre = var_semestre.id, estado = True ).values():
                        print("entro a for3")
                        var_estudiante = estudiante.objects.get(id = id_estudiante['id_estudiante_id'])
                        serializer_estudiante = estudiante_serializer(var_estudiante)
                        list_estudiantes.append(serializer_estudiante.data)
            print("Practicantes Asignados al profesional:")
            print(list_practicantes)    
            print("Monitores Asignados a practicantes del profesional:")
            print(list_monitores)
            print("Estudiantes Asignados a monitores del profesional:")
            # print(list_estudiantes)
            return Response(list_estudiantes)

        elif data_usuario_rol == "Dir_socioed":
            list_estudiantes = []
            for obj_programa in programa.objects.filter(id_sede = 1).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa = obj_programa['id']).values():
                        print("hola")
                        for obj_estudiante in estudiante.objects.filter(id = obj_programa_estudiante['id_estudiante_id']).values():
                            serializer_estudiante = estudiante_serializer(obj_estudiante)
                            list_estudiantes.append(serializer_estudiante.data)
            return Response (list_estudiantes, status=status.HTTP_200_OK)
        
        elif data_usuario_rol == "Dir_socioed_reg":

            list_estudiantes = []
            for obj_programa in programa.objects.filter(id_sede = 1).values():
                for obj_programa_estudiante in programa_estudiante.objects.filter(id_programa = obj_programa['id']).values():
                        print("hola")
                        for obj_estudiante in estudiante.objects.filter(id = obj_programa_estudiante['id_estudiante_id']).values():
                            serializer_estudiante = estudiante_serializer(obj_estudiante)
                            list_estudiantes.append(serializer_estudiante.data)
            return Response (list_estudiantes, status=status.HTTP_200_OK)
        
        elif data_usuario_rol == "super_ases":

            # ven todo
            list_estudiantes = []
            list_programas = []
            serializer_estudiante = estudiante_serializer(estudiante.objects.all(), many=True)

            # for i in list(estudiante.objects.all()): 
                # list_estudiantes.append(serializer_estudiante.data)
            # print(list_estudiantes)
            # for i in serializer_estudiante.data: 
            #     # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
            #     # serializer_estudiante_2 = estudiante_serializer(i)
            #     try:
            #         # print(i.data)
            #         # Obtener el seguimiento más reciente del estudiante especificado
            #         seguimiento_reciente = seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha')
            #         # Crear un diccionario con los datos de riesgo del seguimiento
            #         riesgo = {
            #             'riesgo_individual': seguimiento_reciente.riesgo_individual,
            #             'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
            #             'riesgo_academico': seguimiento_reciente.riesgo_academico,
            #             'riesgo_economico': seguimiento_reciente.riesgo_economico,
            #             'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
            #         }
            #         # Devolver el riesgo en la respuesta
            #     except seguimiento_individual.DoesNotExist:
            #         # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
            #         riesgo = {
            #             'riesgo_individual': 'N/A',
            #             'riesgo_familiar': 'N/A',
            #             'riesgo_academico': 'N/A',
            #             'riesgo_economico': 'N/A',
            #             'riesgo_vida_universitaria_ciudad': 'N/A'
            #         }
            #         # print('no riesgos')
                
            #     try:
            #         programa_del_estudiante = programa_estudiante.objects.filter(id_estudiante = i['id']).first()
            #         var_programa = programa.objects.filter(id=programa_del_estudiante.id_programa_id).values()
            #         # print(programa_del_estudiante)
            #         list_programas.append(var_programa)
            #         dic_programa = {
            #             'id_programa': var_programa[0]['codigo_univalle'],
            #         }

            #     except :
            #         dic_programa = {'id_programa': 'N/A'}  # Agregar el estado del curso al diccionario

            #     data = dict(i, **riesgo, **dic_programa)
            #     list_estudiantes.append(data)
            # print(list_programas)  
            # print(list_estudiantes)
            # riesgo = {
            #             'riesgo_individual': 'Cargando...',
            #             'riesgo_familiar': 'Cargando...',
            #             'riesgo_academico': 'Cargando...',
            #             'riesgo_economico': 'Cargando...',
            #             'riesgo_vida_universitaria_ciudad': 'N/A'
            #         }
            # for i in serializer_estudiante.data:
            #     data = dict(i, **riesgo)
            #     list_estudiantes.append(data)
            # data = dict(serializer_estudiante, **riesgo)
            
            # return Response(list_estudiantes)
            return Response(serializer_estudiante.data)

            # return Response("caso no encontrado")
        
        elif data_usuario_rol == "Dir_programa":
            # Ve todos los estudiantes del programa y la sede

            list_estudiantes = []

            # for obj_usuario_rol in usuario_rol.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
            #     for obj_dir_programa in dir_programa.objects.filter(id_usuario_rol = obj_usuario_rol['id']).values():
            #             for obj_progama_estudiante in programa_estudiante.objects.filter(id_programa = obj_dir_programa['id_programa']).values():
            #                 for id in obj_programa_estudiante['id_estudiante_id']:
            #                     var_estudiante = estudiante.objects.get(id = id)
            #                     serializer_estudiante = estudiante_serializer(var_estudiante)
            #                     list_estudiantes.append(serializer_estudiante.data)
            
            return Response (list_estudiantes, status=status.HTTP_200_OK)
        
            # return Response("caso no encontrado")

        elif data_usuario_rol == "Vc_academico":
            
            list_estudiantes = []
            # for obj_usuario_rol in usuario_rol.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
            #     for obj_vcd_academico in vcd_academico.objects.filter(id_usuario_rol = obj_usuario_rol['id']).values():
            #         for obj_programa in programa.objects.filter(id_facultad = obj_vcd_academico['id_facultad']).values():
            #             for obj_progama_estudiante in programa_estudiante.objects.filter(id_programa = obj_programa['id_programa']).values():
            #                 for id in obj_programa_estudiante['id_estudiante_id']:
            #                     var_estudiante = estudiante.objects.get(id = id)
            #                     serializer_estudiante = estudiante_serializer(var_estudiante)
            #                     list_estudiantes.append(serializer_estudiante.data)

            return Response (list_estudiantes, status=status.HTTP_200_OK)
            # return Response("caso no encontrado")

        elif data_usuario_rol == None:
            return Response("Andamos Valiendo vrg en este caso")

        else:
            return Response("caso no encontrado")
        

class estudiante_filtros_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk):
        
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')
        # print(data_usuario_rol)
        # print(data_sede)
        if data_usuario_rol == "super_ases":
            list_estudiantes = list()
            list_programas = list()
            serializer_estudiante = estudiante_serializer(estudiante.objects.all(), many=True)

            # for i in list(estudiante.objects.all()): 
                # list_estudiantes.append(serializer_estudiante.data)
            # print(list_estudiantes)
            for i in serializer_estudiante.data: 
                # print(seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha'))
                # serializer_estudiante_2 = estudiante_serializer(i)

                try:
                    # print(i.data)
                    # Obtener el seguimiento más reciente del estudiante especificado
                    seguimiento_reciente = seguimiento_individual.objects.filter(id_estudiante = i['id']).latest('fecha')
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
                    programa_del_estudiante = programa_estudiante.objects.filter(id_estudiante = i['id']).first()
                    var_programa = programa.objects.filter(id=programa_del_estudiante.id_programa_id).values()
                    # print(programa_del_estudiante)
                    # list_programas.append(var_programa)
                    id_sede_programa = var_programa[0]['id_sede_id']
                    sede_programa = sede.objects.filter(id = id_sede_programa).values()
                    # renombrar dic_programa a dic_academico
                    dic_programa = {
                        'id_programa': var_programa[0]['codigo_univalle'],
                        'programa_academico': var_programa[0]['nombre'],
                        'sede': sede_programa[0]['nombre']
                        
                    }

                except :
                    dic_programa = {
                        'id_programa': '',
                        'programa_academico': 'N/A',
                        'sede': 'N/A'
                        }  # Agregar el estado del curso al diccionario
                    
                try:
                    if asignacion.objects.filter(id_estudiante = i['id'], estado = True).exists():
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
                    programa_del_estudiante = programa_estudiante.objects.filter(id_estudiante = i['id']).first()
                    estado_estudiante = estado_programa.objects.filter(id = programa_del_estudiante.id_estado_id).values()
                    dic_reg_academico = {
                        'registro_academico': estado_estudiante[0]['nombre']
                    }
                except:
                    dic_reg_academico = {
                        'registro_academico': 'N/A'
                    }
                    # pass
                
                try:
                    asignaciones_estudiante = asignacion.objects.filter(id_estudiante = i['id'], estado = True).first()
                    data_monitor = User.objects.filter(id = asignaciones_estudiante.id_usuario_id).values()

                    asignacion_monitor = usuario_rol.objects.filter(id_usuario = asignaciones_estudiante.id_usuario_id).values()
                    data_practicante = User.objects.filter(id = asignacion_monitor[0]['id_jefe_id']).values()

                    asignacion_practicante = usuario_rol.objects.filter(id_usuario = asignacion_monitor[0]['id_jefe_id']).values()
                    data_profesional = User.objects.filter(id = asignacion_practicante[0]['id_jefe_id']).values()

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
                data = dict(i, **riesgo, **dic_programa, **dic_estados, **dic_reg_academico, **dic_asignaciones)
                list_estudiantes.append(data)
            # print(list_programas)  
            # print(list_estudiantes)
            # print(dic_estados)
            return Response(list_estudiantes)
            # return Response ("HOLAAAA")
        
    

