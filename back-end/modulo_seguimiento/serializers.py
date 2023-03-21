from rest_framework import serializers
from modulo_seguimiento.models import *

class seguimiento_individual_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = seguimiento_individual
		fields = '__all__'

class inasistencia_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = inasistencia
		fields = '__all__'