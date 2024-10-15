# import serializers from the REST framework
from rest_framework import serializers
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, monitor, etnia, cond_excepcion, estado_civil, identidad_gen, act_simultanea, cohorte_estudiante, rol_permiso, permiso,discap_men
from django.contrib.auth.models import User
from modulo_carga_masiva.models import retiro, motivo

from modulo_programa.serializers import programa_estudiante_ficha_serializer

# create a serializer class

class discap_men_serializer(serializers.ModelSerializer):
	# create a meta class
	class Meta:
		model = discap_men
		fields = '__all__'

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
class user_info_basica_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = User
		fields = ['id', 'first_name','last_name']

class user_basic_info_serializer(serializers.ModelSerializer):
    # create a meta class
	class Meta:
		model = User
		fields = ['id','username','first_name','last_name','email']

class estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = estudiante
		fields = '__all__'
class basic_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = estudiante
		fields = 'id','cod_univalle'

class monitor_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = monitor
		fields = '__all__'

class permiso_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = permiso
		fields = '__all__'

class rol_permiso_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = rol_permiso
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
    
class User_rol_sede(serializers.Serializer):
    id_user = serializers.IntegerField()
    id_rol = serializers.IntegerField()
    id_sede = serializers.IntegerField()

class User_rol_manage(serializers.Serializer):
    id = serializers.IntegerField()

class Estudiante_manage(serializers.Serializer):
	id = serializers.IntegerField()


class Monitor_actualizacion(serializers.ModelSerializer):
	class Meta:
		model = estudiante
		fields = ['telefono_res', 'celular','observacion', 'ult_modificacion']

class mas_con_quien_vive(serializers.ModelSerializer):
	class Meta:
		model = estudiante
		fields = ['vive_con']

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

class user_actualizacion (serializers.Serializer):
	first_name = serializers.CharField(required=False)
	last_name = serializers.CharField(required=False)
	id_user = serializers.IntegerField(required=False)
	telefono = serializers.IntegerField(required=False)
	celular = serializers.IntegerField(required=False)
	observacion = serializers.CharField(required=False)
	ult_modificacion = serializers.DateTimeField(required=False)

class cohorte_estudiante_serializer(serializers.ModelSerializer):
	class Meta:
		model = cohorte_estudiante
		fields = '__all__'


class firma_tratamiento_datos_serializer(serializers.Serializer):
	documento = serializers.IntegerField()
	nombre_firma = serializers.CharField()
	fecha_firma = serializers.DateField()
	correo_firma = serializers.CharField()
	tipo_id_estudiante = serializers.CharField()
	autoriza_tratamiento_datos = serializers.BooleanField()
	autoriza_tratamiento_imagen = serializers.BooleanField()

class retiro_serializer(serializers.ModelSerializer):
	class Meta:
		model = retiro
		fields = '__all__'

	def create(self, validated_data):
		TIPO_DETALLE = {
			'vocacional':'Vocacional',
			'traslado':'Traslado de Universidad',
			'bajo':'Bajo Rendimiento',
			'calamidad':'Calamidad Doméstica',
			'econ_lab':'Económico / Laboral',
			'fallecimiento':'Fallecimiento',
			'no_matricula':'No matriculó',
			'retiro':'Retiro voluntario / Rechazo del acompañamiento',
			'abandono':'Abandono del cupo',
			'inconformidad':'Inconformidad con el Programa',
			'corresponsabilidad':'Corresponsabilidad / Inasistencias',
			'falta':'Falta de tiempo',
			'autonomia':'Autonomía',
			'econ':'Económico',
			'rechazo':'Rechazo del cupo (en primer semestre)',
			'individual':'Individual (Salud)',
			'carga':'Carga académica',
			'finalizacion':'Etapa de Acompañamiento finalizada',
			'no_respuesta':'No hubo respuesta'

		}
		validated_data['detalle'] = TIPO_DETALLE[validated_data.get('detalle')]
		consulta_estudiante=estudiante.objects.get(id = validated_data['id_estudiante'].id)
		consulta_estudiante.estudiante_elegible = False
		consulta_estudiante.save()
		return retiro.objects.create(**validated_data)

class motivo_serializer(serializers.ModelSerializer):
	class Meta:
		model = motivo
		fields = '__all__'
class usuario_rol_jefe_serializer(serializers.ModelSerializer):

	id_jefe = user_info_basica_serializer(allow_null=True)
	class Meta:
		model = usuario_rol
		fields = '__all__'
class cohorte_estudiante_ficha_serializer(serializers.ModelSerializer):
	id_cohorte = serializers.SerializerMethodField()
	class Meta:
		model = cohorte_estudiante
		fields = ['id_cohorte']
	def get_id_cohorte(self, obj):
		return obj.id_cohorte.nombre
class Estudiante_actualizacion(serializers.ModelSerializer):
	class Meta:
		model = estudiante
		fields = ['puntaje_icfes', 'telefono_res', 'celular', 'email', 'sexo', 'hijos', 'actividades_ocio_deporte',
                  'acudiente', 'telefono_acudiente', 'id_etnia', 'id_act_simultanea', 'id_identidad_gen', 'id_estado_civil',
                  'id_cond_excepcion','vive_con', 'ult_modificacion']
class ficha_estudiante_serializer(serializers.ModelSerializer):
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