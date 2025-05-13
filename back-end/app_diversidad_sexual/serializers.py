from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import DiversidadSexual, Pronombre, IdentidadGenero, ExpresionGenero, OrientacionSexual, RespuestaCambioDocumento
from app_registro.models import Persona


class RespuestaCambioDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaCambioDocumento
        fields = '__all__'

class OrientacionSexualSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrientacionSexual
        fields = '__all__'

class ExpresionGeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpresionGenero
        fields = '__all__'

class IdentidadGeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentidadGenero
        fields = '__all__'

class PronombreSerializer(serializers.ModelSerializer):
    nombre_pronombre = serializers.CharField(max_length=50, required=True)
    
    class Meta:
        model = Pronombre
        fields = '__all__'

# Listing Fields de los serializers

class RespuestaCambioDocumentoListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_respuesta_cambio_documento
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_respuesta_cambio_documento'].strip()
        raise serializers.ValidationError('Invalid input format.')

class OrientacionSexualListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_orientacion_sexual
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_orientacion_sexual'].strip()
        raise serializers.ValidationError('Invalid input format.')

class ExpresionGeneroListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_expresion_genero
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_expresion_genero'].strip()
        raise serializers.ValidationError('Invalid input format.')

class IdentidadGeneroListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_identidad_genero
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_identidad_genero'].strip()
        raise serializers.ValidationError('Invalid input format.')


class PronombreListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_pronombre
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_pronombre'].strip()
        raise serializers.ValidationError('Invalid input format.')

class DiversidadSexualSerializer(serializers.ModelSerializer):
    id_persona = serializers.CharField(max_length=30, required=True)
    
    respuestas_cambio_documento = RespuestaCambioDocumentoListingField(
        many=True,
        queryset= RespuestaCambioDocumento.objects.all(),
        required=False,
    )
    
    orientaciones_sexuales = OrientacionSexualListingField(
        many=True,
        queryset= OrientacionSexual.objects.all(),
        required=False,
    )

    expresiones_de_genero = ExpresionGeneroListingField(
        many=True,
        queryset=ExpresionGenero.objects.all(),
        required=False,
    )
    
    identidades_de_genero = IdentidadGeneroListingField(
        many=True,
        queryset=IdentidadGenero.objects.all(),
        required=False,
    )
    
    pronombres = PronombreListingField(
        many=True,
        queryset=Pronombre.objects.all(),
        required=False,
    )
    
     
    class Meta:
        model = DiversidadSexual
        fields = '__all__'
    
    def create(self, validated_data):
        # Extracción de campos de la petición JSON
        id_persona = validated_data.pop('id_persona')
        respuestas_cambio_documento = validated_data.pop('respuestas_cambio_documento', [])
        orientaciones_sexuales = validated_data.pop('orientaciones_sexuales', [])
        expresiones_de_genero = validated_data.pop('expresiones_de_genero', [])
        pronombres = validated_data.pop('pronombres', [])
        identidades_de_genero = validated_data.pop('identidades_de_genero', [])
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        # Creación del objeto DiversidadSexual
        diversidad_sexual = DiversidadSexual.objects.create(id_persona=persona, **validated_data)
        
        # RespuestaCambioDocumento
        for nombre_respuesta_cambio_documento in respuestas_cambio_documento:
            respuesta_cambio_documento, _ = RespuestaCambioDocumento.objects.get_or_create(nombre_respuesta_cambio_documento=nombre_respuesta_cambio_documento)
            diversidad_sexual.respuestas_cambio_documento.add(respuesta_cambio_documento) 
        
        # OrientacionSexual
        for nombre_orientacion_sexual in orientaciones_sexuales:
            orientacion_sexual, _ = OrientacionSexual.objects.get_or_create(nombre_orientacion_sexual=nombre_orientacion_sexual)
            diversidad_sexual.orientaciones_sexuales.add(orientacion_sexual) 
        
       # ExpresionGenero
        for nombre_expresion_genero in expresiones_de_genero:
            expresion_genero, _ = ExpresionGenero.objects.get_or_create(nombre_expresion_genero=nombre_expresion_genero)
            diversidad_sexual.expresiones_de_genero.add(expresion_genero) 
        
        # IdentidadGenero
        for nombre_identidad_genero in identidades_de_genero:
            identidad_genero, _ = IdentidadGenero.objects.get_or_create(nombre_identidad_genero=nombre_identidad_genero)
            diversidad_sexual.identidades_de_genero.add(identidad_genero)
            
        # Pronombre
        for pronombre in pronombres:
            pronombres, _ = Pronombre.objects.get_or_create(nombre_pronombre=pronombre)
            diversidad_sexual.pronombres.add(pronombres)
        
        return diversidad_sexual 
    
    def update(self, instance, validated_data):
        respuestas_cambio_documento = validated_data.pop('respuestas_cambio_documento', [])
        orientaciones_sexuales = validated_data.pop('orientaciones_sexuales', [])
        expresiones_de_genero = validated_data.pop('expresiones_de_genero', [])
        identidades_de_genero = validated_data.pop('identidades_de_genero', [])
        pronombres = validated_data.pop('pronombres', [])
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # RespuestaCambioDocumento
        if respuestas_cambio_documento:
            instance.respuestas_cambio_documento.clear()
            for nombre_respuesta_cambio_documento in respuestas_cambio_documento:
                respuesta_cambio_documento, _ = RespuestaCambioDocumento.objects.get_or_create(nombre_respuesta_cambio_documento=nombre_respuesta_cambio_documento)
                instance.respuestas_cambio_documento.add(respuesta_cambio_documento)
        
        # OrientacionSexual
        if orientaciones_sexuales:
            instance.orientaciones_sexuales.clear()
            for nombre_orientacion_sexual in orientaciones_sexuales:
                orientacion_sexual, _ = OrientacionSexual.objects.get_or_create(nombre_orientacion_sexual=nombre_orientacion_sexual)
                instance.orientaciones_sexuales.add(orientacion_sexual)
        
        # ExpresionGenero
        if expresiones_de_genero:
            instance.expresiones_de_genero.clear()
            for nombre_expresion_genero in expresiones_de_genero:
                expresion_genero, _ = ExpresionGenero.objects.get_or_create(nombre_expresion_genero=nombre_expresion_genero)
                instance.expresiones_de_genero.add(expresion_genero)
        
        # IdentidadGenero
        if identidades_de_genero:
            instance.identidades_de_genero.clear()
            for nombre_identidad_genero in identidades_de_genero:
                identidad_genero, _ = IdentidadGenero.objects.get_or_create(nombre_identidad_genero=nombre_identidad_genero)
                instance.identidades_de_genero.add(identidad_genero)
        
        # Pronombre
        if pronombres:
            instance.pronombres.clear()
            for nombre_pronombre in pronombres:
                pronombre, _ = Pronombre.objects.get_or_create(nombre_pronombre=nombre_pronombre)
                instance.pronombres.add(pronombre)
        
        return super().update(instance, validated_data)