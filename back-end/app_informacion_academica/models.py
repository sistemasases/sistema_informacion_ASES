from django.db import models
from app_registro.models import Persona

class Estamento(models.Model):
    id_estamento = models.AutoField(primary_key=True)
    nombre_estamento = models.CharField(max_length=100)

class InformacionAcademica(models.Model):
    id_informacion_academica = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, null=False, blank=False, related_name="informacion_academica")
    pertenencia_univalle = models.BooleanField()
    sede_universidad = models.CharField(max_length=200)
    nombre_programa_academico = models.CharField(max_length=200)
    codigo_estudiante = models.CharField(max_length=20, unique=True)
    semestre_academico = models.IntegerField()
    estamentos = models.ManyToManyField(Estamento, max_length=100)
    
    class Meta:
        db_table = "Informacion_academica"
    
    def __str__(self):
        return f"InformacionAcademica: {self.id_informacion_academica}"
    
    
  