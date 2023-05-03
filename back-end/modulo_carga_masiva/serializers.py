# import serializers from the REST framework
from rest_framework import serializers

# create a serializer class
class Validador_carga(serializers.Serializer):
	tipo_de_carga = serializers.CharField(max_length=15)
	file = serializers.FileField()

