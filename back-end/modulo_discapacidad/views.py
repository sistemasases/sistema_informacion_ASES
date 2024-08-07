from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTTokenUserAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status

from .serializers import ficha_estudiante_disc_serializer, asignacion_disc_serializer, accesibilidad_serializer, ficha_estudiante_disc_info_extra_serializer
from .models import *
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

    @action(detail=True, methods=['get'], url_path='datos_accesibilidad')
    def datos_accesibilidad(self, request, pk=None):
        print('entro a datos_accesibilidad')
        print(pk)
        request_semestre = int(request.GET.get('id_semestre'))
        print(request_semestre)

        # Consulta de la tabla accesibilidad
        try:
            var_accesbilidad = accesibilidad.objects.filter(
                id_estudiante=pk, id_semestre=request_semestre)
        except:
            return Response({'error': 'No se encontraron datos'}, status=status.HTTP_400_BAD_REQUEST)

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


class semestres_discapacidad_viewsets (viewsets.ModelViewSet):
    serializer_class = semestre_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def list(self, request):
        lista_sedes_discapacidad = semestre.objects.filter(
            id_sede='11').distinct().order_by('-fecha_inicio')
        respuesta = semestre_serializer(lista_sedes_discapacidad, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)
