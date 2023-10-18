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


class dis_estudiante(models.Model):

    tipo_discapacidad = models.CharField(
        max_length=3,
        choices=TipoDiscapacidad.choices,
        default=TipoDiscapacidad.COGNITIVA)

    adquisicion = models.CharField(
        max_length=12,
        choices=TipoAdquisicion.choices,
        default=TipoAdquisicion.OTRA)

    class Meta:
        db_table = "dis_estudiante"


class dis_estudiante__estudiante(models.Model):

    id_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE)

    id_discapacidad_estudiante = models.ForeignKey(
        dis_estudiante,
        on_delete=models.CASCADE,
        related_name="estudiante")

    class Meta:
        db_table = "dis_estudiante__estudiante"
