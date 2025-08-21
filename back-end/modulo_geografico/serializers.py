from rest_framework import serializers
from modulo_geografico.models import barrio, municipio

class barrio_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = barrio
		fields = '__all__'
		
class municipio_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = municipio
		fields = '__all__'