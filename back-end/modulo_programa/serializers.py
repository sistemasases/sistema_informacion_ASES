# import serializers from the REST framework
from rest_framework import serializers
from modulo_programa.models import programa_estudiante, programa_monitor, programa, facultad, historial_estado_programa_estudiante



class programa_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa_estudiante
		fields = ('id_programa','id_estudiante')

class programa_monitor_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa_monitor
		fields = ('id_programa','id_monitor')

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


class historial_estado_programa_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = historial_estado_programa_estudiante
		fields = '__all__'

class programa_estudiante_ficha_serializer(serializers.ModelSerializer):
	id_programa = serializers.SerializerMethodField(allow_null=True)
	# create a meta class
	class Meta:
		model = programa_estudiante
		fields = ['id_programa']
	def get_id_programa(self, obj):
		return [obj.id_programa.nombre,obj.id_programa.jornada,obj.id_programa.codigo_univalle]
