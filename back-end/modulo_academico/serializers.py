from rest_framework import serializers
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa_estudiante
from modulo_usuario_rol.models import estudiante
# from modulo_programa.serializer import programa_estudiante_serializer
# from modulo_instancia.serializer import semestre_serializer, sede_serializer
# from modulo_usuario_rol.serializer import estudiante_serializer

from .models import (
    historial_academico,
    materia,
    matricula,
    items_historico,
    items_semestre,
    notas_historico,
    notas_semestre,
    monitoria_academica
)



class monitoria_academica_serializer(serializers.ModelSerializer):
    # id_programa_estudiante = programa_estudiante_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = monitoria_academica
        fields = '__all__'
class historial_academico_serializer(serializers.ModelSerializer):
    # id_programa_estudiante = programa_estudiante_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = historial_academico
        fields = '__all__'


class materia_serializer(serializers.ModelSerializer):
    class Meta:
        model = materia
        fields = '__all__'


class matricula_serializer(serializers.ModelSerializer):
    # id_curso = curso_serializer()
    # id_estudiante = estudiante_serializer()

    class Meta:
        model = matricula
        fields = '__all__'


class items_historico_serializer(serializers.ModelSerializer):
    # id_curso = curso_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = items_historico
        fields = '__all__'


class items_semestre_serializer(serializers.ModelSerializer):
    # id_curso = curso_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = items_semestre
        fields = '__all__'


class notas_historico_serializer(serializers.ModelSerializer):
    # id_item = items_historico_serializer()
    # id_estudiante = estudiante_serializer()

    class Meta:
        model = notas_historico
        fields = '__all__'


class notas_semestre_serializer(serializers.ModelSerializer):
    # id_item = items_semestre_serializer()
    # id_estudiante = estudiante_serializer()

    class Meta:
        model = notas_semestre
        fields = '__all__'


