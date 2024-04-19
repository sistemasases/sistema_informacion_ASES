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
        
        #probabilidad_apro_valor = train_and_evaluate_models['Probabilidad_Clase_Aprobar']
        #prediccion_valor = train_and_evaluate_models['Prediccion']
        #mensaje_valor = train_and_evaluate_models['Mensaje']
        #datos_respuesta = {
        #            'Probabilidad_Clase_Aprobar': probabilidad_apro_valor,
        #            'Prediccion': prediccion_valor,
        #            'Mensaje': mensaje_valor,
        #            }
        #list_total_datos.append(datos_respuesta)
        #return Response(list_total_datos,status=status.HTTP_200_OK)
        
        try:
            # Acceso a datos del estudiante y su id
            estudiante_data = estudiante.objects.get(codigo=codigo_estudiante)
            datos_prediccion = datos_prediccion.objects.filter(estudiante_id=estudiante_data.id)

            # Preparar y transformar datos
            X_train, y_train, X_test, y_test = prepare_and_transform_data(datos_prediccion)
            resultados = train_and_evaluate_models(X_train, y_train, X_test, y_test)

            # Seleccionar solo el resultado más relevante 
            resultado_final = resultados.iloc[0]  # seleccionar el mejor

            return Response({
                "Probabilidad Clase Aprobar": resultado_final['Probabilidad_Clase_Aprobar'],
                "Predicción": resultado_final['Prediccion'],
                "Mensaje": resultado_final['Mensaje']
            }, status=status.HTTP_200_OK)

        except estudiante.DoesNotExist:
            return Response({"error": "Estudiante no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    
class entrenamiento(APIView):
    def post(self,request):
        return Response(status=status.HTTP_200_OK)