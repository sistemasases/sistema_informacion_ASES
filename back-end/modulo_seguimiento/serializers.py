from rest_framework import serializers
from modulo_seguimiento.models import *
from datetime import date

class hisotrial_ficha_serializer(serializers.ModelSerializer):
    id_user = serializers.SerializerMethodField()
    fecha = serializers.DateTimeField()
    class Meta:
        model = historial_ficha 
        fields = ['id_user','fecha']
    def get_id_user(self, obj):
        return f"{obj.id_user.first_name} {obj.id_user.last_name}"

class seguimiento_individual_serializer(serializers.ModelSerializer):
    id_editors= hisotrial_ficha_serializer(source='id_ficha_in_historial_ficha',many=True,read_only=True)
    nombre_creador = serializers.SerializerMethodField(source='id_creador_seguimiento', allow_null=True,read_only=True)
    id_semestre = serializers.PrimaryKeyRelatedField(queryset=semestre.objects.all(), write_only=True)

    class Meta:
        model = seguimiento_individual
        fields = '__all__'
    def get_nombre_creador(self, obj):
        return f"{obj.id_creador.first_name} {obj.id_creador.last_name}"
    
    def create(self, validated_data):
        # Extraer `id_semestre` antes de crear la instancia
        id_semestre = validated_data.pop('id_semestre', None)
        instance = super().create(validated_data)

        # Realizar operaciones adicionales con `id_semestre` después de crear la instancia
        if id_semestre:
            estudiante_instancia = validated_data['id_estudiante']
            fecha = validated_data.get('fecha')
            riesgo_instancia, created = riesgo_individual.objects.get_or_create(
                id_estudiante=estudiante_instancia,id_semestre=id_semestre,defaults={
                'fecha': fecha,
                'riesgo_individual': validated_data.get('riesgo_individual'),
                'riesgo_familiar': validated_data.get('riesgo_familiar'),
                'riesgo_academico': validated_data.get('riesgo_academico'),
                'riesgo_economico': validated_data.get('riesgo_economico'),
                'riesgo_vida_universitaria_ciudad': validated_data.get('riesgo_vida_universitaria_ciudad'),
            }
            )

            if not created and riesgo_instancia.fecha <= validated_data['fecha']:
                riesgo_instancia.fecha = validated_data['fecha']
                riesgo_instancia.id_semestre = id_semestre
                # Mantener el valor actual si el campo enviado es `None`
                if 'riesgo_individual' in validated_data:
                    if validated_data['riesgo_individual'] is not None:
                        riesgo_instancia.riesgo_individual = validated_data['riesgo_individual']
                if 'riesgo_familiar' in validated_data:
                    if validated_data['riesgo_familiar'] is not None:
                        riesgo_instancia.riesgo_familiar = validated_data['riesgo_familiar']
                if 'riesgo_academico' in validated_data:
                    if validated_data['riesgo_academico'] is not None:
                        riesgo_instancia.riesgo_academico = validated_data['riesgo_academico']
                if 'riesgo_economico' in validated_data:
                    if validated_data['riesgo_economico'] is not None:
                        riesgo_instancia.riesgo_economico = validated_data['riesgo_economico']
                if 'riesgo_vida_universitaria_ciudad' in validated_data:
                    if validated_data['riesgo_vida_universitaria_ciudad'] is not None:
                        riesgo_instancia.riesgo_vida_universitaria_ciudad = validated_data['riesgo_vida_universitaria_ciudad']

                riesgo_instancia.save()

        return instance

    def update(self, instance, validated_data):
        # Similar manejo para `update` si también necesitas manejar `id_semestre`
        id_semestre = validated_data.pop('id_semestre', None)
        instance = super().update(instance, validated_data)
        id_modificador = validated_data.get('id_modificador')
        if id_modificador:
            historial_editores = historial_ficha(
                id_ficha=instance,
                id_user=id_modificador
            )
            historial_editores.save()

        if id_semestre:
            estudiante_instancia = validated_data['id_estudiante']
            fecha = validated_data.get('fecha')
            try:
                riesgo_instancia = riesgo_individual.objects.get(id_estudiante=estudiante_instancia, id_semestre=id_semestre)
                # Verificar si la fecha de `riesgo_instancia` es menor o igual a la fecha validada
                if riesgo_instancia.fecha <= fecha:
                    riesgo_instancia.fecha = validated_data['fecha']
                    riesgo_instancia.id_semestre = id_semestre
                    # Mantener el valor actual si el campo enviado es `None`
                    if 'riesgo_individual' in validated_data:
                        if validated_data['riesgo_individual'] is not None:
                            riesgo_instancia.riesgo_individual = validated_data['riesgo_individual']
                    if 'riesgo_familiar' in validated_data:
                        if validated_data['riesgo_familiar'] is not None:
                            riesgo_instancia.riesgo_familiar = validated_data['riesgo_familiar']
                    if 'riesgo_academico' in validated_data:
                        if validated_data['riesgo_academico'] is not None:
                            riesgo_instancia.riesgo_academico = validated_data['riesgo_academico']
                    if 'riesgo_economico' in validated_data:
                        if validated_data['riesgo_economico'] is not None:
                            riesgo_instancia.riesgo_economico = validated_data['riesgo_economico']
                    if 'riesgo_vida_universitaria_ciudad' in validated_data:
                        if validated_data['riesgo_vida_universitaria_ciudad'] is not None:
                            riesgo_instancia.riesgo_vida_universitaria_ciudad = validated_data['riesgo_vida_universitaria_ciudad']

                    riesgo_instancia.save()
            except riesgo_individual.DoesNotExist:
                # Si no existe, puedes decidir qué hacer, por ejemplo, crear uno nuevo o simplemente ignorar
                # Aquí simplemente ignoramos y no hacemos nada si no existe
                pass
        return instance


class inasistencia_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = inasistencia
		fields = '__all__'

class riesgo_individual_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = riesgo_individual
		fields = '__all__'