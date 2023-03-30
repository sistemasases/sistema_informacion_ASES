"""
Autor: Deiby A. Rodriguez R.
Correo: deiby.rodriguez@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-03-28
Descripción: Este código define varios modelos que se utilizan para representar las instancias, semestres, cohortes e instancias de cohorte del sistema.
Cada modelo define diferentes campos y relaciones que se utilizan para almacenar información específica en una base de datos.
El modelo "instancia" tiene tres campos: "codigo", "nombre" y "descripcion".
El modelo "semestre" tiene seis campos: "nombre", "fecha_inicio", "fecha_fin", "semestre_actual", "estado" e "id_instancia".
El modelo "cohorte" tiene cuatro campos: "id_number", "nombre", "tiempo_creacion" y "tiempo_modificacion".
Finalmente, el modelo "cohorte_instancia" tiene dos campos que son las claves foráneas de los modelos "cohorte" e "instancia", respectivamente.
Todos los modelos están asociados con una su tabla específica de la base de datos, que se define mediante la propiedad "db_table" de su clase "Meta".
"""

from django.db import models

class instancia (models.Model):

    codigo= models.IntegerField()
    nombre= models.CharField(max_length=30)
    descripcion= models.CharField(max_length=150)

    class Meta:
        db_table = "instancia"

class semestre (models.Model):

    nombre= models.CharField(max_length=30)
    fecha_inicio= models.DateTimeField(auto_now_add=False)
    fecha_fin= models.DateTimeField(auto_now_add=False)
    semestre_actual= models.BooleanField(default= False)
    estado = models.SmallIntegerField(default=0)
    id_instancia= models.ForeignKey(instancia ,on_delete=models.CASCADE,default=0)

    class Meta:
        db_table = "semestre"

class cohorte (models.Model):

    id_number= models.IntegerField()
    nombre= models.CharField(max_length=30)
    tiempo_creacion= models.DateTimeField(auto_now_add=True)
    tiempo_modificacion= models.DateTimeField(auto_now_add=False)

    class Meta:
        db_table = "cohorte"

class cohorte_instancia (models.Model):

    id_cohorte= models.ForeignKey(cohorte,on_delete=models.CASCADE,default=0)
    id_instancia= models.ForeignKey(instancia,on_delete=models.CASCADE,default=0)
    
    class Meta:
        db_table = "cohorte_instancia"
