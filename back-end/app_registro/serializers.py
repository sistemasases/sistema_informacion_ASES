from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import Persona, PertenenciaGrupoPoblacional, TipoDocumento
from app_diversidad_sexual.serializers import DiversidadSexualSerializer
from app_diversidad_sexual.models import DiversidadSexual
from app_diversidad_sexual.serializers import DiversidadSexualSerializer
from app_documentos_autorizacion.serializers import DocumentosAutorizacionSerializer
from app_informacion_academica.serializers import InformacionAcademicaSerializer
from app_informacion_general.serializers import InformacionGeneralSerializer
from app_seguimiento.serializers import SeguimientoSerializer
import requests
import os
import environ
env = environ.Env()
environ.Env.read_env()
class PertenenciaGrupoPoblacionalSerializer(serializers.ModelSerializer):
    nombre_grupo_poblacional = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = PertenenciaGrupoPoblacional
        fields = '__all__'

class TipoDocumentoSerializer(serializers.ModelSerializer):
    nombre_tipo_documento = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = TipoDocumento
        fields = '__all__'

class PertenenciaGrupoPoblacionalListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_grupo_poblacional
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_grupo_poblacional' in data:
            return data['nombre_grupo_poblacional'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class TipoDocumentoListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_tipo_documento
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_tipo_documento' in data:
            return data['nombre_tipo_documento'].strip()
        raise serializers.ValidationError('Invalid input format.')
        

class PersonaSerializer(serializers.ModelSerializer):
    
    # diversidad_sexual = serializers.SerializerMethodField()
    # def get_diversidad_sexual(self, obj):
    #     try:
    #         diversidad_sexual_instance = DiversidadSexual.objects.get(id_persona_id=obj.id_persona)
    #         serializer = DiversidadSexualSerializer(diversidad_sexual_instance)  
    #         return serializer.data
    #     except DiversidadSexual.DoesNotExist:
    #         return []
    
    diversidad_sexual = DiversidadSexualSerializer(required=False)
    informacion_academica = InformacionAcademicaSerializer(required=False)
    informacion_general = InformacionGeneralSerializer(required=False)
    documentos_autorizacion = DocumentosAutorizacionSerializer(required=False)
    seguimientos = SeguimientoSerializer(many=True, required=False)
    
    ciudad_nacimiento = serializers.CharField(max_length=100, default="Ciudad no especificada", required=False)
    municipio_nacimiento = serializers.CharField(max_length=100, default="Municipio no especificado", required=False)
    corregimiento_nacimiento = serializers.CharField(max_length=100, default="Corregimiento no especificado", required=False)
    ciudad_residencia = serializers.CharField(max_length=100, default="Ciudad no especificada", required=False)
    municipio_residencia = serializers.CharField(max_length=100, default="Municipio no especificado", required=False)
    corregimiento_residencia = serializers.CharField(max_length=100, default="Corregimiento no especificado", required=False)
    
    pertenencia_grupo_poblacional = PertenenciaGrupoPoblacionalListingField(
        many=True, 
        queryset=PertenenciaGrupoPoblacional.objects.all(),
        required=False, 
        )
    tipo_documento = TipoDocumentoListingField(
        many=True, 
        queryset=TipoDocumento.objects.all(),
        required=False, 
        )
    # pertenencia_grupo_poblacional = PertenenciaGrupoPoblacionalSerializer(many=True, required=False)
    # pertenencia_grupo_poblacional = serializers.ListField(
    #     child=serializers.CharField(max_length=300),
    #     write_only=True #! Sin este campo aparecen errores
    # ) 
    recaptchaToken = serializers.CharField(required=True)  # Aquí es obligatorio
    class Meta:
        model = Persona
        fields = '__all__'
    def validate_recaptchaToken(self, value):
            # Verifica el token de reCAPTCHA con el endpoint de Google
            secret_key = os.environ.get('RECAPTCHA_SECRET_KEY')
            response = requests.post(
                'https://www.google.com/recaptcha/api/siteverify',
                data={
                    'secret': secret_key,
                    'response': value
                }
            )
            result = response.json()
            print("reCAPTCHA verification result:", result)
            if not result.get('success'):
                raise serializers.ValidationError('Invalid reCAPTCHA token.')
            return value

    def create(self, validated_data):
        
        pertenencia_grupo_poblacional_names = validated_data.pop('pertenencia_grupo_poblacional',[]) 

        tipo_documento_names = validated_data.pop('tipo_documento',[]) 
        
        recaptcha_token = validated_data.pop('recaptchaToken')  # Obtén el token de reCAPTCHA

        persona = Persona.objects.create(**validated_data) 
        print(pertenencia_grupo_poblacional_names)
        
        for pertenencia_grupo_poblacional_name in pertenencia_grupo_poblacional_names:  
            try: 
                pertenencia_grupo_poblacional = PertenenciaGrupoPoblacional.objects.get (nombre_grupo_poblacional=pertenencia_grupo_poblacional_name.strip()) 
            except PertenenciaGrupoPoblacional.DoesNotExist: 
                pertenencia_grupo_poblacional = PertenenciaGrupoPoblacional.objects.create(nombre_grupo_poblacional=pertenencia_grupo_poblacional_name.strip())    
            persona.pertenencia_grupo_poblacional.add(pertenencia_grupo_poblacional)
        
        for tipo_documento_name in tipo_documento_names:  
            try: 
                tipo_documento = TipoDocumento.objects.get (nombre_tipo_documento=tipo_documento_name.strip()) 
            except TipoDocumento.DoesNotExist: 
                tipo_documento = TipoDocumento.objects.create(nombre_tipo_documento=tipo_documento_name.strip())    
            persona.tipo_documento.add(tipo_documento)
         
        return persona
        
    def update(self, instance, validated_data):
        pertenencia_grupo_poblacional = validated_data.pop('pertenencia_grupo_poblacional',[])
        tipo_documento = validated_data.pop('tipo_documento',[])
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # RespuestaCambioDocumento
        if pertenencia_grupo_poblacional:
            instance.pertenencia_grupo_poblacional.clear()
            for nombre_grupo_poblacional in pertenencia_grupo_poblacional:
                estamento = PertenenciaGrupoPoblacional.objects.filter(nombre_grupo_poblacional=nombre_grupo_poblacional).first()
                if not estamento:
                    raise NotFound(detail=f'The grupo poblacional "{nombre_grupo_poblacional}" don\'t exist', code=404)  
                instance.pertenencia_grupo_poblacional.add(estamento)


        if tipo_documento:
            instance.tipo_documento.clear()
            for nombre_tipo_documento in tipo_documento:
                estamento = TipoDocumento.objects.filter(nombre_tipo_documento=nombre_tipo_documento).first()
                if not estamento:
                    raise NotFound(detail=f'The tipo documento "{nombre_tipo_documento}" don\'t exist', code=404)  
                instance.tipo_documento.add(estamento)
                
        return super().update(instance, validated_data) 
    
