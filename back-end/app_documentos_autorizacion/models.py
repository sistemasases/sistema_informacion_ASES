from django.db import models

from django.db import models
from app_registro.models import Persona

class ApgarPregunta1(models.Model):
    id_apgar_pregunta1 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta1 = models.TextField()
    def __str__(self):
        return self.nombre_apgar_pregunta1
class ApgarPregunta2(models.Model):
    id_apgar_pregunta2 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta2 = models.TextField()
    def __str__(self):
        return self.nombre_apgar_pregunta2

class ApgarPregunta3(models.Model):
    id_apgar_pregunta3 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta3 = models.TextField()

class ApgarPregunta4(models.Model):
    id_apgar_pregunta4 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta4 = models.TextField()

class ApgarPregunta5(models.Model):
    id_apgar_pregunta5 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta5 = models.TextField()

class ApgarPregunta6(models.Model):
    id_apgar_pregunta6 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta6 = models.TextField()

class ApgarPregunta7(models.Model):
    id_apgar_pregunta7 = models.AutoField(primary_key=True)
    nombre_apgar_pregunta7 = models.TextField()

class DocumentosAutorizacion(models.Model):
    id_documentos_autorizacion = models.AutoField(primary_key=True)
    id_persona = models.OneToOneField(Persona, on_delete=models.CASCADE, null=False, blank=False, related_name="documentos_autorizacion")
    autorizacion_manejo_de_datos = models.BooleanField(default=False)
    firma_consentimiento_informado = models.BooleanField(default=False)
    firma_terapia_hormonal = models.BooleanField(null=True, blank=True)
    documento_digital_y_archivo = models.BooleanField(null=True, blank=True)
    apgar_familiar = models.IntegerField(null=True, blank=True)
    ecomapa = models.BooleanField(null=True, blank=True)
    arbol_familiar = models.BooleanField(null=True, blank=True)
    apgar_pregunta1 = models.ManyToManyField(ApgarPregunta1, blank=True)
    apgar_pregunta2 = models.ManyToManyField(ApgarPregunta2, blank=True)
    apgar_pregunta3 = models.ManyToManyField(ApgarPregunta3, blank=True)
    apgar_pregunta4 = models.ManyToManyField(ApgarPregunta4, blank=True)
    apgar_pregunta5 = models.ManyToManyField(ApgarPregunta5, blank=True)
    apgar_pregunta6 = models.ManyToManyField(ApgarPregunta6, blank=True)
    apgar_pregunta7 = models.ManyToManyField(ApgarPregunta7, blank=True)



    class Meta:
        db_table = "DocumentosAutorizacion"

    def __str__(self):
        return f"DocumentosAutorizacion {self.id_documentos_autorizacion}"

