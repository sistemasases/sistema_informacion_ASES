from modulo_usuario_rol.models import estudiante
from modulo_ia.models import datos_prediccion
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_ia.serializers import datos_prediccion_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import pandas as pd
from modulo_ia.prediction import prediction

class predictor(APIView):
    def post(self, request):
        codigo_estudiante = request.data.get('codigo')
        
        if not codigo_estudiante:
            return Response({"error": "Código de estudiante no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            estudiante_data = estudiante.objects.get(cod_univalle=codigo_estudiante)
            datos_estudiante_serializados = estudiante_serializer(estudiante_data)

            datos_prediccion_data = datos_prediccion.objects.filter(id_estudiante=estudiante_data)
            datos_prediccion_serializados = datos_prediccion_serializer(datos_prediccion_data, many=True)

            response_data = {
                'estudiante': datos_estudiante_serializados.data,
                'datos_prediccion': datos_prediccion_serializados.data
            }
            datos_usuario = []
            
            return Response(response_data, status=status.HTTP_200_OK)

        except estudiante.DoesNotExist:
            return Response({"error": "Estudiante no encontrado"}, status=status.HTTP_404_NOT_FOUND)