"""
Autor: Juan D. Gil T.
Correo: juan.gil.trujillo@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-07-08
Descripción: Este código define un enrutador de Django que se utiliza para crear rutas URL para las vistas utilizando viewsets. 
Luego, se crean URLs para estas vistas y se agrega a 'urlpatterns'.
"""

from rest_framework.routers import DefaultRouter
from modulo_campus_diverso.views import *

router = DefaultRouter()


# ====================== Módulo Persona ====================== #
router.register(r'persona', persona_viewsets, basename='persona')
router.register(r'pertenencia_grupo_poblacional', pertenencia_grupo_poblacional_viewsets, basename='pertenencia_grupo_poblacional')
router.register(r'relacion_persona_confianza', relacion_persona_confianza_viewsets, basename='relacion_persona_confianza')
router.register(r'identidad_etnico_racial', identidad_etnico_racial_viewsets, basename='identidad_etnico_racial')
router.register(r'persona-estudiante', persona_estudiante_viewsets, basename='persona-estudiante')



# ====================== Módulo Diversidad Sexual ====================== #
router.register(r'diversidad-sexual', diversidad_sexual_viewsets, basename='diversidad-sexual')
router.register(r'pronombre', pronombre_viewsets, basename='pronombre')
router.register(r'identidad-genero', identidad_genero_viewsets, basename='identidad-genero')
router.register(r'expresion-genero', expresion_genero_viewsets, basename='expresion-genero')
router.register(r'orientacion-sexual', orientacion_sexual_viewsets, basename='orientacion-sexual')
router.register(r'respuesta-cambio-documento', respuesta_cambio_documento_viewsets, basename='respuesta-cambio-documento')

 
 
 
 
# ====================== Módulo Información General ====================== #
router.register(r'informacion-general', informacion_general_viewsets,basename="informacion-general")
router.register(r'ocupacion-actual', ocupacion_actual_viewsets, basename="ocupacion-actual")
router.register(r'actividad-tiempo-libre', actividad_tiempo_libre_viewsets,basename="actividad-tiempo-libre")
router.register(r'fuente-ingresos', fuente_ingresos_viewsets,basename="fuente-ingresos")
router.register(r'convivencia-vivienda', convivencia_vivienda_viewsets,basename="convivencia-vivienda")
router.register(r'red-apoyo', red_apoyo_viewsets,basename="red-apoyo")
router.register(r'factor-riesgo', factor_riesgo_viewsets,basename="factor-riesgo")
router.register(r'acompañamiento-recibido', acompañamiento_recibido_viewsets,basename="acompañamiento-recibido")


# ====================== Módulo Información Académica ====================== # 
router.register(r'informacion-academica', informacion_academica_viewsets, basename="informacion-academica")
router.register(r'estamento', estamento_viewsets, basename="estamento")




# ====================== Módulo Documentos Autorización ====================== # 
router.register(r'documentos-autorizacion', documentos_autorizacion_viewsets, basename='documentos-autorizacion')




# ====================== Módulo Seguimiento ====================== #   
router.register(r'seguimiento', seguimiento_viewsets, basename="seguimiento")




urlpatterns = router.urls