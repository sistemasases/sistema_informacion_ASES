from rest_framework import serializers
from rest_framework.exceptions import NotFound
from .models import Persona, PertenenciaGrupoPoblacional, TipoDocumento, EstadoCivil, ZonaResidencia, IdentidadEtnicoRacial, SexoAsignado
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

class EstadoCivilSerializer(serializers.ModelSerializer):
    nombre_estado_civil = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = EstadoCivil
        fields = '__all__'

class ZonaResidenciaSerializer(serializers.ModelSerializer):
    nombre_zona_residencia = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = ZonaResidencia
        fields = '__all__'

class IdentidadEtnicoRacialSerializer(serializers.ModelSerializer):
    nombre_identidad_etnico_racial = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = IdentidadEtnicoRacial
        fields = '__all__'

class SexoAsignadoSerializer(serializers.ModelSerializer):
    nombre_sexo_asignado = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = SexoAsignado
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
    
class ZonaResidenciaListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_zona_residencia
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_zona_residencia' in data:
            return data['nombre_zona_residencia'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class EstadoCivilListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_estado_civil
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_estado_civil' in data:
            return data['nombre_estado_civil'].strip()
        raise serializers.ValidationError('Invalid input format.')
    

class IdentidadEtnicoRacialListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_identidad_etnico_racial
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_identidad_etnico_racial' in data:
            return data['nombre_identidad_etnico_racial'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class SexoAsignadoListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_sexo_asignado
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict) and 'nombre_sexo_asignado' in data:
            return data['nombre_sexo_asignado'].strip()
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
    zona_residencia = ZonaResidenciaListingField(
        many=True, 
        queryset=ZonaResidencia.objects.all(),
        required=False, 
        )
    estado_civil = EstadoCivilListingField(
        many=True, 
        queryset=EstadoCivil.objects.all(),
        required=False, 
        )
    identidad_etnico_racial = IdentidadEtnicoRacialListingField(
        many=True, 
        queryset=IdentidadEtnicoRacial.objects.all(),
        required=False, 
        )
    sexo_asignado = SexoAsignadoListingField(
        many=True, 
        queryset=SexoAsignado.objects.all(),
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
                'https://api.hcaptcha.com/siteverify',
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
        zona_residencia_names = validated_data.pop('zona_residencia',[])
        estado_civil_names = validated_data.pop('estado_civil',[])
        identidad_etnico_racial_names = validated_data.pop('identidad_etnico_racial',[]) 
        sexo_asignado_names = validated_data.pop('sexo_asignado',[]) 
                
        
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

        for zona_residencia_name in zona_residencia_names:  
            try: 
                zona_residencia = ZonaResidencia.objects.get (nombre_zona_residencia=zona_residencia_name.strip()) 
            except ZonaResidencia.DoesNotExist: 
                zona_residencia = ZonaResidencia.objects.create(nombre_zona_residencia=zona_residencia_name.strip())    
            persona.zona_residencia.add(zona_residencia)
        
        for estado_civil_name in estado_civil_names:  
            try: 
                estado_civil = EstadoCivil.objects.get (nombre_estado_civil=estado_civil_name.strip()) 
            except EstadoCivil.DoesNotExist: 
                estado_civil = EstadoCivil.objects.create(nombre_estado_civil=estado_civil_name.strip())    
            persona.estado_civil.add(estado_civil)

        for identidad_etnico_racial_name in identidad_etnico_racial_names:  
            try: 
                identidad_etnico_racial = IdentidadEtnicoRacial.objects.get (nombre_identidad_etnico_racial=identidad_etnico_racial_name.strip()) 
            except IdentidadEtnicoRacial.DoesNotExist: 
                identidad_etnico_racial = IdentidadEtnicoRacial.objects.create(nombre_identidad_etnico_racial=identidad_etnico_racial_name.strip())    
            persona.identidad_etnico_racial.add(identidad_etnico_racial)
        
        for sexo_asignado_name in sexo_asignado_names:  
            try: 
                sexo_asignado = SexoAsignado.objects.get (nombre_sexo_asignado=sexo_asignado_name.strip()) 
            except SexoAsignado.DoesNotExist: 
                sexo_asignado = SexoAsignado.objects.create(nombre_sexo_asignado=sexo_asignado_name.strip())    
            persona.sexo_asignado.add(sexo_asignado)
         
        return persona
        
    def update(self, instance, validated_data):
        pertenencia_grupo_poblacional = validated_data.pop('pertenencia_grupo_poblacional',[])
        tipo_documento = validated_data.pop('tipo_documento',[])
        zona_residencia = validated_data.pop('zona_residencia',[])
        estado_civil = validated_data.pop('estado_civil',[])
        identidad_etnico_racial = validated_data.pop('identidad_etnico_racial',[])
        sexo_asignado = validated_data.pop('sexo_asignado',[]) 
        
        
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

        if zona_residencia:
            instance.zona_residencia.clear()
            for nombre_zona_residencia in zona_residencia:
                estamento = ZonaResidencia.objects.filter(nombre_zona_residencia=nombre_zona_residencia).first()
                if not estamento:
                    raise NotFound(detail=f'The zona de residencia "{nombre_zona_residencia}" don\'t exist', code=404)  
                instance.zona_residencia.add(estamento)
        
        if estado_civil:
            instance.estado_civil.clear()
            for nombre_estado_civil in estado_civil:
                estamento = EstadoCivil.objects.filter(nombre_estado_civil=nombre_estado_civil).first()
                if not estamento:
                    raise NotFound(detail=f'The estado civil "{nombre_estado_civil}" don\'t exist', code=404)  
                instance.estado_civil.add(estamento)

        if identidad_etnico_racial:
            instance.identidad_etnico_racial.clear()
            for nombre_identidad_etnico_racial in identidad_etnico_racial:
                estamento = IdentidadEtnicoRacial.objects.filter(nombre_identidad_etnico_racial=nombre_identidad_etnico_racial).first()
                if not estamento:
                    raise NotFound(detail=f'The identidad etnico racial "{nombre_identidad_etnico_racial}" don\'t exist', code=404)  
                instance.identidad_etnico_racial.add(estamento)

        if sexo_asignado:
            instance.sexo_asignado.clear()
            for nombre_sexo_asignado in sexo_asignado:
                estamento = SexoAsignado.objects.filter(nombre_sexo_asignado=nombre_sexo_asignado).first()
                if not estamento:
                    raise NotFound(detail=f'The sexo asignado "{nombre_sexo_asignado}" don\'t exist', code=404)  
                instance.sexo_asignado.add(estamento)
                
        return super().update(instance, validated_data) 
    
