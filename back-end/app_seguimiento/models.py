from django.db import models

from app_registro.models import Persona

class Seguimiento(models.Model):
    id_seguimiento = models.AutoField(primary_key=True)
    id_persona = models.ForeignKey(Persona, on_delete=models.CASCADE, blank=False, null=False, related_name="seguimientos")
    fecha = models.DateField()
    observacion = models.TextField(blank=False, null=False)
    
    class Meta:
        db_table = "Seguimiento"
    
    def __str__(self):
        return f"DocumentosAutorizacion {self.id_seguimiento}"
