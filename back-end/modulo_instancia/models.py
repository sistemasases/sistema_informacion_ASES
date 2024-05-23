"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define varios modelos que se utilizan para representar las sedes, semestres, cohortes e sedes de cohorte del sistema.
Cada modelo define diferentes campos y relaciones que se utilizan para almacenar información específica en una base de datos.
El modelo "sede" tiene tres campos: "codigo_univalle", "nombre" y "id_municipio".
El modelo "semestre" tiene seis campos: "nombre", "fecha_inicio", "fecha_fin", "semestre_actual", "estado" e "id_sede".
El modelo "cohorte" tiene cuatro campos: "id_number", "nombre", "tiempo_creacion" y "tiempo_modificacion".
Finalmente, el modelo "cohorte_sede" tiene dos campos que son las claves foráneas de los modelos "cohorte" e "sede", respectivamente.
Todos los modelos están asociados con una su tabla específica de la base de datos, que se define mediante la propiedad "db_table" de su clase "Meta".
"""

from django.db import models
from modulo_geografico.models import municipio
from django.contrib.auth.models import User

class sede (models.Model):
    id_municipio= models.ForeignKey(municipio,on_delete=models.CASCADE,default=0,related_name='id_municipio_in_sede')
    codigo_univalle = models.BigIntegerField()
    nombre= models.CharField(max_length=50)

    class Meta:
        db_table = "sede"

class semestre (models.Model):

    nombre= models.CharField(max_length=30)
    fecha_inicio= models.DateTimeField(auto_now_add=False)
    fecha_fin= models.DateTimeField(auto_now_add=False)
    semestre_actual= models.BooleanField(default= False)
    estado = models.SmallIntegerField(default=0)
    id_sede= models.ForeignKey(sede ,on_delete=models.CASCADE,default=None,null=True)

    class Meta:
        db_table = "semestre"

class cohorte (models.Model):

    id_number= models.CharField(max_length=20)
    nombre= models.CharField(max_length=50)
    tiempo_creacion= models.DateTimeField(auto_now_add=True)
    tiempo_modificacion= models.DateTimeField(auto_now_add=False)

    class Meta:
        db_table = "cohorte"

class cohorte_sede (models.Model):

    id_cohorte= models.ForeignKey(cohorte,on_delete=models.CASCADE,default=0)
    id_sede= models.ForeignKey(sede,on_delete=models.CASCADE,default=0)
    
    class Meta:
        db_table = "cohorte_sede"