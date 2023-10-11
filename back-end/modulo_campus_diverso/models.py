"""
Autor: Juan D. Gil T.
Correo: juan.gil.trujillo@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-07-08
Descripción: Este código define varios modelos que se utilizan para representar 
los diferentes módulos que conforman la ficha de registro para utilizar el servicio 
de acompañamiento de Campus Diverso
Cada modelo define diferentes campos y relaciones que se utilizan para almacenar 
información específica en una base de datos.
Adicionalmente existen modelos diccionario que tienen como propósito realizar una 
relación de "muchos a muchos" además de extender la información de dichos 
campos según sea necesario (después de todo, en la ficha de registro existen campos 
con respuestas abiertas por la persona o usuario) 
Todos los modelos están asociados con una su tabla específica de la base de datos, que se define mediante la propiedad "db_table" de su clase "Meta".
"""

from django.db import models
from modulo_usuario_rol.models import estudiante
from django.contrib.auth.models import User
# Create your models here.

# ====================== Módulo Persona ====================== #

class campus_diverso_pertenencia_grupo_poblacional(models.Model):
    """
    Esta clase es una tabla diccionario del modelo Persona
    """
    nombre_grupo_poblacional = models.CharField(max_length=300, unique=True) 

    class Meta:
        db_table = "campus_diverso_pertenencia_grupo_poblacional"
    
    def _str_(self):
        return self.nombre_grupo_poblacional

class campus_diverso_identidad_etnico_racial(models.Model):
    """
    Esta clase es una tabla diccionario del modelo Persona
    """
    nombre_grupo_poblacional = models.CharField(max_length=300, unique=True) 

    class Meta:
        db_table = "campus_diverso_identidad_etnico_racial"
    

class campus_diverso_relacion_persona_de_confianza(models.Model):
    """
    Esta clase es una tabla diccionario del modelo Persona
    """
    nombre_grupo_poblacional = models.CharField(max_length=300, unique=True) 

    class Meta:
        db_table = "campus_diverso_relacion_persona_de_confianza"
    


class campus_diverso_persona(models.Model):
    incluir_correo_en_respuesta = models.BooleanField(default=False)
    nombre_identitario = models.CharField(max_length=150)
    estrato_socioeconomico = models.IntegerField()
    ciudad_nacimiento = models.CharField(max_length=100, default="Ciudad no especificada")
    corregimiento_nacimiento = models.CharField(max_length=100, default="Corregimiento no especificado")
    departamento_nacimiento = models.CharField(max_length=100)
    pais_nacimiento = models.CharField(max_length=100)
    ciudad_residencia = models.CharField(max_length=100, default="Ciudad no especificada")
    corregimiento_residencia = models.CharField(max_length=100, default="Corregimiento no especificado")
    zona_residencial = models.CharField(max_length=100)
    direccion_residencia = models.CharField(max_length=200)
    barrio_residencia = models.CharField(max_length=150)
    comuna_barrio = models.CharField(max_length=20)
    identidad_etnico_racial = models.ForeignKey(campus_diverso_identidad_etnico_racial,on_delete=models.CASCADE, default=None, null=True, related_name="identidad_etnico_racial_in_campus_diverso_persona") #este
    nombre_persona_de_confianza = models.CharField(max_length=100)
    relacion_persona_de_confianza = models.ForeignKey(campus_diverso_relacion_persona_de_confianza,on_delete=models.CASCADE, default=None, null=True, related_name="relacion_persona_de_confianza_in_campus_diverso_persona") #este
    telefono_persona_de_confianza = models.CharField(max_length=100)
    pertenencia_grupo_poblacional = models.ManyToManyField(campus_diverso_pertenencia_grupo_poblacional,max_length=300, related_name="pertenencia_grupo_poblacional_in_campus_diverso_persona", blank=False) 
    
    class Meta:
        db_table = "campus_diverso_persona"
        
class campus_diverso_persona_estudiante(models.Model):

    id_persona= models.ForeignKey(campus_diverso_persona,on_delete=models.CASCADE,default=None, null=True,related_name="id_persona_in_campus_diverso_persona_estudiante")
    id_estudiante= models.ForeignKey(estudiante,on_delete=models.CASCADE,default=None, null=True,related_name="id_estudiante_in_campus_diverso_persona_estudiante")
    
    class Meta:
        db_table = "campus_diverso_persona_estudiante"


# ====================== Módulo Diversidad Sexual ====================== #

class campus_diverso_respuesta_cambio_documento(models.Model):
    """
    Esta clase es una tabla diccionario del modelo DiversidadSexual
    """
    nombre_respuesta_cambio_documento = models.TextField(unique=True)
    
      
    class Meta:
        db_table = "campus_diverso_respuesta_cambio_documento"

class campus_diverso_orientacion_sexual(models.Model):
    """
    Esta clase es una tabla diccionario del modelo DiversidadSexual
    """
    nombre_orientacion_sexual = models.CharField(max_length=200, unique=True)

      
    class Meta:
        db_table = "campus_diverso_orientacion_sexual"

class campus_diverso_expresion_genero(models.Model):
    """
    Esta clase es una tabla diccionario del modelo DiversidadSexual
    """
    nombre_expresion_genero = models.CharField(max_length=200, unique=True)
    
    class Meta:
        db_table = "campus_diverso_expresion_genero"

class campus_diverso_identidad_genero(models.Model):
    """
    Esta clase es una tabla diccionario del modelo DiversidadSexual
    """
    nombre_identidad_genero = models.CharField(max_length=200, unique=True)
    

    class Meta:
        db_table = "campus_diverso_identidad_genero"

class campus_diverso_pronombre(models.Model):
    """
    Esta clase es una tabla diccionario del modelo DiversidadSexual
    """
    nombre_pronombre = models.CharField(max_length=50, unique=True)
    
      
    class Meta:
        db_table = "campus_diverso_pronombre"

class campus_diverso_diversidad_sexual(models.Model):
    id_persona = models.OneToOneField(campus_diverso_persona, on_delete=models.CASCADE, null=False, blank=False, related_name="DiversidadSexual") 
    cambio_nombre_sexo_documento = models.CharField(max_length=50)
    recibir_orientacion_cambio_en_documento = models.BooleanField()
    pronombres = models.ManyToManyField(campus_diverso_pronombre, max_length=50)
    identidades_de_genero = models.ManyToManyField(campus_diverso_identidad_genero,max_length=200)
    expresiones_de_genero = models.ManyToManyField(campus_diverso_expresion_genero,max_length=200)
    orientaciones_sexuales = models.ManyToManyField(campus_diverso_orientacion_sexual,max_length=200)
    respuestas_cambio_documento = models.ManyToManyField(campus_diverso_respuesta_cambio_documento)

    class Meta:
        db_table = "campus_diverso_diversidad_sexual"
    
      

# ====================== Módulo Información General ====================== #
 

class campus_diverso_ocupacion_actual(models.Model):
    """
    Esta clase es una tabla diccionario del modelo InformacionGeneral
    """
    nombre_ocupacion_actual = models.CharField(max_length=200, unique=True)
    
    class Meta:
        db_table = "campus_diverso_ocupacion_actual"


class campus_diverso_actividad_tiempo_libre(models.Model):
    nombre_actividad_tiempo_libre = models.CharField(max_length=200)
    observacion_actividad_tiempo_libre = models.TextField(blank=True, null=False, default="Sin observación")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name="id_informacion_general_in_campus_diverso_actividad_tiempo_libre", blank=True)
    
    class Meta:
        db_table = "campus_diverso_actividad_tiempo_libre"
    
   
class campus_diverso_fuente_ingresos(models.Model):

    nombre_fuente_ingresos = models.CharField(max_length=200)
    observacion_fuente_ingresos = models.TextField(blank=True, default="Sin Observación")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name='id_informacion_general_in_campus_diverso_fuente_ingresos', blank=True)
    
    class Meta:
        db_table = "campus_diverso_fuente_ingresos"
    
 
class campus_diverso_convivencia_vivienda(models.Model):

    nombre_convivencia_vivienda = models.CharField(max_length=200)
    observacion_convivencia_vivienda = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name='id_informacion_general_in_campus_diverso_convivencias_en_vivienda', blank=True)
    
    class Meta:
        db_table = "campus_diverso_convivencia_vivienda"
  
class campus_diverso_red_apoyo(models.Model):

    nombre_red_apoyo = models.CharField(max_length=200)
    observacion_red_apoyo = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name='id_informacion_general_in_campus_diverso_red_de_apoyo', blank=True)
    
    class Meta:
        db_table = "campus_diverso_red_apoyo"
    
class campus_diverso_factor_riesgo(models.Model):

    nombre_factor_riesgo = models.CharField(max_length=200)
    observacion_factor_riesgo = models.TextField(blank=True, default="Sin observacion")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name='id_informacion_general_in_campus_diverso_factores_de_riesgo', blank=True)
    
    class Meta:
        db_table = "campus_diverso_factor_riesgo"
    
class campus_diverso_acompañamiento_recibido(models.Model):
    
    nombre_acompañamiento_recibido = models.CharField(max_length=200)
    observacion_acompanamiento_recibido = models.TextField(blank=True, default="Sin observaciones")
    id_informacion_general = models.ForeignKey('campus_diverso_informacion_general', on_delete=models.CASCADE, related_name='id_informacion_general_in_campus_diverso_acompañamiento_recibido', blank=True)
    
    class Meta:
        db_table = "campus_diverso_acompañamiento_recibido"





class campus_diverso_informacion_general(models.Model):

    fecha= models.DateField(auto_now_add=False)
    id_persona = models.OneToOneField(campus_diverso_persona_estudiante, on_delete=models.CASCADE, null=False, blank=False, related_name="id_persona_in_campus_diverso_informacion_general")
    creacion= models.DateTimeField(auto_now_add=True)
    modificacion= models.DateTimeField(auto_now=True)
    id_creador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_creador_in_campus_diverso_informacion_general')
    id_modificador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_modificador_in_campus_diverso_informacion_general')
    dedicacion_externa = models.CharField(max_length=100,null=True)
    tiene_eps = models.CharField(max_length=20, default="Desconocido")
    nombre_eps = models.CharField(max_length=200,default="Sin observacion" )
    regimen_eps = models.CharField(max_length=50, default="Sin regimen")
    tipo_entidad_acompanamiento_recibido = models.TextField(null=True)
    calificacion_acompanamiento_recibido = models.IntegerField(null=True)
    motivo_calificacion_acompanamiento = models.TextField(null=True)
    actividades_especificas_tiempo_libre = models.TextField(null=True)
    observacion_general_actividades_especificas_tiempo_libre = models.TextField(null=True)
    observacion_general_fuente_de_ingresos = models.TextField(null=True)
    calificacion_relacion_familiar = models.IntegerField(null=True)
    relacion_familiar = models.IntegerField(null=True)
    observacion_general_redes_de_apoyo = models.TextField(null=True)
    observacion_general_factores_de_riesgo = models.TextField(null=True)
    creencia_religiosa = models.TextField(null=True)
    decision_encuentro_inicial_con_profesional = models.CharField(max_length=30, null=True)
    observacion_horario = models.TextField(blank=False, default="Sin observación")
    origen_descubrimiento_campus_diverso = models.CharField(max_length=300, null=True)
    comentarios_o_sugerencias_de_usuario = models.TextField(null=True)
    ocupaciones_actuales = models.ForeignKey(campus_diverso_ocupacion_actual, on_delete=models.CASCADE,null=True,related_name='id_ocupaciones_actuales') 

    class Meta:
        db_table = "campus_diverso_informacion_general"




# ====================== Módulo Información Académica ====================== # 

class campus_diverso_estamento(models.Model):
    """
    Esta clase es una tabla diccionario del modelo InformacionAcademica
    """
    nombre_estamento = models.CharField(max_length=100, unique=True)
    
    class Meta:
        db_table = "campus_diverso_estamento"
    

class campus_diverso_informacion_academica(models.Model):

    id_persona_estudiante = models.OneToOneField(campus_diverso_persona_estudiante, on_delete=models.CASCADE, null=False, blank=False, related_name="id_persona_in_campus_diverso_informacion_academica")
    pertenencia_univalle = models.BooleanField()
    sede_universidad = models.CharField(max_length=20)
    nombre_programa_academico = models.CharField(max_length=100)
    semestre_academico = models.IntegerField()
    estamentos = models.ManyToManyField(campus_diverso_estamento, max_length=100, related_name="id_informacion_academica")
    
    class Meta:
        db_table = "campus_diverso_informacion_academica"
    



# ====================== Módulo Documentos Autorización ====================== # 

class campus_diverso_documentos_autorizacion(models.Model):

    id_persona = models.OneToOneField(campus_diverso_persona_estudiante, on_delete=models.CASCADE, null=False, blank=False, related_name="id_persona_in_campus_diverso_documentos_autorizacion")
    autorizacion_manejo_de_datos = models.BooleanField()
    firma_consentimiento_informado = models.BooleanField()
    firma_terapia_hormonal = models.BooleanField(null=True, blank=True)
    documento_digital_y_archivo = models.BooleanField(null=True, blank=True)
    apgar_familiar = models.IntegerField(null=True)
    ecomapa = models.BooleanField(null=True, blank=True)
    arbol_familiar = models.BooleanField(null=True, blank=True)

    class Meta:
        db_table = "campus_diverso_documentos_autorizacion"



# ====================== Módulo Seguimiento ====================== #   

class campus_diverso_seguimiento(models.Model):

    id_persona = models.ForeignKey(campus_diverso_persona_estudiante, on_delete=models.CASCADE, blank=False, null=False, related_name="seguimientos")
    creacion= models.DateTimeField(auto_now_add=True)
    modificacion= models.DateTimeField(auto_now=True)
    id_creador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_creador_in_campus_diverso_seguimiento')
    id_modificador = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name='id_modificador_in_campus_diverso_seguimiento')
    fecha = models.DateTimeField(blank=True, null=True)
    observacion = models.TextField(blank=False, null=False)
    
    class Meta:
        db_table = "campus_diverso_seguimiento"
