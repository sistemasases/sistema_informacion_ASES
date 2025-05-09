from django.db import models
from datetime import date, datetime
from django.utils import timezone

class PertenenciaGrupoPoblacional(models.Model):
    id_grupo_poblacional = models.AutoField(primary_key=True)
    nombre_grupo_poblacional = models.CharField(max_length=300) 

    class Meta:
        db_table = "Pertenencia_grupo_poblacional"
    
    def __str__(self):
        return self.nombre_grupo_poblacional
    
class TipoDocumento(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    nombre_tipo_documento = models.CharField(max_length=300) 

    class Meta:
        db_table = "Tipo_documento"
    
    def __str__(self):
        return self.nombre_tipo_documento
    

class EstadoCivil(models.Model):
    id_estado_civil = models.AutoField(primary_key=True)
    nombre_estado_civil = models.CharField(max_length=300) 

    class Meta:
        db_table = "Estado_civil"
    
    def __str__(self):
        return self.nombre_estado_civil

class ZonaResidencia(models.Model):
    id_zona_residencia = models.AutoField(primary_key=True)
    nombre_zona_residencia = models.CharField(max_length=300) 

    class Meta:
        db_table = "Zona_residencia"
    
    def __str__(self):
        return self.nombre_zona_residencia
    
class IdentidadEtnicoRacial(models.Model):
    id_identidad_etnico_racial = models.AutoField(primary_key=True)
    nombre_identidad_etnico_racial = models.CharField(max_length=300) 

    class Meta:
        db_table = "Identidad_etnico_racial"
    
    def __str__(self):
        return self.nombre_identidad_etnico_racial

class SexoAsignado(models.Model):
    id_sexo_asignado = models.AutoField(primary_key=True)
    nombre_sexo_asignado = models.CharField(max_length=300) 

    class Meta:
        db_table = "Sexo_asignado"
    
    def __str__(self):
        return self.nombre_sexo_asignado

class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    email = models.CharField(max_length=100, blank=True, default="Email no registrado")
    nombre_identitario = models.CharField(max_length=150, blank=True, default="Nomber identitario no registrado")
    nombre_y_apellido = models.CharField(max_length=150, blank=True, default="No especifica nombre y/o apellido")
    numero_documento = models.CharField(max_length=30, unique=True)
    fecha_nacimiento = models.DateField(default=date.today, blank=True,)
    estrato_socioeconomico = models.IntegerField(default=0,blank=True)
    ciudad_nacimiento = models.CharField(max_length=100, blank=True,default="Ciudad no especificada")
    corregimiento_nacimiento = models.CharField(max_length=100, blank=True,default="Corregimiento no especificado")
    departamento_nacimiento = models.CharField(max_length=100, blank=True, default="No especifica Departamento de nacimiento")
    pais_nacimiento = models.CharField(max_length=100,blank=True,default="Pais de nacimiento no registrado")
    ciudad_residencia = models.CharField(max_length=100,blank=True, default="Ciudad no especificada")
    municipio_residencia = models.CharField(max_length=100,blank=True, default="Municipio no especificado")
    corregimiento_residencia = models.CharField(max_length=100,blank=True, default="Corregimiento no especificado")
    direccion_residencia = models.CharField(max_length=500,blank=True, default="Direccion de residencia no registrado")
    barrio_residencia = models.CharField(max_length=500,blank=True,default="Barrio de residencia no registrado")
    comuna_barrio = models.CharField(max_length=70,blank=True, default="Comuna/barrio no registrado")
    telefono = models.CharField(max_length=70,blank=True, default="Telefono no registrado")
    nombre_persona_de_confianza = models.CharField(max_length=200,blank=True, default="Nombre de persona de confianza no registrado")

    recaptchaToken = models.CharField(max_length=450)
    fecha_creacion_usuario = models.DateTimeField(default=timezone.now, blank=True)
    revision_usiario=models.BooleanField(null=True, default=False)

    relacion_persona_de_confianza = models.CharField(max_length=200,blank=True, default="Relacion con persona de confianza no registrado")
    telefono_persona_de_confianza = models.CharField(max_length=100,blank=True, default="Telefono de persona de confianza no registrado")
    pertenencia_grupo_poblacional = models.ManyToManyField(PertenenciaGrupoPoblacional,max_length=300, related_name="personas", blank=True) 
    tipo_documento = models.ManyToManyField(TipoDocumento, max_length=300,blank=True)
    zona_residencia = models.ManyToManyField(ZonaResidencia, max_length=300,blank=True)
    estado_civil = models.ManyToManyField(EstadoCivil, max_length=300,blank=True)
    identidad_etnico_racial = models.ManyToManyField(IdentidadEtnicoRacial, max_length=300,blank=True)
    sexo_asignado = models.ManyToManyField(SexoAsignado, max_length=300, blank=True)

    def __str__(self):
        return f"Persona ID: {self.id_persona}, número documento: {self.numero_documento}, nombre: {self.nombre_y_apellido}" #! TODO: Cambiarlo con la info de todos los campos después

    class Meta:
        db_table = "Persona"


