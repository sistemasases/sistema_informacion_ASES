# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import instancia, semestre

# create a serializer class
class InstanciaSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = instancia
		fields = ('codigo', 'nombre', 'descripcion')

class SemestreSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = semestre
		fields = ('nombre', 'fecha_inicio', 'fecha_fin', 'id_instancia', 'semestre_actual')
