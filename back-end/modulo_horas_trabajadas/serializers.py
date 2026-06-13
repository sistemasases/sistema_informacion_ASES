from rest_framework import serializers
from django.contrib.auth.models import User
from .models import RegistroHoras, TemporadaTrabajo
from modulo_usuario_rol.models import rol, usuario_rol


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = rol
        fields = '__all__'

class UsuarioRolSerializer(serializers.ModelSerializer):
    id_rol = RolSerializer(read_only=True)  
    
    class Meta:
        model = usuario_rol
        fields = '__all__'




class RegistroHorasSerializer(serializers.ModelSerializer):
    rol = UsuarioRolSerializer(read_only=True)
    horas_trabajadas = serializers.DecimalField(
        max_digits=4, decimal_places=1, read_only=True
    )

    class Meta:
        model = RegistroHoras
        fields = '__all__'
        read_only_fields = ['horas_trabajadas', 'rol']  

    def validate_trabajador(self, value):
        user = User.objects.filter(id=value.id, is_active=True).first()
        if user is None:
            raise serializers.ValidationError(
                "No se encontró ningún usuario con ese id."
            )
        return value

    def validate_hora_inicio(self, value):
        from datetime import time
        if not (time(6, 0) <= value <= time(22, 0)):
            raise serializers.ValidationError(
                "La hora de inicio debe estar entre las 06:00 y las 22:00."
            )
        return value

    def validate_hora_fin(self, value):
        from datetime import time
        if not (time(6, 0) <= value <= time(22, 0)):
            raise serializers.ValidationError(
                "La hora de fin debe estar entre las 06:00 y las 22:00."
            )
        return value

    def validate(self, data):
        hora_inicio = data.get("hora_inicio")
        hora_fin = data.get("hora_fin")
        trabajador = data.get("trabajador")
        fecha = data.get("fecha")

        if hora_inicio and hora_fin:
            if hora_fin <= hora_inicio:
                raise serializers.ValidationError(
                    {"hora_fin": "La hora de fin debe ser mayor a la hora de inicio."}
                )

            from datetime import datetime, date
            inicio = datetime.combine(date.today(), hora_inicio)
            fin = datetime.combine(date.today(), hora_fin)
            minutos = (fin - inicio).seconds // 60
            if minutos % 15 != 0:
                raise serializers.ValidationError(
                    {"hora_fin": "El rango debe ser en intervalos de 15 minutos."}
                )

        if trabajador and fecha and hora_inicio and hora_fin:
            cruce = RegistroHoras.objects.filter(
                trabajador=trabajador,
                fecha=fecha,
            ).filter(
                # Cubre todos los casos de solapamiento posibles
                hora_inicio__lt=hora_fin,
                hora_fin__gt=hora_inicio,
            ).exists()

            if cruce:
                raise serializers.ValidationError(
                    {"hora_inicio": f"Ya tienes un registro que se cruza con el horario {hora_inicio} - {hora_fin} en esta fecha."}
                )

        return data

    def validate_descripcion(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError(
                "La descripción es obligatoria."
            )
        return value
        
    
class TemporadaTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporadaTrabajo
        fields = '__all__'