from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from modulo_usuario_rol.serializers import  user_serializer, estudiante_serializer, usuario_rol_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre
from django.shortcuts import render, get_object_or_404


# Create your views here.
class estudiante_por_rol_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):
        data_usuario_rol = request.data["usuario_rol"]
        print("Este usuario_rol es:")
        print(data_usuario_rol)
        var_semestre = get_object_or_404(semestre, semestre_actual = True)
        list_estudiantes = list()
        list_monitores = list()
        list_practicantes = list()
        if data_usuario_rol == "monitor":
            for id_estudiante in asignacion.objects.filter(id_usuario = pk, id_semestre = var_semestre.id, estado = True ).values():
                var_estudiante = estudiante.objects.get(id = id_estudiante['id_estudiante_id'])
                serializer_estudiante = estudiante_serializer(var_estudiante)
                list_estudiantes.append(serializer_estudiante.data)
            return Response(list_estudiantes)
            # return Response("caso no encontrado")

        elif data_usuario_rol == "Practicante":
            print("entro a practicante")
            print(pk)
            var_prueba = usuario_rol.objects.filter(id_jefe = pk, id_semestre = var_semestre.id, estado = True ).values()
            var_monitor2 = usuario_rol.objects.get(id = pk)
            var_prueba2 = usuario_rol_serializer(var_prueba)
            var_final = var_prueba2.data
            for obj_monitor in usuario_rol.objects.filter(id_jefe = pk, id_semestre = var_semestre.id, estado = True ).values():
                print("entro a for")
                var_monitor = usuario_rol.objects.get(id = obj_monitor['id_usuario_id'])
                serializer_monitor = usuario_rol_serializer(var_monitor)
                list_monitores.append(serializer_monitor.data)
                
                # print(list_monitores)
                # for id_estudiante in list_monitores:
                #     # var_monitor = asignacion.objects.filter(id_usuario=id_estudiante[id_usuario], id_semestre =var_semestre.id, estado = True ).values():
                #     var_estudiante = estudiante.objects.get(id= var_monitor['id_estudiante_id'])
                #     serializer_estudiante = estudiante_serializer(var_estudiante)
                #     list_estudiantes.append(serializer_estudiante.data)
                # return

            print(var_final)
            print(list_monitores)
            return Response(list_monitores)
        
            # return Response("caso no encontrado")

        elif data_usuario_rol == "Profesional":
            return Response("caso no encontrado")

        elif data_usuario_rol == "Dir_socioed_reg":
            return Response("caso no encontrado")

        elif data_usuario_rol == "Dir_programa":
            return Response("caso no encontrado")

        elif data_usuario_rol == "Vc_academico":
            return Response("caso no encontrado")

        else:
            return Response("caso no encontrado")

