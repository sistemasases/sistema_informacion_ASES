from modulo_ia.models import encuesta_admitidos
from modulo_ia.serializers import encuesta_admitidos_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
import pandas as pd
from modulo_ia.prediction import predecir_usuarios


class predictor(APIView):
    """
    Esta ruta permite predecir la probabilidad de que los estudiantes aprueben los cursos básicos de matemáticas.
    Solo admite los métodos GET y POST.
    -GET: Retorna la predicción para todos los estudiantes que hayan completado tanto la prueba diagnóstica como la encuesta de admisión.
    -POST: Retorna la predicción para una lista específica de estudiantes basada en el código proporcionado, siempre que hayan completado tanto la prueba diagnóstica como la encuesta de admisión.
           {"codigos": ["[cod_1]", "[cod_2]", "[cod_3]", ... , "[cod_n]}

    Desarrollada por: Mavelyn Sterling
    Correo electrónico: mavelyn.sterling@correounivalle.edu.co
    """
    http_method_names = ['get', 'post']
    def get(self, request):
        encuesta_admitidos_data = encuesta_admitidos.objects.all()
        encuesta_admitidos_serializados = encuesta_admitidos_serializer(encuesta_admitidos_data, many=True)
        columns = encuesta_admitidos_serializados.data[0].keys()
        dataframe = pd.DataFrame(encuesta_admitidos_serializados.data, columns=columns)
        prediccion = predecir_usuarios(dataframe.drop(columns=['id', 'nombre', 'apellido']))
        prediccion = pd.concat([dataframe[['codigo', 'nombre', 'apellido']], prediccion], axis=1)
        resultado = prediccion[['codigo', 'nombre', 'apellido', 'Probabilidad de aprobar', 'Mensaje']]
        return Response(resultado.to_dict(orient='records'), status=status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        codigos = request.data.get('codigos', [])
        if not codigos:
            return Response({'message': 'No se proporcionaron códigos'}, status=status.HTTP_400_BAD_REQUEST)
        
        resultados = []
        for codigo in codigos:
            try:
                estudiante_data = encuesta_admitidos.objects.get(id_estudiante__cod_univalle=codigo)
            except ObjectDoesNotExist:
                resultados.append({'codigo': codigo, 'message': 'No se encontró el estudiante'})
                continue

            encuesta_admitidos_serializados = encuesta_admitidos_serializer(estudiante_data)
            columns = encuesta_admitidos_serializados.data.keys()
            dataframe = pd.DataFrame([encuesta_admitidos_serializados.data], columns=columns)
            prediccion = predecir_usuarios(dataframe.drop(columns=['id', 'nombre', 'apellido']))
            prediccion = pd.concat([dataframe[['codigo', 'nombre', 'apellido']], prediccion], axis=1)
            resultado = prediccion[['codigo', 'nombre', 'apellido', 'Probabilidad de aprobar', 'Mensaje']]
            resultados.append(resultado.to_dict(orient='records')[0])
        
        return Response(resultados, status=status.HTTP_200_OK)

    
    