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
    profesores,
    curso,
    matricula,
    items_historico,
    items_semestre,
    notas_historico,
    notas_semestre,
    historial_academico_del_estudiante
)



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


class profesores_serializer(serializers.ModelSerializer):
    class Meta:
        model = profesores
        fields = '__all__'


class curso_serializer(serializers.ModelSerializer):
    # semestre = semestre_serializer()
    # sede = sede_serializer()
    # id_profesor = profesores_serializer()

    class Meta:
        model = curso
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


class historial_academico_estudiante_serializer(serializers.ModelSerializer):
    # id_estudiante = estudiante_serializer()
    # id_semestre = semestre_serializer()
    # id_programa_estudiante = programa_estudiante_serializer()

    class Meta:
        model = historial_academico_del_estudiante
        fields = '__all__'
