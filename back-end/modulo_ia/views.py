from django.shortcuts import render
from modulo_usuario_rol import *
from modulo_ia.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import  *


# Create your views here.


class predictor(APIView):
    def prediccion_red(codigo_estu):
        datos_estudiante = estudiante.objects.filter(codigo=codigo_estu).values()
        datos_datos_prediccion = datos_prediccion.objects.filter(id_estudiante=datos_estudiante.id).values()
        cultura_estudiante = datos_datos_prediccion['cultura']
        valores={}
        return(valores)


    def post(self,request):
        codigo_estudiante = request.data['codigo']
        valores = self.prediccion_red(codigo_estudiante)
        list_total_datos =[]
        probabilidad_apro_valor = 3
        prediccion_valor = True
        mensaje_valor = "todo good"
        datos_respuesta = {
                    'probabilidad_apro': probabilidad_apro_valor,
                    'prediccion': prediccion_valor,
                    'mensaje': mensaje_valor,
                    }
        list_total_datos.append(datos_respuesta)
        return Response(list_total_datos,status=status.HTTP_200_OK)

    
class entrenamiento(APIView):
    def post(self,request):
        return Response(status=status.HTTP_200_OK)