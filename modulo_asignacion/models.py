from django.db import models
from modulo_usuario_rol.models import estudiante, usuario
from modulo_instancia.models import semestre

# Create your models here.

class asignacion(models.Model):

    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0)
    id_usuario= models.ForeignKey(usuario,on_delete=models.CASCADE,default=0)
    estado= models.BooleanField(default= True)
    id_semestre= models.ForeignKey(semestre,on_delete=models.CASCADE,default=0)
    
    class Meta:
        db_table = "asignacion"
