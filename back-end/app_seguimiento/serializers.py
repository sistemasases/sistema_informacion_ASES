from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import Seguimiento, Profesional
from app_registro.models import Persona

class ProfesionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesional
        fields = '__all__'

class SeguimientoSerializer(serializers.ModelSerializer):
    id_persona = serializers.CharField(max_length=30, required=True)
    profesional = ProfesionalSerializer(many=True, read_only=True)
    profesional_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Profesional.objects.all(),
        write_only=True,
        source='profesional'
    )

    class Meta:
        model = Seguimiento
        fields = '__all__'
        extra_kwargs = {
            'profesional': {'read_only': True}
        }

    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona')
        profesionales = validated_data.pop('profesional', [])

        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"La persona con número de documento {id_persona} no existe", code=404)
        
        seguimiento = Seguimiento.objects.create(id_persona=persona, **validated_data)

        # Añadir profesionales al seguimiento
        seguimiento.profesional.set(profesionales)
        seguimiento.save()

        return seguimiento
    
    def update(self, instance, validated_data):
        profesionales = validated_data.pop('profesional', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar profesionales
        instance.profesional.set(profesionales)
        instance.save()

        return instance
