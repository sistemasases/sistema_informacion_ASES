# import serializers from the REST framework
from rest_framework import serializers
from modulo_asignacion.models import asignacion
from modulo_usuario_rol.serializers import user_info_basica_serializer

# create a serializer class


class asignacion_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = asignacion
		fields = '__all__'
            
class asignacion_monitor_serializer(serializers.ModelSerializer):
	
    id_usuario = user_info_basica_serializer(allow_null=True)

	# create a meta class
	
    class Meta:
        model = asignacion
        fields = '__all__'
		 


class asignacion_user_serializer(serializers.Serializer):
    id_jefe = serializers.IntegerField()    
    id_usuario = serializers.IntegerField()
    id_sede = serializers.IntegerField()
    llamada = serializers.CharField()
    
class asignacion_estudiante_serializer(serializers.Serializer):
    id_estudiante = serializers.IntegerField()
    id_usuario = serializers.IntegerField()   
    id_sede = serializers.IntegerField()
    llamada = serializers.CharField()
    detalle = serializers.CharField()

