from django.contrib.auth.models import User
from modulo_usuario_rol.models import rol, usuario_rol
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.
         
class All_user(APIView):

    def get(self, request):
        print(request)
        list_user =User.objects.all()
        return Response (list(list_user.values()))

class All_rol(APIView):

    def get(self, request):
        print(request)
        list_rol =rol.objects.all()
        return Response (list(list_rol.values()))

class User_manage(APIView):

    serializer_class =serializers.User_manage

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            id_request = serializer.validated_data.get('id')
            var_usuario =get_object_or_404(User, id = id_request)
            print({'Response': str(var_usuario)})
            return Response({'Respuesta': str(var_usuario)})
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
            var_rol =get_object_or_404(rol, id = id_request)
            print({'Response': str(var_rol)})
            return Response({'Respuesta': str(var_rol)})
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
            try:
                var_usuario =get_object_or_404(User, id = id_user_request)
                var_rol =get_object_or_404(rol, id = id_rol_request)
                var_user_rol= usuario_rol()
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.save()
                return Response({'Respuesta': 'True'})
            except: 
                return Response({'Respuesta': 'False'})
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )
