from .models import *
from .serializers import *
from modulo_academico.models import monitoria_academica
from modulo_instancia.models import sede
from modulo_usuario_rol.models import cohorte_estudiante
from modulo_usuario_rol.serializers import estudiante_serializer
from rest_framework.response import Response
from modulo_instancia.serializers import sede_serializer
from modulo_programa.serializers import programa_serializer
from modulo_programa.models import programa_estudiante, programa, estado_programa
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class sede_viewsets (viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'sede'.
    """
    serializer_class = sede_serializer

    queryset = sede_serializer.Meta.model.objects.all()


class enviar_programas_viewsets(viewsets.ModelViewSet):
    """
    Viewset para la gestión de 'programa'.
    """
    serializer_class = sede_serializer

    queryset = programa_serializer.Meta.model.objects.all()

class form_asistencia_academica(viewsets.GenericViewSet):
    queryset = asistencia.objects.all()
    serializer_class = monitoria_academica_serializer

    def create(self, request):

        try:
            estudiante_request = estudiante.objects.get(cod_univalle=int(request.data["codigo_estudiante"]))
        except:
             return Response({'mensaje':'No se encuentra el código suministrado en la Base de datos'},status=status.HTTP_404_NOT_FOUND)

        monitoria_resquest = monitoria_academica.objects.get(id=int(request.data["id_monitoria"]))

        asistencia_creada = asistencia.objects.create(
            id_monitoria = monitoria_resquest,
            id_estudiante = estudiante_request,
        )
        return Response({'mensaje':'Registro creado.'},status=status.HTTP_201_CREATED)
    
class form_primer_ingreso(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer

    def create(self, request):

        try:
            estudiante_request = estudiante.objects.get(cod_univalle=int(request.data["codigo_estudiante"]))
            return Response({'mensaje':'El estudiante ya está registrado en el sistema.'},status=status.HTTP_200_OK)
        except:

            Estudiante = estudiante.objects.create(
                    tipo_doc_ini = int(request.data["tipo_doc"]),
                    num_doc_ini = int(request.data["num_doc"]),
                    tipo_doc = str(request.data["tipo_doc"]),
                    num_doc = str(request.data["num_doc"]),
                    barrio_ini_id = '1',
                    ciudad_ini_id = '1',
                    dir_ini = '.',
                    telefono_ini = str(request.data["celular"]),
                    dir_res = '.',
                    telefono_res = str(request.data["celular"]),
                    email =str(request.data["correo"]),
                    acudiente = '.',
                    telefono_acudiente =str(request.data["celular"]),
                    sexo = str(request.data["sexo"]),
                    colegio = '.',
                    estamento = '.',
                    celular = str(request.data["celular"]),
                    hijos = '0',
                    barrio_res_id = '1',
                    ciudad_res_id = '1',
                    nombre = str(request.data["nombre"]),
                    apellido = str(request.data["apellido"]),
                    cod_univalle = int(request.data["codigo_estudiante"])
                    )
            estudiante_prog = programa_estudiante.objects.create(
                id_programa =  programa.objects.get(id=int(request.data["programa"])),
                id_estudiante = Estudiante,
                id_estado = estado_programa.objects.get(id= '1'),
                traker = True

            )
            return Response({'mensaje':'Registro creado.'},status=status.HTTP_201_CREATED)