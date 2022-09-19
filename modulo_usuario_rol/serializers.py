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
