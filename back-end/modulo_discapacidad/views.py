from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status

from .serializers import *
from .models import *
from modulo_usuario_rol.models import estudiante, cond_excepcion, identidad_gen, etnia
from modulo_usuario_rol.serializers import estudiante_serializer, Estudiante_actualizacion
from modulo_instancia.models import semestre
from modulo_instancia.serializers import semestre_serializer
from modulo_programa.serializers import programa_estudiante_ficha_serializer
from modulo_programa.models import programa_estudiante
from rest_framework.decorators import action
from django.db.models import F, Prefetch
from datetime import datetime


class estudiante_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    def create_models_caracterizacion(self,estudiante,semestre,fecha,lugar, creador):

        caracterizacion_creado = caracterizacion.objects.create(
            id_datos_economicos=datos_economicos.objects.create(),
            id_datos_academicos=datos_academicos.objects.create(),
            id_percepcion_discapacidad=percepcion_discapacidad.objects.create(),
            id_acceso_servi_salud=acceso_servi_salud.objects.create(),
            id_semestre=semestre,
            id_estudiante=estudiante,
            fecha= fecha,
            lugar = lugar,
            id_creador = creador,
        )
        return (caracterizacion_creado)

    def list(self, request):
        lista_estudiantes_discapacidad = estudiante.objects.filter(
            es_discapacidad=True).distinct().order_by('cod_univalle')
        respuesta = estudiante_serializer(
            lista_estudiantes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='ficha_estudiante_disc')
    def datos_ficha_estudiante(self, request, pk=None):

        request_sede = int(request.GET.get('id_sede'))
        var_estudiante = estudiante.objects.prefetch_related(
            Prefetch('id_estudiante_in_cohorte_estudiante')).get(id=pk)
        serializer_estudiante = ficha_estudiante_disc_serializer(
            var_estudiante)
        dic_asignaciones = {}
        diccionario_programas = {}
        diccionario_info_extra = {}

        try:
            semestre_activo = semestre.objects.filter(
                semestre_actual=True, id_sede=request_sede).values('id')
            consulta_asig = asignacion_discapacidad.objects.select_related('id_usuario').filter(
                id_estudiante=serializer_estudiante.data['id'], estado=True, id_semestre=semestre_activo[0]['id'])
            asig_serializado = asignacion_disc_serializer(
                consulta_asig,  many=True)
            dic_asignaciones = {'asignaciones': asig_serializado.data}
        except:
            dic_asignaciones = {'asignaciones': list()}

        try:
            info_extra = info_extra_disc.objects.filter(
                id_estudiante=serializer_estudiante.data['id'])
            info_extra_serializado = ficha_estudiante_disc_info_extra_serializer(
                info_extra, many=True)
            diccionario_info_extra = {'tipo_disc': info_extra_serializado.data}
        except:
            diccionario_info_extra = {'tipo_disc': list()}

        lista_programas = []
        try:

            ids_del_estudiante_para_sus_progamas = estudiante.objects.filter(
                num_doc=serializer_estudiante.data['num_doc']).values('id', 'cod_univalle')
            ids_estudiantes = [item['id']
                               for item in ids_del_estudiante_para_sus_progamas]
            consulta_programa = programa_estudiante.objects.select_related(
                'id_programa').filter(id_estudiante__in=ids_estudiantes)
            programas_serializados = programa_estudiante_ficha_serializer(
                consulta_programa, many=True)
            diccionario_programas = {'programas': programas_serializados.data}

        except:
            dic_programa = {'error': 'sin programa asignado o no se encontraro coincidencias'
                            }  # Agregar el estado del curso al diccionario

            dic = {}
            dic.update(dic_programa)
            lista_programas.append(dic)
            diccionario_programas = {'programas': lista_programas}

        result = dict(serializer_estudiante.data, **dic_asignaciones,
                      **diccionario_programas, **diccionario_info_extra)
        return Response(result)

    @action(detail=True, methods=['post'], url_path='edit_datos_basicos')
    def edit_datos_basicos(self, request, pk=None):

        try:
            var_estudiante = estudiante.objects.get(id = pk)
        except estudiante.DoesNotExist:
                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = estudiante_actualizacion_disc(data=request.data)
        if serializer.is_valid():
            var_estudiante.telefono_res = serializer.data['telefono_res']
            var_estudiante.celular = serializer.data['celular']
            var_estudiante.email = serializer.data['email']
            var_estudiante.sexo = serializer.data['sexo']
            var_estudiante.actividades_ocio_deporte = serializer.data['actividades_ocio_deporte']
            var_estudiante.acudiente = serializer.data['acudiente']
            var_estudiante.telefono_acudiente = serializer.data['telefono_acudiente']
            var_estudiante.ult_modificacion = serializer.data['ult_modificacion']
            try:
                etnia_obj = etnia.objects.get(id=serializer.data['id_etnia'])
                var_estudiante.id_etnia = etnia_obj
            except:
                print('no hiz etnia')

            try:
                identidad_gen_obj = identidad_gen.objects.get(id=serializer.data['id_identidad_gen'])
                var_estudiante.id_identidad_gen = identidad_gen_obj
            except:
                print('no hiz identidad_gen')

            try:
                cond_excepcion_obj = cond_excepcion.objects.get(id=serializer.data['id_cond_excepcion'])
                var_estudiante.id_cond_excepcion = cond_excepcion_obj
            except:
                print('no hiz cond_excepcion')
            var_estudiante.save()

        return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='datos_caracterizacion_edit')
    def datos_caracterizacion_edit(self, request, pk=None):

        if request.data["tipo"] == 'datos_entrevistador':
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()

            if(var_caracterizacion):

                var_caracterizacion.fecha = request_fecha
                var_caracterizacion.lugar = request_lugar

                var_caracterizacion.save()

                var_user_extended_disc = user_extended_disc.objects.filter(id_usuario= int(request.data["id_creador"])).first()
                if(var_user_extended_disc):
                    var_user_extended_disc.celular = request.data["celular"]
                    var_user_extended_disc.profesion = request.data["profesion"]
                    var_user_extended_disc.save()
                else:
                    user_extended_disc.objects.create(
                        id_usuario = request_creador,
                        celular = request.data["celular"],
                        profesion = request.data["profesion"]
                    )

                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_caracterizacion_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_caracterizacion_new.fecha = request_fecha
                var_caracterizacion_new.lugar = request_lugar

                var_caracterizacion_new.save()

                var_user_extended_disc = user_extended_disc.objects.filter(id_usuario= int(request.data["id_creador"])).first()
                if(var_user_extended_disc):
                    var_user_extended_disc.celular = request.data["celular"]
                    var_user_extended_disc.profesion = request.data["profesion"]
                    var_user_extended_disc.save()
                else:
                    user_extended_disc.objects.create(
                        id_usuario = request_creador,
                        celular = request.data["celular"],
                        profesion = request.data["profesion"]
                    )
                return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
            
        elif request.data["tipo"] == 'datos_entrevistado':
            print(request.data)
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            
            
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()
            
            if var_caracterizacion:
                var_caracterizacion.fecha = datetime.strptime(request.data["fecha"],'%Y-%m-%d')
                var_caracterizacion.lugar = request.data["lugar"]
                var_caracterizacion.save()

                try:
                    var_datos_entrevistado = datos_entrevistado.objects.filter(id= var_caracterizacion.id_datos_entrevistado.id).first()
                except:
                    var_datos_entrevistado = datos_entrevistado.objects.create(
                    desarrollaActividad = request.data.get("desarrollaActividad", None),
                    desarrollaActividadData = request.data.get("desarrollaActividadData", None),
                    orientacionSexual = request.data.get("orientacionSexual", None),
                    orientacionSexualOtro = request.data.get("orientacionSexualOtro", None),
                    autoreconocimientoEtnico = request.data.get("autoreconocimientoEtnico", None),
                    autoreconocimientoEtnicoOtro = request.data.get("autoreconocimientoEtnicoOtro", None),
                    estadoCivil = request.data.get("estadoCivil", None),
                    actividadesOcio = request.data.get("actividadesOcio", None),
                    actividadesOcioData = request.data.get("actividadesOcioData", None),
                    actividadDeportiva = request.data.get("actividadDeportiva", None),
                    actividadDeportivaData = request.data.get("actividadDeportivaData", None),
                    programaAcompanamiento = request.data.get("programaAcompanamiento", None),
                    programaAcompanamientoOtro = request.data.get("programaAcompanamientoOtro", None),
                    programaAcompanamientoOtroData = request.data.get("programaAcompanamientoOtroData", None),
                    )
                    var_caracterizacion.id_datos_entrevistado = var_datos_entrevistado
                    var_caracterizacion.save()
                    return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
                        
                if var_datos_entrevistado:
                    var_datos_entrevistado.desarrollaActividad = request.data.get("desarrollaActividad", None)
                    var_datos_entrevistado.desarrollaActividadData = request.data.get("desarrollaActividadData", None)
                    var_datos_entrevistado.orientacionSexual = request.data.get("orientacionSexual", None)
                    var_datos_entrevistado.orientacionSexualOtro = request.data.get("orientacionSexualOtro", None)
                    var_datos_entrevistado.autoreconocimientoEtnico = request.data.get("autoreconocimientoEtnico", None)
                    var_datos_entrevistado.autoreconocimientoEtnicoOtro = request.data.get("autoreconocimientoEtnicoOtro", None)
                    var_datos_entrevistado.estadoCivil = request.data.get("estadoCivil", None)
                    var_datos_entrevistado.actividadesOcio = request.data.get("actividadesOcio", None)
                    var_datos_entrevistado.actividadesOcioData = request.data.get("actividadesOcioData", None)
                    var_datos_entrevistado.actividadDeportiva = request.data.get("actividadDeportiva", None)
                    var_datos_entrevistado.actividadDeportivaData = request.data.get("actividadDeportivaData", None)
                    var_datos_entrevistado.programaAcompanamiento = request.data.get("programaAcompanamiento", None)
                    var_datos_entrevistado.programaAcompanamientoOtro = request.data.get("programaAcompanamientoOtro", None)
                    var_datos_entrevistado.programaAcompanamientoOtroData = request.data.get("programaAcompanamientoOtroData", None)
                    var_datos_entrevistado.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                
                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_caracterizacion_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_caracterizacion_new.fecha = request_fecha
                var_caracterizacion_new.lugar = request_lugar
                
                var_caracterizacion_new.save()
                
                var_datos_entrevistado = datos_entrevistado.objects.filter(id= var_caracterizacion_new.id_datos_entrevistado.id).first()
                if var_datos_entrevistado:
                    var_datos_entrevistado.desarrollaActividad = request.data.get("desarrollaActividad", None)
                    var_datos_entrevistado.desarrollaActividadData = request.data.get("desarrollaActividadData", None)
                    var_datos_entrevistado.orientacionSexual = request.data.get("orientacionSexual", None)
                    var_datos_entrevistado.orientacionSexualOtro = request.data.get("orientacionSexualOtro", None)
                    var_datos_entrevistado.autoreconocimientoEtnico = request.data.get("autoreconocimientoEtnico", None)
                    var_datos_entrevistado.autoreconocimientoEtnicoOtro = request.data.get("autoreconocimientoEtnicoOtro", None)
                    var_datos_entrevistado.estadoCivil = request.data.get("estadoCivil", None)
                    var_datos_entrevistado.actividadesOcio = request.data.get("actividadesOcio", None)
                    var_datos_entrevistado.actividadesOcioData = request.data.get("actividadesOcioData", None)
                    var_datos_entrevistado.actividadDeportiva = request.data.get("actividadDeportiva", None)
                    var_datos_entrevistado.actividadDeportivaData = request.data.get("actividadDeportivaData", None)
                    var_datos_entrevistado.programaAcompanamiento = request.data.get("programaAcompanamiento", None)
                    var_datos_entrevistado.programaAcompanamientoOtro = request.data.get("programaAcompanamientoOtro", None)
                    var_datos_entrevistado.programaAcompanamientoOtroData = request.data.get("programaAcompanamientoOtroData", None)
                    var_datos_entrevistado.save()
                
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
        elif request.data["tipo"] == 'datos_economicos':
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()

            if(var_caracterizacion):

                var_caracterizacion.fecha = request_fecha
                var_caracterizacion.lugar = request_lugar

                var_caracterizacion.save()

                var_datos_economicos = datos_economicos.objects.filter(id= var_caracterizacion.id_datos_economicos.id).first()
                if(var_datos_economicos):
                    var_datos_economicos.estrato_socio = request.data.get("estrato_socio", None)
                    var_datos_economicos.recibe_prestacion_econo = request.data.get("recibe_prestacion_econo", False)
                    var_datos_economicos.recibe_beca = request.data.get("recibe_beca", False)
                    var_datos_economicos.recibe_transporte = request.data.get("recibe_transporte", False)
                    var_datos_economicos.recibe_finan_materiales = request.data.get("recibe_finan_materiales", False)
                    var_datos_economicos.solvencia_economica = request.data.get("solvencia_economica", False)
                    var_datos_economicos.expectativas_laborales = request.data.get("expectativas_laborales", None)
                    var_datos_economicos.nivel_educativo_padre = request.data.get("nivel_educativo_padre", None)
                    var_datos_economicos.ocupacion_padre = request.data.get("ocupacion_padre", None)
                    var_datos_economicos.situacion_padre = request.data.get("situacion_padre", None)
                    var_datos_economicos.nivel_educativo_madre = request.data.get("nivel_educativo_madre", None)
                    var_datos_economicos.ocupacion_madre = request.data.get("ocupacion_madre", None)
                    var_datos_economicos.situacion_madre = request.data.get("situacion_madre", None)
                    
                    var_datos_economicos.permanencia_ingresos_propios = request.data.get("permanencia_ingresos_propios", None)
                    var_datos_economicos.permanencia_ingresos_familiares = request.data.get("permanencia_ingresos_familiares", None)
                    var_datos_economicos.permanencia_ingresos_otros = request.data.get("permanencia_ingresos_otros", None)
                    var_datos_economicos.permanencia_ingresos_otros_texto = request.data.get("permanencia_ingresos_otros_texto", None)
                    var_datos_economicos.requiere_materiales = request.data.get("requiere_materiales", None)
                    var_datos_economicos.valor_materiales = request.data.get("valor_materiales", None)
                    var_datos_economicos.transporte_privado = request.data.get("transporte_privado", None)
                    var_datos_economicos.transporte_publico = request.data.get("transporte_publico", None)
                    var_datos_economicos.transporte_propio = request.data.get("transporte_propio", None)
                    var_datos_economicos.transporte_otro = request.data.get("transporte_otro", None)
                    var_datos_economicos.transporte_otro_data = request.data.get("transporte_otro_data", None)
                    var_datos_economicos.valor_transporte = request.data.get("valor_transporte", None)
                    var_datos_economicos.valor_sostenimiento = request.data.get("valor_sostenimiento", None)
                    var_datos_economicos.actualmente_vive_estado = request.data.get("actualmente_vive_estado", None)
                    var_datos_economicos.actualmente_vive_parentezco = request.data.get("actualmente_vive_parentezco", None)
                    var_datos_economicos.tiene_hijos = request.data.get("tiene_hijos", None)
                    var_datos_economicos.hijos_numero = request.data.get("hijos_numero", None)
                    var_datos_economicos.motivo_ingreso = request.data.get("motivo_ingreso", None)
                    var_datos_economicos.expectativas_carrera = request.data.get("expectativas_carrera", None)
                    var_datos_economicos.expectativas_grado = request.data.get("expectativas_grado", None)
                    var_datos_economicos.labor_padre = request.data.get("labor_padre", None)
                    var_datos_economicos.labor_madre = request.data.get("labor_madre", None)
                    var_datos_economicos.otro_familiar_nivel_educativo = request.data.get("otro_familiar_nivel_educativo", None)
                    var_datos_economicos.otro_familiar_situacion_economica = request.data.get("otro_familiar_situacion_economica", None)
                    var_datos_economicos.otro_familiar_actividad_economica = request.data.get("otro_familiar_actividad_economica", None)
                    var_datos_economicos.otro_familiar_labor_desempena = request.data.get("otro_familiar_labor_desempena", None)
                    var_datos_economicos.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)

                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_caracterizacion_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_caracterizacion_new.fecha = request_fecha
                var_caracterizacion_new.lugar = request_lugar

                var_caracterizacion_new.save()

                var_datos_economicos = datos_economicos.objects.filter(id= var_caracterizacion_new.id_datos_economicos).first()
                if(var_datos_economicos):
                    var_datos_economicos.estrato_socio = request.data.get("estrato_socio", None)
                    var_datos_economicos.recibe_prestacion_econo = request.data.get("recibe_prestacion_econo", False)
                    var_datos_economicos.recibe_beca = request.data.get("recibe_beca", False)
                    var_datos_economicos.recibe_transporte = request.data.get("recibe_transporte", False)
                    var_datos_economicos.recibe_finan_materiales = request.data.get("recibe_finan_materiales", False)
                    var_datos_economicos.solvencia_economica = request.data.get("solvencia_economica", False)
                    var_datos_economicos.expectativas_laborales = request.data.get("expectativas_laborales", None)
                    var_datos_economicos.nivel_educativo_padre = request.data.get("nivel_educativo_padre", None)
                    var_datos_economicos.ocupacion_padre = request.data.get("ocupacion_padre", None)
                    var_datos_economicos.situacion_padre = request.data.get("situacion_padre", None)
                    var_datos_economicos.nivel_educativo_madre = request.data.get("nivel_educativo_madre", None)
                    var_datos_economicos.ocupacion_madre = request.data.get("ocupacion_madre", None)
                    var_datos_economicos.situacion_madre = request.data.get("situacion_madre", None)
                    
                    var_datos_economicos.permanencia_ingresos_propios = request.data.get("permanencia_ingresos_propios", None)
                    var_datos_economicos.permanencia_ingresos_familiares = request.data.get("permanencia_ingresos_familiares", None)
                    var_datos_economicos.permanencia_ingresos_otros = request.data.get("permanencia_ingresos_otros", None)
                    var_datos_economicos.permanencia_ingresos_otros_texto = request.data.get("permanencia_ingresos_otros_texto", None)
                    var_datos_economicos.requiere_materiales = request.data.get("requiere_materiales", None)
                    var_datos_economicos.valor_materiales = request.data.get("valor_materiales", None)
                    var_datos_economicos.transporte_privado = request.data.get("transporte_privado", None)
                    var_datos_economicos.transporte_publico = request.data.get("transporte_publico", None)
                    var_datos_economicos.transporte_propio = request.data.get("transporte_propio", None)
                    var_datos_economicos.transporte_otro = request.data.get("transporte_otro", None)
                    var_datos_economicos.transporte_otro_data = request.data.get("transporte_otro_data", None)
                    var_datos_economicos.valor_transporte = request.data.get("valor_transporte", None)
                    var_datos_economicos.valor_sostenimiento = request.data.get("valor_sostenimiento", None)
                    var_datos_economicos.actualmente_vive_estado = request.data.get("actualmente_vive_estado", None)
                    var_datos_economicos.actualmente_vive_parentezco = request.data.get("actualmente_vive_parentezco", None)
                    var_datos_economicos.tiene_hijos = request.data.get("tiene_hijos", None)
                    var_datos_economicos.hijos_numero = request.data.get("hijos_numero", None)
                    var_datos_economicos.motivo_ingreso = request.data.get("motivo_ingreso", None)
                    var_datos_economicos.expectativas_carrera = request.data.get("expectativas_carrera", None)
                    var_datos_economicos.expectativas_grado = request.data.get("expectativas_grado", None)
                    var_datos_economicos.labor_padre = request.data.get("labor_padre", None)
                    var_datos_economicos.labor_madre = request.data.get("labor_madre", None)
                    var_datos_economicos.otro_familiar_nivel_educativo = request.data.get("otro_familiar_nivel_educativo", None)
                    var_datos_economicos.otro_familiar_situacion_economica = request.data.get("otro_familiar_situacion_economica", None)
                    var_datos_economicos.otro_familiar_actividad_economica = request.data.get("otro_familiar_actividad_economica", None)
                    var_datos_economicos.otro_familiar_labor_desempena = request.data.get("otro_familiar_labor_desempena", None)
                    
                    var_datos_economicos.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
            
        elif request.data["tipo"] == 'datos_academicos':
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()

            if(var_caracterizacion):

                var_caracterizacion.fecha = request_fecha
                var_caracterizacion.lugar = request_lugar

                var_caracterizacion.save()

                var_datos_academicos = datos_academicos.objects.filter(id= var_caracterizacion.id_datos_academicos.id).first()
                if(var_datos_academicos):
                    var_datos_academicos.numero_resolucion = request.data.get("numero_resolucion", None)
                    var_datos_academicos.creditos_programa = request.data.get("creditos_programa", None)
                    var_datos_academicos.titulo_obtenido = request.data.get("titulo_obtenido", None)
                    var_datos_academicos.institucion = request.data.get("institucion", None)
                    var_datos_academicos.nivel_formacion = request.data.get("nivel_formacion", None)
                    var_datos_academicos.apoyos_recibidos = request.data.get("apoyos_recibidos", None)
                    var_datos_academicos.observaciones = request.data.get("observaciones", None)
                    var_datos_academicos.dificultades = request.data.get("dificultades", None)
                    var_datos_academicos.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)

                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_accesbilidad_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_accesbilidad_new.fecha = request_fecha
                var_accesbilidad_new.lugar = request_lugar

                var_accesbilidad_new.save()

                var_datos_academicos = datos_academicos.objects.filter(id= var_accesbilidad_new.id_datos_academicos.id).first()
                if(var_datos_academicos):
                    var_datos_academicos.numero_resolucion = request.data.get("numero_resolucion", None)
                    var_datos_academicos.creditos_programa = request.data.get("creditos_programa", None)
                    var_datos_academicos.titulo_obtenido = request.data.get("titulo_obtenido", None)
                    var_datos_academicos.institucion = request.data.get("institucion", None)
                    var_datos_academicos.nivel_formacion = request.data.get("nivel_formacion", None)
                    var_datos_academicos.apoyos_recibidos = request.data.get("apoyos_recibidos", None)
                    var_datos_academicos.observaciones = request.data.get("observaciones", None)
                    var_datos_academicos.dificultades = request.data.get("dificultades", None)
                    var_datos_academicos.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            
        
        elif request.data["tipo"] == 'datos_percepcion_caracteristicas':
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()

            if(var_caracterizacion):

                var_caracterizacion.fecha = request_fecha
                var_caracterizacion.lugar = request_lugar

                var_caracterizacion.save()

                var_percepcion_discapacidad = percepcion_discapacidad.objects.filter(id= var_caracterizacion.id_percepcion_discapacidad.id).first()
                if(var_percepcion_discapacidad):
                    var_percepcion_discapacidad.considera_discapacidad = request.data.get("considera_discapacidad", False)
                    var_percepcion_discapacidad.consideracion = request.data.get("consideracion", None)
                    var_percepcion_discapacidad.adquisicion = request.data.get("adquisicion", None)
                    var_percepcion_discapacidad.cuenta_con_diagnostico = request.data.get("cuenta_con_diagnostico", False)
                    var_percepcion_discapacidad.tipo_diagnostico = request.data.get("tipo_diagnostico", None)
                    var_percepcion_discapacidad.certificado_invalidez = request.data.get("certificado_invalidez", False)
                    var_percepcion_discapacidad.documento_soporte = request.data.get("documento_soporte", False)
                    
                    var_percepcion_discapacidad.vision = request.data.get("vision", False)
                    var_percepcion_discapacidad.vision_texto = request.data.get("vision_texto", None)
                    var_percepcion_discapacidad.audicion = request.data.get("audicion", False)
                    var_percepcion_discapacidad.audicion_texto = request.data.get("audicion_texto", None)
                    var_percepcion_discapacidad.voz_y_habla = request.data.get("voz_y_habla", False)
                    var_percepcion_discapacidad.voz_y_habla_texto = request.data.get("voz_y_habla_texto", None)
                    var_percepcion_discapacidad.movimiento_cuerpo = request.data.get("movimiento_cuerpo", False)
                    var_percepcion_discapacidad.movimiento_cuerpo_texto = request.data.get("movimiento_cuerpo_texto", None)
                    var_percepcion_discapacidad.cognicion = request.data.get("cognicion", False)
                    var_percepcion_discapacidad.cognicion_texto = request.data.get("cognicion_texto", None)
                    var_percepcion_discapacidad.estado_socio_emocional = request.data.get("estado_socio_emocional", False)
                    var_percepcion_discapacidad.estado_socio_emocional_texto = request.data.get("estado_socio_emocional_texto", None)
                    var_percepcion_discapacidad.relaciones_sexuales = request.data.get("relaciones_sexuales", False)
                    var_percepcion_discapacidad.relaciones_sexuales_texto = request.data.get("relaciones_sexuales_texto", None)
                    var_percepcion_discapacidad.deglucion = request.data.get("deglucion", False)
                    var_percepcion_discapacidad.deglucion_texto = request.data.get("deglucion_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)
                    
                    var_percepcion_discapacidad.ojos = request.data.get("ojos", False)
                    var_percepcion_discapacidad.ojos_texto = request.data.get("ojos_texto", None)
                    var_percepcion_discapacidad.oidos = request.data.get("oidos", False)
                    var_percepcion_discapacidad.oidos_texto = request.data.get("oidos_texto", None)
                    var_percepcion_discapacidad.vocales = request.data.get("vocales", False)
                    var_percepcion_discapacidad.vocales_texto = request.data.get("vocales_texto", None)
                    var_percepcion_discapacidad.manos = request.data.get("manos", False)
                    var_percepcion_discapacidad.manos_texto = request.data.get("manos_texto", None)
                    var_percepcion_discapacidad.piernas = request.data.get("piernas", False)
                    var_percepcion_discapacidad.piernas_texto = request.data.get("piernas_texto", None)
                    var_percepcion_discapacidad.piel = request.data.get("piel", False)
                    var_percepcion_discapacidad.piel_texto = request.data.get("piel_texto", None)
                    var_percepcion_discapacidad.cerebro = request.data.get("cerebro", False)
                    var_percepcion_discapacidad.cerebro_texto = request.data.get("cerebro_texto", None)
                    var_percepcion_discapacidad.sistema_nervioso = request.data.get("sistema_nervioso", False)
                    var_percepcion_discapacidad.sistema_nervioso_texto = request.data.get("sistema_nervioso_texto", None)
                    var_percepcion_discapacidad.sistema_cardio = request.data.get("sistema_cardio", False)
                    var_percepcion_discapacidad.sistema_cardio_texto = request.data.get("sistema_cardio_texto", None)
                    var_percepcion_discapacidad.sistema_genital = request.data.get("sistema_genital", False)
                    var_percepcion_discapacidad.sistema_genital_texto = request.data.get("sistema_genital_texto", None)
                    var_percepcion_discapacidad.sistema_digestivo = request.data.get("sistema_digestivo", False)
                    var_percepcion_discapacidad.sistema_digestivo_texto = request.data.get("sistema_digestivo_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)
                    
                    var_percepcion_discapacidad.cursos = request.data.get("cursos", False)
                    var_percepcion_discapacidad.cursos_texto = request.data.get("cursos_texto", None)
                    var_percepcion_discapacidad.clases_magistrales = request.data.get("clases_magistrales", False)
                    var_percepcion_discapacidad.clases_magistrales_texto = request.data.get("clases_magistrales_texto", None)
                    var_percepcion_discapacidad.laboratorios = request.data.get("laboratorios", False)
                    var_percepcion_discapacidad.laboratorios_texto = request.data.get("laboratorios_texto", None)
                    var_percepcion_discapacidad.secuencias_numericas = request.data.get("secuencias_numericas", False)
                    var_percepcion_discapacidad.secuencias_numericas_texto = request.data.get("secuencias_numericas_texto", None)
                    var_percepcion_discapacidad.talleres = request.data.get("talleres", False)
                    var_percepcion_discapacidad.talleres_texto = request.data.get("talleres_texto", None)
                    var_percepcion_discapacidad.conferencias = request.data.get("conferencias", False)
                    var_percepcion_discapacidad.conferencias_texto = request.data.get("conferencias_texto", None)
                    var_percepcion_discapacidad.practica_deportiva = request.data.get("practica_deportiva", False)
                    var_percepcion_discapacidad.practica_deportiva_texto = request.data.get("practica_deportiva_texto", None)
                    var_percepcion_discapacidad.ocio = request.data.get("ocio", False)
                    var_percepcion_discapacidad.ocio_texto = request.data.get("ocio_texto", None)
                    var_percepcion_discapacidad.movilizacion = request.data.get("movilizacion", False)
                    var_percepcion_discapacidad.movilizacion_texto = request.data.get("movilizacion_texto", None)
                    var_percepcion_discapacidad.conciertos = request.data.get("conciertos", False)
                    var_percepcion_discapacidad.conciertos_texto = request.data.get("conciertos_texto", None)
                    var_percepcion_discapacidad.servicios_salud = request.data.get("servicios_salud", False)
                    var_percepcion_discapacidad.servicios_salud_texto = request.data.get("servicios_salud_texto", None)
                    var_percepcion_discapacidad.asambleas = request.data.get("asambleas", False)
                    var_percepcion_discapacidad.asambleas_texto = request.data.get("asambleas_texto", None)
                    var_percepcion_discapacidad.alimentos_cafeteria = request.data.get("alimentos_cafeteria", False)
                    var_percepcion_discapacidad.alimentos_cafeteria_texto = request.data.get("alimentos_cafeteria_texto", None)
                    var_percepcion_discapacidad.tramites = request.data.get("tramites", False)
                    var_percepcion_discapacidad.tramites_texto = request.data.get("tramites_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)

                    var_percepcion_discapacidad.condicion_discapacidad = request.data.get("condicion_discapacidad", False)
                    var_percepcion_discapacidad.contexto_universitario = request.data.get("contexto_universitario", False)
                    var_percepcion_discapacidad.ausencia_ayuda_tec = request.data.get("ausencia_ayuda_tec", False)
                    var_percepcion_discapacidad.ausencia_espacios_fisicos = request.data.get("ausencia_espacios_fisicos", False)
                    var_percepcion_discapacidad.ausencia_materiales_impresos = request.data.get("ausencia_materiales_impresos", False)
                    var_percepcion_discapacidad.ausencia_personas_apoyo = request.data.get("ausencia_personas_apoyo", False)
                    var_percepcion_discapacidad.actitudes_negativas_personas = request.data.get("actitudes_negativas_personas", False)
                    var_percepcion_discapacidad.ausencia_servicios_discapacidad = request.data.get("ausencia_servicios_discapacidad", False)
                    var_percepcion_discapacidad.otros_factores = request.data.get("otros_factores", False)
                    var_percepcion_discapacidad.otros_factores_texto = request.data.get("otros_factores_texto", None)
                    var_percepcion_discapacidad.condicion_psicoemocional = request.data.get("condicion_psicoemocional", False)
                    var_percepcion_discapacidad.otra_psicoemocional = request.data.get("otra_psicoemocional", False)
                    var_percepcion_discapacidad.otra_psicoemocional_texto = request.data.get("otra_psicoemocional_texto", None)

                    var_percepcion_discapacidad.escritos_impresos = request.data.get("escritos_impresos", False)
                    var_percepcion_discapacidad.escritos_impresos_numero = request.data.get("escritos_impresos_numero", None)
                    var_percepcion_discapacidad.imagenes_pantalla = request.data.get("imagenes_pantalla", False)
                    var_percepcion_discapacidad.imagenes_pantalla_numero = request.data.get("imagenes_pantalla_numero", None)
                    var_percepcion_discapacidad.copia_dictado = request.data.get("copia_dictado", False)
                    var_percepcion_discapacidad.copia_dictado_numero = request.data.get("copia_dictado_numero", None)
                    var_percepcion_discapacidad.transcripcion_textos = request.data.get("transcripcion_textos", False)
                    var_percepcion_discapacidad.transcripcion_textos_numero = request.data.get("transcripcion_textos_numero", None)
                    var_percepcion_discapacidad.manuales_escritos = request.data.get("manuales_escritos", False)
                    var_percepcion_discapacidad.manuales_escritos_numero = request.data.get("manuales_escritos_numero", None)
                    var_percepcion_discapacidad.textos_pantalla = request.data.get("textos_pantalla", False)
                    var_percepcion_discapacidad.textos_pantalla_numero = request.data.get("textos_pantalla_numero", None)
                    var_percepcion_discapacidad.redactar = request.data.get("redactar", False)
                    var_percepcion_discapacidad.redactar_numero = request.data.get("redactar_numero", None)
                    var_percepcion_discapacidad.elaborar_ideas = request.data.get("elaborar_ideas", False)
                    var_percepcion_discapacidad.elaborar_ideas_numero = request.data.get("elaborar_ideas_numero", None)
                    var_percepcion_discapacidad.escuchar = request.data.get("escuchar", False)
                    var_percepcion_discapacidad.escuchar_numero = request.data.get("escuchar_numero", None)
                    var_percepcion_discapacidad.expre_oral = request.data.get("expre_oral", False)
                    var_percepcion_discapacidad.expre_oral_numero = request.data.get("expre_oral_numero", None)
                    var_percepcion_discapacidad.compren_oral = request.data.get("compren_oral", False)
                    var_percepcion_discapacidad.compren_oral_numero = request.data.get("compren_oral_numero", None)
                    var_percepcion_discapacidad.interactuar = request.data.get("interactuar", False)
                    var_percepcion_discapacidad.interactuar_numero = request.data.get("interactuar_numero", None)
                    var_percepcion_discapacidad.rel_interpersonales = request.data.get("rel_interpersonales", False)
                    var_percepcion_discapacidad.rel_interpersonales_numero = request.data.get("rel_interpersonales_numero", None)
                    var_percepcion_discapacidad.desplazarse = request.data.get("desplazarse", False)
                    var_percepcion_discapacidad.desplazarse_numero = request.data.get("desplazarse_numero", None)
                    var_percepcion_discapacidad.manipular_obj = request.data.get("manipular_obj", False)
                    var_percepcion_discapacidad.manipular_obj_numero = request.data.get("manipular_obj_numero", None)
                    var_percepcion_discapacidad.mant_sentado = request.data.get("mant_sentado", False)
                    var_percepcion_discapacidad.mant_sentado_numero = request.data.get("mant_sentado_numero", None)
                    var_percepcion_discapacidad.asearse = request.data.get("asearse", False)
                    var_percepcion_discapacidad.asearse_numero = request.data.get("asearse_numero", None)
                    var_percepcion_discapacidad.vestirse_desves = request.data.get("vestirse_desves", False)
                    var_percepcion_discapacidad.vestirse_desves_numero = request.data.get("vestirse_desves_numero", None)
                    var_percepcion_discapacidad.consumier_alimen = request.data.get("consumier_alimen", False)
                    var_percepcion_discapacidad.consumier_alimen_numero = request.data.get("consumier_alimen_numero", None)
                    var_percepcion_discapacidad.evacuar = request.data.get("evacuar", False)
                    var_percepcion_discapacidad.evacuar_numero = request.data.get("evacuar_numero", None)
                    var_percepcion_discapacidad.otro = request.data.get("otro", False)
                    var_percepcion_discapacidad.otro_texto = request.data.get("otro_texto", None)

                    var_percepcion_discapacidad.amigo_apoyo = request.data.get("amigo_apoyo", False)
                    var_percepcion_discapacidad.pareja_apoyo = request.data.get("pareja_apoyo", False)
                    var_percepcion_discapacidad.familia_apoyo = request.data.get("familia_apoyo", False)
                    var_percepcion_discapacidad.salud_apoyo = request.data.get("salud_apoyo", False)
                    var_percepcion_discapacidad.otro_apoyo = request.data.get("otro_apoyo", False)
                    var_percepcion_discapacidad.privado_desplazar = request.data.get("privado_desplazar", False)
                    var_percepcion_discapacidad.publico_desplazar = request.data.get("publico_desplazar", False)
                    var_percepcion_discapacidad.propio_desplazar = request.data.get("propio_desplazar", False)
                    var_percepcion_discapacidad.otro_desplazar = request.data.get("otro_desplazar", False)
                    var_percepcion_discapacidad.participa_org = request.data.get("participa_org", False)
                    var_percepcion_discapacidad.act_otras_per = request.data.get("act_otras_per", False)
                    var_percepcion_discapacidad.apoyo_inst = request.data.get("apoyo_inst", False)
                    var_percepcion_discapacidad.nombre_institucion = request.data.get("nombre_institucion", None)
                    var_percepcion_discapacidad.tipo_apoyo = request.data.get("tipo_apoyo", None)
                    var_percepcion_discapacidad.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)

                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_caracterizacion_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_caracterizacion_new.fecha = request_fecha
                var_caracterizacion_new.lugar = request_lugar

                var_caracterizacion_new.save()

                var_percepcion_discapacidad = percepcion_discapacidad.objects.filter(id= var_caracterizacion_new.id_percepcion_discapacidad.id).first()
                if(var_percepcion_discapacidad):
                    var_percepcion_discapacidad.considera_discapacidad = request.data.get("considera_discapacidad", False)
                    var_percepcion_discapacidad.consideracion = request.data.get("consideracion", None)
                    var_percepcion_discapacidad.adquisicion = request.data.get("adquisicion", None)
                    var_percepcion_discapacidad.cuenta_con_diagnostico = request.data.get("cuenta_con_diagnostico", False)
                    var_percepcion_discapacidad.tipo_diagnostico = request.data.get("tipo_diagnostico", None)
                    var_percepcion_discapacidad.certificado_invalidez = request.data.get("certificado_invalidez", False)
                    var_percepcion_discapacidad.documento_soporte = request.data.get("documento_soporte", False)
                    
                    var_percepcion_discapacidad.vision = request.data.get("vision", False)
                    var_percepcion_discapacidad.vision_texto = request.data.get("vision_texto", None)
                    var_percepcion_discapacidad.audicion = request.data.get("audicion", False)
                    var_percepcion_discapacidad.audicion_texto = request.data.get("audicion_texto", None)
                    var_percepcion_discapacidad.voz_y_habla = request.data.get("voz_y_habla", False)
                    var_percepcion_discapacidad.voz_y_habla_texto = request.data.get("voz_y_habla_texto", None)
                    var_percepcion_discapacidad.movimiento_cuerpo = request.data.get("movimiento_cuerpo", False)
                    var_percepcion_discapacidad.movimiento_cuerpo_texto = request.data.get("movimiento_cuerpo_texto", None)
                    var_percepcion_discapacidad.cognicion = request.data.get("cognicion", False)
                    var_percepcion_discapacidad.cognicion_texto = request.data.get("cognicion_texto", None)
                    var_percepcion_discapacidad.estado_socio_emocional = request.data.get("estado_socio_emocional", False)
                    var_percepcion_discapacidad.estado_socio_emocional_texto = request.data.get("estado_socio_emocional_texto", None)
                    var_percepcion_discapacidad.relaciones_sexuales = request.data.get("relaciones_sexuales", False)
                    var_percepcion_discapacidad.relaciones_sexuales_texto = request.data.get("relaciones_sexuales_texto", None)
                    var_percepcion_discapacidad.deglucion = request.data.get("deglucion", False)
                    var_percepcion_discapacidad.deglucion_texto = request.data.get("deglucion_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)
                    
                    var_percepcion_discapacidad.ojos = request.data.get("ojos", False)
                    var_percepcion_discapacidad.ojos_texto = request.data.get("ojos_texto", None)
                    var_percepcion_discapacidad.oidos = request.data.get("oidos", False)
                    var_percepcion_discapacidad.oidos_texto = request.data.get("oidos_texto", None)
                    var_percepcion_discapacidad.vocales = request.data.get("vocales", False)
                    var_percepcion_discapacidad.vocales_texto = request.data.get("vocales_texto", None)
                    var_percepcion_discapacidad.manos = request.data.get("manos", False)
                    var_percepcion_discapacidad.manos_texto = request.data.get("manos_texto", None)
                    var_percepcion_discapacidad.piernas = request.data.get("piernas", False)
                    var_percepcion_discapacidad.piernas_texto = request.data.get("piernas_texto", None)
                    var_percepcion_discapacidad.piel = request.data.get("piel", False)
                    var_percepcion_discapacidad.piel_texto = request.data.get("piel_texto", None)
                    var_percepcion_discapacidad.cerebro = request.data.get("cerebro", False)
                    var_percepcion_discapacidad.cerebro_texto = request.data.get("cerebro_texto", None)
                    var_percepcion_discapacidad.sistema_nervioso = request.data.get("sistema_nervioso", False)
                    var_percepcion_discapacidad.sistema_nervioso_texto = request.data.get("sistema_nervioso_texto", None)
                    var_percepcion_discapacidad.sistema_cardio = request.data.get("sistema_cardio", False)
                    var_percepcion_discapacidad.sistema_cardio_texto = request.data.get("sistema_cardio_texto", None)
                    var_percepcion_discapacidad.sistema_genital = request.data.get("sistema_genital", False)
                    var_percepcion_discapacidad.sistema_genital_texto = request.data.get("sistema_genital_texto", None)
                    var_percepcion_discapacidad.sistema_digestivo = request.data.get("sistema_digestivo", False)
                    var_percepcion_discapacidad.sistema_digestivo_texto = request.data.get("sistema_digestivo_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)
                    
                    var_percepcion_discapacidad.cursos = request.data.get("cursos", False)
                    var_percepcion_discapacidad.cursos_texto = request.data.get("cursos_texto", None)
                    var_percepcion_discapacidad.clases_magistrales = request.data.get("clases_magistrales", False)
                    var_percepcion_discapacidad.clases_magistrales_texto = request.data.get("clases_magistrales_texto", None)
                    var_percepcion_discapacidad.laboratorios = request.data.get("laboratorios", False)
                    var_percepcion_discapacidad.laboratorios_texto = request.data.get("laboratorios_texto", None)
                    var_percepcion_discapacidad.secuencias_numericas = request.data.get("secuencias_numericas", False)
                    var_percepcion_discapacidad.secuencias_numericas_texto = request.data.get("secuencias_numericas_texto", None)
                    var_percepcion_discapacidad.talleres = request.data.get("talleres", False)
                    var_percepcion_discapacidad.talleres_texto = request.data.get("talleres_texto", None)
                    var_percepcion_discapacidad.conferencias = request.data.get("conferencias", False)
                    var_percepcion_discapacidad.conferencias_texto = request.data.get("conferencias_texto", None)
                    var_percepcion_discapacidad.practica_deportiva = request.data.get("practica_deportiva", False)
                    var_percepcion_discapacidad.practica_deportiva_texto = request.data.get("practica_deportiva_texto", None)
                    var_percepcion_discapacidad.ocio = request.data.get("ocio", False)
                    var_percepcion_discapacidad.ocio_texto = request.data.get("ocio_texto", None)
                    var_percepcion_discapacidad.movilizacion = request.data.get("movilizacion", False)
                    var_percepcion_discapacidad.movilizacion_texto = request.data.get("movilizacion_texto", None)
                    var_percepcion_discapacidad.conciertos = request.data.get("conciertos", False)
                    var_percepcion_discapacidad.conciertos_texto = request.data.get("conciertos_texto", None)
                    var_percepcion_discapacidad.servicios_salud = request.data.get("servicios_salud", False)
                    var_percepcion_discapacidad.servicios_salud_texto = request.data.get("servicios_salud_texto", None)
                    var_percepcion_discapacidad.asambleas = request.data.get("asambleas", False)
                    var_percepcion_discapacidad.asambleas_texto = request.data.get("asambleas_texto", None)
                    var_percepcion_discapacidad.alimentos_cafeteria = request.data.get("alimentos_cafeteria", False)
                    var_percepcion_discapacidad.alimentos_cafeteria_texto = request.data.get("alimentos_cafeteria_texto", None)
                    var_percepcion_discapacidad.tramites = request.data.get("tramites", False)
                    var_percepcion_discapacidad.tramites_texto = request.data.get("tramites_texto", None)
                    var_percepcion_discapacidad.otra = request.data.get("otra", False)
                    var_percepcion_discapacidad.otra_texto = request.data.get("otra_texto", None)

                    var_percepcion_discapacidad.condicion_discapacidad = request.data.get("condicion_discapacidad", False)
                    var_percepcion_discapacidad.contexto_universitario = request.data.get("contexto_universitario", False)
                    var_percepcion_discapacidad.ausencia_ayuda_tec = request.data.get("ausencia_ayuda_tec", False)
                    var_percepcion_discapacidad.ausencia_espacios_fisicos = request.data.get("ausencia_espacios_fisicos", False)
                    var_percepcion_discapacidad.ausencia_materiales_impresos = request.data.get("ausencia_materiales_impresos", False)
                    var_percepcion_discapacidad.ausencia_personas_apoyo = request.data.get("ausencia_personas_apoyo", False)
                    var_percepcion_discapacidad.actitudes_negativas_personas = request.data.get("actitudes_negativas_personas", False)
                    var_percepcion_discapacidad.ausencia_servicios_discapacidad = request.data.get("ausencia_servicios_discapacidad", False)
                    var_percepcion_discapacidad.otros_factores = request.data.get("otros_factores", False)
                    var_percepcion_discapacidad.otros_factores_texto = request.data.get("otros_factores_texto", None)
                    var_percepcion_discapacidad.condicion_psicoemocional = request.data.get("condicion_psicoemocional", False)
                    var_percepcion_discapacidad.otra_psicoemocional = request.data.get("otra_psicoemocional", False)
                    var_percepcion_discapacidad.otra_psicoemocional_texto = request.data.get("otra_psicoemocional_texto", None)

                    var_percepcion_discapacidad.escritos_impresos = request.data.get("escritos_impresos", False)
                    var_percepcion_discapacidad.escritos_impresos_numero = request.data.get("escritos_impresos_numero", None)
                    var_percepcion_discapacidad.imagenes_pantalla = request.data.get("imagenes_pantalla", False)
                    var_percepcion_discapacidad.imagenes_pantalla_numero = request.data.get("imagenes_pantalla_numero", None)
                    var_percepcion_discapacidad.copia_dictado = request.data.get("copia_dictado", False)
                    var_percepcion_discapacidad.copia_dictado_numero = request.data.get("copia_dictado_numero", None)
                    var_percepcion_discapacidad.transcripcion_textos = request.data.get("transcripcion_textos", False)
                    var_percepcion_discapacidad.transcripcion_textos_numero = request.data.get("transcripcion_textos_numero", None)
                    var_percepcion_discapacidad.manuales_escritos = request.data.get("manuales_escritos", False)
                    var_percepcion_discapacidad.manuales_escritos_numero = request.data.get("manuales_escritos_numero", None)
                    var_percepcion_discapacidad.textos_pantalla = request.data.get("textos_pantalla", False)
                    var_percepcion_discapacidad.textos_pantalla_numero = request.data.get("textos_pantalla_numero", None)
                    var_percepcion_discapacidad.redactar = request.data.get("redactar", False)
                    var_percepcion_discapacidad.redactar_numero = request.data.get("redactar_numero", None)
                    var_percepcion_discapacidad.elaborar_ideas = request.data.get("elaborar_ideas", False)
                    var_percepcion_discapacidad.elaborar_ideas_numero = request.data.get("elaborar_ideas_numero", None)
                    var_percepcion_discapacidad.escuchar = request.data.get("escuchar", False)
                    var_percepcion_discapacidad.escuchar_numero = request.data.get("escuchar_numero", None)
                    var_percepcion_discapacidad.expre_oral = request.data.get("expre_oral", False)
                    var_percepcion_discapacidad.expre_oral_numero = request.data.get("expre_oral_numero", None)
                    var_percepcion_discapacidad.compren_oral = request.data.get("compren_oral", False)
                    var_percepcion_discapacidad.compren_oral_numero = request.data.get("compren_oral_numero", None)
                    var_percepcion_discapacidad.interactuar = request.data.get("interactuar", False)
                    var_percepcion_discapacidad.interactuar_numero = request.data.get("interactuar_numero", None)
                    var_percepcion_discapacidad.rel_interpersonales = request.data.get("rel_interpersonales", False)
                    var_percepcion_discapacidad.rel_interpersonales_numero = request.data.get("rel_interpersonales_numero", None)
                    var_percepcion_discapacidad.desplazarse = request.data.get("desplazarse", False)
                    var_percepcion_discapacidad.desplazarse_numero = request.data.get("desplazarse_numero", None)
                    var_percepcion_discapacidad.manipular_obj = request.data.get("manipular_obj", False)
                    var_percepcion_discapacidad.manipular_obj_numero = request.data.get("manipular_obj_numero", None)
                    var_percepcion_discapacidad.mant_sentado = request.data.get("mant_sentado", False)
                    var_percepcion_discapacidad.mant_sentado_numero = request.data.get("mant_sentado_numero", None)
                    var_percepcion_discapacidad.asearse = request.data.get("asearse", False)
                    var_percepcion_discapacidad.asearse_numero = request.data.get("asearse_numero", None)
                    var_percepcion_discapacidad.vestirse_desves = request.data.get("vestirse_desves", False)
                    var_percepcion_discapacidad.vestirse_desves_numero = request.data.get("vestirse_desves_numero", None)
                    var_percepcion_discapacidad.consumier_alimen = request.data.get("consumier_alimen", False)
                    var_percepcion_discapacidad.consumier_alimen_numero = request.data.get("consumier_alimen_numero", None)
                    var_percepcion_discapacidad.evacuar = request.data.get("evacuar", False)
                    var_percepcion_discapacidad.evacuar_numero = request.data.get("evacuar_numero", None)
                    var_percepcion_discapacidad.otro = request.data.get("otro", False)
                    var_percepcion_discapacidad.otro_texto = request.data.get("otro_texto", None)

                    var_percepcion_discapacidad.amigo_apoyo = request.data.get("amigo_apoyo", False)
                    var_percepcion_discapacidad.pareja_apoyo = request.data.get("pareja_apoyo", False)
                    var_percepcion_discapacidad.familia_apoyo = request.data.get("familia_apoyo", False)
                    var_percepcion_discapacidad.salud_apoyo = request.data.get("salud_apoyo", False)
                    var_percepcion_discapacidad.otro_apoyo = request.data.get("otro_apoyo", False)
                    var_percepcion_discapacidad.privado_desplazar = request.data.get("privado_desplazar", False)
                    var_percepcion_discapacidad.publico_desplazar = request.data.get("publico_desplazar", False)
                    var_percepcion_discapacidad.propio_desplazar = request.data.get("propio_desplazar", False)
                    var_percepcion_discapacidad.otro_desplazar = request.data.get("otro_desplazar", False)
                    var_percepcion_discapacidad.participa_org = request.data.get("participa_org", False)
                    var_percepcion_discapacidad.act_otras_per = request.data.get("act_otras_per", False)
                    var_percepcion_discapacidad.apoyo_inst = request.data.get("apoyo_inst", False)
                    var_percepcion_discapacidad.nombre_institucion = request.data.get("nombre_institucion", None)
                    var_percepcion_discapacidad.tipo_apoyo = request.data.get("tipo_apoyo", None)
                    var_percepcion_discapacidad.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
            
        elif request.data["tipo"] == 'datos_servicios_salud':
            request_semestre = semestre.objects.get(id=int(request.data["id_semestre"]))
            request_estudiante = estudiante.objects.get(id=int(request.data["id_estudiante"]))
            request_fecha =datetime.strptime(request.data["fecha"],'%Y-%m-%d')
            request_lugar = request.data["lugar"]
            request_creador = User.objects.get(id = int(request.data["id_creador"]))
            var_caracterizacion = caracterizacion.objects.filter(id_estudiante=request_estudiante,id_semestre=request_semestre).first()

            if(var_caracterizacion):

                var_caracterizacion.fecha = request_fecha
                var_caracterizacion.lugar = request_lugar

                var_caracterizacion.save()

                var_acceso_servi_salud = acceso_servi_salud.objects.filter(id= var_caracterizacion.id_acceso_servi_salud.id).first()
                if(var_acceso_servi_salud):
                    var_acceso_servi_salud.regimen_vinculado = request.data.get("regimen_vinculado", False)
                    var_acceso_servi_salud.servicio_salud = request.data.get("servicio_salud", False)
                    var_acceso_servi_salud.salud_otra_texto = request.data.get("salud_otra_texto", None)
                    var_acceso_servi_salud.servicio_general = request.data.get("servicio_general", False)
                    var_acceso_servi_salud.servicio_optometra = request.data.get("servicio_optometra", False)
                    var_acceso_servi_salud.servicio_psiquiatria = request.data.get("servicio_psiquiatria", False)
                    var_acceso_servi_salud.servicio_alternativas = request.data.get("servicio_alternativas", False)
                    var_acceso_servi_salud.servicio_especializado = request.data.get("servicio_especializado", False)
                    var_acceso_servi_salud.servicio_fisioterapia = request.data.get("servicio_fisioterapia", False)
                    var_acceso_servi_salud.servicio_otro = request.data.get("servicio_otro", False)
                    var_acceso_servi_salud.servicio_ocupacional = request.data.get("servicio_ocupacional", False)
                    var_acceso_servi_salud.servicio_fonoaudiologia = request.data.get("servicio_fonoaudiologia", False)
                    var_acceso_servi_salud.servicio_psicologia = request.data.get("servicio_psicologia", False)
                    var_acceso_servi_salud.servicio_social = request.data.get("servicio_social", False)

                    var_acceso_servi_salud.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)

                return Response({'Respuesta': 'Registro editado'},status=status.HTTP_200_OK)
            else:
                var_caracterizacion_new = self.create_models_caracterizacion(request_estudiante,request_semestre,request_fecha,request_lugar,request_creador)
                var_caracterizacion_new.fecha = request_fecha
                var_caracterizacion_new.lugar = request_lugar

                var_caracterizacion_new.save()

                var_acceso_servi_salud = acceso_servi_salud.objects.filter(id= var_caracterizacion_new.id_acceso_servi_salud.id).first()
                if(var_acceso_servi_salud):
                    var_acceso_servi_salud.regimen_vinculado = request.data.get("regimen_vinculado", False)
                    var_acceso_servi_salud.servicio_salud = request.data.get("servicio_salud", False)
                    var_acceso_servi_salud.salud_otra_texto = request.data.get("salud_otra_texto", None)
                    var_acceso_servi_salud.servicio_general = request.data.get("servicio_general", False)
                    var_acceso_servi_salud.servicio_optometra = request.data.get("servicio_optometra", False)
                    var_acceso_servi_salud.servicio_psiquiatria = request.data.get("servicio_psiquiatria", False)
                    var_acceso_servi_salud.servicio_alternativas = request.data.get("servicio_alternativas", False)
                    var_acceso_servi_salud.servicio_especializado = request.data.get("servicio_especializado", False)
                    var_acceso_servi_salud.servicio_fisioterapia = request.data.get("servicio_fisioterapia", False)
                    var_acceso_servi_salud.servicio_otro = request.data.get("servicio_otro", False)
                    var_acceso_servi_salud.servicio_ocupacional = request.data.get("servicio_ocupacional", False)
                    var_acceso_servi_salud.servicio_fonoaudiologia = request.data.get("servicio_fonoaudiologia", False)
                    var_acceso_servi_salud.servicio_psicologia = request.data.get("servicio_psicologia", False)
                    var_acceso_servi_salud.servicio_social = request.data.get("servicio_social", False)

                    var_acceso_servi_salud.save()
                else:
                    return Response({'Respuesta': 'ERROR'},status=status.HTTP_404_NOT_FOUND)
                return Response({'Respuesta': 'Creado registro nuevo'}, status=status.HTTP_200_OK)
            
        else :
            return Response({'error': 'Tipo de edición no existente.'}, status=status.HTTP_400_BAD_REQUEST)
            
    @action(detail=True, methods=['get'], url_path='datos_caracterizacion')
    def datos_caracterizacion(self, request, pk=None):

        request_semestre = int(request.GET.get('id_semestre'))
        var_caracterizacion = caracterizacion.objects.filter(
                id_estudiante=pk, id_semestre=request_semestre).first()
        serializer =caracterizacion_serializer(var_caracterizacion)
        if (var_caracterizacion):
            var_user_extended_disc = user_extended_disc.objects.filter(id_usuario= var_caracterizacion.id_creador.id).values()
            var_user = User.objects.filter(id= var_caracterizacion.id_creador.id).values('first_name','last_name')
            var_datos_academicos = datos_academicos.objects.filter(id= var_caracterizacion.id_datos_academicos.id).values()
            var_datos_economicos = datos_economicos.objects.filter(id= var_caracterizacion.id_datos_economicos.id).values()
            var_datos_entrevistado = datos_entrevistado.objects.filter(id= var_caracterizacion.id_datos_entrevistado.id).values()
            var_percepcion_discapacidad = percepcion_discapacidad.objects.filter(id= var_caracterizacion.id_percepcion_discapacidad.id).values()
            var_acceso_servi_salud = acceso_servi_salud.objects.filter(id= var_caracterizacion.id_acceso_servi_salud.id).values()
            dict_caracterizacion = {
                "datos_user":var_user[0],
                "datos_caracterizacion" : serializer.data,
                "datos_entrevistador" : var_user_extended_disc[0],
                "datos_entrevistado": var_datos_entrevistado[0],
                "datos_academicos" : var_datos_academicos[0],
                "datos_economicos" : var_datos_economicos[0],
                "percepcion_discapacidad" :var_percepcion_discapacidad[0],
                "acceso_servi_salud" : var_acceso_servi_salud[0]
            }
            data = dict_caracterizacion
                        
            return Response(data)
        else:
            return Response({'error': 'No se encontraron datos'}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['get'], url_path='datos_accesibilidad')
    def datos_accesibilidad(self, request, pk=None):
    
        request_semestre = int(request.GET.get('id_semestre'))
        var_accesbilidad = accesibilidad.objects.filter(
                id_estudiante=pk, id_semestre=request_semestre)

        if (var_accesbilidad):
            # print(var_accesbilidad)
            # print("Talba principal: accesibilidad")
            serializer_accesibilidad = accesibilidad_serializer(
                var_accesbilidad[0])
            # print(serializer_accesibilidad.data)

            # 24 Consultas a las tablas relacionadas

            # Tabla accesibilidad_comunicacional
            acc_comunicacional = accesibilidad_comunicacional.objects.filter(
                id=serializer_accesibilidad.data['id_accesibilidad_comunicacional']).values()
            # print("accesibilidad_comunicacional")
            # print(acc_comunicacional[0])
            # Sub Tabla produccion_ac
            ta_prod_ac = produccion_ac.objects.filter(
                id=acc_comunicacional[0]['id_produccion_id']).values()
            # print(ta_prod_ac[0])

            # Sub tabla recepcion_ac
            ta_rec_ac = recepcion_ac.objects.filter(
                id=acc_comunicacional[0]['id_recepcion_id']).values()
            # print(ta_rec_ac[0])

            # Sub tabla comunicacion_interpersonal_ac
            ta_com_inter_ac = comunicacion_interpersonal_ac.objects.filter(
                id=acc_comunicacional[0]['id_comunicacion_interpersonal_id']).values()
            # print(ta_com_inter_ac[0])

            # Sub tabla ajustes_razonables_ac
            ta_ajus_raz_ac = ajustes_razonables_ac.objects.filter(
                id=acc_comunicacional[0]['id_ajustes_razonables_id']).values()
            # print(ta_ajus_raz_ac[0])
            # Sub - sub tabla apoyo_productos_ar
            ta_apoyo_prod_ar = apoyo_productos_ar.objects.filter(
                id=ta_ajus_raz_ac[0]['id_apoyo_productos_id']).values()
            # print(ta_apoyo_prod_ar[0])
            # Sub - sub tabla apoyo_recursos_ar
            ta_apoyo_rec_ar = apoyo_recursos_ar.objects.filter(
                id=ta_ajus_raz_ac[0]['id_apoyo_recursos_id']).values()
            # print(ta_apoyo_rec_ar[0])
            # Sub - sub tabla servicios_sistemas_ar
            ta_ser_sis_ar = servicios_sistemas_ar.objects.filter(
                id=ta_ajus_raz_ac[0]['id_servicios_sistemas_id']).values()
            # print(ta_ser_sis_ar[0])
            # Fin tabla accesibilidad_comunicacional

            # Tabla accesibilidad_instrumental
            # print("accesibilidad_instrumental")
            acc_instrumental = accesibilidad_instrumental.objects.filter(
                id=serializer_accesibilidad.data['id_accesibilidad_instrumental']).values()
            # print(acc_instrumental[0])
            # Sub tabla tareas_generales_ai
            ta_tareas_gen_ai = tareas_generales_ai.objects.filter(
                id=acc_instrumental[0]['id_tareas_generales_id']).values()
            # print(ta_tareas_gen_ai[0])
            # Sub tabla actividades_instrumentales_ai
            ta_act_inst_ai = actividades_instrumentales_ai.objects.filter(
                id=acc_instrumental[0]['id_actividades_instrumentales_id']).values()
            # print(ta_act_inst_ai[0])
            # Sub tabla actividades_basicas_ai
            ta_act_basic_ai = actividades_basicas_ai.objects.filter(
                id=acc_instrumental[0]['id_actividades_basicas_id']).values()
            # print(ta_act_basic_ai[0])
            # Sub tabla ajustes_razonables_ai
            ta_ajus_raz_ai = ajustes_razonables_ai.objects.filter(
                id=acc_instrumental[0]['id_ajustes_razonables_id']).values()
            # print(ta_ajus_raz_ai[0])
            # Fin tabla accesibilidad_in

            # Tabla accesibilidad_metodologica
            # print("accesibilidad_metodologica")
            acc_metodologica = accesibilidad_metodologica.objects.filter(
                id=serializer_accesibilidad.data['id_accesibilidad_metodologica']).values()
            # print(acc_metodologica[0])
            # Sub tabla ajustes_razonables_am
            ta_ajus_raz_am = ajustes_razonables_am.objects.filter(
                id=acc_metodologica[0]['id_ajustes_razonables_id']).values()
            # print(ta_ajus_raz_am[0])
            # Fin tabla accesibilidad_metodologica

            # Tabla accesibilidad_programatica
            # print("accesibilidad_programatica")
            acc_programatica = accesibilidad_programatica.objects.filter(
                id=serializer_accesibilidad.data['id_accesibilidad_programatica']).values()
            # print(acc_programatica[0])
            # Fin tabla accesibilidad_programatica

            # Tabla accesibilidad_fisica_aft
            # print("accesibilidad_fisica_aft")
            acc_fisica_aft = accesibilidad_fisica_tec.objects.filter(
                id=serializer_accesibilidad.data['id_accesibilidad_fisica_tec']).values()
            # print(acc_fisica_aft[0])
            # Sub tabla accibilidad fisica
            ta_acc_fisica = accesibilidad_fisica_tec.objects.filter(
                id=acc_fisica_aft[0]['id_accesibilidad_fisica_id']).values()
            # print(ta_acc_fisica[0])
            # Sub tabla accibilidad tecnologica
            ta_acc_tec = accesibilidad_fisica_tec.objects.filter(
                id=acc_fisica_aft[0]['id_accesibilidad_tecnologica_id']).values()
            # print(ta_acc_tec[0])
            # Sub tabla ajustes_razonables_aft
            ta_ajus_raz_aft = ajustes_razonables_aft.objects.filter(
                id=acc_fisica_aft[0]['id_ajustes_razonables_id']).values()
            # print(ta_ajus_raz_aft[0])
            # Sub - sub tabla entorno_socio_ar
            ta_ent_socio_ar = entorno_socio_ar.objects.filter(
                id=ta_ajus_raz_aft[0]['id_entorno_socio_id']).values()
            # print(ta_ent_socio_ar[0])
            # Sub - sub tabla actividades_cuidado_ar
            ta_act_cuidado_ar = actividades_cuidado_ar.objects.filter(
                id=ta_ajus_raz_aft[0]['id_actividades_cuidado_id']).values()
            # print(ta_act_cuidado_ar[0])
            # Sub - sub tabla entorno_fisicotec_ar
            ta_ent_fisicotec_ar = entorno_fisicotec_ar.objects.filter(
                id=ta_ajus_raz_aft[0]['id_entorno_fisicotec_id']).values()
            # print(ta_ent_fisicotec_ar[0])
            # Fin tabla accesibilidad_fisica_aft

            # Construcción diccionario de respuesta
            # print(acc_comunicacional[0])
            print(ta_ajus_raz_ai[0])
            dicc_accesibilidad = {

                "accesibilidad_comunicacional": {
                    "tabla_produccion_ac": ta_prod_ac[0],
                    "tabla_recepcion_ac": ta_rec_ac[0],
                    "tabla_comunicacion_interpersonal_ac": ta_com_inter_ac[0],
                    "tabla_ajustes_razonables_ac": {
                        "tabla_apoyo_productos_ar": ta_apoyo_prod_ar[0],
                        "tabla_apoyo_recursos_ar": ta_apoyo_rec_ar[0],
                        "tabla_servicios_sistemas_ar": ta_ser_sis_ar[0]},
                },
                "accesibilidad_instrumental": {
                    "tabla_tareas_generales_ai": ta_tareas_gen_ai[0],
                    "tabla_actividades_instrumentales_ai": ta_act_inst_ai[0],
                    "tabla_actividades_basicas_ai": ta_act_basic_ai[0],
                    "tabla_ajustes_razonables_ai": ta_ajus_raz_ai[0],
                },
                "accesibilidad_metodologica": {
                    "tabla_acc_metodologica": acc_metodologica[0],
                    "tabla_ajustes_razonables_am": ta_ajus_raz_am[0],
                },
                "accesibilidad_programatica": {
                    "tabla_acc_programatica": acc_programatica[0],
                },
                "accesibilidad_fisica_tec": {
                    "tabla_acc_fisica_aft": ta_acc_fisica[0],
                    "tabla_acc_tec_aft": ta_acc_tec[0],
                    "tabla_ajustes_razonables_aft": {
                        "tabla_entorno_socio_ar": ta_ent_socio_ar[0],
                        "tabla_actividades_cuidado_ar": ta_act_cuidado_ar[0],
                        "tabla_entorno_fisicotec_ar": ta_ent_fisicotec_ar[0],
                    },
                },
            
            }

            data = dict(serializer_accesibilidad.data, **
                        dicc_accesibilidad)
                        
            return Response(data)
        else:
            return Response({'error': 'No se encontraron datos'}, status=status.HTTP_400_BAD_REQUEST)


class semestres_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_sedes_discapacidad = semestre.objects.filter(
            id_sede='11').distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_sedes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)
