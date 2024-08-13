from rest_framework import serializers
from modulo_usuario_rol.serializers import cohorte_estudiante_ficha_serializer, programa_estudiante_ficha_serializer, user_info_basica_serializer
from modulo_usuario_rol.models import estudiante
from .models import *
from modulo_programa. models import programa_estudiante

class programa_estudiante_dexia_serializer(serializers.ModelSerializer):
    nombre_programa = serializers.CharField(source='id_programa.nombre')
    cod_univalle = serializers.IntegerField(source='id_programa.codigo_univalle')
    jornada = serializers.CharField(source='id_programa.jornada')

    class Meta:
        model = programa_estudiante
        fields = ['nombre_programa', 'cod_univalle',
                  'jornada']
class ases_dexia_serializer(serializers.ModelSerializer):
	programas= programa_estudiante_dexia_serializer(source='id_estudiante_in_programa_estudiante',many=True)
	class Meta:
		model = estudiante
		fields = ['cod_univalle','programas']

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