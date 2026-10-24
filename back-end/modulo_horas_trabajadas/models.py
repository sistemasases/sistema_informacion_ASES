from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from datetime import datetime, date
from decimal import Decimal, ROUND_HALF_UP
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
    horas_total_contratadas = models.DecimalField(verbose_name = "Toras totales contatadas en semestre", max_digits=6, decimal_places=2, null=True, blank=True)
    total_festivos_temporada = models.SmallIntegerField(verbose_name = "numero de festivos en temporada", null = True, blank = True)
    is_default = models.BooleanField(default=True, blank=True, null=True)
    fecha_inicio = models.DateField(
        verbose_name="Fecha de inicio del trabajador en el semestre"
    )
    fecha_fin = models.DateField(
        verbose_name="Fecha de fin del trabajador en el semestre",
        null=True,
        blank=True,
        help_text="Si está vacío, se usa la fecha de fin del semestre"
    )
    precio_hora = models.PositiveIntegerField(verbose_name = "Precio hora", null=True, blank=True)


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

    # ── Métodos de cálculo (sin columnas adicionales) ──────────────────────

    def total_adiciones(self):
        """Suma de horas de todas las novedades de tipo ADICION."""
        from django.db.models import Sum
        resultado = self.novedades.filter(tipo=NovedadHoras.ADICION).aggregate(
            Sum('horas')
        )['horas__sum']
        return resultado if resultado is not None else Decimal('0')

    def total_disminuciones(self):
        """Suma de horas de todas las novedades de tipo DISMINUCION."""
        from django.db.models import Sum
        resultado = self.novedades.filter(tipo=NovedadHoras.DISMINUCION).aggregate(
            Sum('horas')
        )['horas__sum']
        return resultado if resultado is not None else Decimal('0')

    def total_horas_ajustadas(self):
        """horas_total_contratadas + Σadiciones − Σdisminuciones."""
        base = self.horas_total_contratadas or Decimal('0')
        return base + self.total_adiciones() - self.total_disminuciones()

    def calcular_horas_esperadas(self):
        """
        Horas que el monitor debería haber acumulado hasta ayer (o hasta
        fecha_fin si la temporada ya terminó), usando fórmula proporcional:

            horasEsperadas = (D_hoy_netos / D_periodo_netos) × total_ajustado

        Los festivos se distribuyen proporcionalmente con total_festivos_temporada.
        """
        from datetime import timedelta

        if not self.fecha_inicio or not self.horas_total_contratadas:
            return Decimal('0')

        hoy = date.today()
        corte = hoy - timedelta(days=1)
        fecha_fin = self.fecha_fin or hoy
        corte = min(corte, fecha_fin)

        if corte < self.fecha_inicio:
            return Decimal('0')

        def count_weekdays(start, end):
            if end < start:
                return 0
            return sum(
                1 for i in range((end - start).days + 1)
                if (start + timedelta(days=i)).weekday() < 5
            )

        D_periodo = count_weekdays(self.fecha_inicio, fecha_fin)
        festivos = int(self.total_festivos_temporada or 0)
        D_periodo_netos = max(0, D_periodo - festivos)

        if D_periodo_netos == 0:
            return Decimal('0')

        D_hoy = count_weekdays(self.fecha_inicio, corte)
        festivos_hoy = round(festivos * D_hoy / D_periodo) if D_periodo > 0 else 0
        D_hoy_netos = max(0, D_hoy - festivos_hoy)

        total_ajustado = self.total_horas_ajustadas()
        if total_ajustado <= 0:
            return Decimal('0')

        resultado = (
            Decimal(str(D_hoy_netos)) / Decimal(str(D_periodo_netos))
        ) * total_ajustado
        return resultado.quantize(Decimal('0.1'), rounding=ROUND_HALF_UP)


class NovedadHoras(models.Model):
    """Registro de adiciones o disminuciones de horas al contrato de una temporada."""

    ADICION = 'ADICION'
    DISMINUCION = 'DISMINUCION'
    TIPO_CHOICES = [
        (ADICION, 'Adición'),
        (DISMINUCION, 'Disminución'),
    ]

    temporada = models.ForeignKey(
        TemporadaTrabajo,
        on_delete=models.CASCADE,
        related_name='novedades',
        verbose_name="Temporada de trabajo",
    )
    tipo = models.CharField(
        max_length=20,
        choices=TIPO_CHOICES,
        verbose_name="Tipo de novedad",
    )
    horas = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        verbose_name="Horas ajustadas",
    )
    observacion = models.TextField(
        verbose_name="Observación",
        blank=True,
        null=True,
    )
    fecha_efectiva = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de registro",
    )

    class Meta:
        ordering = ['fecha_efectiva']
        verbose_name = "Novedad de horas"
        verbose_name_plural = "Novedades de horas"