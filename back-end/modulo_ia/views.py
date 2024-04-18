from django.shortcuts import render
from modulo_usuario_rol import *
from modulo_ia.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import  *
from modulo_ia.admin import *


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
        probabilidad_apro_valor = train_and_evaluate_models['Probabilidad_Clase_Aprobar']
        prediccion_valor = train_and_evaluate_models['Prediccion']
        mensaje_valor = train_and_evaluate_models['Mensaje']
        datos_respuesta = {
                    'Probabilidad_Clase_Aprobar': probabilidad_apro_valor,
                    'Prediccion': prediccion_valor,
                    'Mensaje': mensaje_valor,
                    }
        list_total_datos.append(datos_respuesta)
        return Response(list_total_datos,status=status.HTTP_200_OK)

    
class entrenamiento(APIView):
    def post(self,request):
        return Response(status=status.HTTP_200_OK)