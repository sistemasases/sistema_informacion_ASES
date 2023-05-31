from django.db import models
from modulo_usuario_rol.models import estudiante
from modulo_instancia.models import sede

# Create your models here.

class facultad (models.Model):
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)

class programa (models.Model):
    codigo_snies = models.BigIntegerField()
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)
    jornada= models.CharField(max_length=50)
    id_facultad= models.ForeignKey(facultad,on_delete=models.CASCADE,default=0,related_name='id_facultad_in_programa')
    id_sede= models.ForeignKey(sede,on_delete=models.CASCADE,default=None,null=True,related_name='id_sede_in_programa')

class estado_programa (models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=500)

class programa_estudiante (models.Model):
    id_programa= models.ForeignKey(programa,on_delete=models.CASCADE,default=0,related_name='id_programa_in_programa_estudiante')
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0,related_name='id_estudiante_in_programa_estudiante')
    id_estado = models.ForeignKey(estado_programa,on_delete=models.CASCADE,default=None,null=True,related_name='id_estado_programa_in_programa_estudiante')
    traker = models.BooleanField(default=True)
