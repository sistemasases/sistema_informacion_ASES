from rest_framework import serializers
from modulo_seguimiento.models import *
from datetime import date

class seguimiento_individual_serializer(serializers.ModelSerializer):

    class Meta:
        model = seguimiento_individual
        fields = '__all__'
    
    def create(self, validated_data):
        for field_name, field in self.fields.items():
            if isinstance(field, serializers.CharField) and validated_data.get(field_name) is None:
                validated_data[field_name] = None

        return super().create(validated_data)

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

        estudiante_instancia = estudiante.objects.get(id=self.data['id_estudiante'])

        riesgo_instancia, created = riesgo_individual.objects.get_or_create(id_estudiante=estudiante_instancia)

        fecha_str = self.data['fecha'].split("-")
        fecha = date(int(fecha_str[0]), int(fecha_str[1]), int(fecha_str[2]))
        try:
            condicional = riesgo_instancia.fecha <= fecha
        except:
            condicional = riesgo_instancia.fecha == None or created
        
        if condicional:
            riesgo_instancia.fecha = self.data['fecha']
            if self.data['riesgo_individual'] != None:
                riesgo_instancia.riesgo_individual = self.data['riesgo_individual']
            if self.data['riesgo_familiar'] != None:
                riesgo_instancia.riesgo_familiar = self.data['riesgo_familiar']
            if self.data['riesgo_academico'] != None:
                riesgo_instancia.riesgo_academico = self.data['riesgo_academico']
            if self.data['riesgo_economico'] != None:
                riesgo_instancia.riesgo_economico = self.data['riesgo_economico']
            if self.data['riesgo_vida_universitaria_ciudad'] != None:
                riesgo_instancia.riesgo_vida_universitaria_ciudad = self.data['riesgo_vida_universitaria_ciudad']
            riesgo_instancia.save()


class inasistencia_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = inasistencia
		fields = '__all__'

class riesgo_individual_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = riesgo_individual
		fields = '__all__'