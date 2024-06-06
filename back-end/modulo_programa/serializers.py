# import serializers from the REST framework
from rest_framework import serializers
from modulo_programa.models import programa_estudiante, programa_monitor, programa, facultad, historial_estado_programa_estudiante



class programa_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa_estudiante
		fields = ('id_programa','id_estudiante')

class programa_monitor_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa_monitor
		fields = ('id_programa','id_monitor')

class programa_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = programa
		fields = '__all__'


class facultad_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = facultad
		fields = '__all__'


class historial_estado_programa_estudiante_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = historial_estado_programa_estudiante
		fields = '__all__'

# class programa_estudiante_ficha_serializer(serializers.ModelSerializer):
# 	id_programa = serializers.SerializerMethodField(allow_null=True)
# 	id_estudiante = serializers.SerializerMethodField(allow_null=True)
# 	combined_data = serializers.SerializerMethodField()
# 	# create a meta class
# 	class Meta:
# 		model = programa_estudiante
# 		fields = ['id_programa','id_estudiante','traker','id_estado_id','combined_data']
# 	def get_id_programa(self, obj):
# 		return [obj.id_programa.nombre,obj.id_programa.jornada,obj.id_programa.codigo_univalle]
# 	def get_id_estudiante(self, obj):
# 		return obj.id_estudiante.cod_univalle
# 	def get_combined_data(self, obj):
# 		id_programa_data = self.get_id_programa(obj)
# 		id_estudiante_data = self.get_id_estudiante(obj)
# 		return {
#             'id_programa': id_programa_data,
#             'id_estudiante': id_estudiante_data
#         }
class programa_estudiante_ficha_serializer(serializers.ModelSerializer):
    nombre_programa = serializers.CharField(source='id_programa.nombre')
    cod_univalle = serializers.IntegerField(source='id_programa.codigo_univalle')
    codigo_estudiante = serializers.CharField(source='id_estudiante.cod_univalle')

    class Meta:
        model = programa_estudiante
        fields = ['id', 'nombre_programa', 'cod_univalle', 'codigo_estudiante', 'id_estado_id', 'traker']

