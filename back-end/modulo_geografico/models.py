from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.

class departamento (models.Model):

    codigo_divipola= models.IntegerField()
    nombre= models.CharField(max_length=50)

    class Meta:
        db_table = "departamento"

class municipio (models.Model):

    codigo_divipola= models.BigIntegerField()
    cod_dep=models.ForeignKey(departamento,on_delete=models.CASCADE,default=0)
    nombre= models.CharField(max_length=50)
    class Meta:
        db_table = "municipio"

class barrio (models.Model):

    codigo_barrio= models.BigIntegerField()
    cod_municipio=models.ForeignKey(municipio,on_delete=models.CASCADE,default=0)
    estrato= models.IntegerField(validators=[MaxValueValidator(10)])
    nombre= models.CharField(max_length=50)

    class Meta:
        db_table = "barrio"