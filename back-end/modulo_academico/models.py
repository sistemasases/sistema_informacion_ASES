from django.db import models
from modulo_instancia.models import semestre, sede
from modulo_programa.models import programa_estudiante, programa, facultad
from modulo_usuario_rol.models import estudiante

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






class profesores(models.Model):
    username = models.CharField(max_length=50, default=None)
    nombre = models.CharField(max_length=50, default=None)
    apellido = models.CharField(max_length=50, default=None)
    correo = models.EmailField(max_length=254, default=None)


class curso(models.Model):
    nombre = models.CharField(max_length=50, default=None)
    codigo = models.CharField(max_length=20, default=None)
    franja = models.CharField(max_length=20, null=True, default=0)
    semestre = models.ForeignKey(semestre, on_delete=models.CASCADE)
    sede = models.ForeignKey(sede, on_delete=models.CASCADE)
    facultad = models.ForeignKey(facultad,  null=True, on_delete=models.CASCADE)
    # items = models.CharField(max_length=50, default=None)
    id_profesor = models.ForeignKey(profesores, on_delete=models.CASCADE)

class matricula(models.Model):
    id_curso = models.ForeignKey(curso, on_delete=models.CASCADE)
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None)

class items_historico(models.Model):
    id_curso = models.ForeignKey(curso, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, default=None)
    nota_minima = models.DecimalField(decimal_places=2, max_digits=5)
    nota_maxima = models.DecimalField(decimal_places=2, max_digits=5)
    porcentaje = models.DecimalField(decimal_places=2, max_digits=5)
    id_semestre = models.ForeignKey(semestre, on_delete=models.CASCADE)

class items_semestre(models.Model):
    id_curso = models.ForeignKey(curso, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, default=None)
    nota_minima = models.DecimalField(decimal_places=2, max_digits=5)
    nota_maxima = models.DecimalField(decimal_places=2, max_digits=5)
    porcentaje = models.DecimalField(decimal_places=2, max_digits=5)
    id_semestre = models.ForeignKey(semestre, on_delete=models.CASCADE)

class notas_historico(models.Model):
    id_item = models.ForeignKey(items_historico, on_delete=models.CASCADE)
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None)
    calificacion = models.DecimalField(decimal_places=2, max_digits=5)

class notas_semestre(models.Model):
    id_item = models.ForeignKey(items_semestre, on_delete=models.CASCADE)
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None)
    calificacion = models.DecimalField(decimal_places=2, max_digits=5)

class historial_academico_del_estudiante (models.Model):
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None)
    id_semestre = models.ForeignKey(semestre,on_delete=models.CASCADE,default=0,related_name='id_semestre_in_historial_academico_del_estudiante')
    id_programa_estudiante=models.ForeignKey(programa ,on_delete=models.CASCADE,default=0,related_name='id_programa_in_historial_academico_del_estudiante')
    promedio_semestral = models.DecimalField(decimal_places = 2,max_digits = 3)
    promedio_acumulado= models.DecimalField(decimal_places = 2,max_digits = 3)
    json_materias = models.JSONField(default=dict)





