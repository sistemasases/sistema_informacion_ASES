from django.db import models
from modulo_usuario_rol.models import estudiante

class datos_prediccion (models.Model):
    id_estudiante=models.ForeignKey( estudiante,on_delete=models.CASCADE,related_name='')
    cultura = models.CharField(max_length=200, default=None,null=True)
    lugar_adecuado_estudio =models.BooleanField(default=False, null=True)
    ocupacion = models.CharField(max_length=200, default=None,null=True)
    max_lvl_estudio_padre =models.CharField(max_length=200, default=None,null=True)
    max_lvl_estudio_madre =models.CharField(max_length=200, default=None,null=True)
    ingresos_mensuales =models.BigIntegerField(default=None)
    gastos_mensuales = models.BigIntegerField(default=None)
    ingresos_suficientes =models.BooleanField(default=False, null=True)
    cambiar_programa =models.BooleanField(default=False, null=True)
    habilidades_razonamiento =models.CharField(max_length=200, default=None,null=True)
    acceso_computador =models.BooleanField(default=False, null=True)
    acceso_internet =models.BooleanField(default=False, null=True)
    calificacion_prueba_diagnostica = models.BigIntegerField(default=None)
    
    estrato =models.CharField(max_length=200, default=None,null=True)
    pais_nac =models.CharField(max_length=200, default=None,null=True)
    depart_nac =models.CharField(max_length=200, default=None,null=True)
    pais_res =models.CharField(max_length=200, default=None,null=True)
    depart_res =models.CharField(max_length=200, default=None,null=True)
    facultad =models.CharField(max_length=200, default=None,null=True)


    class Meta:
        db_table = "datos_prediccion"
