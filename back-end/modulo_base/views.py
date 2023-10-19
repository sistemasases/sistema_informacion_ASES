from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from modulo_base.serializers import (
    CustomTokenObtainPairSerializer, user_token, group_serializer
)
from modulo_instancia.serializers import semestre_serializer, sede_serializer
from modulo_usuario_rol.serializers import usuario_rol_serializer, rol_serializer, rol_permiso_serializer, permiso_serializer
from django.contrib.auth.models import User

from modulo_instancia.models import semestre, sede
from modulo_usuario_rol.models import rol, usuario_rol, rol_permiso, permiso
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from modulo_usuario_rol.serializers import  *



class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(
            username=username,
            password=password
        )

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if user.is_active:
                if login_serializer.is_valid():
                    user_serializer = user_token(user)
                    dato_usuario_rol = usuario_rol.objects.get(id_usuario = user.id,estado = "ACTIVO")
                    serializer_usuario_rol = usuario_rol_serializer(dato_usuario_rol)
                    dato_rol = rol.objects.get(id =serializer_usuario_rol.data['id_rol'] )
                    serializer_rol = rol_serializer(dato_rol)
                    
                    list_permisos = list()
                    for consulta_rol_permiso in rol_permiso.objects.filter(id_rol = serializer_usuario_rol.data['id_rol']).values():
                        dato_permiso = permiso.objects.get(id= consulta_rol_permiso['id_permiso_id'])
                        serializer_permiso = permiso_serializer(dato_permiso)
                        list_permisos.append(serializer_permiso.data['nombre'])

                    dato_semestre = semestre.objects.get(semestre_actual = True, id =serializer_usuario_rol.data['id_semestre'])
                    serializer_semestre =semestre_serializer(dato_semestre)
                    dato_sede = sede.objects.get(id = serializer_semestre.data['id_sede'])
                    serializer_sede = sede_serializer(dato_sede)
    
                    extra_info = {'nombre_completo' : user_serializer.data.get('first_name') +" "+ user_serializer.data.get('last_name'),
                                'rol' : serializer_rol.data['nombre'],
                                'semestre_actual': serializer_semestre.data['nombre'],
                                'id_semestre_actual': serializer_semestre.data['id'],
                                'sede':serializer_sede.data['nombre'],
                                'sede_id':serializer_sede.data['id'],
                                'permisos': list_permisos,
                                }
                    data = dict(user_serializer.data, **extra_info)
                    
                    return Response({
                        'token': login_serializer.validated_data.get('access'),
                        'refresh-token': login_serializer.validated_data.get('refresh'),
                        'user': data,
                        'message': 'Inicio de Sesion Exitoso'
                    }, status=status.HTTP_200_OK)  
                return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_40_BAD_REQUEST) 
            return Response({'error': 'El usuario no está activo'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class Logout(GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)
    

class Refresh(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        refresh = request.data.get('refreshtoken', '')
        
        if not refresh:
            return Response({'error': 'Refresh token no proporcionado.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                refresh_token = RefreshToken(refresh)
                access_token = str(refresh_token.access_token)
                return Response({'token': access_token})
            
            except Exception as e:
                return Response({'error': 'El token de refresco no es válido.'}, status=status.HTTP_400_BAD_REQUEST)
            
class change_password(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        usuario = get_object_or_404(User,id=request.data.get('user_id'))
        password=request.data.get('contraseña')
        user = authenticate(
            username=usuario.username,
            password=password
        )
        if user:
            usuario.password = make_password(request.data.get('new_contraseña'))
            usuario.save()
            return Response({'mensaje': 'Cambio de contraseña completado.'}, status=status.HTTP_200_OK)
        return Response({'mensaje': 'La contraseña enviada no es válida.'}, status=status.HTTP_400_BAD_REQUEST)