# import serializers from the REST framework
from rest_framework import serializers
from modulo_asignacion.models import asignacion

# create a serializer class


class asignacion_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = asignacion
		fields = '__all__'

class asignacion_user_serializer(serializers.Serializer):
    id_jefe = serializers.IntegerField()    
    id_usuario = serializers.IntegerField()
    llamada = serializers.CharField()

