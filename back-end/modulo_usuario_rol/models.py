from django.db import models
from modulo_geografico.models import barrio, municipio
from modulo_instancia.models import semestre,cohorte
from django.contrib.auth.models import User
from django.core.validators import RegexValidator


# Create your models here.
class cond_excepcion(models.Model):

    cond_excepcion= models.CharField(max_length=200)
    alias= models.CharField(max_length=20)
    
    class Meta:
        db_table = "cond_excepcion"

class estado_civil(models.Model):

    estado_civil= models.CharField(max_length=30)

    class Meta:
        db_table = "estado_civil"

class identidad_gen(models.Model):

    genero= models.CharField(max_length=50)
    opcion_general= models.IntegerField(default=None,null=True)
    
    class Meta:
        db_table = "identidad_gen"

class act_simultanea(models.Model):

    actividad= models.CharField(max_length=70)
    opcion_general= models.IntegerField(default=None,null=True)
    
    class Meta:
        db_table = "act_simultanea"

class etnia(models.Model):

    etnia= models.CharField(max_length=70)
    opcion_general= models.IntegerField(default=None,null=True)
    
    class Meta:
        db_table = "etnia"

class discap_men(models.Model):

    nombre= models.CharField(max_length=100)
    codigo_men= models.IntegerField(default=None,null=True)
    
    class Meta:
        db_table = "discap_men"


class estudiante (models.Model):

    nombre= models.CharField(max_length=50,default=None)
    apellido = models.CharField(max_length=50,default=None)
    cod_univalle = models.CharField(max_length=12,unique = True)
    tipo_doc_ini= models.CharField(max_length=30)
    num_doc_ini= models.BigIntegerField()
    tipo_doc= models.CharField(max_length=30)
    num_doc= models.BigIntegerField(default=None)
    dir_ini= models.CharField(max_length=100, default=None)
    barrio_ini=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_inicial')
    ciudad_ini=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_inicial')
    telefono_ini=models.CharField(max_length=20, default=None, validators=[RegexValidator(regex=r'^[()\-0-9\s]+$', message='Por favor ingresa un teléfono o celular valido')])
    dir_res= models.CharField(max_length=100, default=None)
    barrio_res=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio_actual')
    ciudad_res=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad_actual')
    telefono_res=models.CharField(max_length=20, default=None, validators=[RegexValidator(regex=r'^[()\-0-9\s]+$', message='Por favor ingresa un teléfono o celular valido')])
    email=models.CharField(max_length=100, default=None)
    sexo=models.CharField(max_length=20)
    colegio=models.CharField(max_length=100, default=None)
    estamento=models.CharField(max_length=20, default=None)
    estado_ases= models.BooleanField(default=True)
    celular=models.CharField(max_length=20, default=None, validators=[RegexValidator(regex=r'^[()\-0-9\s]+$', message='Por favor ingresa un teléfono o celular valido')])
    hijos=models.IntegerField(default=0)
    acudiente=models.CharField(max_length=100, default=None)
    telefono_acudiente=models.CharField(max_length=20, default=None, validators=[RegexValidator(regex=r'^[()\-0-9\s]+$', message='Por favor ingresa un teléfono o celular valido')])
    fecha_nac = models.DateTimeField(auto_now_add=False,null=True)
    ciudad_nac = models.ForeignKey(municipio ,on_delete=models.CASCADE,default=None,null=True,related_name='ciudad_nacimiento')
    observacion = models.CharField(max_length=500, default=None,null=True)
    id_discapacidad =models.ForeignKey(discap_men,on_delete=models.CASCADE,default=None,null=True,related_name='discap_men_in_estudiante')
    vive_con = models.JSONField(default=dict, null=True)
    id_cond_excepcion=models.ForeignKey(cond_excepcion ,on_delete=models.CASCADE,default=None,null=True,related_name='cond_excepcion_in_estudiante')
    id_estado_civil=models.ForeignKey(estado_civil ,on_delete=models.CASCADE,default=None,null=True,related_name='estado_civil_in_estudiante')
    id_identidad_gen=models.ForeignKey(identidad_gen,on_delete=models.CASCADE,default=None,null=True,related_name='identidad_gen_in_estudiante')
    id_act_simultanea=models.ForeignKey(act_simultanea,on_delete=models.CASCADE,default=None,null=True,related_name='act_simultanea_in_estudiante')
    anio_ingreso=models.DateTimeField(auto_now_add=False,null=True)
    actividades_ocio_deporte=models.CharField(max_length=200, default=None,null=True)
    json_detalle = models.CharField(max_length=1000, default=None,null=True)
    puntaje_icfes=models.IntegerField(default=None,null=True)
    id_etnia=models.ForeignKey(etnia,on_delete=models.CASCADE,default=None,null=True,related_name='etnia_in_estudiante')
    ult_modificacion=models.DateTimeField(auto_now_add=False,null=True)
    es_discapacidad = models.BooleanField(default=False, null=True)
    encuesta_admitido = models.BooleanField(default=False, null=True)

    class Meta:
        db_table = "estudiante"

class rol (models.Model):

    nombre= models.CharField(max_length=30)
    descripcion=models.CharField(max_length=150)

    class Meta:
        db_table = "rol"
    def __str__(self):
        return self.nombre




class monitor (models.Model):
    id_user= models.ForeignKey(User,on_delete=models.CASCADE,default=None,related_name='id_user', null=True)
    tipo_doc= models.CharField(max_length=30, null=True)
    cod_univalle = models.CharField(max_length=12,unique = True)
    num_doc= models.BigIntegerField(default=None, null=True)
    dir_res= models.CharField(max_length=50, default=None, null=True)
    barrio_res=models.ForeignKey(barrio ,on_delete=models.CASCADE,default=0,related_name='barrio', null=True)
    ciudad_res=models.ForeignKey(municipio ,on_delete=models.CASCADE,default=0,related_name='ciudad', null=True)
    sexo=models.CharField(max_length=20, null=True)
    telefono=models.BigIntegerField(default=None, null=True)
    celular=models.BigIntegerField(default=0, null=True)
    acudiente=models.CharField(max_length=100, default=None, null=True)
    telefono_acudiente=models.BigIntegerField(default=None, null=True)
    fecha_nac = models.DateTimeField(auto_now_add=False,null=True)
    observacion = models.CharField(max_length=500, default=None,null=True)
    anio_ingreso=models.DateTimeField(auto_now_add=False,null=True)
    ult_modificacion=models.DateTimeField(auto_now_add=False,null=True)

    class Meta:
        db_table = "monitor"

    def __str__(self):
        return str(self.num_doc)




class usuario_rol (models.Model):

    id_rol= models.ForeignKey(rol,on_delete=models.CASCADE,default=0,related_name='rol_por_asignar')
    id_usuario= models.ForeignKey(User,on_delete=models.CASCADE,default=0,related_name='rol_usuario')
    estado= models.CharField(max_length=30,default="ACTIVO")
    id_semestre= models.ForeignKey(semestre,on_delete=models.CASCADE,default=0,related_name='semestre_realizacion')
    id_jefe= models.ForeignKey(User,on_delete=models.CASCADE,default=None,related_name='jefe',null=True)

    class Meta:
        db_table = "usuario_rol"
    def __str__(self):
        return str(self.id_usuario)

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


class firma_tratamiento_datos(models.Model):

    id_estudiante= models.OneToOneField(estudiante,on_delete=models.CASCADE)
    tipo_id_estudiante= models.CharField(max_length=10,default=None)
    fecha_firma = models.DateTimeField(auto_now_add=False,null=False)
    nombre_firma= models.CharField(max_length=50,default=None)
    correo_firma= models.CharField(max_length=50,default=None)
    autoriza_tratamiento_datos= models.BooleanField(default=False)
    autoriza_tratamiento_imagen= models.BooleanField(default=False)
    class Meta:
        db_table = "firma_tratamiento_datos"