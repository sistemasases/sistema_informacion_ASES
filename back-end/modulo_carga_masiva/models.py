from django.db import models
from modulo_usuario_rol.models import estudiante

# Create your models here.

class motivo (models.Model):
    descripcion= models.CharField(max_length=150)

class retiro (models.Model):
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0,related_name='id_estudiante_in_retiro')
    id_motivo= models.ForeignKey(motivo,on_delete=models.CASCADE,default=0,related_name='id_motivo_in_retiro')
    detalle= models.CharField(max_length=150)
