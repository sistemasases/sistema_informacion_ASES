# import serializers from the REST framework
from rest_framework import serializers

# create a serializer class
class Api_login(serializers.Serializer):
	username = serializers.CharField(max_length=15)
	password = serializers.CharField(max_length=30)

