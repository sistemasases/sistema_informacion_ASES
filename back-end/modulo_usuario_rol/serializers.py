# import serializers from the REST framework
from rest_framework import serializers
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, etnia, cond_excepcion, estado_civil, identidad_gen, act_simultanea, cohorte_estudiante
from django.contrib.auth.models import User

# create a serializer class
class user_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = User
		fields = '__all__'

	def create(self,validated_data):
		user = User(**validated_data)
		user.set_password(validated_data['password'])
		user.save()
		return user

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
    puntaje_icfes = serializers.IntegerField(allow_null=True, required=False)
    telefono_res = serializers.CharField(allow_null=True, required=False)
    celular = serializers.CharField(allow_null=True, required=False)
    email = serializers.CharField(allow_null=True, required=False)
    sexo = serializers.CharField(allow_null=True, required=False)
    cantidad_hijo = serializers.IntegerField(allow_null=True, required=False)
    actividades_ocio_deporte = serializers.CharField(allow_null=True, required=False)
    acudiente_emergencia = serializers.CharField(allow_null=True, required=False)
    tel_acudiente_emergencia = serializers.CharField(allow_null=True, required=False)
    etnia = serializers.IntegerField(allow_null=True, required=False)
    act_simultanea = serializers.IntegerField(allow_null=True, required=False)
    identidad_gen = serializers.IntegerField(allow_null=True, required=False)
    estado_civil = serializers.IntegerField(allow_null=True, required=False)
    cond_excepcion = serializers.IntegerField(allow_null=True, required=False)
	

class Grupo_etnico_serializer(serializers.ModelSerializer):
	class Meta:
		model = etnia
		fields = '__all__'

class Actividad_simultanea_serializer(serializers.ModelSerializer):
	class Meta:
		model = act_simultanea
		fields = '__all__'

class Identidad_de_genero_serializer(serializers.ModelSerializer):
	class Meta:
		model = identidad_gen
		fields = '__all__'

class Estado_civil_serializer(serializers.ModelSerializer):
	class Meta:
		model = estado_civil
		fields = '__all__'

class Condicion_de_excepcion_serializer(serializers.ModelSerializer):
	class Meta:
		model = cond_excepcion
		fields = '__all__'

class user_selected (serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username', 'first_name', 'last_name')

class cohorte_estudiante_serializer(serializers.ModelSerializer):
	class Meta:
		model = cohorte_estudiante
		fields = '__all__'
		