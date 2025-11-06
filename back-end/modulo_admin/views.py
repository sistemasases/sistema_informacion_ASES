from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework import viewsets
from rest_framework import generics
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
from django.db import transaction

from modulo_usuario_rol.models import usuario_rol, rol, cohorte_estudiante, estudiante, permiso, rol_permiso, firma_tratamiento_datos
from modulo_programa.models import programa, programa_estudiante, facultad
from modulo_instancia.models import sede, cohorte, semestre
from modulo_asignacion.models import asignacion
from django.shortcuts import get_object_or_404


from django.db.models import Prefetch
from rest_framework.response import Response
from rest_framework import status
from modulo_geografico.models import municipio

# # Create your views here.


class panel_admin_usuario_viewset(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    """
    API endpoint that allows users to be created.
    Revceives: nombre	apellido	correo	clave
    """
    @action(detail=False, methods=['post'], url_path='crear_usuario', permission_classes=[IsAuthenticated])
    def crear_usuario(self, request):
        """
        data = {
            "usuario": "123456789", ## <- debe añadirse en el FRONT
            "nombre": "Juanito",
            "apellido": "Péreza",
            "correo": "juanitopereza@correo.com",
            "contrasenia": "juanito123"
        }
        """

        try:
            new_user = User.objects.create_user(
                password=request.data['user_password'],
                last_login=None,
                is_superuser=False,
                username=request.data['user_username'],
                first_name=request.data['user_first_name'],
                last_name=request.data['user_last_name'],
                email=request.data['user_email'],
                is_staff=False,
                is_active=True,
                date_joined=timezone.now()
            )
            new_user.save()
            return Response({"mensaje": "Usuario creado exitosamente"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    """
    Actualiza un usuario existente.
    """
    @action(detail=False, methods=['post'], url_path='actualizar_usuarios', permission_classes=[IsAuthenticated])
    def actualizar_usuario(self, request, pk=None):
        """
        Recibes:
        {
            "usuario": "123456789", ## <- debe añadirse en el FRONT
            "nombre": "Juanito",
            "apellido": "Péreza",
            "correo": "juanitopereza@correo.com",
            "user_password": "juanito123",
            "rol": ""   ## <-Que recibe? id ? sólo el nombre? ,
            "semestre": "" ## En caso de no existir usuario_rol, se crea uno nuevo
        }
        """

        try:
            user = User.objects.get(id=request.data['id'])
            user.username = request.data['usuario']
            user.first_name = request.data['nombre']
            user.last_name = request.data['apellido']
            user.email = request.data['correo']
            user.is_active = request.data['estado']
            # Obtiene la contraseña si se proporciona
            password = request.data.get('user_password', None)
            if password:
                # Verifica si se ha proporcionado una nueva contraseña y
                # actualiza la contraseña
                user.set_password(request.data['user_password'])
            user.save()
            # return Response({"mensaje": " actualizado exitosamente"})
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # print(str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        """
        Actualizamos el rol del usuario.
        """

        try:
            rol_nombre = request.data.get('rol')
            sede_nombre = request.data.get('sede')
            old_sede_nombre = request.data.get('oldSede')

            if not rol_nombre or rol_nombre == "SIN ROL":
                return Response(
                    {"mensaje": "Usuario sin rol, se actualizaron únicamente los datos del mismo"},
                    status=status.HTTP_200_OK
                )

            # Buscar el rol, sede nueva y sede antigua en bloque
            try:
                rol_obj = rol.objects.get(nombre=rol_nombre)
                nueva_sede_obj = sede.objects.get(nombre=sede_nombre)
                antigua_sede_obj = sede.objects.get(nombre=old_sede_nombre)
            except (rol.DoesNotExist, sede.DoesNotExist):
                return Response(
                    {"error": "Rol o sede no encontrada, intente nuevamente."},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Buscar los semestres activos de ambas sedes
            semestres = semestre.objects.filter(
                semestre_actual=True,
                id_sede__in=[nueva_sede_obj.id, antigua_sede_obj.id]
            ).select_related("id_sede")

            nuevo_semestre_obj = next(
                (s for s in semestres if s.id_sede == nueva_sede_obj), None)
            antiguo_semestre_obj = next(
                (s for s in semestres if s.id_sede == antigua_sede_obj), None)

            if not nuevo_semestre_obj or not antiguo_semestre_obj:
                return Response(
                    {"error": "Semestre actual no encontrado para alguna de las sedes."},
                    status=status.HTTP_404_NOT_FOUND
                )

            # Si el usuario no cambió de sede, evitar actualizaciones innecesarias
            if sede_nombre == old_sede_nombre:
                user_rol, created = usuario_rol.objects.get_or_create(
                    id_usuario=user,
                    id_semestre=nuevo_semestre_obj,
                    defaults={
                        "id_rol": rol_obj,
                        "estado": "ACTIVO",
                        "id_jefe": None
                    }
                )
                if not created:
                    user_rol.id_rol = rol_obj
                    user_rol.estado = "ACTIVO"
                    user_rol.save()

                mensaje = "Usuario y rol actualizado exitosamente" if not created else \
                    "Se ha asignado correctamente el rol al usuario seleccionado"
                return Response({"mensaje": mensaje}, status=status.HTTP_200_OK)

            # Si cambió de sede, actualizar el semestre correspondiente
            user_rol = usuario_rol.objects.filter(
                id_usuario=user,
                id_semestre=antiguo_semestre_obj
            ).first()

            if user_rol:
                user_rol.id_semestre = nuevo_semestre_obj
                user_rol.id_rol = rol_obj
                user_rol.estado = "ACTIVO"
                user_rol.save()
                return Response({"mensaje": "Usuario y rol actualizado exitosamente"}, status=status.HTTP_200_OK)
            else:
                usuario_rol.objects.create(
                    estado="ACTIVO",
                    id_jefe=None,
                    id_rol=rol_obj,
                    id_semestre=nuevo_semestre_obj,
                    id_usuario=user
                )
                return Response({"mensaje": "Se ha asignado correctamente el rol al usuario seleccionado"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    """
    Desactiva un usuario existente y activo en el sistema.
    """
    @action(detail=False, methods=['post'], url_path='desactivar_usuario', permission_classes=[IsAuthenticated])
    def desactivar_usuario(self, request, pk=None):
        """
        Desactiva un usuario existente y activo en el sistema.
        """
        """
        {
            "usuario": "123456789",
        }
        """

        try:
            usuarios_data = request.data  # Lista de diccionarios con clave "usuario"

            if not isinstance(usuarios_data, list) or not usuarios_data:
                return Response({"error": "Debes proporcionar una lista de usuarios válida."}, status=status.HTTP_400_BAD_REQUEST)
            mensajes = []

            with transaction.atomic():
                for item in usuarios_data:
                    username = item.get("usuario")
                    if not username:
                        mensajes.append(
                            {"usuario": None, "error": "Falta el campo 'usuario'"})
                        continue

                    try:
                        user = User.objects.get(username=username)
                        user.is_active = False
                        user.is_staff = False
                        user.is_superuser = False
                        user.save()

                        try:
                            user_rol = usuario_rol.objects.get(
                                id_usuario=user.id)
                            user_rol.estado = "INACTIVO"
                            user_rol.save()
                            mensajes.append(
                                {"usuario": username, "mensaje": "Desactivado exitosamente"})
                        except usuario_rol.DoesNotExist:
                            mensajes.append(
                                {"usuario": username, "error": "No tiene rol asignado"})

                    except User.DoesNotExist:
                        mensajes.append(
                            {"usuario": username, "error": "Usuario no encontrado"})

            return Response(mensajes, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='activar_usuario', permission_classes=[IsAuthenticated])
    def activar_usuario(self, request, pk=None):
        """
        Activa un usuario existente y activo en el sistema.
        """
        """
        {
            "usuario": "123456789",
        }
        """

        try:
            user = User.objects.get(username=request.data['usuario'])
            user.is_active = True
            user.is_staff = False
            user.is_superuser = False
            user.save()
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_rol = usuario_rol.objects.get(id_usuario=user.id)
            user_rol.estado = "ACTIVO"
            user_rol.save()
        except usuario_rol.DoesNotExist:
            return Response({"error": "Usuario no encontrado en la tabla de usuario_rol"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"mensaje": "Usuario activado exitosamente"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='listar_usuarios', permission_classes=[IsAuthenticated])
    def listar_usuarios(self, request):
        """
        Listar todos los usuarios.
        """
        try:
            # Obtener los semestres actuales y sus sedes
            data_semestres = semestre.objects.filter(
                semestre_actual=True
            ).select_related("id_sede").values("id", "id_sede__nombre")

            # Mapeo de id_semestre -> nombre de sede
            sede_por_semestre = {
                item["id"]: item["id_sede__nombre"] for item in data_semestres}

            # Extraer los IDs de los semestres actuales
            ids_semestres = list(sede_por_semestre.keys())

            # Roles activos asociados a esos semestres
            roles_activos = usuario_rol.objects.filter(
                estado="ACTIVO",
                id_semestre__in=ids_semestres
            ).select_related("id_rol", "id_semestre")

            # Diccionario con los roles y sede por usuario
            roles_por_usuario = {
                ur.id_usuario_id: {
                    "rol": ur.id_rol.nombre,
                    "sede": sede_por_semestre.get(ur.id_semestre_id, "SIN SEDE")
                }
                for ur in roles_activos
            }

            # Usuarios del sistema
            users = User.objects.all().only(
                "id", "first_name", "last_name", "email", "username", "is_active"
            )

            # Construir la lista final
            user_list = []
            for user in users:
                datos_usuario = roles_por_usuario.get(
                    user.id, {"rol": "SIN ROL", "sede": "SIN SEDE"})
                user_list.append({
                    "id": user.id,
                    "nombre": user.first_name,
                    "apellido": user.last_name,
                    "correo": user.email,
                    "usuario": user.username,
                    "estado": user.is_active,
                    "rol": datos_usuario["rol"],
                    "sede": datos_usuario["sede"],
                })

            return Response(user_list, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_estudiante_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='listar_estudiantes', permission_classes=[IsAuthenticated])
    def listar_estudiantes(self, request, pk=None):
        """
        Mostrar:
        Tabla Estudiante:  nombre	apellido	codigo	documento	correo
        estudiante
        Otras Tablas:  programas	cohortes
        cohorte_estudiante
        programa_estudiante
        programa

        """
        try:
            # Obtener todos los estudiantes
            estudiantes = estudiante.objects.all().values(
                'id', 'nombre', 'apellido', 'cod_univalle', 'num_doc', 'email', 'estudiante_elegible', 'fecha_nac'
            )
            ids_estudiantes = [e['id'] for e in estudiantes]

            # Obtener todos los programas y cohortes relacionados con esos estudiantes
            programas_estudiantes = programa_estudiante.objects.filter(
                id_estudiante__in=ids_estudiantes
            ).select_related('id_programa').values('id', 'id_estudiante', 'id_programa', 'id_programa__nombre')

            cohortes_estudiantes = cohorte_estudiante.objects.filter(
                id_estudiante__in=ids_estudiantes
            ).select_related('id_cohorte').values('id', 'id_estudiante', 'id_cohorte', 'id_cohorte__id_number')

            # Agrupar programas y cohortes por estudiante
            programas_por_estudiante = {}
            for p in programas_estudiantes:
                programas_por_estudiante.setdefault(p['id_estudiante'], []).append({
                    "id": p['id'],
                    "id_programa": p['id_programa'],
                    "nombre_programa": p['id_programa__nombre']
                })

            cohortes_por_estudiante = {}
            for c in cohortes_estudiantes:
                cohortes_por_estudiante.setdefault(c['id_estudiante'], []).append(
                    {
                        "id": c['id'],
                        "id_cohorte": c['id_cohorte'],
                        "nombre_cohorte": c['id_cohorte__id_number']
                    }
                )

            # Construir respuesta final
            lista_estudiantes = []
            for e in estudiantes:
                lista_estudiantes.append({
                    "id": e['id'],
                    "nombre": e['nombre'],
                    "apellido": e['apellido'],
                    "cod_univalle": e['cod_univalle'],
                    "fecha_nac": e['fecha_nac'],
                    "num_doc": e['num_doc'],
                    "email": e['email'],
                    "estudiante_elegible": e['estudiante_elegible'],
                    "programas": programas_por_estudiante.get(e['id'], []),
                    "cohortes": cohortes_por_estudiante.get(e['id'], [])
                })

            return Response(lista_estudiantes, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_estudiante', permission_classes=[IsAuthenticated])
    def actualizar_estudiante(self, request, pk=None):
        """
        Recibes:
        {
            "id": 12365,
            "nombre": "LEANDRO",
            "apellido": "RODRIGUEZ PEÑA",
            "codigo": "2325028",
            "fecha_nac": "1998-01-01",
            "documento": "1065443727",
            "correo": "leandrorodriguezpea@gmail.com",
            "programas": [
                {
                    "id": 768,
                    "id_programa": 60,
                    "nombre_programa": "BIOLOGÍA"
                },
                {
                    "id": 1534,
                    "id_programa": 60,
                    "nombre_programa": "BIOLOGÍA"
                }
            ],
            "cohortes": [
                {
                    "id": 2242,
                    "id_cohorte": 79,
                    "nombre_cohorte": "X, front"
                },
                {
                    "id": 611,
                    "id_cohorte": 79,
                    "nombre_cohorte": "X, front"
                }
            ]
        }

        """

        try:
            estudiante_obj = estudiante.objects.get(id=request.data['id'])
            estudiante_obj.nombre = request.data['nombre']
            estudiante_obj.apellido = request.data['apellido']
            estudiante_obj.cod_univalle = request.data['cod_univalle']
            estudiante_obj.num_doc = request.data['num_doc']
            estudiante_obj.email = request.data['email']
            estudiante_obj.fecha_nac = request.data['fecha_nac']
            estudiante_obj.estudiante_elegible = request.data['estudiante_elegible']
            estudiante_obj.save()
        except estudiante.DoesNotExist:
            return Response({"error": "Estudiante no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if not request.data.get('programas') or not request.data.get('cohortes'):
                return Response({"mensaje": "No se proporcionaron programas o cohortes para actualizar, Datos básicos actualizados"}, status=status.HTTP_200_OK)
            # Actualizar programas
            for p in request.data['programas']:
                programa_estudiante_obj = get_object_or_404(
                    programa_estudiante, id=p['id'])

                if programa_estudiante_obj.id_programa.id != p['id_programa']:
                    programa_estudiante_obj.id_programa = get_object_or_404(
                        programa, id=p['id_programa'])
                    programa_estudiante_obj.save()

            # Actualizar cohortes
            for c in request.data['cohortes']:
                cohorte_estudiante_obj = get_object_or_404(
                    cohorte_estudiante, id=c['id'])
                # print(cohorte_estudiante_obj.id_cohorte)

                if cohorte_estudiante_obj.id_cohorte.id != c['id_cohorte']:
                    cohorte_estudiante_obj.id_cohorte = get_object_or_404(
                        cohorte, id=c['id_cohorte'])
                    cohorte_estudiante_obj.save()

        except (programa_estudiante.DoesNotExist, cohorte_estudiante.DoesNotExist):
            return Response({"error": "Registro no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"mensaje": "Estudiante actualizado correctamente"})

    @action(detail=False, methods=['post'], url_path='desactivar_estudiante', permission_classes=[IsAuthenticated])
    def desactivar_estudiante(self, request):
        """
        Desactiva un estudiante existente y activo en el sistema.

        Recibes:
        [27435, 10660, 27771]

        """

        try:
            # Lista directa: [27435, 10660, 27771]
            ids_estudiantes = request.data

            if not isinstance(ids_estudiantes, list) or not ids_estudiantes:
                return Response({"error": "Debes enviar una lista de IDs de estudiantes."}, status=status.HTTP_400_BAD_REQUEST)

            resultados = []

            with transaction.atomic():
                for est_id in ids_estudiantes:
                    try:
                        estudiante_obj = estudiante.objects.get(id=est_id)
                        estudiante_obj.estudiante_elegible = False
                        estudiante_obj.save()
                        # resultados.append(
                        #     {"id": est_id, "mensaje": "Estudiante desactivado correctamente"})
                    except estudiante.DoesNotExist:
                        resultados.append(
                            {"id": est_id, "error": "Estudiante no encontrado"})
                        return Response(resultados, status=status.HTTP_404_NOT_FOUND)
            return Response({"mensaje": "Estudiante(s) desactivado(s) correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='activar_estudiante', permission_classes=[IsAuthenticated])
    def activar_estudiante(self, request):
        return Response({"mensaje": "Estudiante activado correctamente"})


class panel_admin_roles_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='listar_roles', permission_classes=[IsAuthenticated])
    def listar_roles(self, request):
        """
        Listar todos los roles.
        """
        try:
            roles = rol.objects.all().values('id', 'nombre', 'descripcion')

            permisos_rol = rol_permiso.objects.select_related(
                'id_permiso').filter(id_rol__in=[r['id'] for r in roles])
            roles = [
                {
                    "id": r['id'],
                    "nombre": r['nombre'],
                    "descripcion": r['descripcion'],
                    "permisos": [rp.id_permiso.nombre for rp in permisos_rol if rp.id_rol.id == r['id']]
                }
                for r in roles
            ]
            # roles = list(roles)
            return Response(roles, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_permisos_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='listar_permisos', permission_classes=[IsAuthenticated])
    def listar_permisos(self, request):
        """
        Listar todos los permisos.
        """

        try:
            permisos = permiso.objects.all().values('id', 'nombre', 'descripcion')
            return Response(list(permisos), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_sedes_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='crear_sede', permission_classes=[IsAuthenticated])
    def crear_sede(self, request):
        """
        Crear una nueva sede.
        Recibes:
        {
            "id_municipio_id": 1,
            "codigo_univalle": "S001",
            "nombre": "Sede Principal"
        }
        """
        try:
            new_sede = sede.objects.create(
                id_municipio_id=request.data['id_municipio_id'],
                codigo_univalle=request.data['codigo_univalle'],
                nombre=request.data['nombre']
            )
            new_sede.save()
            return Response({"mensaje": "Sede creada exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='listar_sedes', permission_classes=[IsAuthenticated])
    def listar_sedes(self, request):
        """
        Listar todas las sedes.
        """
        try:
            sedes = sede.objects.all().values(
                'id', 'id_municipio_id', 'codigo_univalle', 'nombre')

            sedes_municipios = sede.objects.select_related(
                'id_municipio').filter(id__in=[s['id'] for s in sedes])
            sedes = [
                {
                    "id": s['id'],
                    "codigo_univalle": s['codigo_univalle'],
                    "nombre": s['nombre'],
                    "id_municipio": s['id_municipio_id'],
                    "municipio": sedes_municipios.get(id=s['id']).id_municipio.nombre if sedes_municipios else None
                }
                for s in sedes
            ]
            return Response(list(sedes), status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_sede', permission_classes=[IsAuthenticated])
    def actualizar_sede(self, request):
        """
        Actualizar una sede existente.
        Recibes:
        {
            "id": 1,
            "id_municipio": 1,
            "codigo_univalle": "S001",
            "nombre": "Sede Principal Actualizada"
        }
        """

        try:
            sede_obj = sede.objects.get(id=request.data['id'])
            sede_obj.id_municipio_id = request.data['id_municipio']
            sede_obj.codigo_univalle = request.data['codigo_univalle']
            sede_obj.nombre = request.data['nombre']
            sede_obj.save()
            return Response({"mensaje": "Sede actualizada exitosamente"}, status=status.HTTP_200_OK)
        except sede.DoesNotExist:
            return Response({"error": "Sede no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # @action(detail=False, methods=['post'], url_path='desactivar_sede', permission_classes=[IsAuthenticated])
    # def desactivar_sede(self, request):
    #     """
    #     Desactivar una sede existente.
    #     Recibes:
    #     {
    #         "id": 1
    #     }
    #     """
    #     try:
    #         sede_obj = sede.objects.get(id=request.data['id'])
    #         sede_obj.is_active = False
    #         sede_obj.save()
    #         return Response({"mensaje": "Sede desactivada exitosamente"}, status=status.HTTP_200_OK)
    #     except sede.DoesNotExist:
    #         return Response({"error": "Sede no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='listar_municipios', permission_classes=[IsAuthenticated])
    def listar_municipios(self, request):
        lista_municipios = municipio.objects.all().order_by(
            'nombre').values()  # Ordena por el campo 'nombre'
        return Response(lista_municipios, status=status.HTTP_200_OK)


class panel_admin_cohortes_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='crear_cohorte', permission_classes=[IsAuthenticated])
    def crear_cohorte(self, request):
        """
        Crear una nueva cohorte.
        Recibes:
        {
            "id_number": "Cohorte 2023-1",
            "nombre": "Cohorte 2028-1",
            "tiempo_creacion_": "2023-01-01 00:00:00",
            "tiempo_modificacion_": "2023-01-01 00:00:00",
        }
        """
        try:
            new_cohorte = cohorte.objects.create(
                id_number=request.data['id_number'],
                nombre=request.data['nombre'],
                tiempo_creacion=datetime.now(),
                tiempo_modificacion=datetime.now(),
            )
            new_cohorte.save()
            return Response({"mensaje": "Cohorte creada exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='listar_cohortes', permission_classes=[IsAuthenticated])
    def listar_cohortes(self, request):
        """
        Listar todas las cohortes.
        """
        try:
            cohortes = cohorte.objects.all().values()

            return Response(list(cohortes), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_cohorte', permission_classes=[IsAuthenticated])
    def actualizar_cohorte(self, request):
        """
        Actualizar una cohorte existente.
        Recibes:
        {
            "id": 91,
            "id_number": "Cohorte 2023-1 Actualizada",
            "nombre": "Cohorte 2028-1 Actualizada",
            "tiempo_creacion_": "2023-01-01 00:00:00",
            "tiempo_modificacion_": "2023-01-01 00:00:00"
        }
        """
        try:
            cohorte_obj = cohorte.objects.get(id=request.data['id'])
            cohorte_obj.id_number = request.data['id_number']
            cohorte_obj.nombre = request.data['nombre']
            # cohorte_obj.tiempo_creacion = request.data['tiempo_creacion_']
            # Actualiza la fecha de modificación a ahora
            cohorte_obj.tiempo_modificacion = timezone.now()
            cohorte_obj.save()
            return Response({"mensaje": "Cohorte actualizada exitosamente"}, status=status.HTTP_200_OK)
        except cohorte.DoesNotExist:
            return Response({"error": "Cohorte no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_facultades_viewset(viewsets.ViewSet):

    @action(detail=False, methods=['post'], url_path='crear_facultad', permission_classes=[IsAuthenticated])
    def crear_facultad(self, request):
        """
        Crear una nueva facultad.
        Recibes:
        {
            "codigo_univalle": "F001",
            "nombre": "Facultad de Ciencias"
        }
        """

        try:
            new_facultad = facultad.objects.create(
                codigo_univalle=request.data['codigo_univalle'],
                nombre=request.data['nombre']
            )
            new_facultad.save()
            return Response({"mensaje": "Facultad creada exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='listar_facultades', permission_classes=[IsAuthenticated])
    def listar_facultades(self, request):
        """
        Listar todas las facultades.
        """
        try:
            facultades = facultad.objects.all().values()
            return Response(list(facultades), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_facultad', permission_classes=[IsAuthenticated])
    def actualizar_facultad(self, request):
        """
        Actualizar una facultad existente.
        Recibes:
        {
            "id": 14,
            "codigo_univalle": "F1",
            "nombre": "Facultad de PRUEBA"
        }
        """
        try:
            facultad_obj = facultad.objects.get(id=request.data['id'])
            facultad_obj.codigo_univalle = request.data['codigo_univalle']
            facultad_obj.nombre = request.data['nombre']
            facultad_obj.save()
            return Response({"mensaje": "Facultad actualizada exitosamente"}, status=status.HTTP_200_OK)
        except facultad.DoesNotExist:
            return Response({"error": "Facultad no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_asignaciones_viewset(viewsets.ViewSet):
    """
    ViewSet para gestionar asignaciones de monitores a estudiantes.
    """

    @action(detail=False, methods=['post'], url_path='listar_asignaciones_estudiantes',
            permission_classes=[IsAuthenticated]
            )
    def listar_asignaciones_estudiantes(self, request):
        """
        Listar todas las asignaciones de monitores a estudiantes.
        """
        try:
            estudiantes = estudiante.objects.filter(estudiante_elegible=True).values('id', 'nombre', 'apellido',
                                                                                     'cod_univalle', 'num_doc', 'estudiante_elegible')
            ids_estudiantes = [e['id'] for e in estudiantes]

            asignaciones_data = asignacion.objects.filter(
                id_estudiante__in=ids_estudiantes
            ).select_related('id', 'id_usuario', 'id_usuario__first_name', 'id_usuario__last_name', 'id_usuario__email').values(
                'id', 'id_estudiante', 'id_usuario_id', 'id_usuario__first_name', 'id_usuario__last_name', 'id_usuario__email', 'estado', 'id_semestre_id'
            )

            lista_asignaciones = []
            for e in estudiantes:
                lista_asignaciones.append({
                    "id_estudiante": e['id'],
                    "nombre": e['nombre'],
                    "apellido": e['apellido'],
                    "cod_univalle": e['cod_univalle'],
                    "num_doc": e['num_doc'],
                    "estudiante_elegible": e['estudiante_elegible'],
                    "asignaciones": [
                        {
                            "id": a['id'],
                            "id_usuario": a['id_usuario_id'],
                            "nombre_monitor": a['id_usuario__first_name'] + ' ' + a['id_usuario__last_name'],
                            "correo_monitor": a['id_usuario__email'],
                            "estado": a['estado'],
                            "semestre": a['id_semestre_id']
                        } for a in asignaciones_data if a['id_estudiante'] == e['id']
                    ]
                })

            return Response(lista_asignaciones, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_asignacion', permission_classes=[IsAuthenticated])
    def actualizar_asignacion(self, request):
        """
        Actualizar una asignación de monitor a estudiante.
        Recibes:

        {
        "id":8478,                                                  ## ID de la asignación
        "id_usuario":243413,                                        ## ID del monitor (usuario)
        "nombre_monitor":"HENRY ESTEBAN PINEDA TORRES",             ## Nombre del monitor
        "correo_monitor":"henry.pineda@correounivalle.edu.co",      ## Correo del monitor
        "estado":true,                                              ## Estado de la asignación (ACTIVO/INACTIVO)      
        "semestre":"61"                                             ## ID del semestre al que pertenece la asignación                      
        }

        """
        try:
            asignacion_obj = asignacion.objects.get(id=request.data['id'])
            # asignacion_obj.id_estudiante_id = request.data['id_estudiante']
            # asignacion_obj.id_usuario_id = request.data['id_usuario']
            asignacion_obj.estado = request.data['estado']
            asignacion_obj.id_semestre_id = request.data['semestre']
            asignacion_obj.save()
            return Response({"mensaje": "Asignación actualizada exitosamente"}, status=status.HTTP_200_OK)
        except asignacion.DoesNotExist:
            return Response({"error": "Asignación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='eliminar_asignacion', permission_classes=[IsAuthenticated])
    def eliminar_asignacion(self, request):
        """
        Eliminar una asignación de monitor a estudiante.
        Recibes:
        {
            "id": 123
        }
        """
        try:
            asignacion_obj = asignacion.objects.get(id=request.data['id'])
            asignacion_obj.delete()
            return Response({"mensaje": "Asignación eliminada exitosamente"}, status=status.HTTP_200_OK)
        except asignacion.DoesNotExist:
            return Response({"error": "Asignación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_asignaciones_monitores_viewset(viewsets.ViewSet):
    """
    ViewSet para gestionar asignaciones de monitores a estudiantes.
    """

    @action(detail=False, methods=['post'], url_path='listar_asignaciones_monitores',
            permission_classes=[IsAuthenticated]
            )
    def listar_asignaciones_monitores(self, request):
        """
        Listar todas las asignaciones de monitores a estudiantes.
        """

        monitores = usuario_rol.objects.filter(
            id_rol__id=5,  # ID del rol de monitor
            estado="ACTIVO",
        ).values('id_usuario', 'id_usuario__username', 'id_usuario__first_name', 'id_usuario__last_name', 'id_usuario__email')

        ids_monitores = [m['id_usuario'] for m in monitores]

        asignaciones_data = asignacion.objects.filter(
            id_usuario__in=ids_monitores
        ).select_related('id', 'id_estudiante', 'id_estudiante__nombre', 'id_estudiante__apellido', 'id_estudiante__cod_univalle',
                         'id_estudiante__num_doc', 'id_estudiante__estudiante_elegible').values(
            'id', 'id_estudiante_id', 'id_estudiante__nombre', 'id_estudiante__apellido',
            'id_estudiante__cod_univalle', 'id_estudiante__num_doc', 'id_estudiante__estudiante_elegible',
            'id_usuario_id', 'estado', 'id_semestre_id'
        )

        lista_asignaciones_monitor = []
        for m in monitores:
            lista_asignaciones_monitor.append({
                "id_monitor": m['id_usuario'],
                "usuario_monitor": m['id_usuario__username'],
                "nombre_monitor": m['id_usuario__first_name'] + ' ' + m['id_usuario__last_name'],
                "correo_monitor": m['id_usuario__email'],
                "asignaciones": [
                    {
                        "id": a['id'],
                        "id_estudiante": a['id_estudiante_id'],
                        "nombre_estudiante": a['id_estudiante__nombre'],
                        "apellido_estudiante": a['id_estudiante__apellido'],
                        "cod_univalle_estudiante": a['id_estudiante__cod_univalle'],
                        "num_doc_estudiante": a['id_estudiante__num_doc'],
                        "estudiante_elegible": a['id_estudiante__estudiante_elegible'],
                        "estado": a['estado'],
                        "semestre": a['id_semestre_id']
                    } for a in asignaciones_data if a['id_usuario_id'] == m['id_usuario']
                ]
            })

        return Response(lista_asignaciones_monitor, status=status.HTTP_200_OK)
        # return Response({"mensaje": "Listar asignaciones de monitores a estudiantes"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='eliminar_asignacion_monitores',
            permission_classes=[IsAuthenticated]
            )
    def eliminar_asignacion_monitores(self, request):
        """
        Eliminar una asignación de monitor a estudiante.
        Recibes:
        {
            "id": 123
        }
        """
        try:
            asignacion_obj = asignacion.objects.get(id=request.data['id'])
            asignacion_obj.delete()
            return Response({"mensaje": "Asignación eliminada exitosamente"}, status=status.HTTP_200_OK)
        except asignacion.DoesNotExist:
            return Response({"error": "Asignación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_asignacion_monitores', permission_classes=[IsAuthenticated])
    def actualizar_asignacion_monitores(self, request):
        """
        Recibes:
        {
            'id': 4635, 
            'id_estudiante': 27302, 
            'nombre_estudiante': 'DUBAN CAMILO', 
            'apellido_estudiante': 'LOPEZ PARDO', 
            'cod_univalle_estudiante': '2422482', 
            'num_doc_estudiante': 1086133642, 
            'estudiante_elegible': True, 
            'estado': True, 
            'semestre': 40
        }
        """

        try:
            asignacion_obj = asignacion.objects.get(id=request.data['id'])
            asignacion_obj.estado = request.data['estado']
            asignacion_obj.id_semestre_id = request.data['semestre']
            asignacion_obj.save()
        except asignacion.DoesNotExist:
            return Response({"error": "Asignación no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"mensaje": "Actualizar asignación de monitores a estudiantes"}, status=status.HTTP_200_OK)


class panel_admin_programas_viewset(viewsets.ViewSet):
    """
    ViewSet para gestionar programas académicos.
    """

    @action(detail=False, methods=['post'], url_path='listar_programas',
            permission_classes=[IsAuthenticated]
            )
    def listar_programas(self, request):
        """
        Listar todos los programas académicos.
        """
        try:
            programas = programa.objects.all().select_related('id_facultad',
                                                              'id_sede').values('id', 'codigo_snies', 'codigo_univalle', 'nombre', 'jornada',
                                                                                'id_facultad_id', 'id_facultad_id__nombre',
                                                                                'id_facultad_id__codigo_univalle', 'id_sede_id',
                                                                                'id_sede_id__codigo_univalle', 'id_sede_id__nombre',
                                                                                'id_sede_id__id_municipio_id__nombre')

            lista_programas = []

            for p in programas:
                lista_programas.append({
                    "id": p['id'],
                    "codigo_snies": p['codigo_snies'],
                    "codigo_univalle": p['codigo_univalle'],
                    "nombre": p['nombre'],
                    "jornada": p['jornada'],
                    "id_facultad": p['id_facultad_id'],
                    "nombre_facultad": p['id_facultad_id__nombre'],
                    "codigo_univalle_facultad": p['id_facultad_id__codigo_univalle'],
                    "id_sede": p['id_sede_id'],
                    "nombre_sede": p['id_sede_id__nombre'],
                    "codigo_univalle_sede": p['id_sede_id__codigo_univalle'],
                    "municipio_sede": p['id_sede_id__id_municipio_id__nombre']
                })

            return Response(lista_programas, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_programa',
            permission_classes=[IsAuthenticated]
            )
    def actualizar_programa(self, request):
        """
        Actualizar un programa académico.
        """
        try:
            programa_obj = programa.objects.get(id=request.data['id'])
            programa_obj.codigo_snies = request.data['codigo_snies']
            programa_obj.codigo_univalle = request.data['codigo_univalle']
            programa_obj.nombre = request.data['nombre']
            programa_obj.jornada = request.data['jornada']
            programa_obj.id_facultad_id = request.data['id_facultad']
            programa_obj.id_sede_id = request.data['id_sede']
            programa_obj.save()
        except programa.DoesNotExist:
            return Response({"error": "Programa no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"mensaje": "Programa actualizado correctamente"}, status=status.HTTP_200_OK)


class panel_admin_semestres_viewset(viewsets.ViewSet):
    """
    ViewSet para gestionar semestres académicos.
    """

    @action(detail=False, methods=['post'], url_path='listar_semestres',
            permission_classes=[IsAuthenticated]
            )
    def listar_semestres(self, request):
        """
        Listar todos los semestres académicos.
        """
        try:
            semestres = semestre.objects.all().select_related('id_sede_id').values('id', 'nombre',
                                                                                   'fecha_inicio', 'fecha_fin', 'semestre_actual', 'estado', 'id_sede_id', 'id_sede_id__nombre',)
            return Response(list(semestres), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_semestre',
            permission_classes=[IsAuthenticated]
            )
    def actualizar_semestre(self, request):
        """
        Actualizar un semestre académico.
        """
        try:
            semestre_obj = semestre.objects.get(id=request.data['id'])
            semestre_obj.nombre = request.data['nombre']
            semestre_obj.fecha_inicio = request.data['fecha_inicio']
            semestre_obj.fecha_fin = request.data['fecha_fin']
            semestre_obj.semestre_actual = request.data['semestre_actual']
            semestre_obj.id_sede_id = request.data['id_sede_id']
            semestre_obj.save()
        except semestre.DoesNotExist:
            return Response({"error": "Semestre no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"mensaje": "Semestre actualizado correctamente"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='crear_semestre',
            permission_classes=[IsAuthenticated]
            )
    def crear_semestre(self, request):
        """
        Crear un nuevo semestre académico.
        Recibes:
        {
            "nombre": "Semestre 2023-1",
            "fecha_inicio": "2023-01-01",
            "fecha_fin": "2023-06-30",
            "semestre_actual": true,
            "id_sede_id": 1
        }
        """
        try:
            new_semestre = semestre.objects.create(
                nombre=request.data['nombre'],
                fecha_inicio=request.data['fecha_inicio'],
                fecha_fin=request.data['fecha_fin'],
                semestre_actual=request.data['semestre_actual'],
                id_sede_id=request.data['id_sede_id']
            )
            new_semestre.save()
            return Response({"mensaje": "Semestre creado exitosamente"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class panel_admin_firma_tratamiento_viewset(viewsets.ViewSet):
    """
    ViewSet para gestionar la firma de tratamiento de datos.
    """

    @action(detail=False, methods=['post'], url_path='listar_firmas',
            permission_classes=[IsAuthenticated]
            )
    def listar_firmas(self, request):
        """
        Listar todas las firmas de tratamiento de datos.
        """
        try:
            firmas = firma_tratamiento_datos.objects.all().select_related('id_estudiante').values('id', 'id_estudiante_id',
                                                                                                  'id_estudiante__nombre', 'id_estudiante__apellido',
                                                                                                  'id_estudiante__cod_univalle',
                                                                                                  'id_estudiante__num_doc',
                                                                                                  'fecha_firma', 'nombre_firma', 'correo_firma',
                                                                                                  'autoriza_tratamiento_datos', 'autoriza_tratamiento_imagen',
                                                                                                  )
            data = [
                {
                    "id": f["id"],
                    "id_estudiante": f["id_estudiante_id"],
                    "nombre_estudiante": f["id_estudiante__nombre"],
                    "apellido_estudiante": f["id_estudiante__apellido"],
                    "codigo_univalle": f["id_estudiante__cod_univalle"],
                    "num_doc": f["id_estudiante__num_doc"],
                    "fecha_firma": f["fecha_firma"],
                    "nombre_firma": f["nombre_firma"],
                    "correo_firma": f["correo_firma"],
                    "autoriza_tratamiento_datos": f["autoriza_tratamiento_datos"],
                    "autoriza_tratamiento_imagen": f["autoriza_tratamiento_imagen"],
                }
                for f in firmas
            ]

            return Response(list(data), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='actualizar_tratamiento',
            permission_classes=[IsAuthenticated]
            )
    def actualizar_tratamiento(self, request):
        """
        Actualizar la firma de tratamiento de datos de un estudiante.
        Recibes:
        {
            "id": 1,
            "id_estudiante": 1,
            "autoriza_tratamiento_datos": false,
            "autoriza_tratamiento_imagen": true
        }
        """
        try:
            firma_obj = firma_tratamiento_datos.objects.get(
                id=request.data['id'], id_estudiante=request.data['id_estudiante'])
            firma_obj.autoriza_tratamiento_datos = request.data['autoriza_tratamiento_datos']
            firma_obj.autoriza_tratamiento_imagen = request.data['autoriza_tratamiento_imagen']
            firma_obj.save()
        except firma_tratamiento_datos.DoesNotExist:
            return Response({"error": "Firma no encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"mensaje": "Firma de tratamiento de datos actualizada correctamente"}, status=status.HTTP_200_OK)
