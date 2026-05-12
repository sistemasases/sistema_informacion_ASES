from rest_framework import serializers
from .models import RegistroHoras
from modulo_usuario_rol.models import User, rol

class RegistroHorasSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroHoras
        fields = '__all__'
    

    # validaciones de los datos antes de guardar 

    def validate_trabajador(self, value):
        # validamos la existencia del usuario
        user = User.objects.filter(id = value, is_active = True).first()

        if user == None:
            raise serializers.ValidationError(
                "No se encontro ningun usuario con ese id."
            )
        return value
        
    def validate_horas_trabajadas(self, value):
        # validamos que no tengan numeros de horas imposibles
        if value > 126 or value < 0:
            raise serializers.ValidationError(
                "El numero de horas es incorrecto."
            )
        return value
    
    def validate_rol(self, value):
        rol_usuario = rol.objects.filter(id=value).first()

        if rol.nombre in []:
            pass


        