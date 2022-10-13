from queue import Empty
from django.contrib.auth.models import User
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_instancia.models import semestre
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers
from django.db.models import F

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.
         
class All_user(APIView):

    def get(self, request):
        list_user =User.objects.all()
        print(list_user)
        return Response (list(list_user.values()))

class All_user_with_rol(APIView):

    def get(self, request):
        list_user_rol = list()
        var_semestre = get_object_or_404(semestre, semestre_actual = True)
        for user_rol in usuario_rol.objects.filter(id_semestre =var_semestre.id).values():
            rols= rol.objects.filter(id =user_rol['id_rol_id']).annotate(id_rol=F('id')).values('id_rol','nombre')[0]
            usuarios= User.objects.filter(id =user_rol['id_usuario_id']).values('id','username','first_name','last_name', 'email')[0]
            usuarios.update(rols)
            list_user_rol.append(usuarios)

        
        return Response (list_user_rol)

class All_rol(APIView):

    def get(self, request):
        print(request)
        list_rol =rol.objects.all()
        return Response (list(list_rol.values()))

class All_estudiante(APIView):

    def get(self, request):
        print(request)
        list_estudiante =estudiante.objects.all()
        return Response (list(list_estudiante.values()))

class Estudiante_manage(APIView):

    serializer_class =serializers.Estudiante_manage

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            id_request = serializer.validated_data.get('id')
            var_estudiante =estudiante.objects.filter(id =id_request).values()
            return Response(var_estudiante[0])
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )

class User_manage(APIView):

    serializer_class =serializers.User_manage

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            id_request = serializer.validated_data.get('id')
            var_usuario =User.objects.filter(id =id_request).values()
            return Response(var_usuario[0])
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )

class Rol_manage(APIView):

    serializer_class =serializers.Rol_manage

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            id_request = serializer.validated_data.get('id')
            var_rol =rol.objects.filter(id =id_request).values()
            return Response(var_rol[0])
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )

class User_rol_manage(APIView):

    serializer_class =serializers.Rol_manage

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):
            id_user_request = serializer.validated_data.get('id')
            var_user_rol =get_object_or_404(usuario_rol, id_usuario = id_user_request)
            id_rol = var_user_rol.id_rol.id
            var_rol = get_object_or_404(rol, id = id_rol)
            id_rol_result = var_rol.nombre
            return Response(id_rol_result)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )

class User_rol(APIView):

    serializer_class =serializers.User_rol
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            id_user_request = serializer.validated_data.get('id_user')
            id_rol_request = serializer.validated_data.get('id_rol')
            var_usuario = get_object_or_404(User, id = id_user_request)
            var_rol = get_object_or_404(rol, id = id_rol_request)
            var_semestre = get_object_or_404(semestre, semestre_actual = True)
            try:
                var_old_user_rol = get_object_or_404(usuario_rol, id_usuario = var_usuario)
            except:
                var_old_user_rol = Empty
            # print(var_semestre.id)
            # print(var_old_user_rol.id_semestre)
            # print(var_semestre.id)
            # print(var_old_user_rol.estado)
            if(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id == var_semestre.id and var_old_user_rol.estado == "ACTIVO"):
                print("entre a 1")
                var_user_rol= var_old_user_rol
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol == Empty):
                print("entre a 2")
                var_user_rol= usuario_rol()
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id != var_semestre):
                print("entre a 3")
                var_user_rol= usuario_rol()
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id == var_semestre and var_old_user_rol.estado != "ACTIVO"):
                print("entre a 4")
                var_user_rol= var_old_user_rol
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.estado = "ACTIVO"
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            else:
                Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )


            return Response({'Respuesta': 'True'})

        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
