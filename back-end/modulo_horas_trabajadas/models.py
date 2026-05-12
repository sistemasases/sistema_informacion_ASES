from django.db import models
from django.contrib.auth.models import User
from modulo_usuario_rol.models import usuario_rol


# Create your models here.


class RegistroHoras(models.Model):
    trabajador = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "registro_horas")
    semana_inicio = models.DateField(verbose_name="Inicio de semana")
    horas_trabajadas = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        verbose_name="Horas trabajadas",
    )
    rol = models.ForeignKey(usuario_rol, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Registro de horas"
        verbose_name_plural = "Registros de horas"
        ordering = ["-semana_inicio"]
        constraints = [
            models.UniqueConstraint(
                fields=["trabajador", "semana_inicio"],
                name="unique_registro_por_trabajador_por_semana",
            )
        ]
