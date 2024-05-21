from rest_framework import serializers
from modulo_ia.models import datos_entrenamiento, datos_prediccion, encuesta_admitidos
from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import estudiante_serializer, basic_estudiante_serializer

class datos_entrenamiento_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = datos_entrenamiento
		fields = '__all__'
		
class datos_prediccion_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = datos_prediccion
		fields = '__all__'
  
class estudiante_con_datos_prediccion_serializer(serializers.Serializer):
    id = serializers.IntegerField()
    cod_univalle = serializers.CharField()
    datos_prediccion = datos_prediccion_serializer(many=True)
    
class encuesta_admitidos_serializer(serializers.ModelSerializer):
	codigo = serializers.CharField(source='id_estudiante.cod_univalle')
	nombre = serializers.CharField(source='id_estudiante.nombre')
	apellido = serializers.CharField(source='id_estudiante.apellido')
	class Meta:
		model = encuesta_admitidos
		fields = '__all__'