from django.db import models
from modulo_usuario_rol.models import estudiante, monitor, usuario_rol
from modulo_instancia.models import sede, semestre

# Create your models here.

class facultad (models.Model):
    codigo_univalle = models.CharField(max_length=2)
    nombre= models.CharField(max_length=50)

class programa (models.Model):
    codigo_snies = models.BigIntegerField()
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=100)
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

class programa_monitor (models.Model):
    id_programa= models.ForeignKey(programa,on_delete=models.CASCADE,default=0,related_name='id_programa_in_programa_monitor')
    id_monitor= models.ForeignKey(monitor,on_delete=models.CASCADE,default=0,related_name='id_estudiante_in_programa_monitor')
    id_estado = models.ForeignKey(estado_programa,on_delete=models.CASCADE,default=None,null=True,related_name='id_estado_programa_in_programa_monitor')
    traker = models.BooleanField(default=True)

class dir_programa(models.Model):
    id_programa= models.ForeignKey(programa,on_delete=models.CASCADE,null=True)
    id_usuario_rol= models.ForeignKey(usuario_rol,on_delete=models.CASCADE,null=True)
    
    db_table = "dir_programa"


class vcd_academico (models.Model):
    id_facultad= models.ForeignKey(facultad,on_delete=models.CASCADE,null=True)
    id_usuario_rol= models.ForeignKey(usuario_rol,on_delete=models.CASCADE,null=True)

    db_table = "vcd_academico"


class historial_estado_programa_estudiante (models.Model):
    id_programa= models.ForeignKey(programa,on_delete=models.CASCADE,default=0)
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0)
    id_estado = models.ForeignKey(estado_programa,on_delete=models.CASCADE,default=None,null=True)
    id_sede= models.ForeignKey(sede,on_delete=models.CASCADE,default=None,null=True)
    id_Semestre= models.ForeignKey(semestre,on_delete=models.CASCADE,default=None,null=True)
