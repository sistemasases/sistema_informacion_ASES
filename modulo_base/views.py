from django.views import View
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_base import serializers

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.

class Api_login(APIView):

    serializer_class =serializers.Api_login

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):

            username_request = serializer.validated_data.get('username')
            var_usuario =get_object_or_404(User, username = username_request)
            contrasena_request =check_password( serializer.validated_data.get('password') ,var_usuario.password)
            if (contrasena_request == True):

                return Response({'Respuesta': 'True'})
        
            return Response({'Respuesta': 'False'})
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
            )


class user_manage (View):

    def get(self, request):
        print(request)
        list_user =User.objects.all()
        return JsonResponse (list(list_user.values()), safe=False)

def carga_test(request):
    return render(request, "prueba_login.html")