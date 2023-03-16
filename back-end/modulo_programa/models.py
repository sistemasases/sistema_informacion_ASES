from django.db import models
from modulo_usuario_rol.models import estudiante
from modulo_geografico.models import municipio

# Create your models here.

class facultad (models.Model):
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)

class sede (models.Model):
    id_municipio= models.ForeignKey(municipio,on_delete=models.CASCADE,default=0,related_name='id_municipio_in_sede')
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)

class programa (models.Model):
    codigo_snies = models.BigIntegerField()
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)
    jornada= models.CharField(max_length=50)
    id_facultad= models.ForeignKey(facultad,on_delete=models.CASCADE,default=0,related_name='id_facultad_in_programa')
    id_sede= models.ForeignKey(sede,on_delete=models.CASCADE,default=0,related_name='id_sede_in_programa')

class programa_estudiante (models.Model):
    id_programa= models.ForeignKey(programa,on_delete=models.CASCADE,default=0,related_name='id_programa_in_programa_estudiante')
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0,related_name='id_estudiante_in_programa_estudiante')
    estado = models.BooleanField(default=True)
    traker = models.BooleanField(default=True)
