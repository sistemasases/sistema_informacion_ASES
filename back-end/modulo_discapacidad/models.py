from django.db import models
from modulo_usuario_rol.models import estudiante


class TipoDiscapacidad(models.TextChoices):
    FISICA = "FIS", "Física"
    MULTIPLE = "MUL", "Múltiple"
    PSICOSOCIAL = "PSI", "Psicosocial"
    SENSORIAL = "SEN", "Sensorial"
    COGNITIVA = "COG", "Cognitiva"


class TipoAdquisicion(models.TextChoices):
    VIOLENCIA = "VIOLENCIA", "Víctima de violencias"
    HEREDITARIO = "HEREDITARIO", "Enfermedad de orden hereditario"
    GENETICO = "GENETICO", "Enfermedad de orden genético"
    GENERAL = "GENERAL", "Enfermedad general"
    OTRA = "OTRA", "Otra"


class discapacidad_estudiante(models.Model):

    estudiante = models.OneToOneField(
        estudiante, 
        related_name="discapacidad",
        on_delete=models.CASCADE)

    tipo_discapacidad = models.CharField(
        max_length=3,
        choices=TipoDiscapacidad.choices,
        default=TipoDiscapacidad.COGNITIVA)

    adquisicion = models.CharField(
        max_length=12,
        choices=TipoAdquisicion.choices,
        default=TipoAdquisicion.OTRA)

    estado_discapacidad = models.BooleanField(default=True)

    class Meta:
        db_table = "discapacidad_estudiante"
