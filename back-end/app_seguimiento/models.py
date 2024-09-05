from django.db import models

from app_registro.models import Persona
from django.contrib.auth.models import User
from datetime import date

class Profesional(models.Model):
    id_profesional = models.AutoField(primary_key=True)
    nombre_profesional = models.TextField()
    cargo_profesional = models.CharField(max_length=100, blank=True, default="sin cargo")


class Seguimiento(models.Model):
    id_seguimiento = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, on_delete=models.CASCADE, blank=False, null=False, related_name="seguimientos")
    fecha = models.DateField(default=date.today, blank=True)
    observacion = models.TextField(blank=True, default="Sin observación")
    id_creador_campus = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_creador_campus')
    profesional = models.ManyToManyField(Profesional, blank=True, default="N/A")

    class Meta:
        db_table = "Seguimiento"
    
    def __str__(self):
        return f"Seguimientos {self.id_seguimiento}"
