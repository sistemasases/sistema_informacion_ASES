# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import instancia, semestre

# create a serializer class
class instancia_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = instancia
		fields = '__all__'

class semestre_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = semestre
		fields = '__all__'
