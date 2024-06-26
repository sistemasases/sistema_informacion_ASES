from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import Seguimiento
from app_registro.models import Persona 
from django.shortcuts import get_object_or_404


class SeguimientoSerializer(serializers.ModelSerializer):
    id_persona = serializers.CharField(max_length=30, required=True)
    
    
    class Meta:
        model = Seguimiento
        fields = '__all__'
        
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona')
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        
        seguimiento = Seguimiento.objects.create(id_persona=persona, **validated_data)
       
        return seguimiento

    def update(self, instance, validated_data):
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        
        
        return super().update(instance, validated_data)