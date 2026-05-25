from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from datetime import datetime, date
from modulo_usuario_rol.models import usuario_rol


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
        editable=False,  # No se edita manualmente, se calcula solo
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