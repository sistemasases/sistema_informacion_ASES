"""
Autor: Juan D. Gil T.
Correo: juan.gil.trujillo@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-07-08
Descripción: Este código define las funciones que se utilizaran al momento 
de realizar las peticiones al servidor de Django, 
para ello se utilizó viewsets en cada función view debido a su flexibilidad 
en la personalización de los tipos de peticiones HTTP y su simplicidad de 
implementación.
"""

from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response 
from modulo_campus_diverso.serializers import *

# Create your views here.

# ====================== Módulo Persona ====================== #

class pertenencia_grupo_poblacional_viewsets (viewsets.ModelViewSet):
    serializer_class = PertenenciaGrupoPoblacionalSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PertenenciaGrupoPoblacionalSerializer.Meta.model.objects.all()

class identidad_etnico_racial_viewsets (viewsets.ModelViewSet):
    serializer_class = IdentidadEtnicoRacialSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = IdentidadEtnicoRacialSerializer.Meta.model.objects.all()

class relacion_persona_confianza_viewsets (viewsets.ModelViewSet):
    serializer_class = RelacionPersonaConfianzaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RelacionPersonaConfianzaSerializer.Meta.model.objects.all()


class persona_viewsets (viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PersonaSerializer.Meta.model.objects.all()
    lookup_field = 'num_doc'
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def update(self, request, num_doc=None): 
        persona = get_object_or_404(campus_diverso_persona, num_doc=num_doc)  
        serializer = self.get_serializer(persona, data=request.data, partial=True) 
        if serializer.is_valid(raise_exception=True):  
            self.perform_update(serializer)
             # Crear una instancia de campus_diverso_persona_estudiante
            persona_estudiante_data = {
                'id_persona': persona.id,  # Utiliza el ID de la persona recién creada
                # Otras propiedades de campus_diverso_persona_estudiante
            }
            persona_estudiante_serializer = PersonaEstudianteSerializer(data=persona_estudiante_data)
            if persona_estudiante_serializer.is_valid():
                persona_estudiante_serializer.save()
            else:
                # Maneja errores de validación de campus_diverso_persona_estudiante aquí
                return Response({'error': 'Error al crear campus_diverso_persona_estudiante'}, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data)
        return Response(serializer.errors) 











# ====================== Módulo Diversidad Sexual ====================== #

class respuesta_cambio_documento_viewsets (viewsets.ModelViewSet):
    serializer_class = RespuestaCambioDocumentoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RespuestaCambioDocumentoSerializer.Meta.model.objects.all()
 

class orientacion_sexual_viewsets (viewsets.ModelViewSet):
    serializer_class = OrientacionSexualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = OrientacionSexualSerializer.Meta.model.objects.all()
 

class expresion_genero_viewsets (viewsets.ModelViewSet):
    serializer_class = ExpresionGeneroSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ExpresionGeneroSerializer.Meta.model.objects.all()

 
class identidad_genero_viewsets (viewsets.ModelViewSet):
    serializer_class = IdentidadGeneroSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = IdentidadGeneroSerializer.Meta.model.objects.all()


class pronombre_viewsets (viewsets.ModelViewSet):
    serializer_class = PronombreSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PronombreSerializer.Meta.model.objects.all()


class diversidad_sexual_viewsets (viewsets.ModelViewSet):
    serializer_class = DiversidadSexualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = DiversidadSexualSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
 
    def retrieve(self, request, id_persona=None):
        diversidad_sexual = get_object_or_404(campus_diverso_diversidad_sexual, id_persona__num_doc=id_persona)
        diversidad_sexual_serializer = DiversidadSexualSerializer(diversidad_sexual)
        return Response(diversidad_sexual_serializer.data) 
 
    def update(self, request, id_persona=None): 
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        diversidad_sexual = get_object_or_404(campus_diverso_diversidad_sexual, id_persona=persona)  
        serializer = self.get_serializer(diversidad_sexual, data=request.data, partial=True) 
        if serializer.is_valid(raise_exception=True):  
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

    def destroy(self, request, id_persona=None):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        diversidad_sexual = get_object_or_404(campus_diverso_diversidad_sexual, id_persona=persona)  
        self.perform_destroy(diversidad_sexual)
        return Response(status=status.HTTP_204_NO_CONTENT) 











 
# ====================== Módulo Información General ====================== #


 
class factor_riesgo_viewsets(viewsets.ModelViewSet):
    serializer_class = FactorRiesgoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FactorRiesgoSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        factor_riesgo = get_object_or_404(campus_diverso_factor_riesgo, id_factor_riesgo=pk)
        serializer = self.get_serializer(factor_riesgo, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

 
class red_apoyo_viewsets (viewsets.ModelViewSet):
    serializer_class = RedApoyoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = RedApoyoSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        red_apoyo = get_object_or_404(campus_diverso_red_apoyo, id_red_apoyo=pk)
        serializer = self.get_serializer(red_apoyo, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

 
class convivencia_vivienda_viewsets (viewsets.ModelViewSet):
    serializer_class = ConvivenciaViviendaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ConvivenciaViviendaSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        convivencia_vivienda = get_object_or_404(campus_diverso_convivencia_vivienda, id_convivencia_vivienda=pk)
        serializer = self.get_serializer(convivencia_vivienda, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

 
class fuente_ingresos_viewsets (viewsets.ModelViewSet):
    serializer_class = FuenteIngresosSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = FuenteIngresosSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        fuente_ingresos = get_object_or_404(campus_diverso_fuente_ingresos, id_fuente_ingresos=pk)
        serializer = self.get_serializer(fuente_ingresos, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 

 
class actividad_tiempo_libre_viewsets (viewsets.ModelViewSet):
    serializer_class = ActividadTiempoLibreSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = ActividadTiempoLibreSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs):
        actividad_tiempo_libre = get_object_or_404(campus_diverso_actividad_tiempo_libre, id_actividad_tiempo_libre=pk)
        serializer = self.get_serializer(actividad_tiempo_libre, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 
 

class ocupacion_actual_viewsets (viewsets.ModelViewSet):
    serializer_class = OcupacionActualSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = OcupacionActualSerializer.Meta.model.objects.all()
    
class acompañamiento_recibido_viewsets  (viewsets.ModelViewSet):
    serializers_class = AcompañamientoRecibidoSerializer
    queryset = AcompañamientoRecibidoSerializer.Meta.model.objects.all()

    def update(self, request, pk=None, *args, **kwargs):
        acompañamiento_recibido = get_object_or_404(campus_diverso_acompañamiento_recibido, id_acompañamiento_recibido=pk)
        serializer = self.get_serializer(acompañamiento_recibido, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)    


class informacion_general_viewsets (viewsets.ModelViewSet):
    serializer_class = InformacionGeneralSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = InformacionGeneralSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def retrieve(self, request, id_persona=None ): 
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona) 
        informacion_general = get_object_or_404(campus_diverso_informacion_general, id_persona=persona) 
        informacion_general_serializer = InformacionGeneralSerializer(informacion_general) 
        return Response(informacion_general_serializer.data)
    
    def update(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        informacion_general = get_object_or_404(campus_diverso_informacion_general, id_persona=persona)
        serializer = self.get_serializer(informacion_general, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def destroy(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        informacion_general = get_object_or_404(campus_diverso_informacion_general, id_persona=persona)
        self.perform_destroy(informacion_general)
        return Response(status=status.HTTP_204_NO_CONTENT)

 
 
 
 
 
 
 
 
 
# ====================== Módulo Información Académica ====================== # 

class estamento_viewsets(viewsets.ModelViewSet):
    serializer_class = EstamentoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = EstamentoSerializer.Meta.model.objects.all()


class informacion_academica_viewsets(viewsets.ModelViewSet):
    serializer_class = InformacionAcademicaSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = InformacionAcademicaSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().partial_update(request, *args, **kwargs)
    
    def retrieve(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        informacion_academica = get_object_or_404(campus_diverso_informacion_academica, id_persona=persona)
        informacion_academica_serializer = InformacionAcademicaSerializer(informacion_academica)
        return Response(informacion_academica_serializer.data)
    
    def update(self, request, id_persona=None):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        informacion_academica = get_object_or_404(campus_diverso_informacion_academica, id_persona=persona)
        serializer = self.get_serializer(informacion_academica, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def destroy(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        informacion_academica = get_object_or_404(campus_diverso_informacion_academica, id_persona=persona)
        self.perform_destroy(informacion_academica)
        return Response(status=status.HTTP_204_NO_CONTENT)







# ====================== Módulo Documentos Autorización ====================== # 


class documentos_autorizacion_viewsets(viewsets.ModelViewSet):
    serializer_class = DocumentosAutorizacionSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = DocumentosAutorizacionSerializer.Meta.model.objects.all()
    lookup_field = 'id_persona'
    
    def get_serializer(self, *args, **kwargs):  
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)
    
    def retrieve(self, request, id_persona=None, *args, **kwargs):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        documentos_autorizacion = get_object_or_404(campus_diverso_documentos_autorizacion, id_persona=persona)
        documentos_autorizacion_serializer = DocumentosAutorizacionSerializer(documentos_autorizacion)
        return Response(documentos_autorizacion_serializer.data)
    
    def update(self, request, id_persona=None): 
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        documentos_autorizacion = get_object_or_404(campus_diverso_documentos_autorizacion, id_persona=persona)  
        serializer = self.get_serializer(documentos_autorizacion, data=request.data, partial=True) 
        if serializer.is_valid(raise_exception=True):  
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors) 
    
    def destroy(self, request, id_persona=None):
        persona = get_object_or_404(campus_diverso_persona, num_doc=id_persona)
        documentos_autorizacion = get_object_or_404(campus_diverso_documentos_autorizacion, id_persona=persona)  
        self.perform_destroy(documentos_autorizacion)
        return Response(status=status.HTTP_204_NO_CONTENT) 
    
    




# ====================== Módulo Seguimiento ====================== #   

class seguimiento_viewsets(viewsets.ModelViewSet):
    serializer_class = SeguimientoSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = SeguimientoSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs): 
        segumiento = get_object_or_404(campus_diverso_seguimiento, id_seguimiento=pk)
        serializer = self.get_serializer(segumiento, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)
    
    # ====================== Person Estudiante ====================== #   

class persona_estudiante_viewsets(viewsets.ModelViewSet):
    serializer_class = PersonaEstudianteSerializer
    # permission_classes = (IsAuthenticated,)
    queryset = PersonaEstudianteSerializer.Meta.model.objects.all()
    
    def update(self, request, pk=None, *args, **kwargs): 
        personaestudiante = get_object_or_404(campus_diverso_persona_estudiante, id_personaestudiante=pk)
        serializer = self.get_serializer(personaestudiante, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors)