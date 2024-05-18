from rest_framework import serializers
from modulo_ia.models import datos_entrenamiento, datos_prediccion
from modulo_usuario_rol.serializers import estudiante_serializer

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