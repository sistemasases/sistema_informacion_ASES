import datetime
import os
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, basic_estudiante_serializer
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from django.core.mail import send_mail
from rest_framework.viewsets import ViewSet
from modulo_usuario_rol.serializers import user_serializer, usuario_rol_serializer, user_selected
from django.contrib.auth.models import User
import environ
from rest_framework.decorators import action
from django.template.loader import render_to_string
from modulo_asignacion.models import asignacion
from modulo_instancia.models import semestre, sede
from modulo_usuario_rol.models import rol, usuario_rol, estudiante, cond_excepcion, cohorte_estudiante
from django.contrib.auth.hashers import make_password
from modulo_programa.models import dir_programa, facultad, programa, programa_estudiante, estado_programa, vcd_academico
import json
import base64
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django_otp.oath import TOTP
from django_otp.util import random_hex
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

from django_otp.plugins.otp_totp.models import TOTPDevice
from datetime import datetime, timezone, timedelta

import time

from django.utils.decorators import method_decorator

from django.contrib.auth import authenticate

from django.core.mail import EmailMessage

env = environ.Env()
environ.Env.read_env()


class enviar_correos_riesgos_viewset(ViewSet):
    # @action(methods=['post'], detail=False, url_name="enviar_correos_riesgos", url_path="enviar_correos_riesgos", )
    """
    Esta clase gestiona el envío de correos electrónicos relacionados con los riesgos asociados a los estudiantes.
    """

    def get_dimensiones(self, riesgos):
        dic_riesgos = []
        dic_dimensiones = [
            {
                'dimension': 'Individual',
                'riesgo': riesgos[0]['riesgo_individual'],
                'info': riesgos[0]['info_individual']
            },
            {
                'dimension': 'Familiar',
                'riesgo': riesgos[1]['riesgo_familiar'],
                'info': riesgos[1]['info_familiar']
            },
            {
                'dimension': 'Academica',
                'riesgo': riesgos[2]['riesgo_academico'],
                'info': riesgos[2]['info_academico']
            },
            {
                'dimension': 'Economica',
                'riesgo': riesgos[3]['riesgo_economico'],
                'info': riesgos[3]['info_economico']
            },
            {
                'dimension': 'Vida Universitaria',
                'riesgo': riesgos[4]['riesgo_vida_universitaria_ciudad'],
                'info': riesgos[4]['info_vida_universitaria_ciudad']
            }
        ]

        plantilla_riesgos = " "
        for dimension in dic_dimensiones:
            # # # # print(dimension)
            if dimension['riesgo'] == 2:
                plantilla_riesgos += (
                    f"\n• <label style='color: #000000; font-weight: 700'>{dimension['dimension']}</label>\n"
                    f"{dimension['info']}\n"
                )

        # plantilla_riesgos = str(plantilla_riesgos)[:-1]
        # dimensiones = "".join(plantilla_riesgos)
        # # Eliminar la última coma, si existe
        # if dimensiones.endswith(","):
        #     dimensiones = dimensiones[:-1]
        # # # # # print(plantilla_riesgos)
        return plantilla_riesgos

    def get_data_estudiante(self, id_estudiante_selected):
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()
        return var_estudiante

    def get_usuarios_asignados(self, id_estudiante_selected, id_creador):
        # # # # print("ID ESTUDIANTE")
        # # # # print(id_estudiante_selected)
        # data_sede = request.GET.get('sede')
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()
        # # # # # print(var_estudiante[0])
        obj_rol_creador = usuario_rol.objects.filter(
            id_usuario=id_creador, estado="ACTIVO").values()

        asignacion_estudiante = asignacion.objects.filter(
            estado=True, id_estudiante=var_estudiante[0]['id'], id_semestre_id=obj_rol_creador[0]["id_semestre_id"]).values()
        # print(asignacion_estudiante)
        var_monitor = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=asignacion_estudiante[0]['id_usuario_id']).values()
        # # # # print(var_monitor)
        var_practicante = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_monitor[0]['id_jefe_id']).values()
        # # # # print(var_practicante[0])
        var_profesional = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_practicante[0]['id_jefe_id']).values()
        # # # # print(var_profesional[0])

        mail_practicante = User.objects.filter(
            is_active=True, id=var_practicante[0]['id_usuario_id']).values('email')
        mail_profesional = User.objects.filter(
            is_active=True, id=var_profesional[0]['id_usuario_id']).values('email')
        # # # # print(mail_practicante[0]['email'])
        # # # # print(mail_profesional[0]['email'])
        # list_correos =  "['" + mail_practicante[0]['email'] + "'], "['" + mail_profesional[0]['email'] + ']"'
        list_correos = list()
        # list_correos.append("sistemas.ases@correounivalle.edu.co")
        list_correos.append(mail_practicante[0]['email'])
        list_correos.append(mail_profesional[0]['email'])
        # print("LISTA DE CORREOS:")
        # print(list_correos)

        # list_correos_test = list()
        # list_correos_test.append("steven.bernal@correounivalle.edu.co")
        # list_correos_test.append("sistemas.ases@correounivalle.edu.co")

        return list_correos

    def create(self, request, *args, **kwargs):
        # # # # # print("DATOS RECIBIDOS")
        # # # # # print(request.data.get('params'))
        data_estudiante = request.data.get('params')
        data_riesgos = data_estudiante.get('estudiante_seleccionado')
        # # # # print(data_estudiante)
        """
        Escala de Riesgos del Formulario
        0 = Bajo
        1 = Medio
        2 = Alto

        """
        riesgos = [
            {
                'riesgo_individual': data_riesgos['riesgo_individual'],
                'info_individual': data_riesgos['individual']
            },
            {
                'riesgo_familiar': data_riesgos['riesgo_familiar'],
                'info_familiar': data_riesgos['familiar']
            },
            {
                'riesgo_academico': data_riesgos['riesgo_academico'],
                'info_academico': data_riesgos['academico']
            },
            {
                'riesgo_economico': data_riesgos['riesgo_economico'],
                'info_economico': data_riesgos['economico']
            },
            {
                'riesgo_vida_universitaria_ciudad': data_riesgos['riesgo_vida_universitaria_ciudad'],
                'info_vida_universitaria_ciudad': data_riesgos['vida_universitaria_ciudad']
            }
        ]
        # self.get_dimensiones(riesgos)
        id_estudiante_seleccionado = data_riesgos['id_estudiante']
        destinatarios = self.get_usuarios_asignados(
            id_estudiante_seleccionado, data_riesgos['id_creador'])
        # # # # print(self.get_usuarios_asignados(id_estudiante_seleccionado))
        # # # # # print(riesgos)
        estudiante = self.get_data_estudiante(id_estudiante_seleccionado)
        obj_programa = programa_estudiante.objects.get(
            id_estudiante_id=id_estudiante_seleccionado)
        cod_programa = programa.objects.filter(
            id=obj_programa.id_programa_id).values()
        # # # # # print(cod_programa)
        obj_usuario_creador = user_serializer(
            User.objects.get(id=data_riesgos['id_creador'])).data
        rol_user = usuario_rol.objects.filter(
            id_usuario=data_riesgos['id_creador'], estado="ACTIVO").values()

        # # # # print(obj_usuario_creador)
        # # # print(rol_user)

        asunto = "Riesgo de alto nivel: " + \
            estudiante[0]['nombre'] + "  " + estudiante[0]['apellido']

        if rol_user[0]["id_rol_id"] == 1:
            destinatarios.clear()
            destinatarios = [obj_usuario_creador['email'],
                             "sistemas.ases@correounivalle.edu.co"]
            asunto = ""
            asunto = "Riesgo de alto nivel: (Prueba) " + \
                estudiante[0]['nombre'] + "  " + estudiante[0]['apellido']
        #     # # # print("Enviando a Sistemas")
        # # # # print(destinatarios)

        if riesgos[0]['riesgo_individual'] == 2 or riesgos[0]['riesgo_familiar'] == 2 or riesgos[0]['riesgo_academico'] == 2 or riesgos[0]['riesgo_economico'] == 2 or riesgos[0]['riesgo_vida_universitaria_ciudad'] == 2:
            # # # # # print(id_estudiante)
            cuerpo_correo = render_to_string(
                'correos/riesgo_alto.html', {'nombre_estudiante': estudiante[0]['nombre'] + "  " + estudiante[0]['apellido'], 'cod_uv_estudiante': estudiante[0]['cod_univalle'], 'cod_carrera': cod_programa[0]['codigo_univalle'], 'correo_estudiante': estudiante[0]['email'], 'dimensiones': self.get_dimensiones(riesgos), 'fecha_seguimiento': data_riesgos['fecha'], 'usuario_envia_correo': obj_usuario_creador['first_name'] + " " + obj_usuario_creador['last_name']})
            asunto
            EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
            # # # # print("Enviando correo...")
            # # # # print("ENVIANDO A:")
            # # # # print(destinatarios)

            # envío con EmailMessage
            email = EmailMessage(
                asunto,
                cuerpo_correo,
                EMAIL_HOST_USER,
                # Cambia esto por el correo del destinatario
                destinatarios
            )
            email.content_subtype = "html"  # Importante para indicar que el contenido es HTML
            email.send()
        else:
            return Response(({"message": "No hay Altos"}))

        # # # # print("Correo enviado")
        prueba = "Se ejecutó correctamente"
        return Response(({"message": "Email sent successfully", }, prueba, status.HTTP_200_OK))


class enviar_correo_cambio_contra_viewset(ViewSet):

    def create(self, request, *args, **kwargs):
        # # # # # print("Correo no enviado, pero entró")

        params = request.data.get('params')
        correo = params.get('mail')
        received_username = params.get('username')
        print(correo)
        print(received_username)

        try:
            usuario = User.objects.filter(email=correo, username=received_username).values(
                'id', 'username', 'first_name', 'last_name').first()
        except:
            return Response({'error': 'No se halló un usuario con dicho correo: ' + correo + " y usuario: " + received_username}, status=status.HTTP_400_BAD_REQUEST)

        user_object = None
        try:
            user_object = User.objects.get(id=usuario['id'])
        except:
            # # # # print("No se halló un usuario con dicho correo: " + correo)
            return Response({'error': 'No se halló un usuario con dicho correo: ' + correo + " y usuario: " + received_username}, status=status.HTTP_400_BAD_REQUEST)
        temporary_password = User.objects.make_random_password()
        # # # # # print("Contraseña temporal: " + temporary_password)
        # # # # # print(usuario)
        fecha_actual = datetime.now()
        correo_admin_sistema = "sistemas.ases@correounivalle.edu.co"
        if user_object:
            user_object.set_password(temporary_password)
            user_object.save()
            # print("Correo enviado")
            # print(temporary_password)
            cuerpo_correo = render_to_string(
                'correos/cambio_contraseña.html', {'nombre': usuario['first_name'], 'apellido': usuario['last_name'],
                                                   'usuario': usuario['username'], 'password': temporary_password,
                                                   'fecha_actual': fecha_actual, 'correo_admin': correo_admin_sistema})
            asunto = "Cambio de Contraseña"
            EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
            destinatarios = [correo]
            # envío con EmailMessage

            email = EmailMessage(
                asunto,
                cuerpo_correo,
                EMAIL_HOST_USER,
                # Cambia esto por el correo del destinatario
                destinatarios
            )
            email.content_subtype = "html"  # Importante para indicar que el contenido es HTML
            email.send()

            return Response({'mensaje': 'Cambio de contraseña completado.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No se halló un usuario con dicho correo: ' + correo}, status=status.HTTP_400_BAD_REQUEST)
        # return Response({'mensaje': 'Cambio de contraseña completado.'}, status=status.HTTP_200_OK)

# Create your views here.

    # @action(methods=['post'], detail=False, url_name="enviar_correos_riesgos", url_path="enviar_correos_riesgos", )


class enviar_correo_observaciones_viewsets(ViewSet):

    def get_data_estudiante(self, id_estudiante_selected):
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()
        return var_estudiante

    def get_usuarios_asignados(self, id_estudiante_selected, id_creador):
        # # # # print("ID ESTUDIANTE")
        # # # # print(id_estudiante_selected)
        # data_sede = request.GET.get('sede')
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()
        # # # # # print(var_estudiante[0])

        user_email = User.objects.filter(
            is_active=True, id=id_creador).values('email')

        obj_rol_creador = usuario_rol.objects.filter(
            id_usuario=id_creador, estado="ACTIVO").values()
        # # # print(obj_rol_creador)

        asignacion_estudiante = asignacion.objects.filter(
            estado=True, id_estudiante=var_estudiante[0]['id'], id_semestre_id=obj_rol_creador[0]["id_semestre_id"]).values()
        # # # # print(asignacion_estudiante)

        var_monitor = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=asignacion_estudiante[0]['id_usuario_id']).values()
        # # # # print(var_monitor)

        var_practicante = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_monitor[0]['id_jefe_id']).values()
        # # # # print(var_practicante[0])

        var_profesional = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_practicante[0]['id_jefe_id']).values()
        # # # # print(var_profesional[0])

        mail_monitor = User.objects.filter(
            is_active=True, id=var_monitor[0]['id_usuario_id']).values('email')

        mail_practicante = User.objects.filter(
            is_active=True, id=var_practicante[0]['id_usuario_id']).values('email')
        # # print(mail_practicante[0]['email'])
        mail_profesional = User.objects.filter(
            is_active=True, id=var_profesional[0]['id_usuario_id']).values('email')

        list_correos_test = list()
        list_correos = list()

        # list_correos_test.append("steven.bernal@correounivalle.edu.co")
        # list_correos_test.append("sistemas.ases@correounivalle.edu.co")
        if obj_rol_creador[0]['id_rol_id'] == 1:        # super_ases
            # # # # print("Enviar Correo a Sistemas (Para Pruebas)")
            # list_correos_test.append("steven.bernal@correounivalle.edu.co")
            list_correos_test.append(user_email[0]['email'])
            list_correos_test.append("sistemas.ases@correounivalle.edu.co")
            # # # print("CORREOS")
            # # # print(list_correos_test)
            return list_correos_test

        elif obj_rol_creador[0]['id_rol_id'] == 3:         # "profesional"
            "Enviar Correo a Practicante y Monitor"
            list_correos.append(mail_practicante[0]['email'])
            list_correos.append(mail_monitor[0]['email'])
            # # # print("CORREOS")
            # # # print(list_correos)
            return list_correos
        elif obj_rol_creador[0]['id_rol_id'] == 4:         # "practicante"
            "Enviar Correo a Profesional y Monitor"
            list_correos.append(mail_profesional[0]['email'])
            list_correos.append(mail_monitor[0]['email'])
            # # # print("CORREOS")
            # # # print(list_correos)
            return list_correos

        # # # # print(mail_practicante[0]['email'])
        # # # # print(mail_profesional[0]['email'])
        # list_correos =  "['" + mail_practicante[0]['email'] + "'], "['" + mail_profesional[0]['email'] + ']"'
        # list_correos.append("sistemas.ases@correounivalle.edu.co")
        # list_correos.append(mail_practicante[0]['email'])
        # list_correos.append(mail_profesional[0]['email'])
        # # # print("LISTA DE CORREOS:")
        # # # print(list_correos)

        # return list_correos_test

    def create(self, request, *args, **kwargs):
        # # # # print("ENTRO AQUI")
        # # # # print(request.data)
        estudiante = self.get_data_estudiante(
            request.data.get("id_estudiante"))

        obj_usuario_creador = user_serializer(
            User.objects.get(id=request.data.get("id_modificador"))).data
        # # # # print("AQUI VA EL USUARIO")
        # # # # print(obj_usuario_creador)
        obj_rol_creador = usuario_rol.objects.filter(
            id_usuario=request.data.get("id_modificador"), estado="ACTIVO").values()
        # # # # print("AQUI VA EL USUARIO ROL")
        # # # # print(obj_rol_creador)
        message_text = ""
        destinatarios = self.get_usuarios_asignados(
            request.data.get("id_estudiante"), request.data.get("id_modificador"))
        # # # # print("DESTINATARIOS")
        # # # # print(destinatarios)

        var_estudiante = self.get_data_estudiante(
            request.data.get("id_estudiante"))

        asignacion_estudiante = asignacion.objects.filter(
            estado=True, id_estudiante=var_estudiante[0]['id'], id_semestre_id=obj_rol_creador[0]["id_semestre_id"]).values()
        # # # # print(asignacion_estudiante)

        var_monitor = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=asignacion_estudiante[0]['id_usuario_id']).values()
        # # # # print(var_monitor)

        user_monitor = User.objects.filter(
            is_active=True, id=var_monitor[0]['id_usuario_id']).values()

        if obj_rol_creador[0]['id_rol_id'] == 1:           # super_ases
            # # # # print("Enviar Correo a Sistemas (Para Pruebas)")
            message_text = "Enviar Correo a Sistemas (Para Pruebas)"
        elif obj_rol_creador[0]['id_rol_id'] == 3:         # "profesional"
            # # # # print("Enviar Correo a Practicante y Monitor")
            message_text = "Enviar Correo a Practicante y Monitor"
        elif obj_rol_creador[0]['id_rol_id'] == 4:     # "practicante"
            # # # # print("Enviar Correo a Profesional y Monitor")
            message_text = "Enviar Correo a Profesional y Monitor"
        else:
            # # # # print("NO SE A QUIEN SE ENVIO")
            message_text = "NO SE A QUIEN SE ENVIO"

         # Cuerpo del Correo
        cuerpo_correo = render_to_string(
            'correos/envio_observaciones.html', {'nombre_estudiante': estudiante[0]['nombre'] + "  " + estudiante[0]['apellido'], 'fecha_seguimiento': request.data.get('fecha'), 'usuario_envia_correo': obj_usuario_creador['first_name'] + " " + obj_usuario_creador['last_name'], 'observaciones': request.data.get('observaciones_correos'), 'lugar_encuentro': request.data.get('lugar'), 'nombre_monitor': user_monitor[0]['first_name'] + " " + user_monitor[0]['last_name']})
        # Asunto del correo
        asunto = "Observaciones seguimiento del dia " + \
            request.data.get("fecha") + " del estudiante " + \
            estudiante[0]['nombre'] + "  " + estudiante[0]['apellido'] + ", Lugar: " + \
            request.data.get("lugar") + "."
        # Host para enviar el correo
        EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
        # # # # print("Enviando correo...")
        email = EmailMessage(
            asunto,
            cuerpo_correo,
            EMAIL_HOST_USER,
            # Cambia esto por el correo del destinatario
            destinatarios
        )
        email.content_subtype = "html"  # Importante para indicar que el contenido es HTML
        email.send()
        # # # print("Correo enviado")
        return Response({'mensaje': message_text}, status=status.HTTP_200_OK)

    """
    destinatarios = {
        if obj_rol_creador[0]['id_rol'] == 1:           # super_ases
            "Enviar Correo a Sistemas (Para Pruebas)"
        elif obj_rol_creador[0]['id_rol'] == 3:         # "profesional"
            "Enviar Correo a Practicante y Monitor"
        elif obj_rol_creador[0]['id_rol'] == 4:     # "practicante"
            "Enviar Correo a Profesional y Monitor"
    }
)
    """


class enviar_riesgo_editado_viewset(ViewSet):

    # @action(methods=['post'], detail=False, url_name="enviar_correos_riesgos", url_path="enviar_correos_riesgos", )
    def get_dimensiones(self, riesgos):
        dic_riesgos = []
        dic_dimensiones = [
            {
                'dimension': 'Individual',
                'riesgo': riesgos[0]['riesgo_individual'],
                'info': riesgos[0]['info_individual']
            },
            {
                'dimension': 'Familiar',
                'riesgo': riesgos[1]['riesgo_familiar'],
                'info': riesgos[1]['info_familiar']
            },
            {
                'dimension': 'Academica',
                'riesgo': riesgos[2]['riesgo_academico'],
                'info': riesgos[2]['info_academico']
            },
            {
                'dimension': 'Economica',
                'riesgo': riesgos[3]['riesgo_economico'],
                'info': riesgos[3]['info_economico']
            },
            {
                'dimension': 'Vida Universitaria',
                'riesgo': riesgos[4]['riesgo_vida_universitaria_ciudad'],
                'info': riesgos[4]['info_vida_universitaria_ciudad']
            }
        ]
        # # # # print(dic_dimensiones)
        # Variables pendientes para el cuerpo del correo
        # nombre_estudiante
        # cod_uv_estudiante
        # cod_carrera
        # correo_estudiante
        # mensaje_dimensiones
        # fecha_seguimiento
        # usuario_envia_correo
        plantilla_riesgos = " "
        for dimension in dic_dimensiones:
            # # # # print(dimension)
            if dimension['riesgo'] == 2:
                plantilla_riesgos += (
                    f"\n• <label style='color: #000000; font-weight: 700'>{dimension['dimension']}</label>\n"
                    f"{dimension['info']}\n"
                )

        # plantilla_riesgos = str(plantilla_riesgos)[:-1]
        # dimensiones = "".join(plantilla_riesgos)
        # # Eliminar la última coma, si existe
        # if dimensiones.endswith(","):
        #     dimensiones = dimensiones[:-1]
        # # # # # print(plantilla_riesgos)
        return plantilla_riesgos

    def get_data_estudiante(self, id_estudiante_selected):
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()
        return var_estudiante

    def get_usuarios_asignados(self, id_estudiante_selected, id_creador):
        # # # # print("ID ESTUDIANTE")
        # # # # print(id_estudiante_selected)
        # data_sede = request.GET.get('sede')
        var_estudiante = estudiante.objects.filter(
            id=id_estudiante_selected).values()

        user_email = User.objects.filter(
            is_active=True, id=id_creador).values('email')

        obj_rol_creador = usuario_rol.objects.filter(
            id_usuario=id_creador, estado="ACTIVO").values()
        # # # # # print(var_estudiante[0])

        asignacion_estudiante = asignacion.objects.filter(
            estado=True, id_estudiante=var_estudiante[0]['id'], id_semestre_id=obj_rol_creador[0]["id_semestre_id"]).values()
        # print("ASIGNACION ESTUDIANTE")
        # print(asignacion_estudiante)

        var_monitor = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=asignacion_estudiante[0]['id_usuario_id']).values()
        # print(var_monitor)

        var_practicante = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_monitor[0]['id_jefe_id']).values()
        # # # # print(var_practicante[0])

        var_profesional = usuario_rol.objects.filter(
            estado='ACTIVO', id_usuario=var_practicante[0]['id_jefe_id']).values()
        # # # # print(var_profesional[0])

        mail_monitor = User.objects.filter(
            is_active=True, id=var_monitor[0]['id_usuario_id']).values('email')

        mail_practicante = User.objects.filter(
            is_active=True, id=var_practicante[0]['id_usuario_id']).values('email')

        mail_profesional = User.objects.filter(
            is_active=True, id=var_profesional[0]['id_usuario_id']).values('email')

        list_correos_test = list()
        list_correos = list()

        # # # # print(obj_rol_creador)
        # list_correos_test.append("steven.bernal@correounivalle.edu.co")
        # list_correos_test.append("sistemas.ases@correounivalle.edu.co")
        if obj_rol_creador[0]['id_rol_id'] == 1:        # super_ases
            # # # # print("Enviar Correo a Sistemas (Para Pruebas)")
            # list_correos_test.append("steven.bernal@correounivalle.edu.co")
            list_correos_test.append(user_email[0]['email'])
            list_correos_test.append("sistemas.ases@correounivalle.edu.co")
            return list_correos_test

        elif obj_rol_creador[0]['id_rol_id'] == 3:         # "profesional"
            "Enviar Correo a Practicante y Monitor"
            list_correos.append(mail_practicante[0]['email'])
            list_correos.append(mail_monitor[0]['email'])

            # print("CORREOS")
            # print(list_correos)
            return list_correos
        elif obj_rol_creador[0]['id_rol_id'] == 4:         # "practicante"
            "Enviar Correo a Profesional y Monitor"
            list_correos.append(mail_monitor[0]['email'])
            list_correos.append(mail_profesional[0]['email'])
            # print("CORREOS")
            # print(list_correos)
            return list_correos
        elif obj_rol_creador[0]['id_rol_id'] == 5:          # "monitor"
            "Enviar Correo a Profesional y Practicante"
            list_correos.append(mail_practicante[0]['email'])
            list_correos.append(mail_profesional[0]['email'])
            # print("CORREOS")
            # print(list_correos)
            return list_correos

        # # # # print(mail_practicante[0]['email'])
        # # # # print(mail_profesional[0]['email'])
        # list_correos =  "['" + mail_practicante[0]['email'] + "'], "['" + mail_profesional[0]['email'] + ']"'
        # list_correos.append("sistemas.ases@correounivalle.edu.co")
        # list_correos.append(mail_practicante[0]['email'])
        # list_correos.append(mail_profesional[0]['email'])
        # # print("LISTA DE CORREOS:")
        # # print(list_correos)

        # return list_correos_test

    def create(self, request, *args, **kwargs):
        # # # # print("DATOS RECIBIDOS")
        # print(request.data)
        info = request.data
        # Deserializar la cadena JSON en una lista de diccionarios
        # info = json.loads(info_json)

        seguimiento = info.get('seguimiento')
        antiguo_seguimiento = info.get('antiguo_seguimiento')
        # # # # print("Seguimiento actual:", seguimiento)
        # # # # print("Antiguo seguimiento:", antiguo_seguimiento)

        # data_estudiante = seguimiento.get('id_estudiante')
        data_riesgos = seguimiento
        data_riesgos_antiguos = antiguo_seguimiento
        # # # # print("DATA RIESGOS")
        # # # # print(data_riesgos)

        """
        Escala de Riesgos del Formulario
        0 = Bajo
        1 = Medio
        2 = Alto

        """
        riesgos = [
            {
                'riesgo_individual': data_riesgos['riesgo_individual'],
                'info_individual': data_riesgos['individual']
            },
            {
                'riesgo_familiar': data_riesgos['riesgo_familiar'],
                'info_familiar': data_riesgos['familiar']
            },
            {
                'riesgo_academico': data_riesgos['riesgo_academico'],
                'info_academico': data_riesgos['academico']
            },
            {
                'riesgo_economico': data_riesgos['riesgo_economico'],
                'info_economico': data_riesgos['economico']
            },
            {
                'riesgo_vida_universitaria_ciudad': data_riesgos['riesgo_vida_universitaria_ciudad'],
                'info_vida_universitaria_ciudad': data_riesgos['vida_universitaria_ciudad']
            }
        ]
        riesgos_antiguos = [
            {
                'riesgo_individual': data_riesgos_antiguos['riesgo_individual'],
                'info_individual': data_riesgos_antiguos['individual']
            },
            {
                'riesgo_familiar': data_riesgos_antiguos['riesgo_familiar'],
                'info_familiar': data_riesgos_antiguos['familiar']
            },
            {
                'riesgo_academico': data_riesgos_antiguos['riesgo_academico'],
                'info_academico': data_riesgos_antiguos['academico']
            },
            {
                'riesgo_economico': data_riesgos_antiguos['riesgo_economico'],
                'info_economico': data_riesgos_antiguos['economico']
            },
            {
                'riesgo_vida_universitaria_ciudad': data_riesgos_antiguos['riesgo_vida_universitaria_ciudad'],
                'info_vida_universitaria_ciudad': data_riesgos_antiguos['vida_universitaria_ciudad']
            }
        ]
        # self.get_dimensiones(riesgos)
        id_estudiante_seleccionado = data_riesgos['id_estudiante']
        destinatarios = self.get_usuarios_asignados(
            id_estudiante_seleccionado, data_riesgos['id_modificador'])
        # # # # print(self.get_usuarios_asignados(id_estudiante_seleccionado))
        # # # # print(riesgos)
        estudiante = self.get_data_estudiante(id_estudiante_seleccionado)
        obj_programa = programa_estudiante.objects.filter(
            id_estudiante_id=id_estudiante_seleccionado, traker=True).values().first()
        # # # # print(obj_programa)
        cod_programa = programa.objects.filter(
            id=obj_programa['id_programa_id']).values()
        # # # # # print(cod_programa)
        obj_usuario_creador = user_serializer(
            User.objects.get(id=data_riesgos['id_modificador'])).data
        # # # # # print(obj_usuario_creador)
        if riesgos[0]['riesgo_individual'] == 2 and riesgos_antiguos[0]['riesgo_individual'] != 2 or riesgos[1]['riesgo_familiar'] == 2 and riesgos_antiguos[1]['riesgo_familiar'] != 2 or riesgos[2]['riesgo_academico'] == 2 and riesgos_antiguos[2]['riesgo_academico'] != 2 or riesgos[3]['riesgo_economico'] == 2 and riesgos_antiguos[3]['riesgo_economico'] != 2 or riesgos[4]['riesgo_vida_universitaria_ciudad'] == 2 and riesgos_antiguos[4]['riesgo_vida_universitaria_ciudad'] != 2:
            if riesgos[0]['riesgo_individual'] == 2 or riesgos[1]['riesgo_familiar'] == 2 or riesgos[2]['riesgo_academico'] == 2 or riesgos[3]['riesgo_economico'] == 2 or riesgos[4]['riesgo_vida_universitaria_ciudad'] == 2:
                # # # # # print(id_estudiante)
                cuerpo_correo = render_to_string(
                    'correos/riesgos_editados.html', {'nombre_estudiante': estudiante[0]['nombre'] + "  " + estudiante[0]['apellido'], 'cod_uv_estudiante': estudiante[0]['cod_univalle'], 'cod_carrera': cod_programa[0]['codigo_univalle'], 'correo_estudiante': estudiante[0]['email'], 'dimensiones': self.get_dimensiones(riesgos), 'fecha_seguimiento': data_riesgos['fecha'], 'usuario_envia_correo': obj_usuario_creador['first_name'] + " " + obj_usuario_creador['last_name']})
                asunto = "Uno o más riesgos han pasado a ser de alto nivel: " + \
                    estudiante[0]['nombre'] + "  " + estudiante[0]['apellido']
                EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
                # # # # print("Enviando correo...")
                # # # # print("ENVIANDO A:")
                # # # # print(destinatarios)

                # envío con EmailMessage
                email = EmailMessage(
                    asunto,
                    cuerpo_correo,
                    EMAIL_HOST_USER,
                    # Cambia esto por el correo del destinatario
                    destinatarios
                )
                email.content_subtype = "html"  # Importante para indicar que el contenido es HTML
                email.send()
            else:
                return Response(({"message": "No hay Altos"}))
        else:
            return Response(({"message": "No hay nuevas entradas de alto riesgo"}))
        # # # # print("Correo enviado")
        prueba = "Se editaron correctamente los datos"
        return Response(({"message": "Email sent successfully", }, prueba, status.HTTP_200_OK))


class enviar_codigo_otp_correo_viewsets(ViewSet):

    def create(self, request):
        # # # # print("INICIO DE PROCESO")
        # # # # print(request.data)
        key = random_hex().encode()
        # # # # print(key)
        totp = TOTP(key)
        token = str(totp.token())
        # # # # print(token)
        while len(token) < 6:
            n_key = random_hex().encode()
            totp = TOTP(n_key)
            token = str(totp.token())
            # # # # print(totp)

        # # # # print(totp)
        totp.time = time.time()
        # # # # print(totp.time)
        totp.interval = 300

        otp = totp.token()
        # # # # print(otp)
        user = User.objects.get(id=request.data.get(
            'id'), is_active=True)
        # try:
        #     user = User.objects.get(email=request.data.get('email')).values().first()
        # except:
        #     return Response({'error': 'No se halló un usuario con dicho correo: ' + request.data.get('email')}, status=status.HTTP_400_BAD_REQUEST)

        otp_device = TOTPDevice.objects.create(
            user=user,
            name="OTP-ASES",
            key=totp.token(),
            digits=6,  # Número de dígitos para el OTP
            tolerance=1,
            step=30
        )
        TOTPDevice.objects.filter(user=user).exclude(id=otp_device.id).delete()
        # # # # print(otp_device.key)

        # Generar el OTP actual
        # otp = otp_device.token()
        if request.method == 'POST':
            # email = request.POST.get('email')
            # Generar TOTP con un intervalo de 30 segundos

            EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
            destinatarios = [str(user.email)]
            asunto = "Clave OTP para el Sistema de Información ASES"
            cuerpo_correo = render_to_string(
                'correos/clave_otp.html', {'clave_otp': otp_device.key})

            email = EmailMessage(
                asunto,
                cuerpo_correo,
                EMAIL_HOST_USER,
                # Cambia esto por el correo del destinatario
                destinatarios
            )
            email.content_subtype = "html"  # Importante para indicar que el contenido es HTML
            email.send()

            # Store the OTP and email in session or cache (e.g., Redis)
            request.session['otp'] = otp_device.key

            # # # # print("OTP guardado en la sesión:", request.session['otp'])
            request.session['email'] = user.email
            request.session.modified = True
            return Response(({"message": "Email sent successfully", "otp": otp_device.key}, status.HTTP_200_OK))
        return Response({'error': 'Invalid request'}, status=400)


class verificar_clave_otp_viewsets(ViewSet):
    def create(self, request):

        (IsAuthenticated)
        # # # # print(request.session.items())
        # # # # print("INICIO DE PROCESO")
        # # # # print(request.data)
        otp = request.data.get('otp')
        user = User.objects.get(id=request.data.get(
            'id'), is_active=True)
        email = user.email
        # # # # print("send data:")
        # # # # print(otp)
        # # # # print(email)
        if not otp or not email:
            return Response({'error': 'OTP and email are required'}, status=status.HTTP_400_BAD_REQUEST)

        stored_otp = TOTPDevice.objects.get(user=user).key
        stored_email = request.data.get('email')
        # # # # print("session data:")
        # # # # print(stored_otp)
        # # # # print(stored_email)
        if otp == stored_otp and email == stored_email:
            # Autenticar al usuario y generar token JWT
            totp = TOTP(stored_otp)
            totp.time = datetime.now(timezone.utc).timestamp()
            # # # # print(totp.time)
            otp_time = TOTPDevice.objects.get(user=user).created_at
            actual_time = datetime.now(timezone.utc)
            # # # # print("DIEFERENCIA EN TIEMPO")
            # # # # print(actual_time)
            # # # # print(otp_time)

            if (actual_time - otp_time).seconds < 180:
                refresh = RefreshToken.for_user(user)
                # Ajustar el tiempo de expiración del refresh token
                refresh.set_exp(lifetime=timedelta(minutes=5))

                return Response(status=status.HTTP_200_OK, data={'status': "true",
                                                                 'refresh_otp': str(refresh),
                                                                 'access_otp': str(refresh.access_token),
                                                                 })
            else:
                return Response({'error': 'OTP expired'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # # # # print("Fallo1")
            return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyTokenView(ViewSet):
    def create(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token is None:
            return Response({'detail': 'No token provided'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            # Dividir para eliminar el prefijo 'Bearer '
            UntypedToken(token.split()[1])
            return Response({'detail': 'Token válido'}, status=status.HTTP_200_OK)
        except (InvalidToken, TokenError) as e:
            return Response({'detail': 'Token inválido o expirado'}, status=status.HTTP_401_UNAUTHORIZED)
