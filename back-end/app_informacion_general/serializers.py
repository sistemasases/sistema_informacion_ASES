from rest_framework import serializers
from rest_framework.exceptions import NotFound
from app_registro.models import Persona
from .models import InformacionGeneral, OcupacionActual, AcompanamientoRecibido, ProfesionalQueBrindoAtencion, ActividadTiempoLibre, FuenteIngresos, ConvivenciaVivienda, RedApoyo, FactorRiesgo, EncuentroDiaHora

class FuenteIngresosSerializer(serializers.ModelSerializer):
    id_fuente_ingresos = serializers.IntegerField(required=False)
    class Meta:
        model = FuenteIngresos
        fields = '__all__'

class OcupacionActualSerializer(serializers.ModelSerializer):
    class Meta:
        model = OcupacionActual
        fields = '__all__' 

class AcompanamientoRecibidoSerializer(serializers.ModelSerializer):
    id_acompanamiento_recibido = serializers.IntegerField(required=False)
    class Meta:
        model = AcompanamientoRecibido
        fields = '__all__'

class ProfesionalQueBrindoAtencionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesionalQueBrindoAtencion
        fields = '__all__'

class ActividadTiempoLibreSerializer(serializers.ModelSerializer): 
    id_actividad_tiempo_libre = serializers.IntegerField(required=False)
    class Meta:
        model = ActividadTiempoLibre
        fields = "__all__"

class ConvivenciaViviendaSerializer(serializers.ModelSerializer): 
    id_convivencia_vivienda = serializers.IntegerField(required=False)
    class Meta:
        model = ConvivenciaVivienda
        fields = "__all__"
        
class RedApoyoSerializer(serializers.ModelSerializer): 
    id_red_apoyo = serializers.IntegerField(required=False)
    class Meta:
        model = RedApoyo
        fields = "__all__"
        
class FactorRiesgoSerializer(serializers.ModelSerializer): 
    id_factor_riesgo = serializers.IntegerField(required=False)
    class Meta:
        model = FactorRiesgo
        fields = "__all__"

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
class OcupacionActualListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_ocupacion_actual
   
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_ocupacion_actual'].strip()
        raise serializers.ValidationError('Invalid input format.')

class ProfesionalQueBrindoAtencionListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.nombre_profesional_que_brindo_atencion
    
    def to_internal_value(self, data):
        if isinstance(data, str):
            return data.strip()
        elif isinstance(data, dict):
            return data['nombre_profesional_que_brindo_atencion'].strip()
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
        queryset=OcupacionActual.objects.all(),
        required=False,
    )

    profesionales_que_brindo_atencion = ProfesionalQueBrindoAtencionListingField(
        many=True,
        queryset=ProfesionalQueBrindoAtencion.objects.all(),
        required=False,
    )
    
    acompanamientos_recibido = AcompanamientoRecibidoSerializer(many=True)
    actividades_tiempo_libre = ActividadTiempoLibreSerializer(many=True)
    fuentes_de_ingresos = FuenteIngresosSerializer(many=True)
    convivencias_en_vivienda = ConvivenciaViviendaSerializer(many=True)
    redes_de_apoyo = RedApoyoSerializer(many=True)
    factores_de_riesgo = FactorRiesgoSerializer(many=True)
    encuentro_dias_horas = EncuentroDiaHoraGetSerializer(many=True)
    
    class Meta:
        model = InformacionGeneral
        fields = '__all__'
    
    def create(self, validated_data):
        id_persona = validated_data.pop('id_persona',None)
        
        ocupaciones_actuales = validated_data.pop('ocupaciones_actuales',[])
        profesionales_que_brindo_atencion = validated_data.pop('profesionales_que_brindo_atencion',[])
        acompanamientos_recibido = validated_data.pop('acompanamientos_recibido',[])
        actividades_tiempo_libre = validated_data.pop('actividades_tiempo_libre',[])
        fuentes_de_ingresos = validated_data.pop('fuentes_de_ingresos',[])
        convivencias_en_vivienda = validated_data.pop('convivencias_en_vivienda',[])
        redes_de_apoyo = validated_data.pop('redes_de_apoyo',[])
        factores_de_riesgo = validated_data.pop('factores_de_riesgo',[])
        encuentro_dias_horas = validated_data.pop('encuentro_dias_horas',[])
        
        persona = Persona.objects.filter(numero_documento=id_persona).first()
        if not persona:
            raise NotFound(detail=f"The id_persona {id_persona} don't exist", code=404)
        
        informacion_general = InformacionGeneral.objects.create(id_persona=persona, **validated_data)
        
         # OcupacionActual
        for nombre_ocupacion_actual in ocupaciones_actuales:
            ocupacion_actual, _ = OcupacionActual.objects.get_or_create(nombre_ocupacion_actual=nombre_ocupacion_actual)
            informacion_general.ocupaciones_actuales.add(ocupacion_actual)
        
        # ProfesionalQueBrindoAtencion
        for nombre_profesional_que_brindo_atencion in profesionales_que_brindo_atencion:
            profesional_que_brindo_atencion, _ = ProfesionalQueBrindoAtencion.objects.get_or_create(nombre_profesional_que_brindo_atencion=nombre_profesional_que_brindo_atencion)
            informacion_general.profesionales_que_brindo_atencion.add(profesional_que_brindo_atencion)
        
        # AcompanamientoRecibido
        for acompanamiento_recibido in acompanamientos_recibido:
            AcompanamientoRecibido.objects.create(id_informacion_general=informacion_general, **acompanamiento_recibido)
        
        # ActividadTiempoLibre    
        for actividad_tiempo_libre_data in actividades_tiempo_libre: 
            ActividadTiempoLibre.objects.create(id_informacion_general=informacion_general,**actividad_tiempo_libre_data)
        
        # FuenteIngresos
        for fuente_ingreso_data in fuentes_de_ingresos:
            FuenteIngresos.objects.create(id_informacion_general=informacion_general, **fuente_ingreso_data)
            
        # ConvivenciaVivienda
        for convivencia_vivienda_data in convivencias_en_vivienda:
            ConvivenciaVivienda.objects.create(id_informacion_general=informacion_general, **convivencia_vivienda_data)
        
        # RedApoyo
        for red_apoyo_data in redes_de_apoyo:
            RedApoyo.objects.create(id_informacion_general=informacion_general, **red_apoyo_data)
            
        # FactorRiesgo
        for factor_riesgo_data in factores_de_riesgo:
            FactorRiesgo.objects.create(id_informacion_general=informacion_general, **factor_riesgo_data)
            
        # EncuentroDiaHora
        for encuentro_dia_hora_data in encuentro_dias_horas:
            # EncuentroDiaHora.objects.create(id_informacion_general=informacion_general, **encuentro_dia_hora_data)
            # encuentro_dia_hora = EncuentroDiaHora.objects.get_or_create(**encuentro_dia_hora_data)
            # informacion_general.encuentro_dias_horas.add(encuentro_dia_hora)
            encuentro_dia_hora = EncuentroDiaHora.objects.filter(**encuentro_dia_hora_data).first()
            if not encuentro_dia_hora:
                encuentro_dia_hora = EncuentroDiaHora.objects.create(**encuentro_dia_hora_data)
            informacion_general.encuentro_dias_horas.add(encuentro_dia_hora)
         
        return informacion_general
    
    # def update(self, instance, validated_data):
    #     print(f"instance: {instance.id_informacion_general}")
        
    #     ocupaciones_actuales = validated_data.pop('ocupaciones_actuales',[])
    #     profesionales_que_brindo_atencion = validated_data.pop('profesionales_que_brindo_atencion',[])
        
    #     profesionales_que_brindo_atencion = validated_data.pop('profesionales_que_brindo_atencion', [])
    #     acompanamientos_recibidos = validated_data.pop('acompanamientos_recibidos', [])
    #     # identidades_de_genero = validated_data.pop('identidades_de_genero', [])
    #     # pronombres = validated_data.pop('pronombres', [])
        
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
        
    #     # Ocupaciones actuales
    #     if ocupaciones_actuales:
    #         instance.ocupaciones_actuales.clear()
    #         for nombre_ocupacion_actual in ocupaciones_actuales:
    #             ocupacion_actual, _ = OcupacionActual.objects.get_or_create(nombre_ocupacion_actual=nombre_ocupacion_actual)
    #             instance.ocupaciones_actuales.add(ocupacion_actual)
        
    #     # Profesional que brindo atencion
    #     if profesionales_que_brindo_atencion:
    #         instance.profesionales_que_brindo_atencion.clear()
    #         for nombre_profesional_que_brindo_atencion in profesionales_que_brindo_atencion:
    #             profesional_que_brindo_atencion, _ = ProfesionalQueBrindoAtencion.objects.get_or_create(nombre_profesional_que_brindo_atencion=nombre_profesional_que_brindo_atencion)
    #             instance.profesionales_que_brindo_atencion.add(profesional_que_brindo_atencion)
        
    #     # AcompanamientosRecibidos
    #     #! --
        
    #     # Manejar la actualización de AcompanamientoRecibido
    #     current_acompanamientos = {acom.id_acompanamiento_recibido: acom for acom in instance.acompanamientos_recibido.all()}
    #     new_acompanamientos = []

    #     for acompanamiento_recibido_data in acompanamientos_recibidos:
    #         if 'id_acompanamiento_recibido' in acompanamiento_recibido_data:
    #             acom_id = acompanamiento_recibido_data['id_acompanamiento_recibido']
    #             if acom_id in current_acompanamientos:
    #                 acompanamiento_recibido_instance = current_acompanamientos[acom_id]
    #                 for attr, value in acompanamiento_recibido_data.items():
    #                     setattr(acompanamiento_recibido_instance, attr, value)
    #                 acompanamiento_recibido_instance.save()
    #                 new_acompanamientos.append(acompanamiento_recibido_instance)
    #             else:
    #                 raise serializers.ValidationError(f"AcompanamientoRecibido with id {acom_id} not found.")
    #         else:
    #             acompanamiento_recibido_instance = AcompanamientoRecibido.objects.create(id_informacion_general=instance.id_informacion_general, **acompanamiento_recibido_data)
    #             new_acompanamientos.append(acompanamiento_recibido_instance)

    #     # Actualizar la relación con set()
    #     instance.acompanamientos_recibido.set(new_acompanamientos)

        
    #     #!-
    #     """ if acompanamientos_recibidos:
    #         instance.acompanamientos_recibidos.clear()
    #         for nombre_acompanamiento_recibido in acompanamientos_recibidos:
    #             expresion_genero, _ = AcompanamientoRecibido.objects.get_or_create(nombre_acompanamiento_recibido=nombre_acompanamiento_recibido)
    #             instance.acompanamientos_recibidos.add(expresion_genero) """
        
        
        
    #     return super().update(instance, validated_data)
    
    
    #? ------ Escoger abajo!!!
    def update(self, instance, validated_data):
        print(f"instance: {instance.id_informacion_general}")
        
        ocupaciones_actuales = validated_data.pop('ocupaciones_actuales',[])
        profesionales_que_brindo_atencion = validated_data.pop('profesionales_que_brindo_atencion', [])
        acompanamientos_recibido_data = validated_data.pop('acompanamientos_recibido', [])
        actividades_tiempo_libre_data = validated_data.pop('actividades_tiempo_libre',[])
        fuentes_de_ingresos_data = validated_data.pop('fuentes_de_ingresos',[])
        convivencias_en_vivienda_data = validated_data.pop('convivencias_en_vivienda',[])
        redes_de_apoyo_data = validated_data.pop('redes_de_apoyo',[])
        factores_de_riesgo_data = validated_data.pop('factores_de_riesgo',[])
        
        
        # Actualizar los atributos de InformacionGeneral
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Ocupaciones actuales
        if ocupaciones_actuales:
            instance.ocupaciones_actuales.clear()
            for nombre_ocupacion_actual in ocupaciones_actuales:
                ocupacion_actual, _ = OcupacionActual.objects.get_or_create(nombre_ocupacion_actual=nombre_ocupacion_actual)
                instance.ocupaciones_actuales.add(ocupacion_actual)
        
        # Profesional que brindo atencion
        if profesionales_que_brindo_atencion:
            instance.profesionales_que_brindo_atencion.clear()
            for nombre_profesional_que_brindo_atencion in profesionales_que_brindo_atencion:
                profesional_que_brindo_atencion, _ = ProfesionalQueBrindoAtencion.objects.get_or_create(nombre_profesional_que_brindo_atencion=nombre_profesional_que_brindo_atencion)
                instance.profesionales_que_brindo_atencion.add(profesional_que_brindo_atencion)

        # AcompanamientoRecibido
        current_acompanamientos = {acom.id_acompanamiento_recibido: acom for acom in instance.acompanamientos_recibido.all()}
        new_acompanamientos = []

        for acompanamiento_recibido_data in acompanamientos_recibido_data:
            if 'id_acompanamiento_recibido' in acompanamiento_recibido_data:
                acom_id = acompanamiento_recibido_data['id_acompanamiento_recibido']
                if acom_id in current_acompanamientos:
                    acompanamiento_recibido_instance = current_acompanamientos[acom_id]
                    for attr, value in acompanamiento_recibido_data.items():
                        setattr(acompanamiento_recibido_instance, attr, value)
                    acompanamiento_recibido_instance.save()
                    new_acompanamientos.append(acompanamiento_recibido_instance)
                else:
                    raise serializers.ValidationError(f"AcompanamientoRecibido with id {acom_id} not found.")
            else:
                acompanamiento_recibido_instance = AcompanamientoRecibido.objects.create(id_informacion_general=instance, **acompanamiento_recibido_data)
                new_acompanamientos.append(acompanamiento_recibido_instance)
                
        instance.acompanamientos_recibido.set(new_acompanamientos)
        
        # ActividadTiempoLibre
        current_actividades_tiempo_libre = {acom.id_actividad_tiempo_libre: acom for acom in instance.actividades_tiempo_libre.all()}
        new_actividades_tiempo_libre = []

        for actividad_tiempo_libre_data in actividades_tiempo_libre_data:
            if 'id_actividad_tiempo_libre' in actividad_tiempo_libre_data:
                acom_id = actividad_tiempo_libre_data['id_actividad_tiempo_libre']
                if acom_id in current_actividades_tiempo_libre:
                    actividad_tiempo_libre_instance = current_actividades_tiempo_libre[acom_id]
                    for attr, value in actividad_tiempo_libre_data.items():
                        setattr(actividad_tiempo_libre_instance, attr, value)
                    actividad_tiempo_libre_instance.save()
                    new_actividades_tiempo_libre.append(actividad_tiempo_libre_instance)
                else:
                    raise serializers.ValidationError(f"ActividadTiempoLibre with id {acom_id} not found.")
            else:
                actividad_tiempo_libre_instance = ActividadTiempoLibre.objects.create(id_informacion_general=instance, **actividad_tiempo_libre_data)
                new_actividades_tiempo_libre.append(actividad_tiempo_libre_instance)
                
        instance.actividades_tiempo_libre.set(new_actividades_tiempo_libre)    

        # FuenteDeIngresos
        current_fuentes_de_ingreso = {acom.id_fuente_ingresos: acom for acom in instance.fuentes_de_ingresos.all()}
        new_fuentes_de_ingresos = []

        for fuente_ingresos_data in fuentes_de_ingresos_data:
            if 'id_fuente_ingresos' in fuente_ingresos_data:
                acom_id = fuente_ingresos_data['id_fuente_ingresos']
                if acom_id in current_fuentes_de_ingreso:
                    fuente_ingresos_instance = current_fuentes_de_ingreso[acom_id]
                    for attr, value in fuente_ingresos_data.items():
                        setattr(fuente_ingresos_instance, attr, value)
                    fuente_ingresos_instance.save()
                    new_fuentes_de_ingresos.append(fuente_ingresos_instance)
                else:
                    raise serializers.ValidationError(f"FuenteIngresos with id {acom_id} not found.")
            else:
                fuente_ingresos_instance = FuenteIngresos.objects.create(id_informacion_general=instance, **fuente_ingresos_data)
                new_fuentes_de_ingresos.append(fuente_ingresos_instance)
                
        instance.fuentes_de_ingresos.set(new_fuentes_de_ingresos)  

        # ConvivenciaFamiliar
        current_convivencias_en_vivienda = {acom.id_convivencia_vivienda: acom for acom in instance.convivencias_en_vivienda.all()}
        new_convivencias_familiares = []

        for convivencia_vivienda_data in convivencias_en_vivienda_data:
            if 'id_convivencia_vivienda' in convivencia_vivienda_data:
                acom_id = convivencia_vivienda_data['id_convivencia_vivienda']
                if acom_id in current_convivencias_en_vivienda:
                    convivencia_vivienda_instance = current_convivencias_en_vivienda[acom_id]
                    for attr, value in convivencia_vivienda_data.items():
                        setattr(convivencia_vivienda_instance, attr, value)
                    convivencia_vivienda_instance.save()
                    new_convivencias_familiares.append(convivencia_vivienda_instance)
                else:
                    raise serializers.ValidationError(f"ConvivenciaVivienda with id {acom_id} not found.")
            else:
                convivencia_vivienda_instance = ConvivenciaVivienda.objects.create(id_informacion_general=instance, **convivencia_vivienda_data)
                new_convivencias_familiares.append(convivencia_vivienda_instance)
                
        instance.convivencias_en_vivienda.set(new_convivencias_familiares)

        # RedesDeApoyo
        current_redes_de_apoyo = {acom.id_red_apoyo: acom for acom in instance.redes_de_apoyo.all()}
        new_redes_de_apoyo = []

        for red_de_apoyo_data in redes_de_apoyo_data:
            if 'id_red_apoyo' in red_de_apoyo_data:
                acom_id = red_de_apoyo_data['id_red_apoyo']
                if acom_id in current_redes_de_apoyo:
                    red_de_apoyo_instance = current_redes_de_apoyo[acom_id]
                    for attr, value in red_de_apoyo_data.items():
                        setattr(red_de_apoyo_instance, attr, value)
                    red_de_apoyo_instance.save()
                    new_redes_de_apoyo.append(red_de_apoyo_instance)
                else:
                    raise serializers.ValidationError(f"RedApoyo with id {acom_id} not found.")
            else:
                red_de_apoyo_instance = RedApoyo.objects.create(id_informacion_general=instance, **red_de_apoyo_data)
                new_redes_de_apoyo.append(red_de_apoyo_instance)
                
        instance.redes_de_apoyo.set(new_redes_de_apoyo)

        # FactorDeRiesgo

        current_factores_de_riesgo = {acom.id_factor_riesgo: acom for acom in instance.factores_de_riesgo.all()}
        new_factores_de_riesgo = []

        for factor_de_riesgo_data in factores_de_riesgo_data:
            if 'id_factor_riesgo' in factor_de_riesgo_data:
                acom_id = factor_de_riesgo_data['id_factor_riesgo']
                if acom_id in current_factores_de_riesgo:
                    factor_de_riesgo_instance = current_factores_de_riesgo[acom_id]
                    for attr, value in factor_de_riesgo_data.items():
                        setattr(factor_de_riesgo_instance, attr, value)
                    factor_de_riesgo_instance.save()
                    new_factores_de_riesgo.append(factor_de_riesgo_instance)
                else:
                    raise serializers.ValidationError(f"FactorRiesgo with id {acom_id} not found.")
            else:
                factor_de_riesgo_instance = FactorRiesgo.objects.create(id_informacion_general=instance, **factor_de_riesgo_data)
                new_factores_de_riesgo.append(factor_de_riesgo_instance)
                
        instance.factores_de_riesgo.set(new_factores_de_riesgo)

        return instance