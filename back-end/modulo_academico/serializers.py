from rest_framework import serializers
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa_estudiante
from modulo_usuario_rol.models import estudiante
# from modulo_programa.serializer import programa_estudiante_serializer
# from modulo_instancia.serializer import semestre_serializer, sede_serializer
from modulo_usuario_rol.serializers import estudiante_serializer

from .models import (
    historial_academico,
    materia,
    matricula,
    items_historico,
    items_semestre,
    notas_historico,
    notas_semestre,
)
from modulo_usuario_rol.serializers import user_basic_info_serializer


class historial_academico_serializer(serializers.ModelSerializer):
    # id_programa_estudiante = programa_estudiante_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = historial_academico
        fields = '__all__'


class materia_serializer(serializers.ModelSerializer):
    profesor_nombre = serializers.CharField(source='id_profesor.first_name')
    profesor_apellido = serializers.CharField(source='id_profesor.last_name')
    profesor_email = serializers.CharField(source='id_profesor.email')
    class Meta:
        model = materia
        fields = '__all__'
        
class materia_serializer_full(serializers.ModelSerializer):
    profesor = serializers.SerializerMethodField()
    profesor_email = serializers.CharField(source='id_profesor.email')
    items_count = serializers.SerializerMethodField()
    items_calificados_count = serializers.SerializerMethodField()

    class Meta:
        model = materia
        fields = '__all__'

    def get_profesor(self, obj):
        return f"{obj.id_profesor.first_name} {obj.id_profesor.last_name}"
    
    def get_items_count(self, obj):
        return items_semestre.objects.filter(id_curso=obj.id).count()
    
    def get_items_calificados_count(self, obj):
        return notas_semestre.objects.filter(id_item__id_curso=obj.id, calificacion__gt=0).values('id_item').distinct().count()
    
class items_estudiante_serializer(estudiante_serializer):
    items_ganados = serializers.SerializerMethodField()
    items_perdidos = serializers.SerializerMethodField()
    class Meta:
        model = estudiante
        fields = 'cod_univalle', 'nombre', 'apellido', 'email', 'items_ganados', 'items_perdidos'
        
    def get_items_ganados(self, obj):
        return notas_semestre.objects.filter(id_estudiante=obj.id, calificacion__gte=3).values('id_item').distinct().count()
    
    def get_items_perdidos(self, obj):
        return notas_semestre.objects.filter(id_estudiante=obj.id, calificacion__lt=3).values('id_item').distinct().count()
    
    

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


class curso_serializer(serializers.ModelSerializer):
    class Meta:
        model = materia
        fields = '__all__'