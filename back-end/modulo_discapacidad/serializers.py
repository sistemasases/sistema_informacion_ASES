from rest_framework import serializers

from modulo_usuario_rol.models import estudiante
from modulo_discapacidad.models import discapacidad_estudiante
from modulo_programa.models import programa_estudiante


class estudiante_extra_serializer(serializers.ModelSerializer):

    tipo_discapacidad = serializers.SerializerMethodField()
    adquisicion = serializers.SerializerMethodField()
    condicion_excepcion = serializers.SerializerMethodField()
    id_programa = serializers.SerializerMethodField()
    programa_academico = serializers.SerializerMethodField()
    sede = serializers.SerializerMethodField()
    estado_discapacidad = serializers.SerializerMethodField()
    registro_academico = serializers.SerializerMethodField()

    class Meta:
        model = estudiante
        fields = '__all__'

    def get_programa(self, obj):
        return (obj.programas or [None])[0]

    def get_estado_discapacidad(self, obj):
        if not obj.es_discapacidad:
            return "N/A"
        return 'ACTIVO/A' if obj.discapacidad.estado_discapacidad else 'NO ACTIVO/A'

    def get_registro_academico(self, obj):
        programa = self.get_programa(obj)
        if not programa:
            return "N/A"
        return programa.id_estado.nombre

    def get_sede(self, obj):
        programa = self.get_programa(obj)
        if not programa:
            return "N/A"
        return programa.id_programa.id_sede.nombre

    def get_id_programa(self, obj):
        programa = self.get_programa(obj)
        if not programa:
            return "N/A"
        return programa.id_programa.codigo_univalle

    def get_programa_academico(self, obj):
        programa = self.get_programa(obj)
        if not programa:
            return "N/A"
        return programa.id_programa.nombre

    def get_condicion_excepcion(self, obj):
        if not obj.id_cond_excepcion:
            return "N/A"
        return obj.id_cond_excepcion.alias

    def get_tipo_discapacidad(self, obj):
        if not obj.es_discapacidad:
            return "N/A"
        return obj.discapacidad.get_tipo_discapacidad_display()

    def get_adquisicion(self, obj):
        if not obj.es_discapacidad:
            return "N/A"
        return obj.discapacidad.get_adquisicion_display()
