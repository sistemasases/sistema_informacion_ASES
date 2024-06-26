# serializers.py
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import DocumentosAutorizacion
from app_registro.models import Persona

class DocumentosAutorizacionSerializer(serializers.ModelSerializer):
  
    id_persona = serializers.CharField(max_length=30, required=True)
  
    class Meta:
        model = DocumentosAutorizacion
        fields = '__all__'
        
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona', None)
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        documentos_autorizacion = DocumentosAutorizacion.objects.create(id_persona=persona, **validated_data)
        
        return documentos_autorizacion