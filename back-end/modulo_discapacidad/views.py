from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status

from .serializers import ficha_estudiante_disc_serializer, asignacion_disc_serializer, accesibilidad_serializer
from .models import asignacion_discapacidad, accesibilidad
from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_instancia.models import semestre
from modulo_instancia.serializers import semestre_serializer 
from modulo_programa.serializers import programa_estudiante_ficha_serializer
from modulo_programa.models import programa_estudiante
from rest_framework.decorators import action
from django.db.models import F, Prefetch

class estudiante_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_estudiantes_discapacidad = estudiante.objects.filter(es_discapacidad = True).distinct().order_by('cod_univalle')
        respuesta = estudiante_serializer(lista_estudiantes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'], url_path='ficha_estudiante_disc')
    def datos_ficha_estudiante(self, request, pk=None):

        request_sede = int(request.GET.get('id_sede'))
        var_estudiante = estudiante.objects.prefetch_related(Prefetch('id_estudiante_in_cohorte_estudiante')).get(id=pk)
        serializer_estudiante = ficha_estudiante_disc_serializer(var_estudiante)
        dic_asignaciones={}
        diccionario_programas = {}

        try:
            semestre_activo = semestre.objects.filter(semestre_actual=True, id_sede =request_sede).values('id')
            consulta_asig = asignacion_discapacidad.objects.select_related('id_usuario').filter(id_estudiante=serializer_estudiante.data['id'], estado=True,id_semestre=semestre_activo[0]['id'])
            asig_serializado = asignacion_disc_serializer(consulta_asig,  many=True)
            dic_asignaciones = {'asignaciones': asig_serializado.data}
        except:
            dic_asignaciones = {'asignaciones': list()}
        
        lista_programas = []
        try :

            ids_del_estudiante_para_sus_progamas = estudiante.objects.filter(num_doc=serializer_estudiante.data['num_doc']).values('id', 'cod_univalle')
            ids_estudiantes = [item['id'] for item in ids_del_estudiante_para_sus_progamas]
            consulta_programa = programa_estudiante.objects.select_related('id_programa').filter(id_estudiante__in=ids_estudiantes)
            programas_serializados =programa_estudiante_ficha_serializer(consulta_programa,many=True)
            diccionario_programas = {'programas': programas_serializados.data}


        except :
            dic_programa = {'error': 'sin programa asignado o no se encontraro coincidencias'
                            }  # Agregar el estado del curso al diccionario

            dic = {}
            dic.update(dic_programa)
            lista_programas.append(dic)
            diccionario_programas = {'programas': lista_programas}
            

        result = dict(serializer_estudiante.data, **dic_asignaciones, **diccionario_programas)
        return Response(result)
    
    @action(detail=True, methods=['get'], url_path='datos_accesibilidad')
    def datos_accesibilidad(self, request, pk=None):

        request_semestre = int(request.GET.get('id_semestre'))
        var_accesbilidad = accesibilidad.objects.filter(id_estudiante=pk,id_semestre=request_semestre)
        serializer_accesibilidad = accesibilidad_serializer(var_accesbilidad)
        
        return Response(serializer_accesibilidad.data)
       
class semestres_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_sedes_discapacidad = semestre.objects.filter(id_sede = '11').distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_sedes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)