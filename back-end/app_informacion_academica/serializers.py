from rest_framework import serializers
from rest_framework.exceptions import NotFound
from app_registro.models import Persona
from .models import InformacionAcademica, Estamento, SedeUniversidad, NombrePrograma

class EstamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estamento
        fields = '__all__'
class SedeUniversidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = SedeUniversidad
        fields = '__all__'

class NombreProgramaSerializer(serializers.ModelSerializer):
    class Meta:
        model = NombrePrograma
        fields = '__all__'
class EstamentoListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_estamento
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_estamento'].strip()
        raise serializers.ValidationError('Invalid input format.')
    

class SedeUniversidadListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_sede
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_sede'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class NombreProgramaListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_programa
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_programa'].strip()
        raise serializers.ValidationError('Invalid input format.')

class InformacionAcademicaSerializer(serializers.ModelSerializer):

    id_persona = serializers.CharField(max_length=30, required=True)
    estamentos = EstamentoListingField(
        many=True,
        queryset= Estamento.objects.all(),
        required=False,
    )
    sedes = SedeUniversidadListingField(
        many=True,
        queryset= SedeUniversidad.objects.all(),
        required=False,
    )
    programas = NombreProgramaListingField(
        many=True,
        queryset= NombrePrograma.objects.all(),
        required=False,
    )
    class Meta:
        model = InformacionAcademica
        fields = '__all__'
    
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona', None)
        
        estamentos = validated_data.pop('estamentos',[])
        sedes = validated_data.pop('sedes',[])
        programas = validated_data.pop('programas', [])
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        informacion_academica = InformacionAcademica.objects.create(id_persona=persona, **validated_data)
        
        for nombre_estamento in estamentos:
            estamento,_ = Estamento.objects.get_or_create(nombre_estamento=nombre_estamento)
            informacion_academica.estamentos.add(estamento)

        for nombre_sede in sedes:
            sede,_ = SedeUniversidad.objects.get_or_create(nombre_sede=nombre_sede)
            informacion_academica.sedes.add(sede)
        
        for nombre_programa in programas:
            programa,_ = NombrePrograma.objects.get_or_create(nombre_programa=nombre_programa)
            informacion_academica.programas.add(programa)

        return informacion_academica
        
    def update(self, instance, validated_data):
        estamentos = validated_data.pop('estamentos',[])
        sedes = validated_data.pop('sedes',[])
        programas = validated_data.pop('programas',[])
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # RespuestaCambioDocumento
        if estamentos:
            instance.estamentos.clear()
            for nombre_estamento in estamentos:
                estamento = Estamento.objects.filter(nombre_estamento=nombre_estamento).first()
                if not estamento:
                    raise NotFound(detail=f'The estamento "{nombre_estamento}" don\'t exist', code=404)  
                instance.estamentos.add(estamento)

        if sedes:
            instance.sedes.clear()
            for nombre_sede in sedes:
                sede = SedeUniversidad.objects.filter(nombre_sede=nombre_sede).first()
                if not sede:
                    raise NotFound(detail=f'The sede "{nombre_sede}" don\'t exist', code=404)  
                instance.sedes.add(sede)

        if programas:
            instance.programas.clear()
            for nombre_programa in programas:
                programa = NombrePrograma.objects.filter(nombre_programa=nombre_programa).first()
                if not programa:
                    raise NotFound(detail=f'The programa "{nombre_programa}" don\'t exist', code=404)  
                instance.programas.add(programa)        


        return super().update(instance, validated_data)
    
    
      
