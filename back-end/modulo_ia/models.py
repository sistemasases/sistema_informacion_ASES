from django.db import models
from modulo_usuario_rol.models import estudiante

class datos_prediccion (models.Model):
    id_estudiante=models.ForeignKey( estudiante,on_delete=models.CASCADE,related_name='id_estudiante_in_datos_prediccion')
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
class Meta:
        db_table = "datos_prediccion"
class datos_entrenamiento (models.Model):
    id_estudiante=models.ForeignKey( estudiante,on_delete=models.CASCADE,related_name='id_estudiante_in_datos_entrenamiento')
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
    calificacion_semestre = models.BigIntegerField(default=None)

class Meta:
        db_table = "datos_entrenamiento"


class encuesta_admitidos(models.Model):
    id_estudiante=models.ForeignKey( estudiante,on_delete=models.CASCADE,related_name='id_estudiante_in_encuesta_admitidos')
    periodo_matricula = models.CharField(max_length=20)
    EA_Edad = models.FloatField()
    EA_Sexo = models.CharField(max_length=10)
    EA_Pasdenacimiento = models.CharField(max_length=100)
    EA_departamentodenacimiento = models.CharField(max_length=100)
    EA_Municipiodenacimiento = models.CharField(max_length=100)
    EA_Tienealgntipodediscapac = models.CharField(max_length=3)
    EA_Estadocivil = models.CharField(max_length=50)
    EA_Deacuerdoconsuculturapu = models.CharField(max_length=100)
    EA_Estratodelaresidenciaactu = models.CharField(max_length=3)
    EA_Pasdelaresidenciaactual = models.CharField(max_length=100)
    EA_Departamentodelaresidencia = models.CharField(max_length=100)
    EA_Municipiodelaresidenciaac = models.CharField(max_length=100)
    EA_Consideraustedquetieneun = models.CharField(max_length=3)
    EA_Ocupacindelestudiante = models.CharField(max_length=100)
    EA_Ingresosmensualesdelhogar = models.FloatField()
    EA_GastosmensualesdelhogarG = models.FloatField()
    EA_Mximoniveleducativodelpa = models.CharField(max_length=100)
    EA_Mximoniveleducativodela = models.CharField(max_length=100)
    EA_Consideraquelosingresosd = models.CharField(max_length=3)
    EA_Cuntoshijostiene = models.FloatField()
    EA_Piensaafuturocambiarsede = models.CharField(max_length=3)
    EA_Indiqueycalifiquesushabil = models.CharField(max_length=100)
    EA_Tieneaccesoacomputador = models.CharField(max_length=3)
    EA_TieneaccesoaInternet = models.CharField(max_length=3)
    EA_Facultad = models.CharField(max_length=100)
    CAL_pruebadiagnosticamate = models.CharField(max_length=20)
    
    class Meta:
        db_table = "encuesta_admitidos"