from rest_framework import serializers
from modulo_ia.models import datos_entrenamiento, datos_prediccion


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