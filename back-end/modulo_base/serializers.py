# import serializers from the REST framework
from rest_framework import serializers
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# create a serializer class

class user_token (serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username', 'email', 'first_name', 'last_name')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class group_serializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

