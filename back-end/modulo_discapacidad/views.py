from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status

from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_instancia.models import semestre
from modulo_instancia.serializers import semestre_serializer

class estudiante_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_estudiantes_discapacidad = estudiante.objects.filter(es_discapacidad = True).distinct().order_by('cod_univalle')
        respuesta = estudiante_serializer(lista_estudiantes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)
       
class semestres_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_sedes_discapacidad = semestre.objects.filter(id_sede = '11').distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_sedes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)

'''   
nombre (tipo_discapacidad)
diagnostico 1 = estado (asignacion_discapacidad)
diagnostico 2 (N/A)
email (estudiante) 
programas_academicos = nombre (programa)
cond_excepcion (cond_excepcion) //repetido
egresado/curso/desertor (N/A)
profesional (user)
practicante (user)
monitor (user O monitor)
trayectoria (N/A)
telefono_ini (estudiante)

DATOS GENERALES

tipo_doc (estudiante)
num_doc (estudiante)
nombre (estudiante)
apellido (estudiante)
anio_ingreso (estudiante)
email (estudiante)
celular (estudiante)
telefono_ini (estudiante)
dir_res (estudiante)
barrio_res (estudiante)
etnia (etnia)
sexo (estudiante)
genero (identidad_gen)
deportes (act_simultanea)
cond_excepcion (cond_excepcion) //repetido
acudiente (estudiante)
telefono_acudiente (estudiante)
'''  