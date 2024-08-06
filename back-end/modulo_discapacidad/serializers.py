from rest_framework import serializers
from modulo_usuario_rol.serializers import cohorte_estudiante_ficha_serializer, programa_estudiante_ficha_serializer, user_info_basica_serializer
from modulo_usuario_rol.models import estudiante
from .models import *



class accesibilidad_serializer(serializers.ModelSerializer):

	# create a meta class
	
    class Meta:
        model = accesibilidad
        fields ='__all__'
class asignacion_disc_serializer(serializers.ModelSerializer):
	
    id_usuario = user_info_basica_serializer(allow_null=True)
	
    class Meta:
        model = asignacion_discapacidad
        fields =['id_usuario']

class ficha_estudiante_disc_info_extra_serializer(serializers.ModelSerializer):
	id_tipo_discapacidad = serializers.SerializerMethodField(allow_null=True)
	class Meta:
		model = info_extra_disc
		fields =['id_tipo_discapacidad','categoria']
	
	def get_id_tipo_discapacidad(self, obj):
		if obj.id_tipo_discapacidad:
			return obj.id_tipo_discapacidad.nombre
		return None
class ficha_estudiante_disc_serializer(serializers.ModelSerializer):
	barrio_ini = serializers.SerializerMethodField(allow_null=True)
	ciudad_ini = serializers.SerializerMethodField(allow_null=True)
	barrio_res = serializers.SerializerMethodField(allow_null=True)
	ciudad_res = serializers.SerializerMethodField(allow_null=True)
	ciudad_nac = serializers.SerializerMethodField(allow_null=True)
	id_discapacidad = serializers.SerializerMethodField(allow_null=True)
	el_id_de_cond_excepcion=serializers.SerializerMethodField(source='id_cond_excepcion',allow_null=True)
	el_id_de_estado_civil=serializers.SerializerMethodField(source='id_estado_civil',allow_null=True)
	el_id_de_identidad_gen=serializers.SerializerMethodField(source='id_identidad_gen',allow_null=True)
	el_id_de_act_simultanea= serializers.SerializerMethodField(source='id_act_simultanea',allow_null=True)
	el_id_de_etnia=serializers.SerializerMethodField(source='id_etnia',allow_null=True)
	cohorte= cohorte_estudiante_ficha_serializer(source='id_estudiante_in_cohorte_estudiante',many=True)
	programas= programa_estudiante_ficha_serializer(source='id_estudiante_in_programa_estudiante',many=True)
	class Meta:
		model = estudiante
		fields = '__all__'

	def get_barrio_ini(self, obj):
		if obj.barrio_ini:
			return obj.barrio_ini.nombre
		return None
		
	
	def get_ciudad_ini(self, obj):
		if obj.ciudad_ini:
			return obj.ciudad_ini.nombre
		return None
	
	def get_barrio_res(self, obj):
		if obj.barrio_res:
			return obj.barrio_res.nombre
		return None
	
	def get_ciudad_res(self, obj):
		if obj.ciudad_res:
			return obj.ciudad_res.nombre
		return None
	
	def get_ciudad_nac(self, obj):
		if obj.ciudad_nac:
			return obj.ciudad_nac.nombre
		return None
	
	def get_id_discapacidad(self, obj):
		if obj.id_discapacidad:
			return obj.id_discapacidad.nombre
		return None 

	def get_el_id_de_cond_excepcion(self, obj):
		if obj.id_cond_excepcion:
			return obj.id_cond_excepcion.alias
		return None 
	def get_el_id_de_estado_civil(self, obj):
		if obj.id_estado_civil:
			return obj.id_estado_civil.estado_civil
		return None 
	def get_el_id_de_identidad_gen(self, obj):
		if obj.id_identidad_gen:
			return obj.id_identidad_gen.genero
		return None 
	def get_el_id_de_act_simultanea(self, obj):
		if obj.id_act_simultanea:
			return obj.id_act_simultanea.actividad
		return None 
	def get_el_id_de_etnia(self, obj):
		if obj.id_etnia:
			return obj.id_etnia.etnia
		return None 