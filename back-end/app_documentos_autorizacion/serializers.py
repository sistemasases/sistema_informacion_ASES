# serializers.py
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import DocumentosAutorizacion, ApgarPregunta1, ApgarPregunta2, ApgarPregunta3, ApgarPregunta4, ApgarPregunta5, ApgarPregunta6, ApgarPregunta7
from app_registro.models import Persona


        
class ApgarPregunta1Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta1
        fields = '__all__'

class ApgarPregunta2Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta2
        fields = '__all__'

class ApgarPregunta3Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta3
        fields = '__all__'

class ApgarPregunta4Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta4
        fields = '__all__'

class ApgarPregunta5Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta5
        fields = '__all__'

class ApgarPregunta6Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta6
        fields = '__all__'

class ApgarPregunta7Serializer(serializers.ModelSerializer):
    class Meta:
        model = ApgarPregunta7
        fields = '__all__'

class ApgarPregunta1ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta1
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_apgar_pregunta1' in data:
            return data['nombre_apgar_pregunta1'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta2ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta2
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_apgar_pregunta2' in data:
            return data['nombre_apgar_pregunta2'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta3ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta3
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_apgar_pregunta3'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta4ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta4
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_apgar_pregunta4'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta5ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta5
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_apgar_pregunta5'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta6ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta6
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_apgar_pregunta6'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class ApgarPregunta7ListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_apgar_pregunta7
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_apgar_pregunta7'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class DocumentosAutorizacionSerializer(serializers.ModelSerializer):
    id_persona = serializers.CharField(max_length=30, required=True)
    
    apgar_pregunta1 = ApgarPregunta1ListingField(
        many=True,
        queryset= ApgarPregunta1.objects.all(),
        required=False,
    )

    apgar_pregunta2 = ApgarPregunta2ListingField(
        many=True,
        queryset= ApgarPregunta2.objects.all(),
        required=False,
    )

    apgar_pregunta3 = ApgarPregunta3ListingField(
        many=True,
        queryset= ApgarPregunta3.objects.all(),
        required=False,
    )    
     
    apgar_pregunta4 = ApgarPregunta4ListingField(
        many=True,
        queryset= ApgarPregunta4.objects.all(),
        required=False,
    )
    apgar_pregunta5 = ApgarPregunta5ListingField(
        many=True,
        queryset= ApgarPregunta5.objects.all(),
        required=False,
    )

    apgar_pregunta6 = ApgarPregunta6ListingField(
        many=True,
        queryset= ApgarPregunta6.objects.all(),
        required=False,
    )

    apgar_pregunta7 = ApgarPregunta7ListingField(
        many=True,
        queryset= ApgarPregunta7.objects.all(),
        required=False,
    )
  
    id_persona = serializers.CharField(max_length=30, required=True)
    class Meta:
        model = DocumentosAutorizacion
        fields = '__all__'


    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona', None)
        apgar_pregunta1 = validated_data.pop('apgar_pregunta1', [])
        apgar_pregunta2 = validated_data.pop('apgar_pregunta2', [])
        apgar_pregunta3 = validated_data.pop('apgar_pregunta3', [])
        apgar_pregunta4 = validated_data.pop('apgar_pregunta4', [])
        apgar_pregunta5 = validated_data.pop('apgar_pregunta5', [])
        apgar_pregunta6 = validated_data.pop('apgar_pregunta6', [])
        apgar_pregunta7 = validated_data.pop('apgar_pregunta7', [])


        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        documentos_autorizacion = DocumentosAutorizacion.objects.create(id_persona=persona, **validated_data)

        # apgar
        for nombre_apgar_pregunta1 in apgar_pregunta1:
           apgar_pregunta1, _ = ApgarPregunta1.objects.get_or_create(nombre_apgar_pregunta1=nombre_apgar_pregunta1)
           documentos_autorizacion.apgar_pregunta1.add(apgar_pregunta1) 


        
        for nombre_apgar_pregunta2 in apgar_pregunta2:
            apgar_pregunta2, _ = ApgarPregunta2.objects.get_or_create(nombre_apgar_pregunta2=nombre_apgar_pregunta2)
            documentos_autorizacion.apgar_pregunta2.add(apgar_pregunta2) 
        
        for nombre_apgar_pregunta3 in apgar_pregunta3:
            apgar_pregunta3, _ = ApgarPregunta3.objects.get_or_create(nombre_apgar_pregunta3=nombre_apgar_pregunta3)
            documentos_autorizacion.apgar_pregunta3.add(apgar_pregunta3) 
        
        for nombre_apgar_pregunta4 in apgar_pregunta4:
            apgar_pregunta4, _ = ApgarPregunta4.objects.get_or_create(nombre_apgar_pregunta4=nombre_apgar_pregunta4)
            documentos_autorizacion.apgar_pregunta4.add(apgar_pregunta4) 
        
        for nombre_apgar_pregunta5 in apgar_pregunta5:
            apgar_pregunta5, _ = ApgarPregunta5.objects.get_or_create(nombre_apgar_pregunta5=nombre_apgar_pregunta5)
            documentos_autorizacion.apgar_pregunta5.add(apgar_pregunta5) 
        
        for nombre_apgar_pregunta6 in apgar_pregunta6:
            apgar_pregunta6, _ = ApgarPregunta6.objects.get_or_create(nombre_apgar_pregunta6=nombre_apgar_pregunta6)
            documentos_autorizacion.apgar_pregunta6.add(apgar_pregunta6) 
        
        for nombre_apgar_pregunta7 in apgar_pregunta7:
            apgar_pregunta7, _ = ApgarPregunta7.objects.get_or_create(nombre_apgar_pregunta7=nombre_apgar_pregunta7)
            documentos_autorizacion.apgar_pregunta7.add(apgar_pregunta7) 
  
        return documentos_autorizacion
    
    def update(self, instance, validated_data):
        apgar_pregunta1 = validated_data.pop('apgar_pregunta1', [])
        apgar_pregunta2 = validated_data.pop('apgar_pregunta2', [])
        apgar_pregunta3 = validated_data.pop('apgar_pregunta3', [])
        apgar_pregunta4 = validated_data.pop('apgar_pregunta4', [])
        apgar_pregunta5 = validated_data.pop('apgar_pregunta5', [])
        apgar_pregunta6 = validated_data.pop('apgar_pregunta6', [])
        apgar_pregunta7 = validated_data.pop('apgar_pregunta7', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # APGAR
        if apgar_pregunta1:
            instance.apgar_pregunta1.clear()
            for nombre_apgar_pregunta1 in apgar_pregunta1:
                apgar_pregunta1, _ = ApgarPregunta1.objects.get_or_create(nombre_apgar_pregunta1=nombre_apgar_pregunta1)
                instance.apgar_pregunta1.add(apgar_pregunta1)

        if apgar_pregunta2:
            instance.apgar_pregunta2.clear()
            for nombre_apgar_pregunta2 in apgar_pregunta2:
                apgar_pregunta2, _ = ApgarPregunta2.objects.get_or_create(nombre_apgar_pregunta2=nombre_apgar_pregunta2)
                instance.apgar_pregunta2.add(apgar_pregunta2)
        
        if apgar_pregunta3:
            instance.apgar_pregunta3.clear()
            for nombre_apgar_pregunta3 in apgar_pregunta3:
                apgar_pregunta3, _ = ApgarPregunta3.apgar_pregunta3.objects.get_or_create(nombre_apgar_pregunta3=nombre_apgar_pregunta3)
                instance.apgar_pregunta3.add(apgar_pregunta3)
        
        if apgar_pregunta4:
            instance.apgar_pregunta4.clear()
            for nombre_apgar_pregunta4 in apgar_pregunta4:
                apgar_pregunta4, _ = ApgarPregunta4.objects.get_or_create(nombre_apgar_pregunta4=nombre_apgar_pregunta4)
                instance.apgar_pregunta4.add(apgar_pregunta4)
            
        if apgar_pregunta5:
            instance.apgar_pregunta5.clear()
            for nombre_apgar_pregunta5 in apgar_pregunta5:
                apgar_pregunta5, _ = ApgarPregunta1.objects.get_or_create(nombre_apgar_pregunta5=nombre_apgar_pregunta5)
                instance.apgar_pregunta5.add(apgar_pregunta5)

        if apgar_pregunta6:
            instance.apgar_pregunta1.clear()
            for nombre_apgar_pregunta6 in apgar_pregunta6:
                apgar_pregunta6, _ = ApgarPregunta6.objects.get_or_create(nombre_apgar_pregunta6=nombre_apgar_pregunta6)
                instance.apgar_pregunta6.add(apgar_pregunta6)

        if apgar_pregunta7:
            instance.apgar_pregunta7.clear()
            for nombre_apgar_pregunta7 in apgar_pregunta7:
                apgar_pregunta7, _ = ApgarPregunta7.objects.get_or_create(nombre_apgar_pregunta7=nombre_apgar_pregunta7)
                instance.apgar_pregunta7.add(apgar_pregunta7)

        return super().update(instance, validated_data)