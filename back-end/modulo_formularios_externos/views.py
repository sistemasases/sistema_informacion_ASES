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
from modulo_formularios_externos.models import firma_tratamiento_datos_temp
from modulo_formularios_externos.serializers import FirmaTempSerializer
from modulo_usuario_rol.models import User, firma_tratamiento_datos
from modulo_usuario_rol.serializers import firma_tratamiento_datos_serializer
from datetime import datetime, timedelta
from rest_framework.decorators import action


from datetime import datetime, timedelta, date
from django.utils import timezone


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
        queryset = monitoria_academica.objects.filter(estado=True)
        serializer = monitoria_academica_serializer(queryset, many=True)
        list_monitorias = []
        for monitoria in serializer.data:

            nombre_monitor = User.objects.get(
                id=monitoria["id_monitor"])
            dicc_monitorias = {
                "id": monitoria["id"],
                "id_monitor": monitoria["id_monitor"],
                "nombre_monitor": nombre_monitor.first_name + " " + nombre_monitor.last_name,
                "materia": monitoria["materia"],
                "id_sede": monitoria["id_sede"],
            }
            list_monitorias.append(dicc_monitorias)
        return Response(list_monitorias, status=status.HTTP_200_OK)


class form_asistencia_academica(viewsets.GenericViewSet):
    queryset = asistencia.objects.all()
    serializer_class = monitoria_academica_serializer

    def create(self, request):

        try:
            estudiante_request = estudiante.objects.get(
                cod_univalle=int(request.data["codigo_estudiante"]))
        except:
            return Response({'mensaje': 'No se encuentra el código suministrado en la Base de datos'}, status=status.HTTP_404_NOT_FOUND)

        monitoria_request = monitoria_academica.objects.get(
            id=int(request.data["id_monitoria"]))

        # verificacion 2 en 1 día
        asistencias = asistencia.objects.filter(
            id_estudiante=estudiante_request.id)
        try:
            if not asistencias:
                asistencia_creada = asistencia.objects.create(
                    id_monitoria=monitoria_request,
                    id_estudiante=estudiante_request,
                )
                return Response({'mensaje': 'Registro creado.'}, status=status.HTTP_201_CREATED)
            else:
                fecha_request = str(request.data["fecha"])
                monitoria_id = int(request.data["id_monitoria"])

                for i in asistencias:
                    fecha_asistencia = str(i.fecha)
                    if fecha_request == fecha_asistencia and monitoria_id == i.id_monitoria.id:
                        return Response(
                            {'mensaje': 'El estudiante ya asistió a esta monitoria en la fecha suministrada'},
                            status=status.HTTP_409_CONFLICT
                        )

                # Si no se encontró conflicto, crea el registro
                asistencia_creada = asistencia.objects.create(
                    id_monitoria=monitoria_request,
                    id_estudiante=estudiante_request,
                )
                return Response({'mensaje': 'Registro creado.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            # print(f"Error durante la transacción: {e}")
            return Response({'mensaje': 'Ocurrió un error durante la transacción, intente nuevamente.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class form_primer_ingreso(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer

    def create(self, request):
        # print(request.data)
        if (programa.objects.filter(id=int(
                request.data["programa"]))):
            programa_data = programa.objects.get(id=int(
                request.data["programa"]))
        else:
            return Response({'mensaje': 'El programa suministrado no existe.'}, status=status.HTTP_404_NOT_FOUND)
        try:
            estudiante_request = estudiante.objects.get(
                cod_univalle=int(request.data["codigo_estudiante"]))
            if (programa_estudiante.objects.filter(
                    id_estudiante=estudiante_request, id_programa=programa_data)):
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
            fecha = datetime(2000, 1, 1, 0, 0, 0)
            fecha = timezone.make_aware(fecha, timezone.get_current_timezone())
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
                cod_univalle=int(request.data["codigo_estudiante"]),
                estudiante_elegible=False,
                es_academico=True,
                fecha_nac = fecha
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
        # print(request.data)
        serializer = firma_tratamiento_datos_serializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            documento = serializer.data["documento"]
            if estudiante.objects.filter(num_doc=documento).exists():

                # si el estudiante existe traemos todos los estudiantes con ese documento, pueden haber varios registros
                # del mismo estudinate por que se puedes haber matriculado en varios programas
                consulta_estudiante = estudiante.objects.filter(
                    num_doc=documento)
                firma_creada = False  # Bandera para verificar si se creo una firma

                for estudiante_firma in consulta_estudiante:
                    # print(estudiante_firma)
                    if estudiante_firma.firma_existe == False:
                        try:
                            estudiante_firma.firma_existe = True
                            estudiante_firma.save()
                            if firma_tratamiento_datos.objects.filter(id_estudiante=estudiante_firma).exists():
                                firma_creada = firma_tratamiento_datos.objects.get(id_estudiante=estudiante_firma)
                                fechaFirma = firma_creada.fecha_firma.strftime("%Y-%m-%d")
                                nombreFirma = firma_creada.id_estudiante.nombre + " " + firma_creada.id_estudiante.apellido

                                return Response({'Respuesta': f'El estudiante {nombreFirma} ya ha firmado en la fecha {fechaFirma}'}, status=status.HTTP_400_BAD_REQUEST)
                            Firma = firma_tratamiento_datos.objects.create(
                                id_estudiante=estudiante_firma,
                                fecha_firma=serializer.data["fecha_firma"],
                                tipo_id_estudiante=serializer.data["tipo_id_estudiante"],
                                nombre_firma=serializer.data["nombre_firma"],
                                correo_firma=serializer.data["correo_firma"],
                                autoriza_tratamiento_datos=bool(
                                    serializer.data["autoriza_tratamiento_datos"]
                                ),
                                autoriza_tratamiento_imagen=bool(
                                    serializer.data["autoriza_tratamiento_imagen"]
                                )
                            )
                            firma_creada = True
                        except Exception as e:
                            print(f"Error al crear la firma: {str(e)}")
                            return Response({'Respuesta': 'Error al crear la firma'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    else:
                        if firma_tratamiento_datos.objects.filter(id_estudiante=estudiante_firma).exists():
                            firma_creada = firma_tratamiento_datos.objects.get(id_estudiante=estudiante_firma)
                            fechaFirma = firma_creada.fecha_firma.strftime("%Y-%m-%d")
                            nombreFirma = firma_creada.id_estudiante.nombre + " " + firma_creada.id_estudiante.apellido

                            return Response({'Respuesta': f'El estudiante {nombreFirma} ya ha firmado en la fecha {fechaFirma}'}, status=status.HTTP_400_BAD_REQUEST)
                        Firma = firma_tratamiento_datos.objects.create(
                            id_estudiante=estudiante_firma,
                            fecha_firma=serializer.data["fecha_firma"],
                            tipo_id_estudiante=serializer.data["tipo_id_estudiante"],
                            nombre_firma=serializer.data["nombre_firma"],
                            correo_firma=serializer.data["correo_firma"],
                            autoriza_tratamiento_datos=bool(
                                serializer.data["autoriza_tratamiento_datos"]
                            ),
                            autoriza_tratamiento_imagen=bool(
                                serializer.data["autoriza_tratamiento_imagen"]
                            )
                        )
                        firma_creada = True  # Actualizamos la bandera
                # Si al final del for no se creó ninguna firma, mostramos la alerta
                if firma_creada == False:
                    return Response({'Respuesta': 'Este estudiante ya ha firmado'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'Respuesta': 'Se creó la firma'}, status=status.HTTP_200_OK)
            else:
                # en caso de que el estudiante no exista, creamos un registro temporal
                firma_temp = FirmaTempSerializer(data = request.data)

                documento = firma_temp.initial_data["documento"]

                # validamos si ya existe un registro temporal con ese documento
                if firma_tratamiento_datos_temp.objects.filter(documento=documento).exists():
                    firma_creada = firma_tratamiento_datos_temp.objects.get(documento=documento)
                    fechaFirma = firma_creada.fecha_firma.strftime("%Y-%m-%d")
                    nombreFirma = firma_creada.nombre_firma + " " 


                    return Response({'Respuesta': f'El estudiante {nombreFirma} ya ha firmado en la fecha {fechaFirma}'}, status=status.HTTP_400_BAD_REQUEST)

                # creamos el registro temporal
                if firma_temp.is_valid():
                    firma_temp.save()
                else:
                    return Response(firma_temp.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                

                return Response({'Respuesta': 'Se creo el registro.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class firma_temp_viewsets(viewsets.GenericViewSet):
    """
    viewset para el modelo firma_tratamiento_datos_temp
    """

    @action(detail=False, methods=['post'], url_path='pasarFirmasTemporales')
    def pasarFirmasTemporales(self, request):
        """
        este endpoint pasa las firmas temporales al modelo firma_tratamiento_datos, lo que hara es obtener todas las
        firmas temporales e ira una por una mirando si existe un estudiante con el mismo domento que NO tenga firma
        en el sistema, si lo encuentra creara la firma en el modelo firma_tratamiento_datos y actualizara el campo firma_existe del estudiante a True
        """
        
        # obtenesmos todos los registros temporales de firmas
        firmas_temporales = firma_tratamiento_datos_temp.objects.all()
        contador_firmas_creadas = 0
        firmas_no_creadas = 0
        try:
            
            for firma_temp in firmas_temporales:
                documento = firma_temp.documento
                estudiante_obj = estudiante.objects.filter(num_doc=documento, firma_existe=False).first()


                if estudiante_obj != None:
                    # si existe el estudiante y no tiene firma, creamos la firma
                    firma = firma_tratamiento_datos.objects.create(
                        id_estudiante=estudiante_obj,
                        fecha_firma=firma_temp.fecha_firma,
                        tipo_id_estudiante=firma_temp.tipo_id_estudiante,
                        nombre_firma=firma_temp.nombre_firma,
                        correo_firma=firma_temp.correo_firma,
                        autoriza_tratamiento_datos=firma_temp.autoriza_tratamiento_datos,
                        autoriza_tratamiento_imagen=firma_temp.autoriza_tratamiento_imagen
                    )

                    # actualizamos la bandera
                    estudiante_obj.firma_existe = True
                    estudiante_obj.save()
                    contador_firmas_creadas += 1
                
                else:
                    firmas_no_creadas += 1
            
            # guardamos los resultados para mandarlos en la respuesta
            resultados = {
                            'firmas_creadas': contador_firmas_creadas,
                            'firmas_omitidas': firmas_no_creadas,
                            'mensaje': 'Proceso completado correctamente'
                            }
                
            return Response(resultados, status=status.HTTP_200_OK)
                
                
        except Exception as e:
            return Response({'Respuesta': f'Error al procesar las firmas temporales: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    


