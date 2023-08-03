from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets


from modulo_usuario_rol.serializers import  user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre
from modulo_programa.models import programa, programa_estudiante

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Q


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
    # serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    # queryset = estudiante_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):
        data_usuario_rol = request.data["usuario_rol"]
        data_semestre = request.data["semestre"]
        print("Este usuario_rol es:")
        print(data_usuario_rol)
        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(semestre, semestre_actual = True, id_sede = data_semestre)
        
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
            # ven todo
            print("entro a Dir_socioed")
            print(pk)
            # **
            # Verificar que el semestre pertenezca a la sede CALI
            # **

            for obj_profesional in usuario_rol.objects.filter(id_jefe = pk, id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                print("entro a for")
                var_profesional_data = User.objects.get(id = obj_profesional['id_usuario_id'])
                serializer_profesional = user_selected(var_profesional_data)
                list_profesionales.append(serializer_profesional.data)
                for obj_practicante in usuario_rol.objects.filter(id_jefe = obj_profesional['id_usuario_id'], id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                    print("entro a for2")
                    var_practicante_data = User.objects.get(id = obj_practicante['id_usuario_id'])
                    serializer_practicante = user_selected(var_practicante_data)
                    list_practicantes.append(serializer_practicante.data)
                    for obj_monitor in usuario_rol.objects.filter(id_jefe = obj_practicante['id_usuario_id'], id_semestre = var_semestre.id, estado = "ACTIVO" ).values():
                        print("entro a for3")
                        var_monitor_data = User.objects.get(id = obj_monitor['id_usuario_id'])
                        serializer_monitor = user_selected(var_monitor_data)
                        list_monitores.append(serializer_monitor.data)
                        for id_estudiante in asignacion.objects.filter(id_usuario = obj_monitor['id_usuario_id'], id_semestre = var_semestre.id, estado = True ).values():
                            print("entro a for4")
                            var_estudiante = estudiante.objects.get(id = id_estudiante['id_estudiante_id'])
                            serializer_estudiante = estudiante_serializer(var_estudiante)
                            list_estudiantes.append(serializer_estudiante.data)
            print("Profesionales Asignados al Dir_socioed:")
            print(list_profesionales)
            print("Practicantes Asignados a profesionales del Dir_socioed:")
            print(list_practicantes)
            print("Monitores Asignados a practicantes del Dir_socioed:")
            print(list_monitores)
            print("Estudiantes Asignados a monitores del Dir_socioed:")
            # print(list_estudiantes)

            return Response("caso no encontrado")
        
        elif data_usuario_rol == "Dir_socioed_reg":
            # **
            # STAND BY
            # **
            list_estudiantes = []
            list_estudiantes_cali = []
            list_all_estudiantes = list(estudiante.objects.all())
            list_id_estudiantes_cali = []
            for i in list_all_estudiantes: 
                serializer_estudiante = estudiante_serializer(i)
                list_estudiantes.append(serializer_estudiante.data)
            for obj_programa in programa.objects.filter(id_sede = 1).values():
                for j in programa_estudiante.objects.filter(id_programa = obj_programa['id']).values():
                        list_id_estudiantes_cali.append(j['id_estudiante_id'])
                        # list_estudiantes_cali.append(k)
                    # if obj_programa['id'] == j['id_programa']:
                    #     list_estudiantes_cali.append(j)
            # for obj_all_estudiante in list_id_estudiantes_cali:
            # ve todo lo que no es de Cali
            # return Response(list_estudiantes_cali, status=status.HTTP_200_OK)
            return Response ("NA")
        
        elif data_usuario_rol == "sistemas":
            # ven todo
            list_estudiantes = []
            list_all_estudiantes = list(estudiante.objects.all())
            for i in list_all_estudiantes: 
                serializer_estudiante = estudiante_serializer(i)
                list_estudiantes.append(serializer_estudiante.data)

            return Response(list_estudiantes, status=status.HTTP_200_OK)

            # return Response("caso no encontrado")
        
        elif data_usuario_rol == "Dir_programa":
            # Priorizar Directores Socioeducativos
            # **
            # relacion_programa_usuario
            # contenido: id_usuario, id_programa, id_programa/facultad
            # 
            # Item.objects.filter(Q(creator=owner) | Q(moderated=False))

            #  for obj_programa in programa.objects.filter(id_sede = id_facultad).values():
            #     for j in programa_estudiante.objects.filter(id_programa = obj_programa['id']).values():
            return Response("caso no encontrado")

        elif data_usuario_rol == "Vc_academico":
            return Response("caso no encontrado")

        else:
            return Response("caso no encontrado")

