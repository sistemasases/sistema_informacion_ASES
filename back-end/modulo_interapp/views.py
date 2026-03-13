from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.db import transaction
from django.contrib.auth.models import User
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_usuario_rol.models import estudiante, usuario_rol
from modulo_instancia.models import semestre, sede
from modulo_instancia.serializers import semestre_serializer
from modulo_seguimiento.models import seguimiento_individual, inasistencia, riesgo_individual
from modulo_asignacion.models import asignacion
from .serializers import ases_dexia_serializer

class send_ases(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    # permission_classes = [IsAuthenticated]

    def get_nivel_riesgo(self, riesgo): 
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo == None or riesgo == 'None':
            return 'SIN RIESGO'
        
    @action(detail=True, methods=['post'], url_path='estudiantes_socioedu')
    def estudiantes_socioedu_ases_dexia(self, request,pk=None):
        lista_estudiantes = list()
        try:
            request_sede = sede.objects.get(codigo_univalle=pk)
        except sede.DoesNotExist:
            return Response({'error': 'Sede no encontrada con ese código_univalle.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            var_semestre = semestre.objects.get(semestre_actual=True, id_sede=request_sede.id)
        except semestre.DoesNotExist:
            return Response({'error': 'No hay semestre actual para esta sede.'}, status=status.HTTP_404_NOT_FOUND)

        serializer_semestre = semestre_serializer(var_semestre)

        try:
            fecha_inicio = datetime.strptime(serializer_semestre.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
            fecha_fin = datetime.strptime(serializer_semestre.data['fecha_fin'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
        except Exception:
            return Response({'error': 'Error procesando las fechas del semestre.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Filtrar estudiantes relacionados con la sede y semestre actual
        var_estudiante = estudiante.objects.filter(
            estudiante_elegible=True,
            es_discapacidad=False,
            es_academico=False,
            id_estudiante_in_asignacion__id_semestre=var_semestre,
            id_estudiante_in_asignacion__estado=True
        ).distinct()

        for estudiante23 in var_estudiante :
            serializer_estudiante = ases_dexia_serializer(estudiante23)
            conteo_seguimientos = seguimiento_individual.objects.filter(
                                                            id_estudiante = estudiante23,
                                                            fecha__gt = fecha_inicio,
                                                            fecha__lt =fecha_fin,
                                                            ).count()
            seguimiento_reciente = riesgo_individual.objects.filter( id_estudiante = estudiante23).values('id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad', 'fecha')
            if seguimiento_reciente:
                riesgo = {
                                'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_individual']),
                                'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_familiar']),
                                'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_academico']),
                                'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_economico']),
                                'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_vida_universitaria_ciudad']),
                            }
            else:
                riesgo = {
                            'riesgo_individual': "SIN RIESGO",
                            'riesgo_familiar': "SIN RIESGO",
                            'riesgo_academico': "SIN RIESGO",
                            'riesgo_economico': "SIN RIESGO",
                            'riesgo_vida_universitaria_ciudad': "SIN RIESGO",
                        }
             # Obtener el correo del profesional responsable
            try:
                monitor_asignado = asignacion.objects.get(
                    id_estudiante=estudiante23,
                    id_semestre=var_semestre,
                    estado=True
                )
                practicante = usuario_rol.objects.get(
                    id_usuario=monitor_asignado.id_usuario,
                    id_semestre=var_semestre
                )
                profesional = usuario_rol.objects.get(
                    id_usuario=practicante.id_jefe,
                    id_semestre=var_semestre
                )
                responsable = profesional.id_jefe.email
            except Exception:
                responsable = "Correo no disponible"
                
            porcentaje_avance = (conteo_seguimientos / 5) * 100
            if porcentaje_avance >= 100 :
                conteo = {
                        'criterio': [{'id':6,'porcentaje_avance': 100,}],
                        'culmino_acompañamiento' : True,
                        'responsable': responsable,
                }
            else :
                conteo = {
                        'criterio': [{'id':6,'porcentaje_avance': porcentaje_avance,}],
                        'culmino_acompañamiento' : False,
                        'responsable': responsable,
                    }

            data = dict(serializer_estudiante.data,**conteo,**riesgo)
            lista_estudiantes.append(data)
        return Response(lista_estudiantes,status=status.HTTP_200_OK)
    
class receive_ases(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]

class send_disc(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]

class receive_disc(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]