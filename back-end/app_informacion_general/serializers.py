from rest_framework import serializers
from rest_framework.exceptions import NotFound
from app_registro.models import Persona
from .models import InformacionGeneral, EncuentroDiaHora, FactoresRiesgo, ActividadesTiempoLibre, RedesApoyo, FuentesIngreso, RegimenEps, DecisionEncuentroInicial


class FactoresRiesgoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FactoresRiesgo
        fields = '__all__'

class ActividadesTiempoLibreSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadesTiempoLibre
        fields = '__all__'


class RedesApoyoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RedesApoyo
        fields = '__all__'

class RegimenEpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegimenEps
        fields = '__all__'

class DecisionEncuentroInicialSerializer(serializers.ModelSerializer):
    class Meta:
        model = DecisionEncuentroInicial
        fields = '__all__'
class FuentesIngresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuentesIngreso
        fields = '__all__'

class EncuentroDiaHoraSerializer(serializers.ModelSerializer): 
    class Meta:
        model = EncuentroDiaHora
        fields = "__all__"

#! Se utilizó esta clase para que excluya el campo id_informacion_general al momento de realizar la petición HTTP
class EncuentroDiaHoraGetSerializer(serializers.ModelSerializer): 
    class Meta:
        model = EncuentroDiaHora
        exclude = ['id_informacion_general']

# ListingField
class FactoresRiesgoListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_factor_de_riesgo
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_factor_de_riesgo'].strip()
        raise serializers.ValidationError('Invalid input format.')

class ActividadesTiempoLibreListingFields(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_actividad_de_tiempo_libre
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_actividad_de_tiempo_libre'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class RedesApoyoListingFields(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_red_de_apoyo
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_red_de_apoyo'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class RegimenEpsListingFields(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_regimen_eps
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_regimen_eps'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class DecisionEncuentroInicialListingFields(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_decision_encuentro_inicial
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_decision_encuentro_inicial'].strip()
        raise serializers.ValidationError('Invalid input format.')
    
class FuentesIngresoListingFields(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_fuente_de_ingreso
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_fuente_de_ingreso'].strip()
        raise serializers.ValidationError('Invalid input format.')

# Serializer Informacion General
class InformacionGeneralSerializer(serializers.ModelSerializer):

    id_persona = serializers.CharField(max_length=30, required=True) 
   
    factores_riesgos = FactoresRiesgoListingField(
        many=True,
        queryset= FactoresRiesgo.objects.all(),
        required=False,
    )

    actividades_tiempo_libre = ActividadesTiempoLibreListingFields(
        many=True,
        queryset= ActividadesTiempoLibre.objects.all(),
        required=False,
    )

    fuentes_ingresos = FuentesIngresoListingFields(
        many=True,
        queryset= FuentesIngreso.objects.all(),
        required=False,
    )

    redes_apoyo = RedesApoyoListingFields(
        many=True,
        queryset= RedesApoyo.objects.all(),
        required=False,
    )

    regimen_eps = RegimenEpsListingFields(
        many=True,
        queryset= RegimenEps.objects.all(),
        required=False,
    )
    
    decision_encuentro_inicial = DecisionEncuentroInicialListingFields(
        many=True,
        queryset= DecisionEncuentroInicial.objects.all(),
        required=False,
    )

    encuentro_dias_horas = EncuentroDiaHoraGetSerializer(many=True)
    
    class Meta:
        model = InformacionGeneral
        fields = '__all__'
    
    def create(self, validated_data):
        
        id_persona = validated_data.pop('id_persona',None)
        
        factores_riesgos = validated_data.pop('factores_riesgos', [])
        actividades_tiempo_libre = validated_data.pop('actividades_tiempo_libre', [])
        fuentes_ingresos = validated_data.pop('fuentes_ingresos', [])
        redes_apoyo = validated_data.pop('redes_apoyo', [])
        regimen_eps = validated_data.pop('regimen_eps', [])
        decision_encuentro_inicial = validated_data.pop('decision_encuentro_inicial', [])

        encuentro_dias_horas = validated_data.pop('encuentro_dias_horas',[])
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        informacion_general = InformacionGeneral.objects.create(id_persona=persona, **validated_data)
        
         # Factor de riesgo
        for nombre_factor_de_riesgo in factores_riesgos:
            factores_riesgos, _ = FactoresRiesgo.objects.get_or_create(nombre_factor_de_riesgo=nombre_factor_de_riesgo)
            informacion_general.factores_riesgos.add(factores_riesgos) 

         # Actividades tiempo libre
        for nombre_actividad_de_tiempo_libre in actividades_tiempo_libre:
            actividades_tiempo_libre, _ = ActividadesTiempoLibre.objects.get_or_create(nombre_actividad_de_tiempo_libre=nombre_actividad_de_tiempo_libre)
            informacion_general.actividades_tiempo_libre.add(actividades_tiempo_libre) 
        
         # Fuentes de ingresos
        for nombre_fuente_de_ingreso in fuentes_ingresos:
            fuentes_ingresos, _ = FuentesIngreso.objects.get_or_create(nombre_fuente_de_ingreso=nombre_fuente_de_ingreso)
            informacion_general.fuentes_ingresos.add(fuentes_ingresos) 

         # Redes de apoyo
        for nombre_red_de_apoyo in redes_apoyo:
            redes_apoyo, _ = RedesApoyo.objects.get_or_create(nombre_red_de_apoyo=nombre_red_de_apoyo)
            informacion_general.redes_apoyo.add(redes_apoyo) 

         # Regimen EPS
        for nombre_regimen_eps in regimen_eps:
            regimen_eps, _ = RegimenEps.objects.get_or_create(nombre_regimen_eps=nombre_regimen_eps)
            informacion_general.regimen_eps.add(regimen_eps) 
   
     # Rencuentro inicial
        for nombre_decision_encuentro_inicial in decision_encuentro_inicial:
            decision_encuentro_inicial, _ = DecisionEncuentroInicial.objects.get_or_create(nombre_decision_encuentro_inicial=nombre_decision_encuentro_inicial)
            informacion_general.decision_encuentro_inicial.add(decision_encuentro_inicial) 
        # EncuentroDiaHora
        for encuentro_dia_hora_data in encuentro_dias_horas:
            encuentro_dia_hora = EncuentroDiaHora.objects.filter(**encuentro_dia_hora_data).first()
            if not encuentro_dia_hora:
                encuentro_dia_hora = EncuentroDiaHora.objects.create(**encuentro_dia_hora_data)
            informacion_general.encuentro_dias_horas.add(encuentro_dia_hora)
         
        return informacion_general
    

    def update(self, instance, validated_data):
        print(f"instance: {instance.id_informacion_general}")
        
        factores_riesgos = validated_data.pop('factores_riesgos', [])
        actividades_tiempo_libre = validated_data.pop('actividades_tiempo_libre', [])
        fuentes_ingresos = validated_data.pop('fuentes_ingresos', [])
        redes_apoyo = validated_data.pop('redes_apoyo', [])
        regimen_eps = validated_data.pop('regimen_eps', [])
        decision_encuentro_inicial = validated_data.pop('regimen_eps', [])

        
        # Actualizar los atributos de InformacionGeneral
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Factores de riesgo
        if factores_riesgos:
            instance.factores_riesgos.clear()
            for nombre_factor_de_riesgo in factores_riesgos:
                factores_riesgos, _ = FactoresRiesgo.objects.get_or_create(nombre_factor_de_riesgo=nombre_factor_de_riesgo)
                instance.factores_riesgos.add(factores_riesgos)

        # Actividades de tiempo libre
        if actividades_tiempo_libre:
            instance.actividades_tiempo_libre.clear()
            for nombre_actividad_de_tiempo_libre in actividades_tiempo_libre:
                actividades_tiempo_libre, _ = ActividadesTiempoLibre.objects.get_or_create(nombre_actividad_de_tiempo_libre=nombre_actividad_de_tiempo_libre)
                instance.actividades_tiempo_libre.add(actividades_tiempo_libre)
        
        # Redes de apoyo
        if redes_apoyo:
            instance.redes_apoyo.clear()
            for nombre_red_de_apoyo in redes_apoyo:
                redes_apoyo, _ = RedesApoyo.objects.get_or_create(nombre_red_de_apoyo=nombre_red_de_apoyo)
                instance.redes_apoyo.add(redes_apoyo)

        if regimen_eps:
            instance.regimen_eps.clear()
            for nombre_regimen_eps in regimen_eps:
                regimen_eps, _ = RegimenEps.objects.get_or_create(nombre_regimen_eps=nombre_regimen_eps)
                instance.regimen_eps.add(regimen_eps)

        if decision_encuentro_inicial:
            instance.nombre_decision_encuentro_inicial.clear()
            for nombre_decision_encuentro_inicial in nombre_decision_encuentro_inicial:
                decision_encuentro_inicial, _ = DecisionEncuentroInicial.objects.get_or_create(nombre_decision_encuentro_inicial=nombre_decision_encuentro_inicial)
                instance.decision_encuentro_inicial.add(decision_encuentro_inicial)
       
        # Fuentes de ingresos
        if fuentes_ingresos:
            instance.fuentes_ingresos.clear()
            for nombre_fuente_de_ingreso in fuentes_ingresos:
                fuentes_ingresos, _ = FuentesIngreso.objects.get_or_create(nombre_fuente_de_ingreso=nombre_fuente_de_ingreso)
                instance.fuentes_ingresos.add(fuentes_ingresos)
       

        return super().update(instance, validated_data)