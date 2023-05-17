from django.db import models
from django.contrib.auth.models import User
from modulo_usuario_rol.models import estudiante

# Create your models here.
class seguimiento_individual (models.Model):

    fecha= models.DateField(auto_now_add=False)
    lugar = models.CharField(max_length=100)
    hora_inicio = models.TimeField()
    hora_finalización= models.TimeField()
    objetivos= models.CharField(null=True,max_length=1500)
    individual= models.CharField(null=True,max_length=1500)
    riesgo_individual= models.IntegerField(null=True)
    autoconocimiento= models.BooleanField()
    rasgos_de_personalidad=models.BooleanField()
    identificación=models.BooleanField()
    red_de_apoyo=models.BooleanField()
    proyecto_de_vida= models.BooleanField()
    salud=models.BooleanField()
    aspectos_motivacionales=models.BooleanField()
    historia_de_vida=models.BooleanField()
    relación_eriótico_afectivas=models.BooleanField()
    diversidad_sexual=models.BooleanField()
    familiar=models.CharField(null=True,max_length=1500)
    riesgo_familiar=models.IntegerField(null=True)
    dinamica_familiar=models.BooleanField()
    academico=models.CharField(null=True,max_length=1500)
    riesgo_academico= models.IntegerField(null=True)
    desempeño_académico=models.BooleanField()
    elección_vocacional=models.BooleanField()
    manejo_del_tiempo =models.BooleanField()
    economico=models.CharField(null=True,max_length=1500)
    riesgo_economico=models.IntegerField(null=True)
    apoyos_económicos_institucionales=models.BooleanField()
    manejo_finanzas=models.BooleanField()
    apoyo_económico_familiar=models.BooleanField()
    situación_laboral_ocupacional=models.BooleanField()
    vida_universitaria_ciudad=models.CharField(null=True,max_length=1500)
    riesgo_vida_universitaria_ciudad=models.IntegerField(null=True)
    motivación_compañamiento=models.BooleanField()
    referencia_geográfica=models.BooleanField()
    adaptación_ciudad_Universidad=models.BooleanField()
    oferta_servicios=models.BooleanField()
    vivienda=models.BooleanField()
    vinculación_grupos_actividades_extracurriculares=models.BooleanField()

    apoyo_académico = models.BooleanField(default=False)
    taller_par_par = models.BooleanField(default=False)
    reconocimiento_ciudad_U = models.BooleanField(default=False)
    rem_profesional_SE = models.BooleanField(default=False)
    rem_racticante_SE = models.BooleanField(default=False)
    rem_actividades_grupales = models.BooleanField(default=False)
    rem_monitorías_académicas = models.BooleanField(default=False)
    rem_proyectos_Universidad = models.BooleanField(default=False)
    rem_servicio_salud = models.BooleanField(default=False)
    rem_registro_académico = models.BooleanField(default=False)
    rem_matrícula_financiera = models.BooleanField(default=False)
    rem_desarrollo_humano_promoción_SE = models.BooleanField(default=False)
    rem_directores_programa = models.BooleanField(default=False)
    rem_grupos_universidad = models.BooleanField(default=False)
    rem_externa = models.BooleanField(default=False)
    Ninguna_acción_realizada = models.BooleanField(default=False)

    observaciones=models.CharField(null=True,max_length=1500)
    revisado_profesional = models.BooleanField(default=False)
    revisado_practicante = models.BooleanField(default=False)
    primer_acercamiento =models.BooleanField(default=False)
    cierre =models.BooleanField(default=False)

    creacion= models.DateTimeField(auto_now_add=True)
    modificacion= models.DateTimeField(auto_now=True)
    id_creador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_creador_seguimiento')
    id_modificador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_modificador_seguimiento')
    id_estudiante =  models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0)

    class Meta:
        db_table = "seguimiento_individual"
    def __str__(self):
        return self.fecha

class inasistencia (models.Model):

    fecha= models.DateField(auto_now_add=False)
    observaciones=models.CharField(max_length=1500)
    revisado_profesional = models.BooleanField(default=False)
    revisado_practicante = models.BooleanField(default=False)

    creacion= models.DateTimeField(auto_now_add=True)
    modificacion= models.DateTimeField(auto_now=True)
    id_creador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_creador_inasistencia')
    id_modificador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_modificador_inasistencia')
    id_estudiante =  models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0)

    class Meta:
        db_table = "inasistencia"
    def __str__(self):
        return self.fecha