from .models import *
from .serializers import *
from modulo_academico.models import monitoria_academica
from modulo_academico.serializers import monitoria_academica_serializer
from modulo_instancia.models import sede
from modulo_usuario_rol.models import cohorte_estudiante
from modulo_usuario_rol.serializers import estudiante_serializer
from rest_framework.response import Response
from modulo_instancia.serializers import sede_serializer
from modulo_programa.serializers import programa_serializer_form
from modulo_programa.models import programa_estudiante, programa, estado_programa
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from modulo_usuario_rol.models import User, firma_tratamiento_datos
from modulo_usuario_rol.serializers import firma_tratamiento_datos_serializer


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
    serializer_class = programa_serializer_form

    queryset = programa_serializer_form.Meta.model.objects.all()


class enviar_monitorias_viewsets(viewsets.GenericViewSet):
    """
    Viewset para la gestión de 'monitoria'.
    """
    serializer_class = monitoria_academica_serializer

    def list(self, request):
        queryset = monitoria_academica.objects.all()
        serializer = monitoria_academica_serializer(queryset, many=True)
        dicc_monitorias = []
        for monitoria in serializer.data:

            nombre_monitor = User.objects.get(
                id=monitoria["id_monitor"])
            dicc_monitorias = [{
                "id": monitoria["id"],
                "id_monitor": monitoria["id_monitor"],
                "nombre_monitor": nombre_monitor.first_name + " " + nombre_monitor.last_name,
                "materia": monitoria["materia"],
                "id_sede": monitoria["id_sede"],
            }]
        return Response(dicc_monitorias, status=status.HTTP_200_OK)


class form_asistencia_academica(viewsets.GenericViewSet):
    queryset = asistencia.objects.all()
    serializer_class = monitoria_academica_serializer

    def create(self, request):

        try:
            estudiante_request = estudiante.objects.get(
                cod_univalle=int(request.data["codigo_estudiante"]))
        except:
            return Response({'mensaje': 'No se encuentra el código suministrado en la Base de datos'}, status=status.HTTP_404_NOT_FOUND)

        monitoria_resquest = monitoria_academica.objects.get(
            id=int(request.data["id_monitoria"]))

        asistencia_creada = asistencia.objects.create(
            id_monitoria=monitoria_resquest,
            id_estudiante=estudiante_request,
        )
        return Response({'mensaje': 'Registro creado.'}, status=status.HTTP_201_CREATED)


class form_primer_ingreso(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer

    def create(self, request):
        print(request.data)
        if(programa.objects.filter(id=int(
            request.data["programa"]))):
            programa_data = programa.objects.get(id=int(
                request.data["programa"]))
        else:
            return Response({'mensaje': 'El programa suministrado no existe.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            estudiante_request = estudiante.objects.get(
                cod_univalle=int(request.data["codigo_estudiante"]))
            if(programa_estudiante.objects.filter(
                id_estudiante=estudiante_request,id_programa=programa_data)):
                return Response({'mensaje': 'El estudiante ya está registrado en el sistema.'}, status=status.HTTP_409_CONFLICT)
            else:
                estudiante_prog = programa_estudiante.objects.create(
                id_programa=programa.objects.get(
                    id=int(request.data["programa"])),
                id_estudiante=estudiante_request,
                id_estado=estado_programa.objects.get(id='1'),
                traker=True

                )
                return Response({'mensaje': 'El estudiante ya está registrado, pero en otro programa. Se asignó el estudiante al nuevo programa.'}, status=status.HTTP_201_CREATED)
            
        except:

            Estudiante = estudiante.objects.create(
                tipo_doc_ini=str(request.data["tipo_doc"]),
                num_doc_ini=int(request.data["num_doc"]),
                tipo_doc=str(request.data["tipo_doc"]),
                num_doc=int(request.data["num_doc"]),
                barrio_ini_id='1',
                ciudad_ini_id='1',
                dir_ini='.',
                telefono_ini=str(request.data["celular"]),
                dir_res='.',
                telefono_res=str(request.data["celular"]),
                email=str(request.data["correo"]),
                acudiente='.',
                telefono_acudiente=str(request.data["celular"]),
                sexo=str(request.data["sexo"]),
                colegio='.',
                estamento='.',
                celular=str(request.data["celular"]),
                hijos='0',
                barrio_res_id='1',
                ciudad_res_id='1',
                nombre=str(request.data["nombre"]),
                apellido=str(request.data["apellido"]),
                cod_univalle=int(request.data["codigo_estudiante"])
            )
            estudiante_prog = programa_estudiante.objects.create(
                id_programa=programa.objects.get(
                    id=int(request.data["programa"])),
                id_estudiante=Estudiante,
                id_estado=estado_programa.objects.get(id='1'),
                traker=True

            )
            return Response({'mensaje': 'Registro creado.'}, status=status.HTTP_201_CREATED)
class firma_tratamiento_datos_view(viewsets.GenericViewSet):
    queryset = firma_tratamiento_datos.objects.all()
    serializer_class = firma_tratamiento_datos_serializer
    def create(self, request):
        serializer = firma_tratamiento_datos_serializer(data=request.data)
        if serializer.is_valid():
            documento = serializer.data["documento"]
            if estudiante.objects.filter(num_doc=documento).exists():
                consulta_estudiante = estudiante.objects.filter(num_doc=documento).first()
                if firma_tratamiento_datos.objects.filter(id_estudiante=consulta_estudiante).exists():
                    return Response({'Respuesta': 'Este estudiante ya ha firmado'}, status=status.HTTP_400_BAD_REQUEST)
                try:
                    Firma = firma_tratamiento_datos.objects.create(
                        id_estudiante=consulta_estudiante,
                        fecha_firma=serializer.data["fecha_firma"],
                        tipo_id_estudiante=serializer.data["tipo_id_estudiante"],
                        nombre_firma=serializer.data["nombre_firma"],
                        correo_firma=serializer.data["correo_firma"],
                        autoriza_tratamiento_datos=bool(serializer.data["autoriza_tratamiento_datos"]),
                        autoriza_tratamiento_imagen=bool(serializer.data["autoriza_tratamiento_imagen"])
                    )
                    return Response({'Respuesta': 'Se creó la firma'}, status=status.HTTP_200_OK)
                except Exception as e:
                    print(f"Error al crear la firma: {str(e)}")
                    return Response({'Respuesta': 'Error al crear la firma'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'Respuesta': 'No existe un estudiante con ese documento'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  