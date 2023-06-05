# import serializers from the REST framework
from rest_framework import serializers
from modulo_programa.models import programa_estudiante, programa, facultad



class programa_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa_estudiante
		fields = ('id_programa','id_estudiante')

class programa_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa
		fields = '__all__'


class facultad_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = facultad
		fields = '__all__'