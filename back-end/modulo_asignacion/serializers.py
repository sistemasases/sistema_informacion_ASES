# import serializers from the REST framework
from rest_framework import serializers
from modulo_asignacion.models import asignacion

# create a serializer class


class asignacion_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = asignacion
		fields = '__all__'
            
class asignacion_monitor_serializer(serializers.ModelSerializer):
	
    id_usuario = serializers.SerializerMethodField(allow_null=True)
    id_semestre = serializers.SerializerMethodField(allow_null=True)
	# create a meta class
	
    class Meta:
        model = asignacion
        fields = ['id_usuario','id_semestre','estado']
		
    def get_id_usuario(self, obj):
        if obj.id_usuario:
            return str(obj.id_usuario.first_name) + (' ')+ str(obj.id_usuario.last_name)
        return None
    def get_id_semestre(self, obj):
         
        if obj.id_semestre:
	        return [obj.id_semestre.nombre, obj.id_semestre.semestre_actual]
        return None  


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

