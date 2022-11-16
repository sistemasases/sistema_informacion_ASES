# import serializers from the REST framework
from rest_framework import serializers

# create a serializer class
class User_manage(serializers.Serializer):
	id = serializers.IntegerField()

class Rol_manage(serializers.Serializer):
	id = serializers.IntegerField()

class User_rol(serializers.Serializer):
    id_user = serializers.IntegerField()
    id_rol = serializers.IntegerField()

class User_rol_manage(serializers.Serializer):
    id = serializers.IntegerField()

class Estudiante_manage(serializers.Serializer):
	id = serializers.IntegerField()

class Estudiante_actualizacion(serializers.Serializer):
    id_nuevo_num_doc = serializers.IntegerField()    
    id_nuevo_telefono_res = serializers.IntegerField()