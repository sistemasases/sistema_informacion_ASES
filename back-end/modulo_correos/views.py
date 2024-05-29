from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from django.core.mail import send_mail
from rest_framework.viewsets import ViewSet
from modulo_usuario_rol.serializers import  user_serializer,usuario_rol_serializer, user_selected
from django.contrib.auth.models import User
import environ
env = environ.Env()
environ.Env.read_env()

from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer,basic_estudiante_serializer

class enviar_correos_viewset(viewsets.ViewSet):
    
    # def list(self, request):
        
    #     return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        
        # print(pk)
        queryset = User.objects.all()
        serializer = user_serializer(queryset, many=True)
        id_estudiante = request.GET.get('id_estudiante_seleccionado')
        
        print(id_estudiante)
        # print("Enviando correo...")
        # send_mail(
        #     "Observaciones registradas",
        #     "Este mensaje se envía debido al registro de observaciones en un estudiante de la Universidad del Valle. Por favor, revise el sistema para más información.",
        #     "",
        #     ["steven.bernal@correounivalle.edu.co"],
        #     fail_silently=False,
        # )
        print("Correo enviado")
        prueba = "Que pasó"
        return Response(prueba)




class enviar_correo_cambio_contra_viewset(viewsets.ViewSet):
    
    def list(self, request):
        queryset = User.objects.all()
        serializer = user_serializer(queryset, many=True)
        print("Correo no enviado, pero entró")
        
        return Response("EMPTY RESPONSE")
    
    
    
    
# Create your views here.
