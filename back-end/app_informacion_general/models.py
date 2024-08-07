from django.db import models

from app_registro.models import Persona


class ActividadesTiempoLibre(models.Model):
    id_actividad_de_tiempo_libre = models.AutoField(primary_key=True)
    nombre_actividad_de_tiempo_libre = models.CharField(max_length=200)


class FuentesIngreso(models.Model):
    id_fuente_de_ingreso = models.AutoField(primary_key=True)
    nombre_fuente_de_ingreso = models.CharField(max_length=200)

    
class RedesApoyo(models.Model):
    id_red_de_apoyo = models.AutoField(primary_key=True)
    nombre_red_de_apoyo = models.CharField(max_length=200)


class FactoresRiesgo(models.Model):
    id_factor_de_riesgo = models.AutoField(primary_key=True)
    nombre_factor_de_riesgo = models.CharField(max_length=200)

class EncuentroDiaHora(models.Model):
    id_encuentro_dia_hora = models.AutoField(primary_key=True)  
    dia = models.CharField(max_length=30,blank=True,default="Sin observación")
    hora = models.TimeField(blank=True,null=True) 
    id_informacion_general = models.ManyToManyField('InformacionGeneral', related_name='encuentro_dias_horas', blank=True)
    
    class Meta:
        db_table = "Informacion_general_encuentro_dia_hora"
    
    def __str__(self):
        return f"EncuentroDiaHora {self.id_encuentro_dia_hora}"
 
class InformacionGeneral(models.Model):
    id_informacion_general = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, null=False, blank=False, related_name="informacion_general")
    #Cambios nuevos
    Ocupaciones_actules=models.CharField(max_length=100, blank=True, default="N/A")
    profesionales_que_brindaron_atencion= models.TextField(blank=True,default="N/A")
    acompanamiento_que_recibio = models.TextField(blank=True,default="N/A")

    #FIn cambios nuevos
    dedicacion_externa = models.CharField(max_length=100, blank=True, default="N/A")
    tiene_eps = models.CharField(max_length=50, blank=True, default="N/A")
    nombre_eps = models.CharField(max_length=200, blank=True, default="N/A")
    regimen_eps = models.CharField(max_length=50, blank=True, default="N/A")
    tipo_entidad_acompanamiento_recibido = models.TextField(blank=True, default="N/A")
    calificacion_acompanamiento_recibido = models.IntegerField(null=True)
    motivo_calificacion_acompanamiento = models.TextField(null=True)
    actividades_especificas_tiempo_libre = models.TextField(blank=True,default="N/A")
    observacion_general_actividades_especificas_tiempo_libre = models.TextField(blank=True,default="SIn observación")
    observacion_general_fuente_de_ingresos = models.TextField(blank=True,default="Sin observación")
    observacion_general_relacion_convivencia_vivienda = models.TextField(blank=True,default="Sin observación")
    calificacion_relacion_familiar = models.IntegerField(blank=True,default=0)
    observacion_general_redes_de_apoyo = models.TextField(blank=True,default="Sin observación")
    observacion_general_factores_de_riesgo = models.TextField(blank=True,default="Sin observación")
    creencia_religiosa = models.TextField(blank=True,default="N/A")
    decision_encuentro_inicial_con_profesional = models.CharField(max_length=100,blank=True,default="N/A")
    observacion_horario = models.TextField(blank=True,default="Sin observación")
    origen_descubrimiento_campus_diverso = models.CharField(blank=True,default="N/A")
    comentarios_o_sugerencias_de_usuario = models.TextField(blank=True,default="N/A")
   

    #Nuevo
    factores_riesgos = models.ManyToManyField(FactoresRiesgo,max_length=500, blank=True,)
    actividades_tiempo_libre = models.ManyToManyField(ActividadesTiempoLibre,max_length=500, blank=True,)
    fuentes_ingresos = models.ManyToManyField(FuentesIngreso,max_length=500, blank=True,)
    redes_apoyo = models.ManyToManyField(RedesApoyo,max_length=500, blank=True,)


    # encuentros_dias_horas = models.ManyToManyField(EncuentroDiaHora, related_name="informacion_general_id")

    class Meta:
        db_table = "Informacion_general"
    
    def __str__(self):
        return f"InformacionGeneral {self.id_informacion_general}"
   