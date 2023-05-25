from ast import And
from operator import and_
from queue import Empty
from django.contrib.auth.models import User
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, act_simultanea, cond_excepcion, discap_men, estado_civil,  etnia, identidad_gen
from modulo_geografico.models import barrio, departamento, municipio
from modulo_programa.models import programa_estudiante, programa
from modulo_instancia.models import semestre
from modulo_asignacion.models import asignacion
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_usuario_rol import serializers
from django.db.models import F
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import  user_serializer,estudiante_serializer,rol_serializer,usuario_rol_serializer, Estudiante_actualizacion,user_selected, Grupo_etnico_serializer, Actividad_simultanea_serializer, Identidad_de_genero_serializer, Estado_civil_serializer, Condicion_de_excepcion_serializer
from modulo_programa.serializers import  programa_estudiante_serializer, programa_serializer
from modulo_instancia.serializers import semestre_serializer
from modulo_asignacion.serializers import asignacion_serializer
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password


# Create your views here.
class user_viewsets (viewsets.ModelViewSet):
    serializer_class = user_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = user_serializer.Meta.model.objects.all()


class estudiante_viewsets(viewsets.ModelViewSet):
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
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

        diccionarion_cond_excepcion = {'el_id_de_cond_excepcion':cond_excepcion_id}

        try:
            cond_excepcion_obj = cond_excepcion.objects.get(id=cond_excepcion_id)
            diccionario_estudiante['id_cond_excepcion'] = cond_excepcion_obj.alias
            diccionario_estudiante.update(diccionarion_cond_excepcion)
        except cond_excepcion.DoesNotExist:
            diccionario_estudiante['id_cond_excepcion'] = None

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

        diccionarion_identidad_gen = {'el_id_de_identidad_gen':identidad_gen_id}
        diccionarion_etnia = {'el_id_de_etnia':etnia_id}
        diccionarion_estado_civil = {'el_id_de_estado_civil':estado_civil_id}
        diccionarion_act_simultanea = {'el_id_de_act_simultanea':act_simultanea_id}


        try:
            identidad_gen_obj = identidad_gen.objects.get(opcion_general=identidad_gen_id)
            diccionario_estudiante['id_identidad_gen'] = identidad_gen_obj.genero
            diccionario_estudiante.update(diccionarion_identidad_gen)
        except identidad_gen.DoesNotExist:
            diccionario_estudiante['id_identidad_gen'] = None

        try:
            etnia_obj = etnia.objects.get(opcion_general=etnia_id)
            diccionario_estudiante['id_etnia'] = etnia_obj.etnia
            diccionario_estudiante.update(diccionarion_etnia)
        except etnia.DoesNotExist:
            diccionario_estudiante['id_etnia'] = None

        try:
            estado_civil_obj = estado_civil.objects.get(id=estado_civil_id)
            diccionario_estudiante['id_estado_civil'] = estado_civil_obj.estado_civil
            diccionario_estudiante.update(diccionarion_estado_civil)
        except estado_civil.DoesNotExist:
            diccionario_estudiante['id_estado_civil'] = None

        try:
            act_simultanea_obj = act_simultanea.objects.get(opcion_general=act_simultanea_id)
            diccionario_estudiante['id_act_simultanea'] = act_simultanea_obj.actividad
            diccionario_estudiante.update(diccionarion_act_simultanea)
        except act_simultanea.DoesNotExist:
            diccionario_estudiante['id_act_simultanea'] = None

        programas = programa_estudiante.objects.filter(id_estudiante=serializer_estudiante.data['id']).values()
        lista_programas = []
        for i in programas:
            var_programa = programa.objects.filter(id=i['id_programa_id']).values()
            dic_programa = {'nombre_programa': var_programa[0]['nombre'], 'cod_univalle': var_programa[0]['codigo_univalle']}
            dic = i
            dic.update(dic_programa)
            lista_programas.append(dic)

        diccionario_programas = {'programas': lista_programas}
        diccionario_estudiante.update(diccionario_programas)

        return Response(diccionario_estudiante)


class rol_viewsets (viewsets.ModelViewSet):
    serializer_class = rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = rol_serializer.Meta.model.objects.all()



class profesional_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def list(self, request):
        list_profesional = []

        val_rol = rol.objects.get(nombre = 'Profesional')
        serializer_rol= rol_serializer(val_rol)
        id_rol_profesional = serializer_rol.data['id']

        consulta_id_profesional = list(usuario_rol.objects.filter(id_rol = id_rol_profesional,estado = 'ACTIVO'))
        for i in consulta_id_profesional:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_profesional= User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_profesional= user_selected(consulta_profesional)
            list_profesional.append(serializer_profesional.data)

        return Response(list_profesional,status=status.HTTP_200_OK)

class practicante_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def list(self, request):
        list_practicante = []

        val_rol = rol.objects.get(nombre = 'Practicante')
        id_rol_practicante = (rol_serializer(val_rol)).data['id']

        consulta_id_practicante = list(usuario_rol.objects.filter(id_rol = id_rol_practicante,estado = 'ACTIVO'))
        for i in consulta_id_practicante:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_practicante = User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_practicante= user_selected(consulta_practicante)
            list_practicante.append(serializer_practicante.data)

        return Response(list_practicante,status=status.HTTP_200_OK)


    def retrieve(self, request, pk):
        list_practicante = []
        list_practicante_selected = []

        val_rol = rol.objects.get(nombre = 'Practicante')
        id_rol_practicante = (rol_serializer(val_rol)).data['id']

        consulta_id_practicante = list(usuario_rol.objects.filter(id_rol = id_rol_practicante,estado = 'ACTIVO'))
        for i in consulta_id_practicante:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_practicante = User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_practicante = user_selected(consulta_practicante)
            list_practicante.append(serializer_practicante.data)

        consulta_id_practicante_selected = list(usuario_rol.objects.filter(id_jefe = pk, id_rol = id_rol_practicante))

        for i in consulta_id_practicante_selected:
            serializer_usuario_rol_selected =usuario_rol_serializer(i)
            consulta_practicante_selected  = User.objects.get(id =serializer_usuario_rol_selected.data['id_usuario'])
            serializer_practicante_selected  = user_selected(consulta_practicante_selected )
            list_practicante_selected.append(serializer_practicante_selected.data)
            for i in list_practicante:
                if i['id'] == serializer_practicante_selected.data['id']:
                    list_practicante.remove(i)

        datos = [list_practicante_selected,list_practicante]
        return Response(datos,status=status.HTTP_200_OK)

class monitor_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def list(self, request):
        print("hola")
        list_monitores = []

        val_rol = rol.objects.get(nombre = 'monitor')
        id_rol_monitor = (rol_serializer(val_rol)).data['id']
        consulta_id_monitores = list(usuario_rol.objects.filter(id_rol = id_rol_monitor,estado = 'ACTIVO'))
        print(consulta_id_monitores)
        for i in consulta_id_monitores:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_monitor = User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)
            list_monitores.append(serializer_monitor.data)

        return Response(list_monitores,status=status.HTTP_200_OK)


    def retrieve(self, request, pk):
        list_monitores = []
        list_monitores_selected = []
        
        val_rol = rol.objects.get(nombre = 'monitor')
        id_rol_monitor = (rol_serializer(val_rol)).data['id']

        consulta_id_monitores = list(usuario_rol.objects.filter(id_rol = id_rol_monitor,estado = 'ACTIVO'))
        for i in consulta_id_monitores:
            serializer_usuario_rol =usuario_rol_serializer(i)
            consulta_monitor = User.objects.get(id =serializer_usuario_rol.data['id_usuario'])
            serializer_monitor = user_selected(consulta_monitor)
            list_monitores.append(serializer_monitor.data)

        consulta_id_monitores_selected = list(usuario_rol.objects.filter(id_jefe = pk, id_rol = id_rol_monitor))

        for i in consulta_id_monitores_selected:
            serializer_usuario_rol_selected =usuario_rol_serializer(i)
            consulta_monitor_selected  = User.objects.get(id =serializer_usuario_rol_selected.data['id_usuario'])
            serializer_monitor_selected  = user_selected(consulta_monitor_selected )
            list_monitores_selected.append(serializer_monitor_selected.data)
            for i in list_monitores:
                if i['id'] == serializer_monitor_selected.data['id']:
                    list_monitores.remove(i)
        datos = [list_monitores_selected,list_monitores]
        return Response(datos,status=status.HTTP_200_OK)

class estudiante_selected_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()

    def list(self, request):
        list_estudiantes = []


        list_all_estudiantes = list(estudiante.objects.all())
        for i in list_all_estudiantes: 
            serializer_estudiante =estudiante_serializer(i)
            list_estudiantes.append(serializer_estudiante.data)

        return Response(list_estudiantes,status=status.HTTP_200_OK)

    def retrieve(self, request, pk):
        list_estudiantes = []
        list_estudiantes_selected = []

        consulta_estudiantes = list(estudiante.objects.all())
        for i in consulta_estudiantes: 
            serializer_estudiante =estudiante_serializer(i)
            list_estudiantes.append(serializer_estudiante.data)

        lista_asignacion = list(asignacion.objects.filter(id_usuario = pk, estado=True))

        for i in lista_asignacion:
            serializer_asignacion =asignacion_serializer(i)
            estudiante_selected =estudiante.objects.get(id = serializer_asignacion.data['id_estudiante']) 
            serializer_estudiante =estudiante_serializer(estudiante_selected)
            list_estudiantes_selected.append(serializer_estudiante.data)
            for i in list_estudiantes:
                if i['id'] == serializer_estudiante.data['id']:
                    list_estudiantes.remove(i)

        datos = [list_estudiantes_selected,list_estudiantes]
        return Response(datos,status=status.HTTP_200_OK)



class usuario_rol_viewsets (viewsets.ModelViewSet):
    serializer_class = usuario_rol_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()
    

    def list(self, request):
        list_user_rol = list()
        var_semestre = get_object_or_404(semestre, semestre_actual = True)
        for user_rol in usuario_rol.objects.filter(id_semestre =var_semestre.id, estado = "ACTIVO").values():
            rols= rol.objects.filter(id =user_rol['id_rol_id']).annotate(id_rol=F('id')).values('id_rol','nombre')[0]
            usuarios= User.objects.filter(id =user_rol['id_usuario_id']).values('id','username','first_name','last_name', 'email')[0]
            usuarios.update(rols)
            list_user_rol.append(usuarios)

        
        return Response (list_user_rol)

    def retrieve(self, request, pk=None):
        try:
            var_semestre = get_object_or_404(semestre, semestre_actual = True)
            var_user_rol =usuario_rol.objects.get(id_usuario=pk,id_semestre =var_semestre.id,estado = "ACTIVO")
            serializer_user_rol= usuario_rol_serializer(var_user_rol)
            var_rol = rol.objects.get(id =serializer_user_rol.data['id_rol'])
            serializer_rol= rol_serializer(var_rol)
            return Response(serializer_rol.data['nombre'])
        except:
            return Response(
            {'mensaje':'Este usuario no tiene rol.'},
            status=status.HTTP_404_NOT_FOUND
            )



    def update(self, request, pk=None):
        # serializer = self.serializer_class(data=request.data)
        # print('esta es la info: '+ str(request.data))
        # if (serializer.is_valid()):
            var_usuario =User.objects.get(id=pk)
            serializer_usuario= user_serializer(var_usuario)
            var_semestre =semestre.objects.get(semestre_actual = True)
            serializer_semestre= semestre_serializer(var_semestre)
            print(serializer_usuario.data['id'])
            print(serializer_semestre.data['id'])

            # try:
            var_old_user_rol = usuario_rol.objects.get(id_usuario = serializer_usuario.data['id'],  id_semestre = serializer_semestre.data['id'],estado = 'ACTIVO')

            # except:
            #     return Response(
            #     status=status.HTTP_404_NOT_FOUND
            #     )

            var_user_rol= var_old_user_rol
            var_user_rol.estado = "INACTIVO"
            var_user_rol.save()

            return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)

    def create(self, request,pk=None):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):
            id_user_request = serializer.data['id_usuario']
            id_rol_request = serializer.data['id_rol']

            var_usuario = get_object_or_404(User, id = id_user_request)
            var_rol = get_object_or_404(rol, id = id_rol_request)
            var_semestre = get_object_or_404(semestre, semestre_actual = True)

            try:
                var_old_user_rol = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
            except:
                var_old_user_rol = Empty
            # print(var_semestre.id)
            # print(var_old_user_rol.id_semestre)
            # print(var_semestre.id)
            # print(var_old_user_rol.estado)
            if(var_old_user_rol != Empty and var_old_user_rol.estado == "ACTIVO"):
                print("entre a 1")
                var_user_rol= var_old_user_rol
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol == Empty) :
                print("entre a 2")
                var_user_rol= usuario_rol()
                var_user_rol.id_usuario= var_usuario
                var_user_rol.id_rol = var_rol
                var_user_rol.id_semestre = var_semestre
                var_user_rol.save()
            elif(var_old_user_rol != Empty and var_old_user_rol.estado == "INACTIVO"):
                print("entre a 3")
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
    # permission_classes = (IsAuthenticated,)
    queryset = usuario_rol_serializer.Meta.model.objects.all()
    

    def list(self, request):
        list_user_rol = list()
        var_semestre = semestre.objects.filter(semestre_actual = False).order_by('-fecha_inicio').first()
        print(var_semestre.nombre)
        for user_rol in usuario_rol.objects.filter(id_semestre =var_semestre.id, estado = "ACTIVO").values():
            rols= rol.objects.filter(id =user_rol['id_rol_id']).annotate(id_rol=F('id')).values('id_rol','nombre')[0]
            usuarios= User.objects.filter(id =user_rol['id_usuario_id']).values('id','username','first_name','last_name', 'email')[0]
            usuarios.update(rols)
            list_user_rol.append(usuarios)
        return Response(list_user_rol)
        







class estudiante_actualizacion_viewsets (viewsets.ModelViewSet):
    serializer_class = Estudiante_actualizacion
    queryset = estudiante_serializer.Meta.model.objects.all()

    def post(self, request, pk=None):
        # serializer = self.serializer_class(data=request.data)
        # print('esta es la info: '+ str(request.data))
        # if (serializer.is_valid()):
        serializer = self.serializer_class(data=request.data)


        print('este es jajaja : ' + str(serializer))
        if serializer.is_valid():

            puntaje_icfes_request = serializer.data['puntaje_icfes']
            telefono_res_request = serializer.data['telefono_res']
            celular_request = serializer.data['celular']
            email_request = serializer.data['email']
            sexo_request = serializer.data['sexo']
            cantidad_hijo_request = serializer.data['cantidad_hijo']
            deporte_request = serializer.data['actividades_ocio_deporte']
            acudiente_emergencia_request = serializer.data['acudiente_emergencia']
            tel_acudiente_emergencia_request = serializer.data['tel_acudiente_emergencia']

            etnia_request = serializer.data['etnia']
            act_simultanea_request = serializer.data['act_simultanea']
            identidad_gen_request = serializer.data['identidad_gen']
            estado_civil_request = serializer.data['estado_civil']
            cond_excepcion_request = serializer.data['cond_excepcion']

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
                
                etnia_obj = etnia.objects.get(id=etnia_request)
                var_estudiante.id_etnia = etnia_obj

                act_simultanea_obj = act_simultanea.objects.get(id=act_simultanea_request)
                var_estudiante.id_act_simultanea = act_simultanea_obj

                identidad_gen_obj = identidad_gen.objects.get(id=identidad_gen_request)
                var_estudiante.id_identidad_gen = identidad_gen_obj

                estado_civil_obj = estado_civil.objects.get(id=estado_civil_request)
                var_estudiante.id_estado_civil = estado_civil_obj

                cond_excepcion_obj = cond_excepcion.objects.get(id=cond_excepcion_request)
                var_estudiante.id_cond_excepcion = cond_excepcion_obj

                var_estudiante.save()
                return Response({'Respuesta': 'True'},status=status.HTTP_200_OK)
            except estudiante.DoesNotExist:
                print('primer print')
                return Response({'Respuesta': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        print('segundo print')
        print(serializer.errors)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # except:
            #     return Response(
            #     status=status.HTTP_404_NOT_FOUND
            #     )


class Grupo_etnico_viewsets(viewsets.ModelViewSet):
    serializer_class = Grupo_etnico_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = etnia.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Actividad_simultanea_viewsets(viewsets.ModelViewSet):
    serializer_class = Actividad_simultanea_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = act_simultanea.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Identidad_gen_viewsets(viewsets.ModelViewSet):
    serializer_class = Identidad_de_genero_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = identidad_gen.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Estado_civil_viewsets(viewsets.ModelViewSet):
    serializer_class = Estado_civil_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = estado_civil.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Condicion_de_excepcion_viewsets(viewsets.ModelViewSet):
    serializer_class = Condicion_de_excepcion_serializer
    # permission_classes = (IsAuthenticated,)
    queryset = cond_excepcion.objects.all()

    def list(self, request):
        try:
            serializer = self.get_serializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class All_user(APIView):

#     def get(self, request):
#         list_user =User.objects.all()
#         print(list_user)
#         return Response (list(list_user.values()))

# class All_user_with_rol(APIView):

#     def get(self, request):
#         list_user_rol = list()
#         var_semestre = get_object_or_404(semestre, semestre_actual = True)
#         for user_rol in usuario_rol.objects.filter(id_semestre =var_semestre.id, estado = "ACTIVO").values():
#             rols= rol.objects.filter(id =user_rol['id_rol_id']).annotate(id_rol=F('id')).values('id_rol','nombre')[0]
#             usuarios= User.objects.filter(id =user_rol['id_usuario_id']).values('id','username','first_name','last_name', 'email')[0]
#             usuarios.update(rols)
#             list_user_rol.append(usuarios)

        
#         return Response (list_user_rol)

# class All_rol(APIView):

#     def get(self, request):
#         print(request)
#         list_rol =rol.objects.all()
#         return Response (list(list_rol.values()))

# class All_estudiante(APIView):

#     def get(self, request):
#         print(request)
#         list_estudiante =estudiante.objects.all()
#         return Response (list(list_estudiante.values()))

# class Estudiante_manage(APIView):

#     serializer_class =serializers.Estudiante_manage

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if (serializer.is_valid()):

#             id_request = serializer.validated_data.get('id')
#             var_estudiante =estudiante.objects.filter(id =id_request.id).values()
#             return Response(var_estudiante[0])
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#             )

# class User_manage(APIView):

#     serializer_class =serializers.User_manage

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if (serializer.is_valid()):

#             id_request = serializer.validated_data.get('id')
#             var_usuario =User.objects.filter(id =id_request).values()
#             return Response(var_usuario[0])
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#             )

# class Rol_manage(APIView):

#     serializer_class =serializers.Rol_manage

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if (serializer.is_valid()):

#             id_request = serializer.validated_data.get('id')
#             var_rol =rol.objects.filter(id =id_request).values()
#             return Response(var_rol[0])
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#             )

# class User_rol_manage(APIView):

#     serializer_class =serializers.Rol_manage

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if (serializer.is_valid()):
#             id_user_request = serializer.validated_data.get('id')
#             var_user_rol =get_object_or_404(usuario_rol, id_usuario = id_user_request,estado = "ACTIVO")
#             id_rol = var_user_rol.id_rol.id
#             var_rol = get_object_or_404(rol, id = id_rol)
#             id_rol_result = var_rol.nombre
#             return Response(id_rol_result)
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#             )

# class delete_user_rol(APIView):
#     serializer_class =serializers.User_manage
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         print('esta es la info: '+ str(request.data))
#         if (serializer.is_valid()):
#             id_user_request = serializer.validated_data.get('id')
#             var_usuario = get_object_or_404(User, id = id_user_request)
#             var_semestre = get_object_or_404(semestre, semestre_actual = True)
#             try:
#                 var_old_user_rol = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
#             except:
#                 return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST
#                 )

#             var_user_rol= var_old_user_rol
#             var_user_rol.estado = "INACTIVO"
#             var_user_rol.save()

#             return Response({'Respuesta': 'True'})

# class User_rol(APIView):

#     serializer_class =serializers.User_rol
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if (serializer.is_valid()):

#             id_user_request = serializer.validated_data.get('id_user')
#             id_rol_request = serializer.validated_data.get('id_rol')
#             var_usuario = get_object_or_404(User, id = id_user_request)
#             var_rol = get_object_or_404(rol, id = id_rol_request)
#             var_semestre = get_object_or_404(semestre, semestre_actual = True)
#             try:
#                 var_old_user_rol = get_object_or_404(usuario_rol, id_usuario = var_usuario,  id_semestre = var_semestre)
#             except:
#                 var_old_user_rol = Empty
#             # print(var_semestre.id)
#             # print(var_old_user_rol.id_semestre)
#             # print(var_semestre.id)
#             # print(var_old_user_rol.estado)
#             if(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id == var_semestre.id and var_old_user_rol.estado == "ACTIVO"):
#                 print("entre a 1")
#                 var_user_rol= var_old_user_rol
#                 var_user_rol.id_usuario= var_usuario
#                 var_user_rol.id_rol = var_rol
#                 var_user_rol.id_semestre = var_semestre
#                 var_user_rol.save()
#             elif(var_old_user_rol == Empty):
#                 print("entre a 2")
#                 var_user_rol= usuario_rol()
#                 var_user_rol.id_usuario= var_usuario
#                 var_user_rol.id_rol = var_rol
#                 var_user_rol.id_semestre = var_semestre
#                 var_user_rol.save()
#             elif(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id != var_semestre):
#                 print("entre a 3")
#                 var_user_rol= usuario_rol()
#                 var_user_rol.id_usuario= var_usuario
#                 var_user_rol.id_rol = var_rol
#                 var_user_rol.id_semestre = var_semestre
#                 var_user_rol.save()
#             elif(var_old_user_rol != Empty and var_old_user_rol.id_semestre.id == var_semestre and var_old_user_rol.estado != "ACTIVO"):
#                 print("entre a 4")
#                 var_user_rol= var_old_user_rol
#                 var_user_rol.id_usuario= var_usuario
#                 var_user_rol.id_rol = var_rol
#                 var_user_rol.estado = "ACTIVO"
#                 var_user_rol.id_semestre = var_semestre
#                 var_user_rol.save()
#             else:
#                 Response(
#                     serializer.errors,
#                     status=status.HTTP_400_BAD_REQUEST
#                 )


#             return Response({'Respuesta': 'True'})

#         return Response(
#                 serializer.errors,
#                 status=status.HTTP_400_BAD_REQUEST
#             )






# class All_semestres(APIView):

#     def get(self, request):
#         print(request)
#         list_semestre =semestre.objects.all()
#         return Response (list(list_semestre.values()))



class Estudiante_actualizacion(APIView):

    serializer_class =serializers.Estudiante_actualizacion
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if (serializer.is_valid()):
            print("entre a serializ")
            num_doc_request = serializer.validated_data.get('id_nuevo_num_doc')
            telefono_res_request = serializer.validated_data.get('id_nuevo_telefono_res')
            # var_num_doc = get_object_or_404(estudiante, num_doc = num_doc_request)
            # var_telefono_res = get_object_or_404(estudiante, telefono_res = telefono_res_request)
            
            try:
                var_old_usuario = get_object_or_404(estudiante, num_doc = num_doc_request)
                print("entra aqui")
            except:
                print("entra aqui 2")
                var_old_usuario = Empty
            # print(var_semestre.id)
            # print(var_old_usuario.id_semestre)
            # print(var_semestre.id)
            # print(var_old_usuario.estado)
            if(var_old_usuario != Empty ):
                print("entre a 1")
                var_usuario= var_old_usuario
                var_usuario.telefono_res = telefono_res_request
                var_usuario.save()
            else:
                print("entre a 2")
                Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response({'Respuesta': 'True'})

        return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
