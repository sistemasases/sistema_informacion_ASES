from rest_framework import serializers
from .models import *

class monitoria_academica_serializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = monitoria_academica
		fields = '__all__'