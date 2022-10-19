from django.db import models
from modulo_geografico.models import barrio, municipio
from modulo_instancia.models import semestre,cohorte
from django.contrib.auth.models import User


# Create your models here.

class estudiante (models.Model):

    nombre= models.CharField(max_length=50,default=None)
    apellido = models.CharField(max_length=50,default=None)
    cod_univalle = models.CharField(max_length=12,unique = True)
    tipo_doc_ini= models.CharField(max_length=30)
    num_doc_ini= models.BigIntegerField()
    tipo_doc= models.CharField(max_length=30)
    num_doc= models.BigIntegerField(default=None)
    dir_ini= models.CharField(max_length=50, default=None)
    barrio_ini=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_inicial')
    ciudad_ini=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_inicial')
    telefono_ini=models.BigIntegerField(default=None)
    dir_res= models.CharField(max_length=50, default=None)
    barrio_res=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_actual')
    ciudad_res=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_actual')
    telefono_res=models.BigIntegerField(default=None)
    email=models.CharField(max_length=100, default=None)
    acudiente=models.CharField(max_length=100, default=None)
    telefono_acudiente=models.BigIntegerField(default=None)
    sexo=models.CharField(max_length=20)
    colegio=models.CharField(max_length=60, default=None)
    estamento=models.CharField(max_length=10, default=None)
    estado_ases= models.BooleanField(default=True)
    celular=models.BigIntegerField(default=0)
    hijos=models.IntegerField(default=0)

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
    estado= models.CharField(max_length=30,default="ACTIVO")
    id_semestre= models.ForeignKey(semestre,on_delete=models.CASCADE,default=0,related_name='semestre_realizacion')
    id_jefe= models.ForeignKey(User,on_delete=models.CASCADE,default=1,related_name='jefe')

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

class cohorte_estudiante(models.Model):

    id_cohorte= models.ForeignKey(cohorte,on_delete=models.CASCADE,default=0)
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=0)
    tiempo_creacion= models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = "cohorte_estudiante"