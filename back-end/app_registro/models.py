from django.db import models


class PertenenciaGrupoPoblacional(models.Model):
    id_grupo_poblacional = models.AutoField(primary_key=True)
    nombre_grupo_poblacional = models.CharField(max_length=300) 

    class Meta:
        db_table = "Pertenencia_grupo_poblacional"
    
    def __str__(self):
        return self.nombre_grupo_poblacional

class Persona(models.Model):
    id_persona = models.AutoField(primary_key=True)
    email = models.CharField(max_length=500, blank=True, default="Email no registrado")
    nombre_identitario = models.CharField(max_length=150)
    nombre_y_apellido = models.CharField(max_length=150)
    tipo_documento = models.CharField(max_length=50)
    numero_documento = models.CharField(max_length=30, unique=True)
    fecha_nacimiento = models.DateField()
    estrato_socioeconomico = models.IntegerField()
    ciudad_nacimiento = models.CharField(max_length=100, default="Ciudad no especificada")
    municipio_nacimiento = models.CharField(max_length=100, default="Municipio no especificado")
    corregimiento_nacimiento = models.CharField(max_length=100, default="Corregimiento no especificado")
    departamento_nacimiento = models.CharField(max_length=100)
    pais_nacimiento = models.CharField(max_length=100)
    ciudad_residencia = models.CharField(max_length=100, default="Ciudad no especificada")
    municipio_residencia = models.CharField(max_length=100, default="Municipio no especificado")
    corregimiento_residencia = models.CharField(max_length=100, default="Corregimiento no especificado")
    zona_residencial = models.CharField(max_length=500)
    direccion_residencia = models.CharField(max_length=500)
    barrio_residencia = models.CharField(max_length=500)
    comuna_barrio = models.CharField(max_length=20)
    telefono = models.CharField(max_length=30)
    estado_civil = models.CharField(max_length=30)
    identidad_etnico_racial = models.CharField(max_length=70)
    nombre_persona_de_confianza = models.CharField(max_length=200)
    relacion_persona_de_confianza = models.CharField(max_length=200)
    telefono_persona_de_confianza = models.CharField(max_length=100)
    pertenencia_grupo_poblacional = models.ManyToManyField(PertenenciaGrupoPoblacional,max_length=300, related_name="personas", blank=False) 
    
    def __str__(self):
        return f"Persona ID: {self.id_persona}, número documento: {self.numero_documento}, nombre: {self.nombre_y_apellido}" #! TODO: Cambiarlo con la info de todos los campos después

    class Meta:
        db_table = "Persona"


