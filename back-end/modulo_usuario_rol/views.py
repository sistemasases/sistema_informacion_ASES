"""
Autor: César Becerra Ramírez.
Correo: cesar.becerra@correounivalle.edu.co
Versión: 1.0.0
Fecha: 2023-01-28
Descripción: Este código define dos viewsets, 'sede_viewsets' y 'semestre_viewsets', los cuales manejan las operaciones CRUD
para los modelos de 'sede' y 'semestre' usando sus respectivos serializers. 'semestre_viewsets' también define métodos adicionales
para la creación, actualización y recuperación del actual objeto 'semestre' basado en el parametro 'id_sede_id'.
"""
from queue import Empty
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, monitor, act_simultanea, cond_excepcion, discap_men, estado_civil,  etnia, identidad_gen, cohorte_estudiante
from modulo_geografico.models import barrio, municipio
from modulo_programa.models import programa_estudiante, programa, historial_estado_programa_estudiante, programa_monitor
from modulo_instancia.models import semestre, cohorte
from modulo_asignacion.models import asignacion
from modulo_seguimiento.models import inasistencia, seguimiento_individual, riesgo_individual
from modulo_usuario_rol.models import firma_tratamiento_datos
from django.db.models import Q, Subquery, OuterRef
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import  *
from modulo_programa.serializers import historial_estado_programa_estudiante_serializer
from modulo_instancia.serializers import semestre_serializer, cohorte_serializer
from modulo_asignacion.serializers import asignacion_serializer
from modulo_seguimiento.serializers import seguimiento_individual_serializer
from django.core.exceptions import MultipleObjectsReturned
from django.shortcuts import get_object_or_404
from django.core import serializers


"""
POR EL GRAN TAMAÑO DE ESTA VISTA SE DIVIDIÓ LA MISMA EN VARIAS PARTES
"""

"""
PARTE 1: VIEWS QUE SE BASAN EN EL MODELO USUARIO__________________________________________________________________________________________________
"""
class user_viewsets (viewsets.ModelViewSet):

    """
    Viewsets del modelo de usuario.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
    en el modelo de usuarios.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'user_serializer' para serializar los datos del modelo.

    Atributos:
    - serializer_class: Clase del serializador utilizado.
    - permission_classes: Clases de permisos aplicadas a la vista.
    - queryset: Conjunto de objetos del modelo 'User'.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de usuarios.
    - POST: Crea un nuevo usuario.
    - PUT: Actualiza un usuario existente.
    - DELETE: Elimina un usuario existente.

    Gestión de solicutudes HTTP VIEWSETS:
    list: Maneja las solicitudes GET para obtener una lista de recursos.
    create: Maneja las solicitudes POST para crear un nuevo recurso.
    retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria.
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
    partial_update: Maneja las solicitudes PATCH para realizar una actualización parcial de un recurso específico por su clave primaria.
    destroy: Maneja las solicitudes DELETE para eliminar un recurso específico por su clave primaria.
    """

    serializer_class = user_serializer
    permission_classes = (IsAuthenticated,)
    queryset = user_serializer.Meta.model.objects.all()

class user_actualizacion_viewsets(viewsets.ViewSet):
    """
    Vista para actualizar información de usuarios.

    Esta vista permite actualizar el nombre y apellido de un usuario existente, esta llamada se ejecuta en la vista de ficha del monitor.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'user_actualizacion' para serializar los datos de actualización.

    Métodos HTTP admitidos:
    - PUT: Actualiza el nombre y apellido de un usuario.

    Gestión de solicutudes HTTP VIEWSETS:
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.

    """
    serializer_class = user_actualizacion
    permission_classes = (IsAuthenticated,)

    def update(self, request, pk=None):
        """
        Actualiza el nombre y apellido de un usuario.

        Args:
        - request: Solicitud HTTP recibida.
        - pk: Clave primaria del usuario a actualizar.

        Returns:
        - Response: Respuesta HTTP indicando el resultado de la actualización.
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            first_name_request = serializer.validated_data['first_name']
            last_name_request = serializer.validated_data['last_name']
            try:
                user = User.objects.get(pk=pk)
                user.first_name = first_name_request
                user.last_name = last_name_request
                user.save()

                return Response({'Respuesta': 'True'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                # Si el usuario no se encuentra, devolver un error 404
                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        # Si los datos del serializador no son válidos, devolver un error 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
"""
PARTE 2: VIEWS QUE SE BASAN EN EL MODELO ESTUDIANTE__________________________________________________________________________________________________
"""

class retiro_viewsets(viewsets.ModelViewSet):
    """
    Viewsets del modelo de retiro.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
    en el modelo de retiros.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'retiro_serializer' para serializar los datos del modelo.

    Atributos:
    - serializer_class: Clase del serializador utilizado.
    - permission_classes: Clases de permisos aplicadas a la vista.
    - queryset: Conjunto de objetos del modelo 'Retiro'.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de retiros.
    - POST: Crea un nuevo retiro.
    - PUT: Actualiza un retiro existente.
    - DELETE: Elimina un retiro existente.

    Gestión de solicutudes HTTP VIEWSETS:
    list: Maneja las solicitudes GET para obtener una lista de recursos.
    create: Maneja las solicitudes POST para crear un nuevo recurso.
    retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria.
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
    partial_update: Maneja las solicitudes PATCH para realizar una actualización parcial de un recurso específico por su clave primaria.
    destroy: Maneja las solicitudes DELETE para eliminar un recurso específico por su clave primaria.
    """

    serializer_class = retiro_serializer
    permission_classes = (IsAuthenticated,)
    queryset = retiro_serializer.Meta.model.objects.all()
    
class motivo_viewsets(viewsets.ModelViewSet):
    """
    Viewsets del modelo de Motivo.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
    en el modelo de motivo.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'motivo_serializer' para serializar los datos del modelo.

    Atributos:
    - serializer_class: Clase del serializador utilizado.
    - permission_classes: Clases de permisos aplicadas a la vista.
    - queryset: Conjunto de objetos del modelo 'Retiro'.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de retiros.
    - POST: Crea un nuevo retiro.
    - PUT: Actualiza un retiro existente.
    - DELETE: Elimina un retiro existente.

    Gestión de solicutudes HTTP VIEWSETS:
    (Redefinida)list: Maneja las solicitudes GET para obtener una lista de recursos, solo trae los motivos que estan activos, es decir, los que tienen el campo motivo_activo en True.
    create: Maneja las solicitudes POST para crear un nuevo recurso.
    retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria.
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
    partial_update: Maneja las solicitudes PATCH para realizar una actualización parcial de un recurso específico por su clave primaria.
    destroy: Maneja las solicitudes DELETE para eliminar un recurso específico por su clave primaria.
    """

    serializer_class = motivo_serializer
    permission_classes = (IsAuthenticated,)
    queryset = motivo_serializer.Meta.model.objects.all()

    def list(self, request):

        lista_motivos_activos = motivo.objects.filter(motivo_activo = True).distinct().order_by('id')
        respuesta = motivo_serializer (lista_motivos_activos, many=True)
        return Response(respuesta.data, status=status.HTTP_200_OK)


class estudiante_viewsets(viewsets.ModelViewSet):
    """
    Vista para manejar operaciones relacionadas con estudiantes.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
    en el modelo de estudiantes.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'estudiante_serializer' para serializar los datos del modelo.

    Métodos HTTP admitidos:
    - GET: Obtiene un estudiante y sus detalles.
    - POST: Crea un nuevo retiro.
    - PUT: Actualiza un retiro existente.
    - DELETE: Elimina un retiro existente.

    Gestión de solicutudes HTTP VIEWSETS:
    list: Maneja las solicitudes GET para obtener una lista de recursos.
    create: Maneja las solicitudes POST para crear un nuevo recurso.
    (Redefinida) retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria. 
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
    partial_update: Maneja las solicitudes PATCH para realizar una actualización parcial de un recurso específico por su clave primaria.
    destroy: Maneja las solicitudes DELETE para eliminar un recurso específico por su clave primaria.
    """
    serializer_class = estudiante_serializer
    permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()
    
    # Función para convertir el nivel de riesgo numérico en clasificación textual
    def get_nivel_riesgo(self, riesgo):
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo == None or riesgo == 'None':
            return 'SIN RIESGO'
        
    # Función para convertir la fecha a formato datetime y realizar cálculos
    def get_fecha_seguimiento(self, fecha, inasistencia):
        fech_actual = datetime.now()
        fecha_ = timedelta(days=7)
        fecha_limite = fech_actual - fecha_
        # print(fecha_limite)
        # print(fecha)
        
        # print("inasistencia " + inasistencia)
        # date_obj = datetime.strptime(
        #         fecha, "%Y-%m-%d")
        # if(date_obj.date() > fecha_limite.date()):
        #     print("SEGUIMIENTO RECIENTE")
        if fecha == None or fecha == 'None' or fecha == '' or fecha == ' ' or fecha == 'Null' or fecha == 'null' or fecha == 'NULL' or fecha == 'null' or fecha == 'NoneType':
            if inasistencia == None or inasistencia == '' or inasistencia == 'None':
                return "FICHA FALTANTE"
            else:
                otra_inasistencia = datetime.strptime(inasistencia, "%Y-%m-%d")
                if otra_inasistencia.date() <= fecha_limite.date():
                    return "INASISTENCIA"
                else:
                    return "INASISTENCIA"
        else:
            date_obj = datetime.strptime(
                fecha, "%Y-%m-%d")
            if inasistencia == None or inasistencia == '' or inasistencia == 'None':
                if date_obj.date() <= fecha_limite.date():
                    return "FICHA FALTANTE"
                elif (date_obj.date() > fecha_limite.date()):
                    return "SEGUIMIENTO RECIENTE"
            else:
                ina = datetime.strptime(inasistencia, "%Y-%m-%d")
                if date_obj.date() <= ina.date():
                    return "INASISTENCIA"
                elif (date_obj.date() > fecha_limite.date()):
                    return "SEGUIMIENTO RECIENTE"
                else:
                    return "FICHA FALTANTE"
            return "SEGUIMIENTO RECIENTE"
            
            
            
            
    # Función para verificar si el tratamiento de datos está autorizado o no
    def get_firma(self, firma):
        if firma:
            if firma[0]['autoriza_tratamiento_datos']  == True:
                return 'AUTORIZA'
            elif firma[0]['autoriza_tratamiento_datos'] == False:
                return 'NO AUTORIZA'
        else:
            return "SIN FIRMAR"
    # Se redefine la función retrieve para poder traer todos los campos que se relacionan con el estudiante, independeinte de si estan en el modelo estudiante o no.
    # Esta función es utlizada en la vista Ficha del Estudiante.
    def retrieve(self, request, pk=None):
        
        request_sede = int(request.GET.get('id_sede'))
        var_estudiante = estudiante.objects.get(id=pk)
        serializer_estudiante = estudiante_serializer(var_estudiante)
        diccionario_estudiante = serializer_estudiante.data
        #llamado y seteo de barrios, ciudades y otros campos que hagan llamada a otra tabla ademas de estudiante (osea, estudiante tiene el id del campo a llamar de otra tabla)
        #barrio_ini         barrio_res
        barrio_ini_id = diccionario_estudiante['barrio_ini']
        barrio_res_id = diccionario_estudiante['barrio_res']
        try:
            barrio_ini_obj = barrio.objects.get(codigo_barrio=barrio_ini_id)
            diccionario_estudiante['barrio_ini'] = barrio_ini_obj.nombre
        except barrio.DoesNotExist:
            diccionario_estudiante['barrio_ini'] = None
        try:
            barrio_res_obj = barrio.objects.get(codigo_barrio=barrio_res_id)
            diccionario_estudiante['barrio_res'] = barrio_res_obj.nombre
            estrato_obj = barrio.objects.get(codigo_barrio=barrio_res_id)
            estrato_nombre = estrato_obj.estrato
            diccionario_estrato = {'estrato': estrato_nombre}
            diccionario_estudiante.update(diccionario_estrato)
        except barrio.DoesNotExist:
            diccionario_estudiante['barrio_res'] = None
        #municipio_nac          municipio_ini          municipio_res
        municipio_nac_id = diccionario_estudiante['ciudad_nac']
        municipio_ini_id = diccionario_estudiante['ciudad_ini']
        municipio_res_id = diccionario_estudiante['ciudad_res']
        try:
            municipio_nac_obj = municipio.objects.get(codigo_divipola=municipio_nac_id)
            diccionario_estudiante['ciudad_nac'] = municipio_nac_obj.nombre
        except municipio.DoesNotExist:
            diccionario_estudiante['ciudad_nac'] = None
        try:
            municipio_ini_obj = municipio.objects.get(codigo_divipola=municipio_ini_id)
            diccionario_estudiante['ciudad_ini'] = municipio_ini_obj.nombre
        except municipio.DoesNotExist:
            diccionario_estudiante['ciudad_ini'] = None
        try:
            municipio_res_obj = municipio.objects.get(codigo_divipola=municipio_res_id)
            diccionario_estudiante['ciudad_res'] = municipio_res_obj.nombre
        except municipio.DoesNotExist:
            diccionario_estudiante['ciudad_res'] = None
        #cond_excepcion          discap_men
        cond_excepcion_id = diccionario_estudiante['id_cond_excepcion']
        discap_men_id = diccionario_estudiante['id_discapacidad']
        try:
            cond_excepcion_obj = cond_excepcion.objects.get(id=cond_excepcion_id)
            diccionarion_cond_excepcion = {'el_id_de_cond_excepcion':cond_excepcion_obj.alias}
            diccionario_estudiante.update(diccionarion_cond_excepcion)
        except cond_excepcion.DoesNotExist:
            diccionario_estudiante['id_cond_excepcion'] = None
        except MultipleObjectsReturned:
            cond_excepcion_obj = cond_excepcion.objects.filter(id=cond_excepcion_id).first()
            diccionarion_cond_excepcion = {'el_id_de_cond_excepcion':cond_excepcion_obj.alias}
            diccionario_estudiante.update(diccionarion_cond_excepcion)
        try:
            discap_men_obj = discap_men.objects.get(codigo_men=discap_men_id)
            diccionario_estudiante['id_discapacidad'] = discap_men_obj.nombre
        except discap_men.DoesNotExist:
            diccionario_estudiante['id_discapacidad'] = None
        #identidad_gen          etnia       estado_civil        act_simultanea
        identidad_gen_id = diccionario_estudiante['id_identidad_gen']
        etnia_id = diccionario_estudiante['id_etnia']
        estado_civil_id = diccionario_estudiante['id_estado_civil']
        act_simultanea_id = diccionario_estudiante['id_act_simultanea']

        try:
            cohorte_obj = cohorte_estudiante.objects.get(id_estudiante=pk)
            serializer_id_cohorte = cohorte_estudiante_serializer(cohorte_obj)
            id_cohorte = serializer_id_cohorte.data['id_cohorte']
            nombre_cohorte = cohorte.objects.get(id=id_cohorte)
            diccionarion_cohorte = {'nombre_cohorte':nombre_cohorte.nombre}
            diccionario_estudiante.update(diccionarion_cohorte)
        except cohorte_estudiante.DoesNotExist:
            diccionario_estudiante['nombre_cohorte'] = None
        except MultipleObjectsReturned:
            cohorte_obj = cohorte_estudiante.objects.filter(id_estudiante=pk).first()
            serializer_id_cohorte = cohorte_estudiante_serializer(cohorte_obj)
            id_cohorte = serializer_id_cohorte.data['id_cohorte']
            nombre_cohorte = cohorte.objects.get(id=id_cohorte)
            diccionarion_cohorte = {'nombre_cohorte':nombre_cohorte.nombre}
            diccionario_estudiante.update(diccionarion_cohorte)
        try:
            identidad_gen_obj = identidad_gen.objects.get(opcion_general=identidad_gen_id)
            diccionarion_identidad_gen = {'el_id_de_identidad_gen':identidad_gen_obj.genero}
            diccionario_estudiante.update(diccionarion_identidad_gen)
        except identidad_gen.DoesNotExist:
            diccionario_estudiante['id_identidad_gen'] = None
        except MultipleObjectsReturned:
            identidad_gen_obj = identidad_gen.objects.filter(opcion_general=identidad_gen_id).first()
            diccionarion_identidad_gen = {'el_id_de_identidad_gen':identidad_gen_obj.genero}
            diccionario_estudiante.update(diccionarion_identidad_gen)
        try:
            etnia_obj = etnia.objects.get(opcion_general=etnia_id)
            diccionarion_etnia = {'el_id_de_etnia':etnia_obj.etnia}
            diccionario_estudiante.update(diccionarion_etnia)
        except etnia.DoesNotExist:
            diccionario_estudiante['id_etnia'] = None
        except MultipleObjectsReturned:
            etnia_obj = etnia.objects.filter(opcion_general=etnia_id).first()
            diccionarion_etnia = {'el_id_de_etnia':etnia_obj.etnia}
            diccionario_estudiante.update(diccionarion_etnia)
        try:
            estado_civil_obj = estado_civil.objects.get(id=estado_civil_id)
            diccionarion_estado_civil = {'el_id_de_estado_civil':estado_civil_obj.estado_civil}
            diccionario_estudiante.update(diccionarion_estado_civil)
        except estado_civil.DoesNotExist:
            diccionario_estudiante['id_estado_civil'] = None
        except MultipleObjectsReturned:
            estado_civil_obj = estado_civil.objects.filter(id=estado_civil_id).first()
            diccionarion_estado_civil = {'el_id_de_estado_civil':estado_civil_obj.estado_civil}
            diccionario_estudiante.update(diccionarion_estado_civil)
        try:
            act_simultanea_obj = act_simultanea.objects.get(opcion_general=act_simultanea_id)
            diccionarion_act_simultanea = {'el_id_de_act_simultanea':act_simultanea_obj.actividad}
            diccionario_estudiante.update(diccionarion_act_simultanea)
        except act_simultanea.DoesNotExist:
            diccionario_estudiante['id_act_simultanea'] = None
        except MultipleObjectsReturned:
            act_simultanea_obj = act_simultanea.objects.filter(opcion_general=act_simultanea_id).first()
            diccionarion_act_simultanea = {'el_id_de_act_simultanea':act_simultanea_obj.actividad}
            diccionario_estudiante.update(diccionarion_act_simultanea)

        lista_programas = []
        try :
            ids_del_estudiante_para_sus_progamas = estudiante.objects.filter(num_doc=serializer_estudiante.data['num_doc']).values('id', 'cod_univalle')
            for id_estudiante_programa in ids_del_estudiante_para_sus_progamas:
                programa_seleccionado = programa_estudiante.objects.filter(id_estudiante=id_estudiante_programa['id']).values('id_programa','id_estado','traker')
                for programa_id in programa_seleccionado :
                    var_programa = programa.objects.filter(id=programa_id['id_programa']).values()
                    dic_programa = {'id': id_estudiante_programa['id'], 
                                    'nombre_programa': var_programa[0]['nombre'], 
                                    'cod_univalle': var_programa[0]['codigo_univalle'],
                                    'codigo_estudiante': id_estudiante_programa['cod_univalle'],
                                    'id_estado_id': programa_id['id_estado'],
                                    'traker': programa_id['traker']
                                    }  # Agregar el estado del curso al diccionario
                    dic = {}
                    dic.update(dic_programa)
                    lista_programas.append(dic)

            diccionario_programas = {'programas': lista_programas}

            diccionario_estudiante.update(diccionario_programas)

        except :
            dic_programa = {'error': 'sin programa asignado o no se encontraro coincidencias'
                            }  # Agregar el estado del curso al diccionario

            dic = id_estudiante_programa
            dic.update(dic_programa)
            lista_programas.append(dic)
            diccionario_programas = {'programas': lista_programas}
            print(diccionario_programas)
            diccionario_estudiante.update(diccionario_programas)

        try:
            semestre_activo = semestre.objects.get(semestre_actual=True, id_sede =request_sede)
            serializer_semestre = semestre_serializer(semestre_activo)
            el_monitor_asignado = asignacion.objects.get(id_semestre=serializer_semestre.data['id'], id_estudiante=pk,estado=True)
            serializer_monitor_asignado = asignacion_serializer(el_monitor_asignado)

            info_monitor = usuario_rol.objects.get(id_usuario = serializer_monitor_asignado.data['id_usuario'], id_semestre=serializer_semestre.data['id'])

            serilalizer_info_monitor = usuario_rol_serializer(info_monitor)

            su_practicante = usuario_rol.objects.get(id_usuario=serilalizer_info_monitor.data['id_jefe'], id_semestre=serializer_semestre.data['id'])
            serializer_su_practicante = usuario_rol_serializer(su_practicante)

            su_profesional = usuario_rol.objects.get(id_usuario=serializer_su_practicante.data['id_jefe'], id_semestre=serializer_semestre.data['id'])
            serializer_su_profesional = usuario_rol_serializer(su_profesional)

            consulta_practicante = User.objects.get(id =serializer_su_practicante.data['id_usuario'])
            serializer_practicante = user_selected(consulta_practicante)

            consulta_profesional = User.objects.get(id =serializer_su_profesional.data['id_usuario'])
            serializer_profesional = user_selected(consulta_profesional)

            consulta_monitor = User.objects.get(id =serilalizer_info_monitor.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)

            datos_encargados = {
                    'profesional': serializer_profesional.data, 
                    'practicante': serializer_practicante.data,
                    'info_monitor': serializer_monitor.data
                    }
        except:
            datos_encargados = {
                    'profesional': 'sin asignacion', 
                    'practicante': 'sin asignacion',
                    'info_monitor': 'sin asignacion'
                    }

        diccionario_estudiante.update(datos_encargados)
        
        try:
            # Obtener el seguimiento más reciente del estudiante especificado
            seguimiento_reciente = seguimiento_individual.objects.filter(
                id_estudiante=pk).latest('fecha')
            inasistencias_registradas = inasistencia.objects.filter(
            id_estudiante= pk).latest('fecha')
            riesgo = {
                'riesgo_individual': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_individual)),
                'riesgo_familiar': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_familiar)),
                'riesgo_academico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_academico)),
                'riesgo_economico': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_economico)),
                'riesgo_vida_universitaria_ciudad': str(self.get_nivel_riesgo(seguimiento_reciente.riesgo_vida_universitaria_ciudad)),
                'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente.fecha), str(inasistencias_registradas.fecha))),
            }
        except seguimiento_individual.DoesNotExist:
            # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
            try:
                inasistencias_registradas = inasistencia.objects.filter(
                id_estudiante= pk).latest('fecha')
                riesgo = {
                    'riesgo_individual': 'SIN SEGUIMIENTO',
                    'riesgo_familiar': 'SIN SEGUIMIENTO',
                    'riesgo_academico': 'SIN SEGUIMIENTO',
                    'riesgo_economico': 'SIN SEGUIMIENTO',
                    'riesgo_vida_universitaria_ciudad': 'SIN SEGUIMIENTO',
                    'fecha_seguimiento': (self.get_fecha_seguimiento(str(None), str(inasistencias_registradas.fecha))),
                }
            except:
                riesgo = {
                        'riesgo_individual': 'SIN SEGUIMIENTO',
                        'riesgo_familiar': 'SIN SEGUIMIENTO',
                        'riesgo_academico': 'SIN SEGUIMIENTO',
                        'riesgo_economico': 'SIN SEGUIMIENTO',
                        'riesgo_vida_universitaria_ciudad': 'SIN SEGUIMIENTO',
                        'fecha_seguimiento': (self.get_fecha_seguimiento(str(None), str(None))),
                    }

        except inasistencia.DoesNotExist:
            seguimiento_reciente = seguimiento_individual.objects.filter(
                id_estudiante=pk).latest('fecha')
            riesgo = {
                'riesgo_individual': 'SIN SEGUIMIENTO',
                'riesgo_familiar': 'SIN SEGUIMIENTO',
                'riesgo_academico': 'SIN SEGUIMIENTO',
                'riesgo_economico': 'SIN SEGUIMIENTO',
                'riesgo_vida_universitaria_ciudad': 'SIN SEGUIMIENTO',
                'fecha_seguimiento': (self.get_fecha_seguimiento(str(seguimiento_reciente.fecha), str(None))),

            }
            
        diccionario_estudiante.update(riesgo)
        
        try:
            firma_tratamiento = firma_tratamiento_datos.objects.filter(
                    id_estudiante=pk).values()
            firma = {
                'firma_tratamiento_datos': self.get_firma(firma_tratamiento),
            }
        except firma_tratamiento_datos.DoesNotExist:
            firma = {
                'firma_tratamiento_datos': 'SIN FIRMAR'
            }
            
        diccionario_estudiante.update(firma)
        return Response(diccionario_estudiante)

class estudiante_por_sede_viewsets(viewsets.ModelViewSet):
    """
    Vista para obtener estudiantes por sede.

    Esta vista permite obtener una lista de estudiantes asociados a una sede específica.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'usuario_rol_serializer' para serializar los datos del modelo 'UsuarioRol'.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de estudiantes por sede.

    Gestión de solicutudes HTTP VIEWSETS:
    (Redefinida) retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria. 
    
    """

    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        #Obtener los programas asociados a la sede especificada
        programas_sede = programa.objects.filter(id_sede=pk)
        # Filtrar los estudiantes asociados a los programas de la sede
        estudiantes_sede = estudiante.objects.filter(id_estudiante_in_programa_estudiante__id_programa__in=programas_sede, estudiante_elegible = True).distinct()
        # Serializar los datos de los estudiantes en formato python
        list_estudiantes = estudiante_serializer(estudiantes_sede, many=True)
        # Extraer los campos de los estudiantes serializados
        # Devolver la lista de estudiantes como respuesta
        return Response(list_estudiantes.data, status=status.HTTP_200_OK)
    
class estudiante_selected_viewsets(viewsets.ModelViewSet):
    """
    Vista para manejar la selección de estudiantes.

    Esta vista permite actualizar la selección de estudiantes para un usuario específico.
    Esta función se encarga de devolver un listado de los estudiantes que actualmente tiene asignado el monitor selecionado
    y los que aun no. Este endpoint es llamado en la vista de Asignaciones, especificamente al seleccionar un monitor.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'usuario_rol_serializer' para serializar los datos del modelo 'UsuarioRol'.

    Métodos HTTP admitidos:
    - PUT: Actualiza la selección de estudiantes para un usuario específico.

    Gestión de solicutudes HTTP VIEWSETS:
    (Redefinida)update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
   
    """
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def update(self, request, pk):
        var_semestre = get_object_or_404(semestre, semestre_actual=True, id_sede=request.data["id_sede"])
        serializer_semestre = semestre_serializer(var_semestre)
        # Filtrar los estudiantes asignados al usuario para el semestre actual
        estudiantes_asignados = estudiante.objects.filter(asignacion__id_usuario=pk, asignacion__estado=True, asignacion__id_semestre=serializer_semestre.data['id']).distinct()
        # Obtener los programas asociados a la sede proporcionada en la solicitud
        programas_sede = programa.objects.filter(id_sede=request.data["id_sede"])
        # Subconsulta para obtener las asignaciones en el semestre actual con estado True
        asignaciones_semestre_actual_true = asignacion.objects.filter(
            id_estudiante=OuterRef('pk'), 
            id_semestre=serializer_semestre.data['id'], 
            estado=True
        )

        # Consulta principal
        estudiantes_totales = estudiante.objects.filter(
            Q(id_estudiante_in_programa_estudiante__id_programa__in=programas_sede) &
            Q(estudiante_elegible=True)
        ).exclude(
            id__in=Subquery(asignaciones_semestre_actual_true.values('id_estudiante'))
        ).distinct()
        # Filtrar los estudiantes no asignados para el semestre actual
        # estudiantes_no_asignados = estudiante.objects.filter(Q(asignacion__id_semestre=serializer_semestre.data['id'],asignacion__estado=True)).distinct()
        # # Excluir los estudiantes no asignados de la lista total de estudiantes
        # estudiantes_totales = estudiantes_totales.exclude(id__in=estudiantes_no_asignados.values_list('id', flat=True))
        # Serializar los datos de los estudiantes asignados y no asignados
        list_estudiantes_selected = estudiante_serializer(estudiantes_asignados, many=True) 
        list_estudiantes = estudiante_serializer(estudiantes_totales, many=True)
        # Consolidar los datos de los estudiantes seleccionados y no seleccionados
        datos = [list_estudiantes_selected.data, list_estudiantes.data]
        # Devolver los datos como respuesta
        return Response(datos, status=status.HTTP_200_OK)
    
class estudiante_actualizacion_viewsets (viewsets.ModelViewSet):
    """
    Vista para actualizar la información del estudiante.

    Esta vista permite actualizar la información del estudiante, independientemente de si los campos
    están en el modelo de estudiante o no. Se utiliza para la vista de ficha del estudiante.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'Estudiante_actualizacion' para serializar los datos del estudiante.

    Métodos HTTP admitidos:
    - POST: Actualiza la información del estudiante.
    """
    serializer_class = Estudiante_actualizacion
    permission_classes = (IsAuthenticated,)
    queryset = estudiante_serializer.Meta.model.objects.all()

    # Se define la función post para poder editar todos los campos que se relacionan con el estudiante, independeinte de si estan en el modelo estudiante o no.
    # Esta función es utlizada en la vista Ficha del Estudiante.
    def post(self, request, pk=None):
        # serializer = self.serializer_class(data=request.data)
        # if (serializer.is_valid()):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            puntaje_icfes_request = serializer.data['puntaje_icfes']
            telefono_res_request = serializer.data['telefono_res']
            celular_request = serializer.data['celular']
            email_request = serializer.data['email']
            sexo_request = serializer.data['sexo']
            cantidad_hijo_request = serializer.data['hijos']
            deporte_request = serializer.data['actividades_ocio_deporte']
            acudiente_emergencia_request = serializer.data['acudiente']
            tel_acudiente_emergencia_request = serializer.data['telefono_acudiente']

            etnia_request = serializer.data['id_etnia']
            act_simultanea_request = serializer.data['id_act_simultanea']
            identidad_gen_request = serializer.data['id_identidad_gen']
            estado_civil_request = serializer.data['id_estado_civil']
            cond_excepcion_request = serializer.data['id_cond_excepcion']

            vive_con_request = serializer.data['vive_con']
            ult_modificacion_request = serializer.data['ult_modificacion']

            var_estudiante = estudiante.objects.get(id=pk)
            serializer_estudiante = estudiante_serializer(var_estudiante)

            try:
                var_old_estudiante = estudiante.objects.get(pk = serializer_estudiante.data['id'])
                var_estudiante = var_old_estudiante

                var_estudiante.puntaje_icfes = puntaje_icfes_request
                var_estudiante.telefono_res = telefono_res_request
                var_estudiante.celular = celular_request
                var_estudiante.email = email_request
                var_estudiante.sexo = sexo_request
                var_estudiante.actividades_ocio_deporte = deporte_request
                var_estudiante.hijos = cantidad_hijo_request
                var_estudiante.acudiente = acudiente_emergencia_request
                var_estudiante.telefono_acudiente = tel_acudiente_emergencia_request
                var_estudiante.vive_con = vive_con_request
                var_estudiante.ult_modificacion = ult_modificacion_request

                try:
                    etnia_obj = etnia.objects.get(id=etnia_request)
                    var_estudiante.id_etnia = etnia_obj
                except:
                    print('no hiz etnia')

                try:
                    act_simultanea_obj = act_simultanea.objects.get(id=act_simultanea_request)
                    var_estudiante.id_act_simultanea = act_simultanea_obj
                except:
                    print('no hiz act_simultanea')

                try:
                    identidad_gen_obj = identidad_gen.objects.filter(id=identidad_gen_request).first()
                    var_estudiante.id_identidad_gen = identidad_gen_obj
                except:
                    print('no hiz identidad_gen')

                try:
                    estado_civil_obj = estado_civil.objects.get(id=estado_civil_request)
                    var_estudiante.id_estado_civil = estado_civil_obj
                except:
                    print('no hiz estado_civil')

                try:
                    cond_excepcion_obj = cond_excepcion.objects.get(id=cond_excepcion_request)
                    var_estudiante.id_cond_excepcion = cond_excepcion_obj
                except:
                    print('no hiz cond_excepcion')

                var_estudiante.save()
                return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)
            except estudiante.DoesNotExist:
                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class trayectoria_viewsets(viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):
        request_sede = int(request.GET.get('id_sede'))
        list_semestre = semestre.objects.all().get(semestre_actual=True,id_sede = request_sede)
        fecha_inicio_semestre = list_semestre.fecha_inicio

        listas = []
        fechas = []
        riesgo_individual = []
        riesgo_familiar = []
        riesgo_academico = []
        riesgo_economico = []
        riesgo_vida_universitaria_ciudad = []

        try:
            seguimiento_reciente = seguimiento_individual.objects.filter(
                id_estudiante=pk, fecha__gt=fecha_inicio_semestre
            ).order_by('fecha')
            print (seguimiento_reciente)
            for i in seguimiento_reciente:
                seguimiento = seguimiento_individual_serializer(i)
                fechas.append(seguimiento.data['fecha'])
                riesgo_individual.append(seguimiento.data['riesgo_individual'])
                riesgo_familiar.append(seguimiento.data['riesgo_familiar'])
                riesgo_academico.append(seguimiento.data['riesgo_academico'])
                riesgo_economico.append(seguimiento.data['riesgo_economico'])
                riesgo_vida_universitaria_ciudad.append(seguimiento.data['riesgo_vida_universitaria_ciudad'])

            fechas_lista = {'fechas': fechas}
            riesgo_individual_lista = {'riesgo_individual': riesgo_individual}
            riesgo_familiar_lista = {'riesgo_familiar': riesgo_familiar}
            riesgo_academico_lista = {'riesgo_academico': riesgo_academico}
            riesgo_economico_lista = {'riesgo_economico': riesgo_economico}
            riesgo_vida_universitaria_ciudad_lista = {'riesgo_vida_universitaria_ciudad': riesgo_vida_universitaria_ciudad}

            listas.append(fechas_lista)
            listas.append(riesgo_individual_lista)
            listas.append(riesgo_familiar_lista)
            listas.append(riesgo_academico_lista)
            listas.append(riesgo_economico_lista)
            listas.append(riesgo_vida_universitaria_ciudad_lista)
            print(listas)
            return Response(listas)
        except seguimiento_individual.DoesNotExist:
            return Response({})
        
class mas_con_quien_vive_viewsets (viewsets.ModelViewSet):
    serializer_class = Estudiante_actualizacion
    queryset = estudiante_serializer.Meta.model.objects.all()

    def post(self, request, pk=None):
        # serializer = self.serializer_class(data=request.data)
        # if (serializer.is_valid()):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            puntaje_icfes_request = serializer.data['puntaje_icfes']
            telefono_res_request = serializer.data['telefono_res']
            celular_request = serializer.data['celular']
            email_request = serializer.data['email']
            sexo_request = serializer.data['sexo']
            cantidad_hijo_request = serializer.data['hijos']
            deporte_request = serializer.data['actividades_ocio_deporte']
            acudiente_emergencia_request = serializer.data['acudiente']
            tel_acudiente_emergencia_request = serializer.data['telefono_acudiente']

            etnia_request = serializer.data['id_etnia']
            act_simultanea_request = serializer.data['id_act_simultanea']
            identidad_gen_request = serializer.data['id_identidad_gen']
            estado_civil_request = serializer.data['id_estado_civil']
            cond_excepcion_request = serializer.data['id_cond_excepcion']

            var_estudiante = estudiante.objects.get(id=pk)
            serializer_estudiante = estudiante_serializer(var_estudiante)

            try:
                var_old_estudiante = estudiante.objects.get(pk = serializer_estudiante.data['id'])
                var_estudiante = var_old_estudiante

                var_estudiante.puntaje_icfes = puntaje_icfes_request
                var_estudiante.telefono_res = telefono_res_request
                var_estudiante.celular = celular_request
                var_estudiante.email = email_request
                var_estudiante.sexo = sexo_request
                var_estudiante.actividades_ocio_deporte = deporte_request
                var_estudiante.hijos = cantidad_hijo_request
                var_estudiante.acudiente = acudiente_emergencia_request
                var_estudiante.telefono_acudiente = tel_acudiente_emergencia_request

                try:
                    etnia_obj = etnia.objects.get(id=etnia_request)
                    var_estudiante.id_etnia = etnia_obj
                except:
                    print('no hiz etnia')

                try:
                    act_simultanea_obj = act_simultanea.objects.get(id=act_simultanea_request)
                    var_estudiante.id_act_simultanea = act_simultanea_obj
                except:
                    print('no hiz act_simultanea')

                try:
                    identidad_gen_obj = identidad_gen.objects.filter(id=identidad_gen_request).first()
                    var_estudiante.id_identidad_gen = identidad_gen_obj
                except:
                    print('no hiz identidad_gen')

                try:
                    estado_civil_obj = estado_civil.objects.get(id=estado_civil_request)
                    var_estudiante.id_estado_civil = estado_civil_obj
                except:
                    print('no hiz estado_civil')

                try:
                    cond_excepcion_obj = cond_excepcion.objects.get(id=cond_excepcion_request)
                    var_estudiante.id_cond_excepcion = cond_excepcion_obj
                except:
                    print('no hiz cond_excepcion')

                var_estudiante.save()
                return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)
            except estudiante.DoesNotExist:
                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class Grupo_etnico_viewsets(viewsets.ModelViewSet):
    serializer_class = Grupo_etnico_serializer
    permission_classes = (IsAuthenticated,)
    queryset = etnia.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Actividad_simultanea_viewsets(viewsets.ModelViewSet):
    serializer_class = Actividad_simultanea_serializer
    permission_classes = (IsAuthenticated,)
    queryset = act_simultanea.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Identidad_gen_viewsets(viewsets.ModelViewSet):
    serializer_class = Identidad_de_genero_serializer
    permission_classes = (IsAuthenticated,)
    queryset = identidad_gen.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Estado_civil_viewsets(viewsets.ModelViewSet):
    serializer_class = Estado_civil_serializer
    permission_classes = (IsAuthenticated,)
    queryset = estado_civil.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Condicion_de_excepcion_viewsets(viewsets.ModelViewSet):
    serializer_class = Condicion_de_excepcion_serializer
    permission_classes = (IsAuthenticated,)
    queryset = cond_excepcion.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class info_estudiantes_sin_seguimientos_viewsets(viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):

        list_total_datos = []
        request_sede = int(request.GET.get('id_sede'))
        request_rol = request.GET.get('rol')
        var_semestre = get_object_or_404(semestre, semestre_actual=True, id_sede=request_sede)
        if request_rol == "socioeducativo" or request_rol == "super_ases" or request_rol  == "socioeducativo_reg":
            list_id_programas = programa.objects.filter(id_sede=request_sede).values('id')
            list_id_estudiantes = programa_estudiante.objects.filter(id_programa__in=list_id_programas).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)
        elif request_rol == "profesional":
            list_id_practicantes= usuario_rol.objects.filter(id_jefe=pk, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_monitores= usuario_rol.objects.filter(id_jefe__in=list_id_practicantes, id_semestre=var_semestre.id, estado="ACTIVO").values('id_usuario')
            list_id_estudiantes = asignacion.objects.filter(id_usuario__in=list_id_monitores, id_semestre=var_semestre.id, estado=True).values('id_estudiante')
            list_estudiantes = estudiante.objects.filter(id__in=list_id_estudiantes)
            serializer_estudiantes = estudiante_serializer(list_estudiantes, many=True)

        for data_del_estudiante in serializer_estudiantes.data:
            try:
                id_monitor_estudiante = asignacion.objects.filter(id_estudiante=data_del_estudiante['id'], estado=True,id_semestre=var_semestre.id).values('id_usuario')
                data_monitor = User.objects.filter(id=id_monitor_estudiante[0]['id_usuario']).values('id','first_name','last_name')
                consulta_jefe_monitor = usuario_rol.objects.filter(id_usuario=data_monitor[0]['id'],id_semestre=var_semestre.id, estado="ACTIVO").values('id_jefe')
                data_practicante = User.objects.filter(id=consulta_jefe_monitor[0]['id_jefe']).values('id','first_name','last_name')
                consulta_jefe_practicante = usuario_rol.objects.filter(id_usuario=data_practicante[0]['id'],id_semestre=var_semestre.id, estado="ACTIVO").values('id_jefe')
                data_profesional = User.objects.filter(id=consulta_jefe_practicante[0]['id_jefe']).values('first_name','last_name')
                count_seguimientos = seguimiento_individual.objects.filter(id_estudiante = data_del_estudiante['id'],creacion__range= (var_semestre.fecha_inicio, var_semestre.fecha_fin) ).count()
                count_inasistencias = inasistencia.objects.filter(id_estudiante = data_del_estudiante['id'],creacion__range= (var_semestre.fecha_inicio, var_semestre.fecha_fin) ).count()
                datos = {
                    'id': data_del_estudiante['id'],
                    'cedula': data_del_estudiante['num_doc'],
                    'nombres': data_del_estudiante['nombre'],
                    'apellidos': data_del_estudiante['apellido'],
                    'cantidad_de_fichas': count_seguimientos,
                    'cantidad_de_inasistencias': count_inasistencias,
                    'total_fichas': count_seguimientos + count_inasistencias,
                    'monitor': data_monitor[0]['first_name'] + " " + data_monitor[0]['last_name'],
                    'practicante': data_practicante[0]['first_name'] + " " + data_practicante[0]['last_name'],
                    'profesional': data_profesional[0]['first_name'] + " " + data_profesional[0]['last_name'],
                    }

                list_total_datos.append(datos)
            except:
                pass

        return Response(list_total_datos,status=status.HTTP_200_OK)

class cohortes_lista_viewsets (viewsets.ModelViewSet):
    serializer_class = cohorte_serializer
    permission_classes = (IsAuthenticated,)
    queryset = cohorte_serializer.Meta.model.objects.all()

    def list(self, request):
        list_final = []

        list_estudiantes_de_la_cohorte = cohorte.objects.all()
        for i in list_estudiantes_de_la_cohorte:
            serializer_usuario_rol =cohorte_serializer(i)
            list_final.append(serializer_usuario_rol.data)

        return Response(list_final,status=status.HTTP_200_OK)



class cohorte_estudiante_info_viewsets (viewsets.ModelViewSet):
    serializer_class = cohorte_estudiante_serializer
    permission_classes = (IsAuthenticated,)
    queryset = cohorte_estudiante_serializer.Meta.model.objects.all()

    def list(self, request):
        list_final = []

        list_estudiantes_de_la_cohorte = cohorte_estudiante.objects.all()

        for i in list_estudiantes_de_la_cohorte:
            serializer_usuario_rol =cohorte_estudiante_serializer(i)
            list_final.append(serializer_usuario_rol.data)

        return Response(list_final,status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        data_estudiante = []
        data_periodos = []
        result = []

        list_estudiantes_de_la_cohorte = list(cohorte_estudiante.objects.filter(id_cohorte=pk))

        for i in list_estudiantes_de_la_cohorte:
            serializer_list = cohorte_estudiante_serializer(i)
            nombre_estudiante = estudiante.objects.get(id=serializer_list.data['id_estudiante'])
            nombre = nombre_estudiante.nombre
            apellido = nombre_estudiante.apellido
            num_doc = nombre_estudiante.num_doc
            info_estudiante = {
                        'nombre' : nombre,
                        'apellido' : apellido,
                        'num_doc' : num_doc
            }
            data_estudiante.append(dict(serializer_list.data, info_estudiante=info_estudiante))

            estudiante_selected = historial_estado_programa_estudiante.objects.filter(id_estudiante=serializer_list.data['id_estudiante'])
            for j in estudiante_selected:
                serializer_estudiante = historial_estado_programa_estudiante_serializer(j)
                programa_obj = programa.objects.get(id=serializer_estudiante.data['id_programa'])
                nombre_programa = programa_obj.codigo_univalle
                
                serializer_estudiante.data['nombre_programa'] = nombre_programa
                data_periodos.append(dict(serializer_estudiante.data, nombre_programa=nombre_programa))

            data_estudiante[-1]['periodos'] = data_periodos
            result.append(data_estudiante[-1])
            data_periodos = []

        return Response(result, status=status.HTTP_200_OK)


class firma_tratamiento_datos_view(APIView):
    def post(self, request):
        serializer = firma_tratamiento_datos_serializer(data=request.data)
        if serializer.is_valid():
            documento = serializer.data["documento"]
            if estudiante.objects.filter(num_doc=documento).exists():
                consulta_estudiante = estudiante.objects.get(num_doc=documento)
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
        
    
"""
PARTE 3: VIEWS QUE SE BASAN EN EL MODELO ROL O CONSULTAS ESPECIFICAS DE UN ROL__________________________________________________________________________________________________
"""
class rol_viewsets (viewsets.ModelViewSet):
    """
    Vista para manipular los roles de usuario.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los roles de usuario.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'rol_serializer' para serializar los datos de los roles.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de todos los roles de usuario.
    - POST: Crea un nuevo rol de usuario.
    - PUT: Actualiza un rol de usuario existente.
    - PATCH: Actualiza parcialmente un rol de usuario existente.
    - DELETE: Elimina un rol de usuario existente.

    Gestión de solicutudes HTTP VIEWSETS:
    list: Maneja las solicitudes GET para obtener una lista de recursos.
    create: Maneja las solicitudes POST para crear un nuevo recurso.
    retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria. 
    update: Maneja las solicitudes PUT para actualizar un recurso específico por su clave primaria.
    partial_update: Maneja las solicitudes PATCH para realizar una actualización parcial de un recurso específico por su clave primaria.
    destroy: Maneja las solicitudes DELETE para eliminar un recurso específico por su clave primaria.
    """
    serializer_class = rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = rol_serializer.Meta.model.objects.all()

class actual_usuario_rol_viewsets (viewsets.ModelViewSet):
    """
    Vista para manipular los roles actuales de los usuarios.

    Esta vista permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los roles actuales de los usuarios.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'usuario_rol_serializer' para serializar los datos de los roles de usuario.

    Métodos HTTP admitidos:
    - GET: Obtiene una lista de todos los roles actuales de los usuarios.
    - POST: Crea un nuevo rol de usuario actual.
    - PUT: Actualiza un rol de usuario actual existente.
    - PATCH: Actualiza parcialmente un rol de usuario actual existente.
    - DELETE: Elimina un rol de usuario actual existente.
    """
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()
    

    def retrieve(self, request, pk=None):
        var_semestre = get_object_or_404(semestre, semestre_actual=True, id_sede=pk)

        user_rols = usuario_rol.objects.filter(
            id_semestre=var_semestre.id,
            estado="ACTIVO"
        ).select_related('id_rol', 'id_usuario').annotate(
            rol_id=F('id_rol__id'),
            rol_nombre=F('id_rol__nombre'),
            user_id=F('id_usuario__id'),
            user_username=F('id_usuario__username'),
            user_first_name=F('id_usuario__first_name'),
            user_last_name=F('id_usuario__last_name'),
            user_email=F('id_usuario__email')
        ).values(
            'id','user_id', 'user_username', 'user_first_name', 'user_last_name', 'user_email', 'rol_id', 'rol_nombre'
        )

        user_rols_list = list(user_rols)

        return Response(user_rols_list)
    
    def update(self, request, pk=None):
        id_sede_request = request.data.get("id_sede")
        try:
            var_semestre = semestre.objects.get(semestre_actual=True, id_sede=id_sede_request)
            var_user_rol = usuario_rol.objects.get(id_usuario=pk, id_semestre=var_semestre.id, estado="ACTIVO")
            var_rol = var_user_rol.id_rol
            return Response({var_rol.nombre})
        except (semestre.DoesNotExist, usuario_rol.DoesNotExist, rol.DoesNotExist):
            return Response(
                {'mensaje': 'Este usuario no tiene rol.'},
                status=status.HTTP_404_NOT_FOUND
            )

class usuario_rol_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()
    

    def update(self, request, pk=None):
        var_old_user_rol = usuario_rol.objects.get(id=pk,estado = 'ACTIVO')
        var_user_rol= var_old_user_rol
        var_user_rol.estado = "INACTIVO"
        var_user_rol.save()
        return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)

    def create(self, request,pk=None):
        serializer = User_rol_sede(data=request.data)
        if (serializer.is_valid()):
            id_user_request = serializer.data['id_user']
            id_rol_request = serializer.data['id_rol']
            id_sede_request = serializer.data["id_sede"]

            var_usuario = get_object_or_404(User, id = id_user_request)
            var_rol = get_object_or_404(rol, id = id_rol_request)
            var_semestre = get_object_or_404(semestre, semestre_actual = True,id_sede=id_sede_request)

            try:
                var_old_user_rol = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
            except:
                var_old_user_rol = Empty
            if(var_old_user_rol != Empty and var_old_user_rol.estado == "ACTIVO"):

                var_user_rol= var_old_user_rol
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol == Empty) :
                var_user_rol= usuario_rol()
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol != Empty and var_old_user_rol.estado == "INACTIVO"):
                var_user_rol= var_old_user_rol
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.estado = "ACTIVO"
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            else:
                Response(
                    serializer.errors,
                    status=status.HTTP_406_NOT_ACCEPTABLE
                )


            return Response({'Respuesta': 'User_rol creado o modificado satisfactoriamente.'},status=status.HTTP_200_OK)

        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )



class usuario_rol_old_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()
    

    def list(self, request):
        request_sede = int(request.GET.get('id_sede'))
        list_user_rol = list()
        var_semestre = semestre.objects.filter(semestre_actual = False,id_sede=request_sede).order_by('-fecha_inicio').first()
        for user_rol in usuario_rol.objects.filter(id_semestre =var_semestre.id, estado = "ACTIVO").values():
            rols= rol.objects.filter(id =user_rol['id_rol_id']).annotate(id_rol=F('id')).values('id_rol','nombre')[0]
            usuarios= User.objects.filter(id =user_rol['id_usuario_id']).values('id','username','first_name','last_name', 'email')[0]
            usuarios.update(rols)
            list_user_rol.append(usuarios)
        return Response(list_user_rol)
    
class profesional_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request,pk=None):
        list_profesional = []

        var_semestre = get_object_or_404(semestre, semestre_actual = True,id_sede=pk)
        val_rol = rol.objects.get(nombre = 'profesional')
        serializer_rol= rol_serializer(val_rol)
        id_rol_profesional = serializer_rol.data['id']

        consulta_id_profesional = list(usuario_rol.objects.filter(id_rol = id_rol_profesional,estado = 'ACTIVO',id_semestre = var_semestre))
        for i in consulta_id_profesional:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_profesional= User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_profesional= user_selected(consulta_profesional)
            list_profesional.append(serializer_profesional.data)

        return Response(list_profesional,status=status.HTTP_200_OK)

class practicante_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request,pk):
        var_semestre = get_object_or_404(semestre, semestre_actual=True, id_sede=pk)
        val_rol = rol.objects.get(nombre='practicante')
        id_rol_practicante = val_rol.id

        consulta_practicantes = usuario_rol.objects.filter(id_rol=id_rol_practicante, estado='ACTIVO', id_semestre=var_semestre)
        users_practicantes = [ur.id_usuario for ur in consulta_practicantes]

        serializer_practicantes = user_selected(users_practicantes, many=True)
        return Response(serializer_practicantes.data, status=status.HTTP_200_OK)


    def update(self, request, pk):
        id_sede = request.data.get("id_sede")
        id_rol_practicante = rol.objects.get(nombre='practicante').id

        practicantes = usuario_rol.objects.filter(id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)
        practicantes_seleccionables = usuario_rol.objects.filter(id_jefe=None,id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)
        practicantes_selected = usuario_rol.objects.filter(id_jefe=pk, id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)

        ids_practicantes_selected = practicantes_selected.values_list('id_usuario', flat=True)

        practicantes_assigned = practicantes.filter(id_usuario__in=ids_practicantes_selected)
        practicantes_not_assigned = practicantes_seleccionables

        serializer_practicantes_assigned = user_selected([p.id_usuario for p in practicantes_assigned], many=True)
        serializer_practicantes_not_assigned = user_selected([p.id_usuario for p in practicantes_not_assigned], many=True)

        data = [serializer_practicantes_assigned.data,serializer_practicantes_not_assigned.data]
        return Response(data, status=status.HTTP_200_OK)

class monitor_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request,pk=None):
        var_semestre = get_object_or_404(semestre, semestre_actual=True, id_sede=pk)
        val_rol = rol.objects.get(nombre='monitor')
        id_rol_practicante = val_rol.id

        consulta_monitores = usuario_rol.objects.filter(id_rol=id_rol_practicante, estado='ACTIVO', id_semestre=var_semestre)
        users_monitores = [ur.id_usuario for ur in consulta_monitores]

        serializer_practicantes = user_selected(users_monitores, many=True)
        return Response(serializer_practicantes.data, status=status.HTTP_200_OK)

    def update(self, request, pk):
        id_sede = request.data.get("id_sede")
        id_rol_practicante = rol.objects.get(nombre='monitor').id

        monitores = usuario_rol.objects.filter(id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)
        monitores_seleccionables = usuario_rol.objects.filter(id_jefe=None,id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)
        monitores_selected = usuario_rol.objects.filter(id_jefe=pk, id_rol=id_rol_practicante, estado='ACTIVO', id_semestre__semestre_actual=True, id_semestre__id_sede=id_sede)

        ids_monitores_selected = monitores_selected.values_list('id_usuario', flat=True)

        monitores_assigned = monitores.filter(id_usuario__in=ids_monitores_selected)
        monitores_not_assigned = monitores_seleccionables

        serializer_monitores_assigned = user_selected([p.id_usuario for p in monitores_assigned], many=True)
        serializer_monitores_not_assigned = user_selected([p.id_usuario for p in monitores_not_assigned], many=True)

        data = [serializer_monitores_assigned.data,serializer_monitores_not_assigned.data]
        return Response(data, status=status.HTTP_200_OK)

class historial_monitor_viewsets(viewsets.ModelViewSet):
    serializer_class = asignacion_serializer
    permission_classes = (IsAuthenticated,)
    queryset = asignacion_serializer.Meta.model.objects.all()

    def list(self, request):
        list_final = []

        val_rol = rol.objects.get(nombre='monitor')
        id_rol_monitor = (rol_serializer(val_rol)).data['id']

        info_monitor = usuario_rol.objects.filter(id_rol=id_rol_monitor)

        for i in info_monitor:
            serilalizer_info_monitor = usuario_rol_serializer(i)

            sus_estudiantes_ids = asignacion.objects.filter(id_usuario=serilalizer_info_monitor.data['id_usuario']).values_list('id_estudiante', flat=True)

            estudiantes = estudiante.objects.filter(id__in=sus_estudiantes_ids).values('nombre', 'apellido', 'cod_univalle')

            consulta_monitor = User.objects.get(id =serilalizer_info_monitor.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)
            
            datos_unidos = {
                            'info_monitor': serializer_monitor.data,
                            'estudiantes': estudiantes} 

            data_monitor = serilalizer_info_monitor.data.copy()  # Crear una copia del diccionario existente
            data_monitor.update(datos_unidos)  # Unir los datos

            list_final.append(data_monitor)

        return Response(list_final, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        list_final = []
       
        val_rol = rol.objects.get(nombre='monitor')
        id_rol_monitor = (rol_serializer(val_rol)).data['id']

        info_monitor = usuario_rol.objects.filter(id_rol = id_rol_monitor, id_usuario = pk)

        for i in info_monitor:
            serilalizer_info_monitor = usuario_rol_serializer(i)

            sus_estudiantes_ids = asignacion.objects.filter(id_usuario=serilalizer_info_monitor.data['id_usuario']).values_list('id_estudiante', flat=True)

            estudiantes = estudiante.objects.filter(id__in=sus_estudiantes_ids).values('nombre', 'apellido', 'cod_univalle')

            su_practicante = usuario_rol.objects.get(id_usuario=serilalizer_info_monitor.data['id_jefe'])
            serializer_su_practicante = usuario_rol_serializer(su_practicante)

            su_profesional = usuario_rol.objects.get(id_usuario=serializer_su_practicante.data['id_jefe'])
            serializer_su_profesional = usuario_rol_serializer(su_profesional)

            consulta_practicante = User.objects.get(id =serializer_su_practicante.data['id_usuario'])
            serializer_practicante = user_selected(consulta_practicante)

            consulta_profesional = User.objects.get(id =serializer_su_profesional.data['id_usuario'])
            serializer_profesional = user_selected(consulta_profesional)

            consulta_monitor = User.objects.get(id =serilalizer_info_monitor.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)

            datos_semestre = semestre.objects.get(id = serilalizer_info_monitor.data['id_semestre'])
            serializer_datos_semestre = semestre_serializer(datos_semestre)

            datos_unidos = {
                            'datos_semestre' : serializer_datos_semestre.data,
                            'info_monitor': serializer_monitor.data,
                            'profesional': serializer_profesional.data, 
                            'practicante': serializer_practicante.data, 
                            'estudiantes': estudiantes}  # Datos a unir

            data_monitor = serilalizer_info_monitor.data.copy()  # Crear una copia del diccionario existente
            data_monitor.update(datos_unidos)  # Unir los datos

            list_final.append(data_monitor)

        return Response(list_final, status=status.HTTP_200_OK)

class monitor_info_extra_viewsets(viewsets.ModelViewSet):
    serializer_class = monitor_serializer
    #permission_classes = (IsAuthenticated,)
    queryset = monitor_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):
        try:
            var_monitor = monitor.objects.get(id_user=pk)
            request_sede = int(request.GET.get('id_sede'))
        except:
            return Response({'data': 'no data'})

        serializer_monitor = monitor_serializer(var_monitor)
        diccionario_monitor = serializer_monitor.data
        #llamado y seteo de barrios, ciudades y otros campos que hagan llamada a otra tabla ademas de estudiante (osea, estudiante tiene el id del campo a llamar de otra tabla)
        #barrio_res         barrio_res
        barrio_res_id = diccionario_monitor['barrio_res']

        try:
            barrio_res_obj = barrio.objects.get(codigo_barrio=barrio_res_id)
            diccionario_monitor['barrio_res'] = barrio_res_obj.nombre
            estrato_obj = barrio.objects.get(codigo_barrio=barrio_res_id)
            estrato_nombre = estrato_obj.estrato
            diccionario_estrato = {'estrato': estrato_nombre}
            diccionario_monitor.update(diccionario_estrato)
        except barrio.DoesNotExist:
            diccionario_monitor['barrio_res'] = None

        #municipio_res
        municipio_res_id = diccionario_monitor['ciudad_res']

        try:
            municipio_res_obj = municipio.objects.get(codigo_divipola=municipio_res_id)
            diccionario_monitor['ciudad_res'] = municipio_res_obj.nombre
        except municipio.DoesNotExist:
            diccionario_monitor['ciudad_res'] = None
       
        lista_programas = []
        try :
            ids_del_monitor_para_sus_progamas = monitor.objects.filter(num_doc=serializer_monitor.data['num_doc']).values('id', 'cod_univalle')
            for id_monitor_programa in ids_del_monitor_para_sus_progamas:
                programa_seleccionado = programa_monitor.objects.filter(id_monitor=id_monitor_programa['id']).first()                
                var_programa = programa.objects.filter(id=programa_seleccionado.id_programa_id).values()

                dic_programa = {'nombre_programa': var_programa[0]['nombre'], 
                                'cod_univalle': var_programa[0]['codigo_univalle'],
                                'codigo_monitor': id_monitor_programa['cod_univalle'],
                                'id_estado_id': programa_seleccionado.id_estado_id,
                                'traker': programa_seleccionado.traker
                                }  # Agregar el estado del curso al diccionario


                dic = id_monitor_programa

                dic.update(dic_programa)
                lista_programas.append(dic)
            diccionario_programas = {'programas': lista_programas}
            diccionario_monitor.update(diccionario_programas)

        except :
            dic_programa = {'error': 'sin programa asignado o no se encontraro coincidencias'
                            }  # Agregar el estado del curso al diccionario

            dic = id_monitor_programa
            dic.update(dic_programa)
            lista_programas.append(dic)
            diccionario_programas = {'programas': lista_programas}
            diccionario_monitor.update(diccionario_programas)

        try:
            semestre_activo = semestre.objects.get(semestre_actual=True,id_sede=request_sede)
            serializer_semestre = semestre_serializer(semestre_activo)

            info_monitor = usuario_rol.objects.get(id_usuario = pk, id_semestre=serializer_semestre.data['id'])

            serilalizer_info_monitor = usuario_rol_serializer(info_monitor)

            su_practicante = usuario_rol.objects.get(id_usuario=serilalizer_info_monitor.data['id_jefe'], id_semestre=serializer_semestre.data['id'])
            serializer_su_practicante = usuario_rol_serializer(su_practicante)

            su_profesional = usuario_rol.objects.get(id_usuario=serializer_su_practicante.data['id_jefe'], id_semestre=serializer_semestre.data['id'])
            serializer_su_profesional = usuario_rol_serializer(su_profesional)

            consulta_practicante = User.objects.get(id =serializer_su_practicante.data['id_usuario'])
            serializer_practicante = user_selected(consulta_practicante)

            consulta_profesional = User.objects.get(id =serializer_su_profesional.data['id_usuario'])
            serializer_profesional = user_selected(consulta_profesional)

            consulta_monitor = User.objects.get(id =serilalizer_info_monitor.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)

            datos_encargados = {
                    'profesional': serializer_profesional.data, 
                    'practicante': serializer_practicante.data
                    }
        except:
            datos_encargados = {
                    'profesional': 'sin asignacion', 
                    'practicante': 'sin asignacion'
                    }

        diccionario_monitor.update(datos_encargados)

        return Response(diccionario_monitor)




class monitor_actualizacion_viewsets (viewsets.ModelViewSet):
    serializer_class = Monitor_actualizacion
    permission_classes = (IsAuthenticated,)
    queryset = monitor_serializer.Meta.model.objects.all()

    def post(self, request, pk=None):
        # serializer = self.serializer_class(data=request.data)
        # if (serializer.is_valid()):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():

            telefono_res_request = serializer.data['telefono_res']
            celular_request = serializer.data['celular']
           
            observacion_request = serializer.data['observacion']
            ult_modificacion_request = serializer.data['ult_modificacion']

            var_monitor = monitor.objects.get(id=pk)
            serializer_monitor = monitor_serializer(var_monitor)

            try:
                var_old_estudiante = monitor.objects.get(pk = serializer_monitor.data['id'])
                var_monitor = var_old_estudiante

                var_monitor.telefono_res = telefono_res_request
                var_monitor.celular = celular_request

                var_monitor.observacion = observacion_request
                var_monitor.ult_modificacion = ult_modificacion_request

                var_monitor.save()
                return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)
            except estudiante.DoesNotExist:

                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)


        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
PARTE 4: VIEWS QUE SE BASAN EN EL MODELO SEGUIMIENTO INDIVIDUAL E INASISTENCIA__________________________________________________________________________________________________
"""

class ultimo_seguimiento_individual_ViewSet(viewsets.ModelViewSet):

    """
    Vista para obtener el último seguimiento individual de un estudiante.

    Esta vista permite obtener el seguimiento más reciente con sus respectivos riesgos individuales,
    familiares, académicos, económicos y de vida universitaria en la ciudad.

    Permisos:
    - El usuario debe estar autenticado para acceder a esta vista.

    Serializer:
    - Se utiliza 'seguimiento_individual_serializer' para serializar los datos del seguimiento.

    Métodos HTTP admitidos:
    - GET: Obtiene el último seguimiento individual del estudiante especificado por su ID.

    Gestión de solicutudes HTTP VIEWSETS:
    (Redefinida) retrieve: Maneja las solicitudes GET para obtener un recurso específico por su clave primaria. 
    
    """

    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset =  seguimiento_individual_serializer.Meta.model.objects.all()
    

    def retrieve(self, request,pk):

        try:
            # Obtener el seguimiento más reciente del estudiante especificado
            seguimiento_reciente = riesgo_individual.objects.get(id_estudiante=pk)

            # Crear un diccionario con los datos de riesgo del seguimiento
            riesgo = {
                'riesgo_individual': seguimiento_reciente.riesgo_individual,
                'riesgo_familiar': seguimiento_reciente.riesgo_familiar,
                'riesgo_academico': seguimiento_reciente.riesgo_academico,
                'riesgo_economico': seguimiento_reciente.riesgo_economico,
                'riesgo_vida_universitaria_ciudad': seguimiento_reciente.riesgo_vida_universitaria_ciudad
            }
            # Devolver el riesgo en la respuesta
            return Response(riesgo)
        except riesgo_individual.DoesNotExist:
            # Si no se encuentra ningún seguimiento para el estudiante especificado, devolver una respuesta vacía
            return Response({})
class reporte_seguimientos_practicante_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):

        list_monitor_selected = []
        list_estudiante_selected = []
        total_estudiantes = 0
        request_sede = int(request.GET.get('id_sede'))

        list_semestre = list(semestre.objects.all().filter(semestre_actual=True,id_sede=request_sede))
        serializer_semestre = semestre_serializer(list_semestre[0])

        consulta_practicante_selected =User.objects.get(id = pk)
        serializer_practicante_selected = user_selected(consulta_practicante_selected)

        total_estudiantes = 0
        list_monitor_selected = []

        practicante_list_inasistencia = 0
        practicante_list_seguimientos = 0
        practicante_count_seguimientos_pendientes_practicante = 0
        practicante_count_inasistencias_pendientes_practicante = 0
        practicante_count_inasistencias_pendientes_profesional = 0
        practicante_count_seguimientos_pendientes_profesional = 0

        val_rol = rol.objects.get(nombre='monitor')
        id_rol_monitor = (rol_serializer(val_rol)).data['id']
        
        consulta_id_monitores_selected = usuario_rol.objects.filter(id_jefe=serializer_practicante_selected.data['id'], id_rol=id_rol_monitor,estado='ACTIVO',id_semestre=serializer_semestre.data['id']).values_list('id_usuario', flat=True)
        consulta_monitores_selected =User.objects.filter(id__in=consulta_id_monitores_selected)
        serializer_monitor_selected = user_selected(consulta_monitores_selected, many=True)

        for monitor_selecccionado in serializer_monitor_selected.data:
            lista_asignacion = list(asignacion.objects.filter(
                id_usuario=monitor_selecccionado['id'], estado=True, id_semestre=serializer_semestre.data['id']))

            fecha_inicio_str = serializer_semestre.data['fecha_inicio']
            fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%dT%H:%M:%SZ").date()

            fecha_fin_str = serializer_semestre.data['fecha_fin']
            fecha_fin = datetime.strptime(fecha_fin_str, "%Y-%m-%dT%H:%M:%SZ").date()

            list_estudiante_selected = []

            monitor_list_inasistencia = 0
            monitor_list_seguimientos = 0
            monitor_count_seguimientos_pendientes_practicante = 0
            monitor_count_inasistencias_pendientes_practicante = 0
            monitor_count_inasistencias_pendientes_profesional = 0
            monitor_count_seguimientos_pendientes_profesional = 0

            for i in lista_asignacion:
                serializer_asignacion = asignacion_serializer(i)
                estudiante_selected = estudiante.objects.get(id=serializer_asignacion.data['id_estudiante'])
                serializer_estudiante = estudiante_serializer(estudiante_selected)


                fecha_inicio = datetime.strptime(serializer_semestre.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
                fecha_fin = datetime.strptime(serializer_semestre.data['fecha_fin'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")

                list_seguimientos_individual_practicante = seguimiento_individual.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'],
                                                    revisado_practicante = False,
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin,
                                                    ).count()

                list_inasistencia_individual_practicante = inasistencia.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'], 
                                                    revisado_practicante = False,
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin
                                                    ).count()

                list_seguimientos_individual_profesional = seguimiento_individual.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'], 
                                                    revisado_profesional = False,
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin
                                                    ).count()
                list_inasistencia_individual_profesional = inasistencia.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'], 
                                                    revisado_profesional = False,
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin
                                                    ).count()
                list_inasistencia = inasistencia.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'], 
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin
                                                    ).count()

                list_seguimientos = seguimiento_individual.objects.filter(
                                                    id_estudiante = serializer_estudiante.data['id'], 
                                                    fecha__gt = fecha_inicio,
                                                    fecha__lt =fecha_fin
                                                    ).count()
                
                counts = {
                    'cantidad_seguimientos':{
                        'count_inasistencias': list_inasistencia,
                        'count_seguimientos': list_seguimientos,
                        'count_seguimientos_pendientes_practicante': list_seguimientos_individual_practicante,
                        'count_inasistencias_pendientes_profesional': list_inasistencia_individual_profesional,
                        'count_inasistencias_pendientes_practicante': list_inasistencia_individual_practicante,
                        'count_seguimientos_pendientes_profesional':  list_seguimientos_individual_profesional,
                        }
                }
                data_estudiantes = dict(serializer_estudiante.data, **counts)

                # conteos del monitor
                monitor_list_inasistencia+=list_inasistencia
                monitor_list_seguimientos+=list_seguimientos
                monitor_count_seguimientos_pendientes_practicante+=list_seguimientos_individual_practicante
                monitor_count_seguimientos_pendientes_profesional+=list_seguimientos_individual_profesional
                monitor_count_inasistencias_pendientes_profesional+=list_inasistencia_individual_profesional  
                monitor_count_inasistencias_pendientes_practicante+=list_inasistencia_individual_practicante
                #conteos practicante
                practicante_list_inasistencia+=list_inasistencia
                practicante_list_seguimientos+=list_seguimientos
                practicante_count_seguimientos_pendientes_practicante+=list_seguimientos_individual_practicante
                practicante_count_inasistencias_pendientes_practicante+=list_inasistencia_individual_practicante
                practicante_count_inasistencias_pendientes_profesional+=list_inasistencia_individual_profesional 
                practicante_count_seguimientos_pendientes_profesional+=list_seguimientos_individual_profesional 
                
                list_estudiante_selected.append(data_estudiantes)

            diccionario_cantidad_reportes_monitor = {'tipo_usuario': 'monitor',
                        'cantidad_estudiantes': len(list_estudiante_selected),
                        'cantidad_reportes' : {
                                "count_inasistencias":monitor_list_inasistencia,
                                "count_seguimientos":monitor_list_seguimientos,
                                'count_inasistencias_pendientes_practicante': monitor_count_inasistencias_pendientes_practicante, 
                                'count_inasistencias_pendientes_profesional': monitor_count_inasistencias_pendientes_profesional,
                                'count_seguimientos_pendientes_practicante': monitor_count_seguimientos_pendientes_practicante, 
                                'count_seguimientos_pendientes_profesional': monitor_count_seguimientos_pendientes_profesional,
                                },'estudiantes_del_monitor':list_estudiante_selected,
                        }

            data_monitores = dict(monitor_selecccionado, **diccionario_cantidad_reportes_monitor)

            list_monitor_selected.append(data_monitores)
            total_estudiantes += len(list_estudiante_selected)  # Línea añadida

        
        return Response(list_monitor_selected,status=status.HTTP_200_OK)

class reporte_seguimientos_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk):

        list_practicante_selected = []
        list_monitor_selected = []
        list_estudiante_selected = []
        total_estudiantes = 0
        request_sede = int(request.GET.get('id_sede'))
        val_rol = rol.objects.get(nombre='practicante')
        id_rol_practicante = (rol_serializer(val_rol)).data['id']

        list_semestre = list(semestre.objects.all().filter(semestre_actual=True,id_sede=request_sede))
        serializer_semestre = semestre_serializer(list_semestre[0])


        consulta_id_practicante_selected = usuario_rol.objects.filter(id_jefe=pk, id_rol=id_rol_practicante,estado='ACTIVO',id_semestre=serializer_semestre.data['id']).values_list('id_usuario', flat=True)
        consulta_practicante_selected =User.objects.filter(id__in=consulta_id_practicante_selected)
        serializer_practicante_selected = user_selected(consulta_practicante_selected, many=True)

        for practicante_selecccionado in serializer_practicante_selected.data:
            total_estudiantes = 0
            list_monitor_selected = []

            practicante_list_inasistencia = 0
            practicante_list_seguimientos = 0
            practicante_count_seguimientos_pendientes_practicante = 0
            practicante_count_inasistencias_pendientes_practicante = 0
            practicante_count_inasistencias_pendientes_profesional = 0
            practicante_count_seguimientos_pendientes_profesional = 0

            val_rol = rol.objects.get(nombre='monitor')
            id_rol_monitor = (rol_serializer(val_rol)).data['id']
            
            consulta_id_monitores_selected = usuario_rol.objects.filter(id_jefe=practicante_selecccionado['id'], id_rol=id_rol_monitor,estado='ACTIVO',id_semestre=serializer_semestre.data['id']).values_list('id_usuario', flat=True)
            consulta_monitores_selected =User.objects.filter(id__in=consulta_id_monitores_selected)
            serializer_monitor_selected = user_selected(consulta_monitores_selected, many=True)

            for monitor_selecccionado in serializer_monitor_selected.data:
                lista_asignacion = list(asignacion.objects.filter(
                    id_usuario=monitor_selecccionado['id'], estado=True, id_semestre=serializer_semestre.data['id']))

                fecha_inicio_str = serializer_semestre.data['fecha_inicio']
                fecha_inicio = datetime.strptime(fecha_inicio_str, "%Y-%m-%dT%H:%M:%SZ").date()

                fecha_fin_str = serializer_semestre.data['fecha_fin']
                fecha_fin = datetime.strptime(fecha_fin_str, "%Y-%m-%dT%H:%M:%SZ").date()

                list_estudiante_selected = []

                monitor_list_inasistencia = 0
                monitor_list_seguimientos = 0
                monitor_count_seguimientos_pendientes_practicante = 0
                monitor_count_inasistencias_pendientes_practicante = 0
                monitor_count_inasistencias_pendientes_profesional = 0
                monitor_count_seguimientos_pendientes_profesional = 0

                for i in lista_asignacion:
                    serializer_asignacion = asignacion_serializer(i)
                    estudiante_selected = estudiante.objects.get(id=serializer_asignacion.data['id_estudiante'])
                    serializer_estudiante = estudiante_serializer(estudiante_selected)


                    fecha_inicio = datetime.strptime(serializer_semestre.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")
                    fecha_fin = datetime.strptime(serializer_semestre.data['fecha_fin'], "%Y-%m-%dT%H:%M:%fZ").strftime("%Y-%m-%d")

                    list_seguimientos_individual_practicante = seguimiento_individual.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'],
                                                        revisado_practicante = False,
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin,
                                                        ).count()

                    list_inasistencia_individual_practicante = inasistencia.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'], 
                                                        revisado_practicante = False,
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin
                                                        ).count()

                    list_seguimientos_individual_profesional = seguimiento_individual.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'], 
                                                        revisado_profesional = False,
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin
                                                        ).count()
                    list_inasistencia_individual_profesional = inasistencia.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'], 
                                                        revisado_profesional = False,
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin
                                                        ).count()
                    list_inasistencia = inasistencia.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'], 
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin
                                                        ).count()

                    list_seguimientos = seguimiento_individual.objects.filter(
                                                        id_estudiante = serializer_estudiante.data['id'], 
                                                        fecha__gt = fecha_inicio,
                                                        fecha__lt =fecha_fin
                                                        ).count()
                    
                    counts = {
                        'cantidad_seguimientos':{
                            'count_inasistencias': list_inasistencia,
                            'count_seguimientos': list_seguimientos,
                            'count_seguimientos_pendientes_practicante': list_seguimientos_individual_practicante,
                            'count_inasistencias_pendientes_profesional': list_inasistencia_individual_profesional,
                            'count_inasistencias_pendientes_practicante': list_inasistencia_individual_practicante,
                            'count_seguimientos_pendientes_profesional':  list_seguimientos_individual_profesional,
                            }
                    }
                    data_estudiantes = dict(serializer_estudiante.data, **counts)

                    # conteos del monitor
                    monitor_list_inasistencia+=list_inasistencia
                    monitor_list_seguimientos+=list_seguimientos
                    monitor_count_seguimientos_pendientes_practicante+=list_seguimientos_individual_practicante
                    monitor_count_seguimientos_pendientes_profesional+=list_seguimientos_individual_profesional
                    monitor_count_inasistencias_pendientes_profesional+=list_inasistencia_individual_profesional  
                    monitor_count_inasistencias_pendientes_practicante+=list_inasistencia_individual_practicante
                    #conteos practicante
                    practicante_list_inasistencia+=list_inasistencia
                    practicante_list_seguimientos+=list_seguimientos
                    practicante_count_seguimientos_pendientes_practicante+=list_seguimientos_individual_practicante
                    practicante_count_inasistencias_pendientes_practicante+=list_inasistencia_individual_practicante
                    practicante_count_inasistencias_pendientes_profesional+=list_inasistencia_individual_profesional 
                    practicante_count_seguimientos_pendientes_profesional+=list_seguimientos_individual_profesional 
                    
                    list_estudiante_selected.append(data_estudiantes)

                diccionario_cantidad_reportes_monitor = {'tipo_usuario': 'monitor',
                            'cantidad_estudiantes': len(list_estudiante_selected),
                            'cantidad_reportes' : {
                                    "count_inasistencias":monitor_list_inasistencia,
                                    "count_seguimientos":monitor_list_seguimientos,
                                    'count_inasistencias_pendientes_practicante': monitor_count_inasistencias_pendientes_practicante, 
                                    'count_inasistencias_pendientes_profesional': monitor_count_inasistencias_pendientes_profesional,
                                    'count_seguimientos_pendientes_practicante': monitor_count_seguimientos_pendientes_practicante, 
                                    'count_seguimientos_pendientes_profesional': monitor_count_seguimientos_pendientes_profesional,
                                  },'estudiantes_del_monitor':list_estudiante_selected,
                            }

                data_monitores = dict(monitor_selecccionado, **diccionario_cantidad_reportes_monitor)

                list_monitor_selected.append(data_monitores)
                total_estudiantes += len(list_estudiante_selected)  # Línea añadida

            diccionario_cantidad_reportes_practicante = {'tipo_usuario': 'practicante',
                                        'cantidad_estudiantes': 0,
                                        'cantidad_reportes' : {
                                                "count_inasistencias":practicante_list_inasistencia,
                                                "count_seguimientos":practicante_list_seguimientos,
                                                'count_inasistencias_pendientes_practicante': practicante_count_inasistencias_pendientes_practicante, 
                                                'count_inasistencias_pendientes_profesional': practicante_count_inasistencias_pendientes_profesional,
                                                'count_seguimientos_pendientes_practicante': practicante_count_seguimientos_pendientes_practicante, 
                                                'count_seguimientos_pendientes_profesional': practicante_count_seguimientos_pendientes_profesional,
                                                },
                                        'monitores_del_practicante':list_monitor_selected,}

            data_practicantes = dict(practicante_selecccionado, **diccionario_cantidad_reportes_practicante)

            data_practicantes["cantidad_estudiantes"] = total_estudiantes  # Línea añadida

            list_practicante_selected.append(data_practicantes)

        return Response(list_practicante_selected,status=status.HTTP_200_OK)