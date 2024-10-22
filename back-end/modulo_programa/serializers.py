# import serializers from the REST framework
from rest_framework import serializers
from modulo_programa.models import programa_estudiante, programa_monitor, programa, facultad, historial_estado_programa_estudiante


class programa_estudiante_serializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = programa_estudiante
        fields = ('id_programa', 'id_estudiante')


class programa_monitor_serializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = programa_monitor
        fields = ('id_programa', 'id_monitor')


class programa_serializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = programa
        fields = '__all__'

class programa_serializer_form(serializers.ModelSerializer):

    nombre_sede=serializers.SerializerMethodField(source='id_sede',allow_null=True)
    class Meta:
        model = programa
        fields = '__all__'

    def get_nombre_sede(self, obj):
        if obj.id_sede:
            return obj.id_sede.nombre
        return None

    


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

class codigos_programas_serializer(serializers.ModelSerializer):
    cod_univalle = serializers.IntegerField(
        source='id_programa.codigo_univalle')

    class Meta:
        model = programa_estudiante
        fields = ['cod_univalle']
class programa_estudiante_ficha_serializer(serializers.ModelSerializer):
    nombre_programa = serializers.CharField(source='id_programa.nombre')
    cod_univalle = serializers.IntegerField(
        source='id_programa.codigo_univalle')
    codigo_estudiante = serializers.CharField(
        source='id_estudiante.cod_univalle')
    jornada = serializers.CharField(source='id_programa.jornada')

    class Meta:
        model = programa_estudiante
        fields = ['id', 'nombre_programa', 'cod_univalle',
                  'jornada', 'codigo_estudiante', 'id_estado_id', 'traker']
