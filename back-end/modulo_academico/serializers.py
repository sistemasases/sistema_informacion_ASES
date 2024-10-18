from rest_framework import serializers
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa_estudiante
from modulo_usuario_rol.models import estudiante
from modulo_formularios_externos.models import asistencia
# from modulo_programa.serializer import programa_estudiante_serializer
# from modulo_instancia.serializer import semestre_serializer, sede_serializer
from modulo_usuario_rol.serializers import estudiante_serializer, datos_basicos_estudiante_serializer

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
from modulo_usuario_rol.serializers import user_basic_info_serializer

class monitoria_academica_serializer(serializers.ModelSerializer):

    class Meta:
        model = monitoria_academica
        fields = '__all__'

    
class info_basica_monitoria_academica_serializer(serializers.ModelSerializer):
    nombre_monitor = serializers.SerializerMethodField(allow_null=True)
    apellido_monitor = serializers.SerializerMethodField(allow_null=True)
    nombre_sede = serializers.SerializerMethodField(allow_null=True)

    class Meta:
        model = monitoria_academica
        fields = ['id','nombre_monitor','apellido_monitor','materia','nombre_sede']

    def get_nombre_monitor(self, obj):
        if obj.id_monitor:
            return obj.id_monitor.first_name
        return None
    def get_apellido_monitor(self, obj):
        if obj.id_monitor:
            return obj.id_monitor.last_name
        return None
    def get_nombre_sede(self, obj):
        if obj.id_sede:
            return obj.id_sede.nombre
        return None
class asistencia_serializer(serializers.ModelSerializer):
    # id_programa_estudiante = programa_estudiante_serializer()
    # id_semestre = semestre_serializer()

    class Meta:
        model = asistencia
        fields = '__all__'
class asistencia_serializer_lista(serializers.ModelSerializer):
    monitoria_data = info_basica_monitoria_academica_serializer(source='id_monitoria')
    estudiante_data = datos_basicos_estudiante_serializer(source='id_estudiante')

    class Meta:
        model = asistencia
        fields = ['id','fecha','check_asistencia','monitoria_data', 'estudiante_data']

class asistencia_serializer_fecha(serializers.ModelSerializer):
    monitoria_data = info_basica_monitoria_academica_serializer(source='id_monitoria')
    estudiante_data = datos_basicos_estudiante_serializer(source='id_estudiante')

    class Meta:
        model = asistencia
        fields = ['id','fecha','monitoria_data', 'estudiante_data']
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
    items_matriculados = serializers.SerializerMethodField()  # Usamos SerializerMethodField para obtener los items matriculados de cada estudiante

    class Meta:
        model = estudiante
        fields = ('cod_univalle', 'nombre', 'apellido', 'email', 'items_ganados', 'items_perdidos', 'items_matriculados')
        
    def get_items_ganados(self, obj):
        return notas_semestre.objects.filter(id_estudiante=obj.id, calificacion__gte=3).values('id_item').distinct().count()
    
    def get_items_perdidos(self, obj):
        return notas_semestre.objects.filter(id_estudiante=obj.id, calificacion__lt=3).values('id_item').distinct().count()
    
    def get_items_matriculados(self, obj):
        # Contar las matrículas del estudiante específico (obj)
        return matricula.objects.count()
    
    

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
