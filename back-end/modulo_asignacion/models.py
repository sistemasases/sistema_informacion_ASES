from django.db import models
from modulo_usuario_rol.models import estudiante
from modulo_instancia.models import semestre
from django.contrib.auth.models import User

# Create your models here.

class asignacion(models.Model):

    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0,related_name='id_estudiante_in_asignacion')
    id_usuario= models.ForeignKey(User,on_delete=models.CASCADE,default=0,related_name='id_usuario_UE')
    estado= models.BooleanField(default= True)
    id_semestre= models.ForeignKey(semestre,on_delete=models.CASCADE,default=0)
    
    class Meta:
        db_table = "asignacion"


