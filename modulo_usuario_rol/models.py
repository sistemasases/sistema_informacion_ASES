from django.db import models
from modulo_geografico.models import barrio, municipio
from django.contrib.auth.models import User

# Create your models here.

class estudiante (models.Model):

    tipo_doc_ini= models.CharField(max_length=30)
    num_doc_ini= models.BigIntegerField()
    tipo_doc= models.CharField(max_length=30)
    dir_ini= models.CharField(max_length=50)
    barrio_ini=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_inicial')
    ciudad_ini=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_inicial')
    telefono_ini=models.BigIntegerField()
    dir_res= models.CharField(max_length=50)
    barrio_res=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_actual')
    ciudad_res=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_actual')
    telefono_res=models.BigIntegerField()
    email=models.CharField(max_length=100)
    acudiente=models.CharField(max_length=100)
    telefono_acudiente=models.BigIntegerField()
    sexo=models.CharField(max_length=20)
    colegio=models.CharField(max_length=60)
    estamento=models.CharField(max_length=10)
    estado_ases= models.BooleanField()
    celular=models.BigIntegerField()
    hijos=models.IntegerField()

    class Meta:
        db_table = "estudiante"

class rol (models.Model):

    nombre= models.CharField(max_length=30)
    descripcion=models.CharField(max_length=150)

    class Meta:
        db_table = "rol"

class usuario_rol (models.Model):

    id_rol= models.ForeignKey(rol,on_delete=models.CASCADE,default=0,related_name='rol_por_asignar')
    id_usuario= models.ForeignKey(User,on_delete=models.CASCADE,default=0,related_name='rol_usuario')
    estado= models.CharField(max_length=30)
    id_semestre= models.ForeignKey(rol,on_delete=models.CASCADE,default=0,related_name='semestre_realizacion')
    id_jefe= models.ForeignKey(User,on_delete=models.CASCADE,default=0,related_name='jefe')

    class Meta:
        db_table = "usuario_rol"

class permiso (models.Model):

    nombre= models.CharField(max_length=30)
    descripcion=models.CharField(max_length=150)

    class Meta:
        db_table = "permiso"

class rol_permiso (models.Model):

    id_rol= models.ForeignKey(rol,on_delete=models.CASCADE,default=0,related_name='rol')
    id_permiso= models.ForeignKey(permiso,on_delete=models.CASCADE,default=0,related_name='permiso_por_asignar')
    
    class Meta:
        db_table = "rol_permiso"