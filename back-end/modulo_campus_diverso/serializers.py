"""
Autor: Juan D. Gil T.
Correo: juan.gil.trujillo@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-07-08
Descripción: Este código importa los serializadores de 'Django' 'rest_framework' y los modelos de modulo_campus_diverso.
Los cuales se utilizan para serializar los datos de los modelos correspondientes, y por ende dinamizar las peticiones HTTP.
La clase 'Meta' se define en cada serializador y especifica el modelo y los campos a incluir en la serialización.  
"""

from rest_framework import serializers
from modulo_campus_diverso.models import *



# ====================== Módulo Diversidad Sexual ====================== #

class RespuestaCambioDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_respuesta_cambio_documento
        fields = '__all__'

class OrientacionSexualSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_orientacion_sexual
        fields = '__all__'

class ExpresionGeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_expresion_genero
        fields = '__all__'

class IdentidadGeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_identidad_genero
        fields = '__all__'

class PronombreSerializer(serializers.ModelSerializer):
    nombre_pronombre = serializers.CharField(max_length=50, required=True)
    
    class Meta:
        model = campus_diverso_pronombre
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
        queryset= campus_diverso_respuesta_cambio_documento.objects.all(),
        required=False,
    )
    
    orientaciones_sexuales = OrientacionSexualListingField(
        many=True,
        queryset= campus_diverso_orientacion_sexual.objects.all(),
        required=False,
    )

    expresiones_de_genero = ExpresionGeneroListingField(
        many=True,
        queryset=campus_diverso_expresion_genero.objects.all(),
        required=False,
    )
    
    identidades_de_genero = IdentidadGeneroListingField(
        many=True,
        queryset=campus_diverso_identidad_genero.objects.all(),
        required=False,
    )
    
    pronombres = PronombreListingField(
        many=True,
        queryset=campus_diverso_pronombre.objects.all(),
        required=False,
    )
    
     
    class Meta:
        model = campus_diverso_diversidad_sexual
        fields = '__all__'
    
    def create(self, validated_data):
        # Extracción de campos de la petición JSON
        id_persona = validated_data.pop('id_persona')
        respuestas_cambio_documento = validated_data.pop('respuestas_cambio_documento')
        orientaciones_sexuales = validated_data.pop('orientaciones_sexuales')
        expresiones_de_genero = validated_data.pop('expresiones_de_genero')
        pronombres = validated_data.pop('pronombres', [])
        identidades_de_genero = validated_data.pop('identidades_de_genero')
        
        persona = campus_diverso_persona.objects.get(numero_documento=id_persona) #! Así son más fáciles las consultas
        
        # Creación del objeto DiversidadSexual
        diversidad_sexual = campus_diverso_diversidad_sexual.objects.create(id_persona=persona, **validated_data)
        
        # RespuestaCambioDocumento
        for nombre_respuesta_cambio_documento in respuestas_cambio_documento:
            respuesta_cambio_documento, _ = campus_diverso_respuesta_cambio_documento.objects.get_or_create(nombre_respuesta_cambio_documento=nombre_respuesta_cambio_documento)
            diversidad_sexual.respuestas_cambio_documento.add(respuesta_cambio_documento) 
        
        # OrientacionSexual
        for nombre_orientacion_sexual in orientaciones_sexuales:
            orientacion_sexual, _ = campus_diverso_orientacion_sexual.objects.get_or_create(nombre_orientacion_sexual=nombre_orientacion_sexual)
            diversidad_sexual.orientaciones_sexuales.add(orientacion_sexual) 
        
       # ExpresionGenero
        for nombre_expresion_genero in expresiones_de_genero:
            expresion_genero, _ = campus_diverso_expresion_genero.objects.get_or_create(nombre_expresion_genero=nombre_expresion_genero)
            diversidad_sexual.expresiones_de_genero.add(expresion_genero) 
        
        # IdentidadGenero
        for nombre_identidad_genero in identidades_de_genero:
            identidad_genero, _ = campus_diverso_identidad_genero.objects.get_or_create(nombre_identidad_genero=nombre_identidad_genero)
            diversidad_sexual.identidades_de_genero.add(identidad_genero)
            
        # Pronombre
        for pronombre in pronombres:
            pronombres, _ = campus_diverso_pronombre.objects.get_or_create(nombre_pronombre=pronombre)
            diversidad_sexual.pronombres.add(pronombres)
        
        return diversidad_sexual 











# ====================== Módulo Información General ====================== #
  
  
class FuenteIngresosSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_fuente_ingresos
        fields = '__all__'

class OcupacionActualSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_ocupacion_actual
        fields = '__all__' 

class ActividadTiempoLibreSerializer(serializers.ModelSerializer): 
    class Meta:
        model = campus_diverso_actividad_tiempo_libre
        fields = "__all__"

class ConvivenciaViviendaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = campus_diverso_convivencia_vivienda
        fields = "__all__"
        
class RedApoyoSerializer(serializers.ModelSerializer): 
    class Meta:
        model = campus_diverso_red_apoyo
        fields = "__all__"
        
class FactorRiesgoSerializer(serializers.ModelSerializer): 
    class Meta:
        model = campus_diverso_factor_riesgo
        fields = "__all__"

class AcompañamientoRecibidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_acompañamiento_recibido
        fields = "__all__"    

# ListingField
class OcupacionActualListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_ocupacion_actual
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_ocupacion_actual'].strip()
        raise serializers.ValidationError('Invalid input format.')


class ActividadTiempoLibreListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            'nombre_actividad_tiempo_libre': value.nombre_actividad_tiempo_libre,
            'observacion_actividad_tiempo_libre': value.observacion_actividad_tiempo_libre
        }

    def to_internal_value(self, data):
        if isinstance(data, dict):
            nombre_actividad = data.get('nombre_actividad_tiempo_libre', '').strip()
            observacion_actividad = data.get('observacion_actividad_tiempo_libre', '').strip()
            return {
                'nombre_actividad_tiempo_libre': nombre_actividad,
                'observacion_actividad_tiempo_libre': observacion_actividad
            }
        raise serializers.ValidationError('Invalid input format.')


# Serializer Informacion General
class InformacionGeneralSerializer(serializers.ModelSerializer):

    id_persona = serializers.CharField(max_length=30, required=True) 
    
    ocupaciones_actuales = OcupacionActualListingField(
        many=True,
        queryset=campus_diverso_ocupacion_actual.objects.all(),
        required=False,
    )
    
    actividades_tiempo_libre = ActividadTiempoLibreSerializer(many=True, required=False,)
    fuentes_de_ingresos = FuenteIngresosSerializer(many=True, required=False,)
    convivencias_en_vivienda = ConvivenciaViviendaSerializer(many=True, required=False,)
    redes_de_apoyo = RedApoyoSerializer(many=True, required=False,)
    factores_de_riesgo = FactorRiesgoSerializer(many=True, required=False,)
    acompañamiento_recibido = AcompañamientoRecibidoSerializer(many=True, required=False,)
    
    class Meta:
        model = campus_diverso_informacion_general
        fields = '__all__'
    
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona',[])
        
        ocupaciones_actuales = validated_data.pop('ocupaciones_actuales',[])
        actividades_tiempo_libre = validated_data.pop('actividades_tiempo_libre',[])
        fuentes_de_ingresos = validated_data.pop('fuentes_de_ingresos',[])
        convivencias_en_vivienda = validated_data.pop('convivencias_en_vivienda',[])
        redes_de_apoyo = validated_data.pop('redes_de_apoyo',[])
        factores_de_riesgo = validated_data.pop('factores_de_riesgo',[])
        encuentro_dias_horas = validated_data.pop('encuentro_dias_horas',[])
        informacion_profesional = validated_data.pop('informacion_profesional', [])
        acompañamiento_recibido = validated_data.pop('acompañamiento_recibido', [])
        persona = campus_diverso_persona.objects.get(numero_documento=id_persona)
        
        informacion_general = campus_diverso_informacion_general.objects.create(id_persona=persona, **validated_data)
        
         # OcupacionActual
        for nombre_ocupacion_actual in ocupaciones_actuales:
            ocupacion_actual, _ = campus_diverso_ocupacion_actual.objects.get_or_create(nombre_ocupacion_actual=nombre_ocupacion_actual)
            informacion_general.ocupaciones_actuales.add(ocupacion_actual)
         
        # ActividadTiempoLibre    
        for actividad_tiempo_libre_data in actividades_tiempo_libre: 
            campus_diverso_actividad_tiempo_libre.objects.create(id_informacion_general=informacion_general,**actividad_tiempo_libre_data)
        
        # FuenteIngresos
        for fuente_ingreso_data in fuentes_de_ingresos:
            campus_diverso_fuente_ingresos.objects.create(id_informacion_general=informacion_general, **fuente_ingreso_data)
            
        # ConvivenciaVivienda
        for convivencia_vivienda_data in convivencias_en_vivienda:
            campus_diverso_convivencia_vivienda.objects.create(id_informacion_general=informacion_general, **convivencia_vivienda_data)
        
        # RedApoyo
        for red_apoyo_data in redes_de_apoyo:
            campus_diverso_red_apoyo.objects.create(id_informacion_general=informacion_general, **red_apoyo_data)
            
        # FactorRiesgo
        for factor_riesgo_data in factores_de_riesgo:
            campus_diverso_factor_riesgo.objects.create(id_informacion_general=informacion_general, **factor_riesgo_data)
            
        # EncuentroDiaHora

        for acompañamiento_recibido_data in acompañamiento_recibido:
             campus_diverso_acompañamiento_recibido.objects.create(id_informacion_general=informacion_general, **acompañamiento_recibido_data)
             
        return informacion_general









# ====================== Módulo Información Académica ====================== # 

class EstamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = campus_diverso_estamento
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

class InformacionAcademicaSerializer(serializers.ModelSerializer):

    id_persona = serializers.CharField(max_length=30, required=True)
    estamentos = EstamentoListingField(
        many=True,
        queryset= campus_diverso_estamento.objects.all(),
        required=False,
    )
    
    class Meta:
        model = campus_diverso_informacion_academica
        fields = '__all__'
    
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona')
        
        estamentos = validated_data.pop('estamentos',[])
        
        persona = campus_diverso_persona.objects.get(numero_documento=id_persona)
        
        informacion_academica = campus_diverso_informacion_academica.objects.create(id_persona=persona, **validated_data)
        
        for nombre_estamento in estamentos:
            estamento,_ = campus_diverso_estamento.objects.get_or_create(nombre_estamento=nombre_estamento)
            informacion_academica.estamentos.add(estamento)
        
        return informacion_academica
        
    
    







# ====================== Módulo Documentos Autorización ====================== # 

class DocumentosAutorizacionSerializer(serializers.ModelSerializer):
  
    id_persona = serializers.CharField(max_length=30, required=True)
  
    class Meta:
        model = campus_diverso_documentos_autorizacion
        fields = '__all__'
        
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona')
        
        persona = campus_diverso_persona.objects.get(numero_documento=id_persona)
        documentos_autorizacion = campus_diverso_documentos_autorizacion.objects.create(id_persona=persona, **validated_data)
        
        return documentos_autorizacion








# ====================== Módulo Seguimiento ====================== #   
class SeguimientoSerializer(serializers.ModelSerializer):
    id_persona = serializers.CharField(max_length=30, required=True)
    
    class Meta:
        model = campus_diverso_seguimiento
        fields = '__all__'
        
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona')
        
        persona = campus_diverso_persona.objects.get(numero_documento=id_persona)
        seguimiento = campus_diverso_seguimiento.objects.create(id_persona=persona, **validated_data)
        return seguimiento
      
      
      
      


# ====================== Módulo Persona ====================== #

class PertenenciaGrupoPoblacionalSerializer(serializers.ModelSerializer):
    nombre_grupo_poblacional = serializers.CharField(max_length=300, required=True)
    class Meta:
        model = campus_diverso_pertenencia_grupo_poblacional
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
    
    

class PersonaSerializer(serializers.ModelSerializer):
 
    DiversidadSexual = DiversidadSexualSerializer(required=False)
    InformacionAcademica = InformacionAcademicaSerializer(required=False)
    InformacionGeneral = InformacionGeneralSerializer(required=False)
    DocumentosAutorizacion = DocumentosAutorizacionSerializer(required=False)
    seguimientos = SeguimientoSerializer(many=True, required=False)
    
    ciudad_nacimiento = serializers.CharField(max_length=100, default="Ciudad no especificada", required=False)
    municipio_nacimiento = serializers.CharField(max_length=100, default="Municipio no especificado", required=False)
    corregimiento_nacimiento = serializers.CharField(max_length=100, default="Corregimiento no especificado", required=False)
    ciudad_residencia = serializers.CharField(max_length=100, default="Ciudad no especificada", required=False)
    municipio_residencia = serializers.CharField(max_length=100, default="Municipio no especificado", required=False)
    corregimiento_residencia = serializers.CharField(max_length=100, default="Corregimiento no especificado", required=False)
    
    pertenencia_grupo_poblacional = PertenenciaGrupoPoblacionalListingField(
        many=True, 
        queryset=campus_diverso_pertenencia_grupo_poblacional.objects.all(),
        required=False, 
        ) 
    
    class Meta:
        model = campus_diverso_persona
        fields = '__all__'
   

    def create(self, validated_data):
        
        pertenencia_grupo_poblacional_names = validated_data.pop('pertenencia_grupo_poblacional',[]) 
        persona = campus_diverso_persona.objects.create(**validated_data) 
        print(pertenencia_grupo_poblacional_names)
        
        for pertenencia_grupo_poblacional_name in pertenencia_grupo_poblacional_names:  
            try: 
                pertenencia_grupo_poblacional = campus_diverso_pertenencia_grupo_poblacional.objects.get (nombre_grupo_poblacional=pertenencia_grupo_poblacional_name.strip()) 
            except campus_diverso_pertenencia_grupo_poblacional.DoesNotExist: 
                pertenencia_grupo_poblacional = campus_diverso_pertenencia_grupo_poblacional.objects.create(nombre_grupo_poblacional=pertenencia_grupo_poblacional_name.strip())    
            persona.pertenencia_grupo_poblacional.add(pertenencia_grupo_poblacional)
         
        return persona