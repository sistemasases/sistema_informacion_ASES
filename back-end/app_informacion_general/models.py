from django.db import models

from app_registro.models import Persona


class OcupacionActual(models.Model):
    id_ocupacion_actual = models.AutoField(primary_key=True)
    nombre_ocupacion_actual = models.CharField(max_length=200)
    
    class Meta:
        db_table = "Informacion_general_ocupacion_actual"
    
    def __str__(self):
        return f"OcupacionActual {self.id_ocupacion_actual}"

class AcompanamientoRecibido(models.Model):
    id_acompanamiento_recibido = models.AutoField(primary_key=True)
    nombre_acompanamiento_recibido = models.CharField(max_length=200)
    observacion_acompanamiento_recibido = models.TextField(default="N/A")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name="acompanamientos_recibido", blank=True)

    class Meta:
        db_table = "Informacion_general_acompanamiento_recibido"
    
    def __str__(self):
        return f"AcompanamientoRecibido {self.id_acompanamiento_recibido}"
    
class ProfesionalQueBrindoAtencion(models.Model):
    id_profesion_que_brindo_atencion = models.AutoField(primary_key=True)
    nombre_profesional_que_brindo_atencion = models.CharField(max_length=200)

    class Meta:
        db_table = "Informacion_general_profesional_que_brindo_atencion"
    
    def __str__(self):
        return f"ProfesionalQueBrindoAtencion - {self.id_profesion_que_brindo_atencion}"
    
    
class ActividadTiempoLibre(models.Model):
    id_actividad_tiempo_libre = models.AutoField(primary_key=True)
    nombre_actividad_tiempo_libre = models.CharField(max_length=200)
    observacion_actividad_tiempo_libre = models.TextField(blank=True, null=False, default="Sin observación")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name="actividades_tiempo_libre", blank=True)
    
    class Meta:
        db_table = "Informacion_general_actividad_tiempo_libre"
    
    def __str__(self):
        return f"ActividadTiempoLibre {self.id_actividad_tiempo_libre}"

class FuenteIngresos(models.Model):
    id_fuente_ingresos = models.AutoField(primary_key=True)
    nombre_fuente_ingresos = models.CharField(max_length=200)
    observacion_fuente_ingresos = models.TextField(blank=True, default="Sin Observación")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name='fuentes_de_ingresos', blank=True)
    
    class Meta:
        db_table = "Informacion_general_fuente_ingresos"
    
    def __str__(self):
        return f"FuenteIngresos {self.id_fuente_ingresos}"
 
 
class ConvivenciaVivienda(models.Model):
    id_convivencia_vivienda = models.AutoField(primary_key=True)
    nombre_convivencia_vivienda = models.CharField(max_length=200)
    observacion_convivencia_vivienda = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name='convivencias_en_vivienda', blank=True)
    
    class Meta:
        db_table = "Informacion_general_convivencia_vivienda"
    
    def __str__(self):
        return f"ConvivenciaVivienda {self.id_convivencia_vivienda}"
    
class RedApoyo(models.Model):
    id_red_apoyo = models.AutoField(primary_key=True)
    nombre_red_apoyo = models.CharField(max_length=200)
    observacion_red_apoyo = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name='redes_de_apoyo', blank=True)
    
    class Meta:
        db_table = "Informacion_general_red_apoyo"
    
    def __str__(self):
        return f"RedApoyo {self.id_red_apoyo}"

class FactorRiesgo(models.Model):
    id_factor_riesgo = models.AutoField(primary_key=True)
    nombre_factor_riesgo = models.CharField(max_length=200)
    observacion_factor_riesgo = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('InformacionGeneral', on_delete=models.CASCADE, related_name='factores_de_riesgo', blank=True)
    
    class Meta:
        db_table = "Informacion_general_factor_riesgo"
    
    def __str__(self):
        return f"FactorRiesgo {self.id_factor_riesgo}"

class EncuentroDiaHora(models.Model):
    id_encuentro_dia_hora = models.AutoField(primary_key=True)  
    dia = models.CharField(max_length=20)
    hora = models.TimeField() 
    id_informacion_general = models.ManyToManyField('InformacionGeneral', related_name='encuentro_dias_horas', blank=True)
    
    class Meta:
        db_table = "Informacion_general_encuentro_dia_hora"
    
    def __str__(self):
        return f"EncuentroDiaHora {self.id_convivencia_vivienda}"
 
class InformacionGeneral(models.Model):
    id_informacion_general = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, null=False, blank=False, related_name="informacion_general")
    dedicacion_externa = models.CharField(max_length=100)
    tiene_eps = models.CharField(max_length=30, blank=True, default="N/A")
    nombre_eps = models.CharField(max_length=200, blank=True, default="N/A")
    regimen_eps = models.CharField(max_length=50, blank=True, default="N/A")
    tipo_entidad_acompanamiento_recibido = models.TextField()
    calificacion_acompanamiento_recibido = models.IntegerField(null=True)
    motivo_calificacion_acompanamiento = models.TextField(null=True)
    actividades_especificas_tiempo_libre = models.TextField()
    observacion_general_actividades_especificas_tiempo_libre = models.TextField()
    observacion_general_fuente_de_ingresos = models.TextField()
    observacion_general_relacion_convivencia_vivienda = models.TextField()
    calificacion_relacion_familiar = models.IntegerField()
    observacion_general_redes_de_apoyo = models.TextField()
    observacion_general_factores_de_riesgo = models.TextField()
    creencia_religiosa = models.TextField()
    decision_encuentro_inicial_con_profesional = models.CharField(max_length=30)
    observacion_horario = models.TextField(blank=False, default="Sin observación")
    origen_descubrimiento_campus_diverso = models.CharField(max_length=300)
    comentarios_o_sugerencias_de_usuario = models.TextField(default="N/A")
    ocupaciones_actuales = models.ManyToManyField(OcupacionActual, max_length=200, related_name="informaciones_generales")
    profesionales_que_brindo_atencion = models.ManyToManyField(ProfesionalQueBrindoAtencion, max_length=200, related_name="informaciones_generales")
    # encuentros_dias_horas = models.ManyToManyField(EncuentroDiaHora, related_name="informacion_general_id")

    class Meta:
        db_table = "Informacion_general"
    
    def __str__(self):
        return f"InformacionGeneral {self.id_informacion_general}"
   