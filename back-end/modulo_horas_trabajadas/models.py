from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from datetime import datetime, date
from modulo_usuario_rol.models import usuario_rol
from modulo_instancia.models import semestre 


class RegistroHoras(models.Model):
    trabajador = models.ForeignKey(User, on_delete=models.CASCADE, related_name="registro_horas")
    fecha = models.DateField(verbose_name="Fecha")
    hora_inicio = models.TimeField(verbose_name="Hora de inicio")
    hora_fin = models.TimeField(verbose_name="Hora de fin")
    descripcion = models.TextField(
        verbose_name="Descripción",
        blank=True,
        null=True
    )
    horas_trabajadas = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        verbose_name="Horas trabajadas",
        editable=False,
    )
    rol = models.ForeignKey(usuario_rol, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.hora_inicio and self.hora_fin:
            if self.hora_fin <= self.hora_inicio:
                raise ValidationError("La hora de fin debe ser mayor a la hora de inicio.")

    def calcular_horas(self):
        inicio = datetime.combine(date.today(), self.hora_inicio)
        fin = datetime.combine(date.today(), self.hora_fin)
        diferencia = fin - inicio
        return round(diferencia.seconds / 3600, 1)

    def save(self, *args, **kwargs):
        self.horas_trabajadas = self.calcular_horas()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Registro de horas"
        verbose_name_plural = "Registros de horas"
        ordering = ["-fecha", "hora_inicio"]



class TemporadaTrabajo(models.Model):
    trabajador = models.ForeignKey(User, on_delete=models.CASCADE, related_name="temporadas_trabajo")
    semestre = models.ForeignKey(semestre, on_delete=models.CASCADE, related_name="temporadas_trabajo")
    horas_semanales = models.PositiveSmallIntegerField(verbose_name="Horas semanales",default=20)
    fecha_inicio = models.DateField(
        verbose_name="Fecha de inicio del trabajador en el semestre"
    )
    fecha_fin = models.DateField(
        verbose_name="Fecha de fin del trabajador en el semestre",
        null=True,
        blank=True,
        help_text="Si está vacío, se usa la fecha de fin del semestre"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Temporada de trabajo"
        verbose_name_plural = "Temporadas de trabajo"
        unique_together = [("trabajador", "semestre")]

    def clean(self):
        if self.fecha_inicio and self.semestre_id:
            if self.fecha_inicio < self.semestre.fecha_inicio.date():
                raise ValidationError(
                    "La fecha de inicio no puede ser anterior al inicio del semestre."
                )

        if self.fecha_fin and self.semestre_id:
            if self.fecha_fin > self.semestre.fecha_fin.date():
                raise ValidationError(
                    "La fecha de fin no puede superar la fecha de fin del semestre."
                )

        if self.fecha_inicio and self.fecha_fin:
            if self.fecha_fin <= self.fecha_inicio:
                raise ValidationError(
                    "La fecha de fin debe ser mayor a la fecha de inicio."
                )