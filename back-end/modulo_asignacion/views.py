"""
Autor: César Becerra Ramírez.
Correo: cesar.becerra@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-08-07
Descripción: Este código define dos viewsets, 'estudiante_asignacion_viewsets' y 'usuario_rol_asignacion_viewsets'. Las antetiores nombradas
realizan el proceso de creación y eliminación de las asginaciones entre estudiantes, monitores, practicantes y profesionales.
son dos funciones diferentes ya que hay una diferenciación clara entre la asingación que se realiza entre estudiantes y usuarios y la relación entre usuarios
con otros usuarios.
"""
from queue import Empty
from django.contrib.auth.models import User
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from modulo_usuario_rol.serializers import usuario_rol_serializer, estudiante_serializer
from modulo_asignacion.serializers import asignacion_serializer, asignacion_user_serializer,asignacion_estudiante_serializer
from modulo_instancia.serializers import semestre_serializer

from django.shortcuts import render, get_object_or_404


class estudiante_asignacion_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la creación y eliminación de asginaciones entre usuarios y estudiantes.
    """
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def create(self, request,pk=None):

        """
        DESCRIPCIÓN:El retrieve maneja las llamadas GET que incluyen un ID. Esta función trata el caso de eliminación de
        una asignación entre un estudiante y un monitor.

        INPUT:

        OUTPUT:

        """
        
        serializer = asignacion_estudiante_serializer(data=request.data)
        if (serializer.is_valid()):
            if (serializer.data['llamada']=="asignar"):
                id_user_request = serializer.data['id_usuario']
                id_estudiante_request = serializer.data['id_estudiante']
                id_sede_request = serializer.data['id_sede']

                var_usuario = get_object_or_404(User, id = id_user_request)
                var_estudiante = get_object_or_404(estudiante, id = id_estudiante_request)
                var_semestre = get_object_or_404(semestre, semestre_actual = True, id_sede = id_sede_request)

                try:
                    var_old_asignacion = get_object_or_404(asignacion, id_estudiante = var_estudiante,  id_semestre = var_semestre)
                except:
                    var_old_asignacion = Empty

                if(var_old_asignacion != Empty and var_old_asignacion.estado == True):
                    print("entre a 1")
                    Response(
                        {'Respuesta': 'El estudiante ya está asignado a alguien este semestre.'},
                        status=status.HTTP_406_NOT_ACCEPTABLE
                    )
                elif(var_old_asignacion == Empty or(var_old_asignacion != Empty and var_old_asignacion.estado == False) ) :
                    print("entre a 2")
                    var_asignacion= asignacion()
                    var_asignacion.id_usuario= var_usuario
                    var_asignacion.id_estudiante = var_estudiante
                    var_asignacion.id_semestre = var_semestre
                    var_asignacion.save()
                else:
                    Response(
                        serializer.errors,
                        status=status.HTTP_406_NOT_ACCEPTABLE
                    )


                return Response({'Respuesta': 'Estudiante asignado satisfactoriamente.'},status=status.HTTP_200_OK)
            elif (serializer.data['llamada']=="eliminar"):
                id_sede_request = serializer.data['id_sede']
                id_estudiante_request = serializer.data['id_estudiante']
                var_estudiante =estudiante.objects.get(id=id_estudiante_request)
                serializer_estudiante= estudiante_serializer(var_estudiante)
                var_semestre =semestre.objects.get(semestre_actual = True,id_sede= id_sede_request)
                serializer_semestre= semestre_serializer(var_semestre)
                try:
                    var_old_asignacion = asignacion.objects.get(id_estudiante = serializer_estudiante.data['id'],  id_semestre = serializer_semestre.data['id'],estado = True)

                except:
                    return Response(
                    status=status.HTTP_404_NOT_FOUND
                    )

                var_asignacion = var_old_asignacion
                var_asignacion.estado = False
                var_asignacion.save()

                return Response({'Respuesta': 'Asignación eliminada'},status=status.HTTP_200_OK)

        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
        )


class usuario_rol_asignacion_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la creación y eliminación de asginaciones entre usuarios.
    """
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()


    def create(self, request):
        serializer = asignacion_user_serializer(data=request.data)
        if (serializer.is_valid()):
            if (serializer.data['llamada']=="asignar"):

                id_jefe_request = serializer.data['id_jefe']
                id_usuario_request = serializer.data['id_usuario']
                id_sede_request = serializer.data['id_sede']

                var_usuario_jefe = get_object_or_404(User, id = id_jefe_request)
                var_usuario = get_object_or_404(User, id = id_usuario_request)
                var_semestre = get_object_or_404(semestre, semestre_actual = True,id_sede=id_sede_request)


                var_old_user_rol_asignado = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
                var_old_user_rol_jefe = get_object_or_404(usuario_rol, id_usuario = var_usuario_jefe,  id_semestre = var_semestre)
                var_user_rol= var_old_user_rol_asignado
                var_user_rol.id_jefe= var_usuario_jefe
                var_user_rol.save()
                return Response({'Respuesta': 'Jefe asignado satisfactoriamente.'},status=status.HTTP_200_OK)

            elif (serializer.data['llamada']=="eliminar"):
                id_usuario_request = serializer.data['id_usuario']
                id_sede_request = serializer.data['id_sede']

                var_usuario = get_object_or_404(User, id = id_usuario_request)
                var_semestre = get_object_or_404(semestre, semestre_actual = True,id_sede=id_sede_request)


                var_old_user_rol_asignado = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
                var_user_rol= var_old_user_rol_asignado
                var_user_rol.id_jefe= None
                var_user_rol.save()
                return Response({'Respuesta': 'Jefe eliminado satisfactoriamente.'},status=status.HTTP_200_OK)

        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
