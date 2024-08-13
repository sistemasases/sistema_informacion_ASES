from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.db import transaction
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_usuario_rol.models import estudiante
from modulo_instancia.models import semestre, sede
from modulo_instancia.serializers import semestre_serializer
from modulo_seguimiento.models import seguimiento_individual, inasistencia, riesgo_individual
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

    def list(self, request):
        lista_estudiantes = list()
        request_sede = sede.objects.get(codigo_univalle =int(request.GET.get('id_sede')))
        var_semestre = semestre.objects.get(semestre_actual=True,id_sede=request_sede.id)
        serializer_semestre = semestre_serializer(var_semestre)
        fecha_inicio = datetime.strptime(serializer_semestre.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
        fecha_fin = datetime.strptime(serializer_semestre.data['fecha_fin'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
        var_estudiante = estudiante.objects.filter(estudiante_elegible = True)
        for estudiante23 in var_estudiante :
            serializer_estudiante = ases_dexia_serializer(estudiante23)
            conteo_seguimientos = seguimiento_individual.objects.filter(
                                                            id_estudiante = estudiante23,
                                                            fecha__gt = fecha_inicio,
                                                            fecha__lt =fecha_fin,
                                                            ).count()
            conteo_inasistencia = inasistencia.objects.filter(
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

            if conteo_seguimientos > 6 :
                conteo = {
                    'conteo_seguimientos': conteo_seguimientos,
                    'conto_inasistencias': conteo_inasistencia,
                    'culmino_acompañamiento' : True,
                }
            else :
                conteo = {
                    'conteo_seguimientos': conteo_seguimientos,
                    'conto_inasistencias': conteo_inasistencia,
                    'culmino_acompañamiento' : False,
                }

            data = dict(serializer_estudiante.data,**conteo,**riesgo)
            lista_estudiantes.append(data)
        return Response(lista_estudiantes,status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        lista_estudiantes = list()
        request_sede = sede.objects.get(codigo_univalle =int(request.GET.get('id_sede')))
        var_semestre = semestre.objects.get(semestre_actual=True,id_sede=request_sede.id)
        serializer_semestre = semestre_serializer(var_semestre)
        fecha_inicio = datetime.strptime(serializer_semestre.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
        fecha_fin = datetime.strptime(serializer_semestre.data['fecha_fin'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")

        var_estudiante = estudiante.objects.filter(num_doc = pk)
        for estudiante23 in var_estudiante :
            serializer_estudiante = ases_dexia_serializer(estudiante23)
            
            conteo_seguimientos = seguimiento_individual.objects.filter(
                                                            id_estudiante = estudiante23,
                                                            fecha__gt = fecha_inicio,
                                                            fecha__lt =fecha_fin,
                                                            ).count()
            conteo_inasistencia = inasistencia.objects.filter(
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

            if conteo_seguimientos > 6 :
                conteo = {
                    'conteo_seguimientos': conteo_seguimientos,
                    'conto_inasistencias': conteo_inasistencia,
                    'culmino_acompañamiento' : True,
                }
            else :
                conteo = {
                    'conteo_seguimientos': conteo_seguimientos,
                    'conto_inasistencias': conteo_inasistencia,
                    'culmino_acompañamiento' : False,
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