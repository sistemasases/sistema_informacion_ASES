from rest_framework import serializers
from modulo_seguimiento.models import *

class seguimiento_individual_serializer(serializers.ModelSerializer):

    class Meta:
        model = seguimiento_individual
        fields = '__all__'
    
    def create(self, validated_data):
        for field_name, field in self.fields.items():
            if isinstance(field, serializers.CharField) and validated_data.get(field_name) is None:
                validated_data[field_name] = None
        
        return super().create(validated_data)


class inasistencia_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = inasistencia
		fields = '__all__'