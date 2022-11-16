# import serializers from the REST framework
from rest_framework import serializers
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from django.contrib.auth.models import User

# create a serializer class
class user_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = User
		fields = '__all__'

class estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = estudiante
		fields = '__all__'

class rol_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = rol
		fields = '__all__'

class usuario_rol_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = usuario_rol
		fields = '__all__'

    
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
    id = serializers.IntegerField()