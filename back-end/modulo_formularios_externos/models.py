from django.db import models
from modulo_academico.models import monitoria_academica
from modulo_usuario_rol.models import estudiante

# Create your models here.
class asistencia(models.Model):
    id_monitoria = models.ForeignKey(monitoria_academica, on_delete=models.CASCADE, default=None, null=True,related_name='id_monitoria_in_asistencia')
    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE, default=None, null=True,related_name='id_estudiante_in_asistencia')
    check_asistencia = models.BooleanField(default=False)
    fecha = models.DateField(auto_now_add=True)


class firma_tratamiento_datos_temp(models.Model):

    id_estudiante= models.OneToOneField(estudiante,on_delete=models.CASCADE, null=True, default=None)
    tipo_id_estudiante= models.CharField(max_length=100,default=None)
    documento= models.BigIntegerField(default=None, unique=True, null=True)
    fecha_firma = models.DateTimeField(auto_now_add=False,null=False)
    nombre_firma= models.CharField(max_length=50,default=None)
    correo_firma= models.CharField(max_length=50,default=None)
    autoriza_tratamiento_datos= models.BooleanField(default=False)
    autoriza_tratamiento_imagen= models.BooleanField(default=False)
    class Meta:
        db_table = "firma_tratamiento_datos_temp"