from django.db import models

from app_registro.models import Persona

class RespuestaCambioDocumento(models.Model):
    id_respuesta_cambio_documento = models.AutoField(primary_key=True)
    nombre_respuesta_cambio_documento = models.TextField()

class OrientacionSexual(models.Model):
    id_orientacion_sexual = models.AutoField(primary_key=True)
    nombre_orientacion_sexual = models.CharField(max_length=200)

class ExpresionGenero(models.Model):
    id_expresion_genero = models.AutoField(primary_key=True)
    nombre_expresion_genero = models.CharField(max_length=200)

class IdentidadGenero(models.Model):
    id_identidad_genero = models.AutoField(primary_key=True)
    nombre_identidad_genero = models.CharField(max_length=200)

class Pronombre(models.Model):
    id_pronombre = models.AutoField(primary_key=True)
    nombre_pronombre = models.CharField(max_length=50)

class DiversidadSexual(models.Model):
    id_diversidad_sexual = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, null=False, blank=False, related_name="diversidad_sexual")
    # id_persona = models.CharField(max_length=30, null=False, unique=True) 
    cambio_nombre_sexo_documento = models.CharField(max_length=50)
    recibir_orientacion_cambio_en_documento = models.BooleanField()
    pronombres = models.ManyToManyField(Pronombre, max_length=50)
    identidades_de_genero = models.ManyToManyField(IdentidadGenero,max_length=200)
    expresiones_de_genero = models.ManyToManyField(ExpresionGenero,max_length=200)
    orientaciones_sexuales = models.ManyToManyField(OrientacionSexual,max_length=200)
    respuestas_cambio_documento = models.ManyToManyField(RespuestaCambioDocumento)

    class Meta:
        db_table = "Diversidad_sexual"
    
    def __str__(self):
        return f"DiversidadSexual {self.id_diversidad_sexual}"