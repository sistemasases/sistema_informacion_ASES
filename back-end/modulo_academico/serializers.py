from rest_framework import serializers
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa_estudiante
from modulo_usuario_rol.models import estudiante

from .models import (
    historial_academico,
    materia,
    profesor,
    materia,
    matricula,
    items_historico,
    items_semestre,
    notas_historico,
    notas_semestre,
)



class historial_academico_serializer(serializers.ModelSerializer):
    class Meta:
        model = historial_academico
        fields = '__all__'


class materia_serializer(serializers.ModelSerializer):
    class Meta:
        model = materia
        fields = '__all__'


class profesor_serializer(serializers.ModelSerializer):
    class Meta:
        model = profesor
        fields = '__all__'


class matricula_serializer(serializers.ModelSerializer):
    class Meta:
        model = matricula
        fields = '__all__'


class items_historico_serializer(serializers.ModelSerializer):
    class Meta:
        model = items_historico
        fields = '__all__'


class items_semestre_serializer(serializers.ModelSerializer):
    class Meta:
        model = items_semestre
        fields = '__all__'


class notas_historico_serializer(serializers.ModelSerializer):
    class Meta:
        model = notas_historico
        fields = '__all__'


class notas_semestre_serializer(serializers.ModelSerializer):
    class Meta:
        model = notas_semestre
        fields = '__all__'