from django.db import models
from modulo_instancia.models import semestre
from modulo_programa.models import programa_estudiante

# Create your models here.

class historial_academico (models.Model):
    id_programa_estudiante=models.ForeignKey(programa_estudiante ,on_delete=models.CASCADE,default=0,related_name='id_programa_estudiante_in_historial_academico')
    id_semestre=models.ForeignKey(semestre,on_delete=models.CASCADE,default=0,related_name='id_semestre_in_historial_academico')
    promedio_semestral = models.DecimalField(decimal_places = 2,max_digits = 3)
    promedio_acumulado= models.DecimalField(decimal_places = 2,max_digits = 3)
    json_materias = models.CharField(max_length=500, default=None)


class materia (models.Model):
    cod_materia = models.CharField(max_length=20, default=None)
    nombre = models.CharField(max_length=50, default=None)