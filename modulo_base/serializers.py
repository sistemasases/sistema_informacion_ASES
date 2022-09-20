# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from django.contrib.auth.models import User

# create a serializer class
class UserSerializer(serializers.ModelSerializer):

	# create a meta class
	class Meta:
		model = User
		fields = ('username', 'password')
