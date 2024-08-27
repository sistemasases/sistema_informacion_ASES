from django.db import models
from modulo_academico.models import monitoria_academica
from modulo_usuario_rol.models import estudiante

# Create your models here.
class asistencia(models.Model):
    id_monitoria = models.ForeignKey(monitoria_academica, on_delete=models.CASCADE, default=None, null=True,related_name='id_monitoria_in_asistencia')
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None, null=True,related_name='id_estudiante_in_asistencia')
    fecha = models.DateField(auto_now_add=True)