from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from modulo_base.serializers import (
    CustomTokenObtainPairSerializer, user_token, group_serializer
)
from django.contrib.auth.models import User



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
                    rol = user.groups.all().first()
                    rol_data = group_serializer(rol).data
                    
                    extra_info = {'nombre_completo' : user_serializer.data.get('first_name') +" "+ user_serializer.data.get('last_name'),'rol' : rol_data }
                    data = dict(user_serializer.data, **extra_info)
                    print(data)
                    return Response({
                        'token': login_serializer.validated_data.get('access'),
                        'refresh-token': login_serializer.validated_data.get('refresh'),
                        'user': data,
                        'message': 'Inicio de Sesion Existoso'
                    }, status=status.HTTP_200_OK)
                return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'El usuario no está activo'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)

class Logout(GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)
        