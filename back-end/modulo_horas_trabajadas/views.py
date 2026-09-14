from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import RegistroHoras, TemporadaTrabajo
from django.contrib.auth.models import User
from .serializers import RegistroHorasSerializer, TemporadaTrabajoSerializer
from django.core.exceptions import ValidationError as DjangoValidationError
from modulo_usuario_rol.models import usuario_rol
from modulo_instancia.models import semestre
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from collections import defaultdict
import datetime
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP


class registros_horas_viewset(viewsets.GenericViewSet):
    """Viewset para gestionar los registros de horas trabajadas.

    Endpoints:
        POST   /registrar_horas/crear_registro/             - Crear un registro.
        POST   /registrar_horas/by_trabajador/              - Registros de un trabajador.
        PATCH  /registrar_horas/<pk>/actualizar_registro/   - Actualizar un registro.
        DELETE /registrar_horas/<pk>/eliminar_registro/     - Eliminar un registro.
        GET    /registrar_horas/<pk>/get_info_profesional/  - Resumen de subordinados.
    """

    queryset = RegistroHoras.objects.all()
    serializer_class = RegistroHorasSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='crear_registro')
    def crear_registro(self, request):
        """Crea un nuevo registro de horas para un trabajador.

        Valida que la fecha esté dentro del rango del semestre recibido y que
        el trabajador tenga un rol activo. El rol y las horas trabajadas se
        asignan automáticamente.

        Args:
            request: Petición POST con los campos:
                trabajador (int): ID del usuario.
                semestre (int): ID del semestre vigente.
                fecha (str): Fecha del registro en formato YYYY-MM-DD.
                hora_inicio (str): Hora de inicio en formato HH:MM.
                hora_fin (str): Hora de fin en formato HH:MM.
                descripcion (str): Descripción de la actividad.

        Returns:
            Response: 201 con el registro creado.
                400 si los datos son inválidos, el semestre no existe o no llega,
                la fecha está fuera de rango, o el trabajador no tiene rol activo.
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            trabajador = serializer.validated_data.get('trabajador')
            fecha = serializer.validated_data.get('fecha')

            semestre_id = request.data.get('semestre')
            if not semestre_id:
                return Response(
                    {"error": "Se requiere el ID del semestre."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            semestre_obj = semestre.objects.filter(id=semestre_id).first()
            if semestre_obj is None:
                return Response(
                    {"error": "El semestre indicado no existe."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            fecha_inicio = semestre_obj.fecha_inicio.date()
            fecha_fin = semestre_obj.fecha_fin.date()

            if not (fecha_inicio <= fecha <= fecha_fin):
                return Response(
                    {
                        "error": (
                            f"La fecha {fecha} está fuera del rango del semestre actual "
                            f"({fecha_inicio} - {fecha_fin})."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            rol_usuario = usuario_rol.objects.filter(
                id_usuario=trabajador,
                estado="ACTIVO"
            ).first()

            if rol_usuario is None:
                return Response(
                    {"error": "El trabajador no tiene un rol activo asignado."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(rol=rol_usuario)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='by_trabajador')
    def get_by_id(self, request):
        """Retorna todos los registros de horas de un trabajador en un semestre.

        Args:
            request: Petición POST con los campos:
                trabajador (int): ID del usuario.
                semestre (int): ID del semestre.

        Returns:
            Response: 200 con un objeto que contiene:
                registros (list): Lista de registros de horas del semestre.
                nombre_trabajador (str): Nombre completo del trabajador.
                total_horas (float): Suma de horas trabajadas en el semestre.
                temporada (dict | None): Datos de la TemporadaTrabajo si existe,
                    None en caso contrario.
                400 si faltan campos obligatorios.
                404 si el trabajador o el semestre no existen.
        """
        trabajador_id = request.data.get('trabajador')
        semestre_id = request.data.get('semestre')

        trabajador_registro = get_object_or_404(User, pk=trabajador_id)
        nombre_completo = (
            trabajador_registro.first_name + " " + trabajador_registro.last_name
        )

        semestre_actual = get_object_or_404(semestre, id=semestre_id)
        fecha_inicio = semestre_actual.fecha_inicio.date()

        registros_filtrados = RegistroHoras.objects.select_related(
            'rol',
            'rol__id_rol'
        ).filter(
            trabajador=trabajador_id,
            fecha__gt=fecha_inicio
        )

        registros_list = list(registros_filtrados)
        serializer = self.get_serializer(registros_list, many=True)

        total_horas = sum(float(r.horas_trabajadas) for r in registros_list)

        ahora = datetime.datetime.now()
        horas_actuales = sum(
            float(r.horas_trabajadas)
            for r in registros_list
            if datetime.datetime.combine(r.fecha, r.hora_fin) <= ahora
        )

        temporada_obj = TemporadaTrabajo.objects.filter(
            trabajador_id=trabajador_id,
            semestre=semestre_actual
        ).first()

        temporada_data = None
        if temporada_obj:
            temporada_data = {
                "id": temporada_obj.id,
                "fecha_inicio": str(temporada_obj.fecha_inicio),
                "fecha_fin": str(temporada_obj.fecha_fin) if temporada_obj.fecha_fin else None,
                "horas_semanales": temporada_obj.horas_semanales,
                "horas_total_contratadas": str(temporada_obj.horas_total_contratadas),
                "total_festivos_temporada": temporada_obj.total_festivos_temporada,
                "precio_hora": temporada_obj.precio_hora,
                "is_default": temporada_obj.is_default,
                "semestre": semestre_actual.nombre,
            }

        return Response({
            "registros": serializer.data,
            "nombre_trabajador": nombre_completo,
            "total_horas": total_horas,
            "horas_actuales": horas_actuales,
            "temporada": temporada_data,
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'], url_path='actualizar_registro')
    def actualizar_registro(self, request, pk=None):
        """Actualiza parcialmente un registro de horas existente.

        Valida que la fecha resultante esté dentro del rango del semestre recibido.
        El rol se recalcula si el trabajador cambia.

        Args:
            request: Petición PATCH con cualquier subconjunto de los campos:
                semestre (int): ID del semestre vigente (obligatorio).
                fecha (str): Nueva fecha del registro en formato YYYY-MM-DD.
                hora_inicio (str): Nueva hora de inicio en formato HH:MM.
                hora_fin (str): Nueva hora de fin en formato HH:MM.
                descripcion (str): Nueva descripción de la actividad.
            pk (int): ID del registro a actualizar.

        Returns:
            Response: 200 con el registro actualizado.
                400 si los datos son inválidos, el semestre no existe o no llega,
                la fecha está fuera de rango, o el trabajador no tiene rol activo.
                404 si el registro no existe.
        """
        registro = get_object_or_404(RegistroHoras, pk=pk)
        serializer = self.get_serializer(registro, data=request.data, partial=True)

        if serializer.is_valid():
            fecha = serializer.validated_data.get('fecha', registro.fecha)

            semestre_id = request.data.get('semestre')
            if not semestre_id:
                return Response(
                    {"error": "Se requiere el ID del semestre."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            semestre_obj = semestre.objects.filter(id=semestre_id).first()
            if semestre_obj is None:
                return Response(
                    {"error": "El semestre indicado no existe."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            fecha_inicio = semestre_obj.fecha_inicio.date()
            fecha_fin = semestre_obj.fecha_fin.date()

            if not (fecha_inicio <= fecha <= fecha_fin):
                return Response(
                    {
                        "error": (
                            f"La fecha {fecha} está fuera del rango del semestre actual "
                            f"({fecha_inicio} - {fecha_fin})."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            trabajador = serializer.validated_data.get('trabajador', registro.trabajador)

            rol_usuario = usuario_rol.objects.filter(
                id_usuario=trabajador,
                estado="ACTIVO"
            ).first()

            if rol_usuario is None:
                return Response(
                    {"error": "El trabajador no tiene un rol activo asignado."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(rol=rol_usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='eliminar_registro')
    def eliminar_registro(self, request, pk=None):
        """Elimina un registro de horas por su ID.

        Args:
            request: Petición DELETE.
            pk (int): ID del registro a eliminar.

        Returns:
            Response: 200 con mensaje de confirmación.
                404 si el registro no existe.
        """
        registro = get_object_or_404(RegistroHoras, pk=pk)
        registro.delete()
        return Response(
            {"message": "Registro eliminado correctamente."},
            status=status.HTTP_200_OK
        )

    @action(detail=True, methods=['get'], url_path='get_info_profesional')
    def obtener_registros_profesional(self, request, pk=None):
        """Retorna el resumen de horas de todos los subordinados directos e indirectos.

        Incluye trabajadores sin registros. Si algún subordinado no tiene
        TemporadaTrabajo para el semestre indicado, se crea una con valores por defecto
        (20 h/semana, $10 000/hora).

        Args:
            request: Petición GET del usuario profesional autenticado.
                Query params:
                    semestre (int): ID del semestre (obligatorio).
                    dias_festivos (int): Número de festivos del semestre (por defecto 0).
            pk (int): ID del profesional autenticado (usa request.user internamente).

        Returns:
            Response: 200 con lista de objetos, uno por subordinado, cada uno con:
                trabajador_id (int): ID del trabajador.
                nombre (str): Nombre completo.
                temporada (dict | None): Datos de la TemporadaTrabajo.
                registros (list): Registros de horas del semestre.
                horasTotal (float): Suma de horas trabajadas.
                400 si no se envía semestre_id.
                404 si el semestre no existe.
                500 ante cualquier error inesperado.
        """
        semestre_id = request.query_params.get('semestre', None)
        num_festivos = int(request.query_params.get('dias_festivos', 0) or 0)

        try:
            # ── subordinados via usuario_rol (incluye los sin horas) ──
            ids_nivel1 = list(
                usuario_rol.objects.filter(
                    id_jefe=request.user,
                    estado="ACTIVO"
                ).values_list('id_usuario_id', flat=True)
            )

            if not ids_nivel1:
                return Response([], status=status.HTTP_200_OK)

            ids_nivel2 = list(
                usuario_rol.objects.filter(
                    id_jefe__in=ids_nivel1,
                    estado="ACTIVO"
                ).values_list('id_usuario_id', flat=True)
            )

            trabajadores_ids = list(set(ids_nivel1 + ids_nivel2))

            # ── semestre ──────────────────────────────────────────────
            if not semestre_id:
                return Response(
                    {"error": "Se requiere el ID del semestre."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            semestre_obj = get_object_or_404(semestre, id=semestre_id)

            fecha_inicio = semestre_obj.fecha_inicio.date()
            fecha_fin    = semestre_obj.fecha_fin.date()

            # ── calcular horas_total_contratadas por defecto ──────────
            dias_habiles = sum(
                1 for i in range((fecha_fin - fecha_inicio).days)
                if (fecha_inicio + datetime.timedelta(days=i)).weekday() < 5
            )
            dias_habiles -= num_festivos
            semanas_reales = dias_habiles / 5
            horas_total_default = round(semanas_reales * 20, 1)

            # ── bulk_create de temporadas faltantes ───────────────────
            ids_con_temporada = set(
                TemporadaTrabajo.objects.filter(
                    trabajador_id__in=trabajadores_ids,
                    semestre=semestre_obj
                ).values_list('trabajador_id', flat=True)
            )

            ids_sin_temporada = [id for id in trabajadores_ids if id not in ids_con_temporada]

            if ids_sin_temporada:
                TemporadaTrabajo.objects.bulk_create([
                    TemporadaTrabajo(
                        trabajador_id=trabajador_id,
                        semestre=semestre_obj,
                        horas_semanales=20,
                        horas_total_contratadas=horas_total_default,
                        total_festivos_temporada=num_festivos,
                        fecha_inicio=fecha_inicio,
                        fecha_fin=fecha_fin,
                        precio_hora=10000,
                        is_default=True,
                    )
                    for trabajador_id in ids_sin_temporada
                ])

            # ── traer TODAS las temporadas en una sola query ──────────
            temporadas_map = {
                t.trabajador_id: t
                for t in TemporadaTrabajo.objects.select_related('semestre').filter(
                    trabajador_id__in=trabajadores_ids,
                    semestre=semestre_obj
                )
            }

            # ── traer TODOS los usuarios en una sola query ────────────
            usuarios_map = {
                u.id: u
                for u in User.objects.filter(id__in=trabajadores_ids)
            }

            # ── traer TODOS los registros en una sola query y agrupar en memoria ──
            registros_por_trabajador = defaultdict(list)
            horas_por_trabajador = defaultdict(float)
            horas_actuales_por_trabajador = defaultdict(float)
            ahora = datetime.datetime.now()
            for r in RegistroHoras.objects.select_related('rol', 'rol__id_rol').filter(
                trabajador__in=trabajadores_ids,
                fecha__gte=fecha_inicio
            ):
                registros_por_trabajador[r.trabajador_id].append(r)
                horas_por_trabajador[r.trabajador_id] += float(r.horas_trabajadas)
                if datetime.datetime.combine(r.fecha, r.hora_fin) <= ahora:
                    horas_actuales_por_trabajador[r.trabajador_id] += float(r.horas_trabajadas)

            # ── armar respuesta ───────────────────────────────────────
            subordinados_info = []

            for trabajador_id in trabajadores_ids:
                regs = registros_por_trabajador.get(trabajador_id, [])
                serializer = self.get_serializer(regs, many=True)
                total_horas = horas_por_trabajador.get(trabajador_id, 0.0)

                user = usuarios_map.get(trabajador_id)
                nombre_completo = f"{user.first_name} {user.last_name}".strip() if user else str(trabajador_id)

                temporada = temporadas_map.get(trabajador_id)
                temporada_data = {
                    "id": temporada.id,
                    "fecha_inicio": temporada.fecha_inicio,
                    "fecha_fin": temporada.fecha_fin,
                    "horas_semanales": temporada.horas_semanales,
                    "horas_total_contratadas": temporada.horas_total_contratadas,
                    "total_festivos_temporada": temporada.total_festivos_temporada,
                    "precio_hora": temporada.precio_hora,
                    "is_default": temporada.is_default,
                    "semestre": semestre_obj.nombre,
                } if temporada else None

                subordinados_info.append({
                    "trabajador_id": trabajador_id,
                    "nombre": nombre_completo,
                    "temporada": temporada_data,
                    "registros": serializer.data,
                    "horasTotal": total_horas,
                    "horasActuales": horas_actuales_por_trabajador.get(trabajador_id, 0.0),
                })

            return Response(subordinados_info, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class temporada_trabajo_viewset(viewsets.GenericViewSet):
    """Viewset para gestionar las temporadas de trabajo (contratos por semestre).

    Endpoints:
        POST   /registrar_temporada_trabajo/crear_temporada/           - Crear temporada.
        PATCH  /registrar_temporada_trabajo/<pk>/actualizar_temporada/ - Actualizar temporada.
    """

    queryset = TemporadaTrabajo.objects.all()
    serializer_class = TemporadaTrabajoSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='crear_temporada')
    def crear_temporada(self, request):
        """Crea una temporada de trabajo para un trabajador en un semestre.

        Retorna 409 si ya existe una temporada para esa combinación trabajador-semestre.

        Args:
            request: Petición POST con los campos del modelo TemporadaTrabajo:
                trabajador (int): ID del usuario.
                semestre (int): ID del semestre.
                horas_semanales (int): Horas de trabajo por semana.
                fecha_inicio (str): Fecha de inicio en formato YYYY-MM-DD.
                fecha_fin (str): Fecha de fin en formato YYYY-MM-DD.
                precio_hora (int): Precio por hora en pesos colombianos.

        Returns:
            Response: 201 con la temporada creada.
                400 si los datos son inválidos.
                409 si ya existe una temporada para el trabajador y semestre.
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            trabajador = serializer.validated_data.get('trabajador')
            semestre_obj = serializer.validated_data.get('semestre')

            ya_existe = TemporadaTrabajo.objects.filter(
                trabajador=trabajador,
                semestre=semestre_obj
            ).exists()

            if ya_existe:
                return Response(
                    {"error": "Ya existe una temporada de trabajo para este trabajador en el semestre indicado."},
                    status=status.HTTP_409_CONFLICT
                )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["patch"], url_path="actualizar_temporada")
    def actualizar_temporada(self, request, pk=None):
        """Actualiza los parámetros de una temporada de trabajo.

        Recalcula horas_total_contratadas a partir de los días hábiles entre
        fecha_inicio y fecha_fin, restando los festivos y multiplicando por
        horas_semanales. Marca is_default=False tras la edición.

        Args:
            request: Petición PATCH con cualquier subconjunto de los campos:
                fecha_inicio (str): Fecha de inicio en formato YYYY-MM-DD.
                fecha_fin (str): Fecha de fin en formato YYYY-MM-DD.
                horas_semanales (int): Horas de trabajo por semana.
                total_festivos_temporada (int): Días festivos dentro del período.
            pk (int): ID de la temporada a actualizar.

        Returns:
            Response: 200 con la temporada actualizada.
                400 si las fechas tienen formato incorrecto o no pasan la
                validación del modelo.
                500 ante cualquier error inesperado.
        """
        try:
            temporada = self.get_object()

            if "fecha_inicio" in request.data:
                temporada.fecha_inicio = date.fromisoformat(request.data["fecha_inicio"])

            if "fecha_fin" in request.data:
                temporada.fecha_fin = date.fromisoformat(request.data["fecha_fin"])

            if "horas_semanales" in request.data:
                temporada.horas_semanales = int(request.data["horas_semanales"])

            if "total_festivos_temporada" in request.data:
                temporada.total_festivos_temporada = int(request.data["total_festivos_temporada"])

            dias_habiles = sum(
                1
                for i in range((temporada.fecha_fin - temporada.fecha_inicio).days)
                if (temporada.fecha_inicio + timedelta(days=i)).weekday() < 5
            )
            dias_habiles -= temporada.total_festivos_temporada or 0
            semanas = dias_habiles / 5
            horas_calculadas = Decimal(
                str(semanas * temporada.horas_semanales)
            ).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

            temporada.horas_total_contratadas = horas_calculadas
            temporada.is_default = False
            temporada.full_clean()
            temporada.save()

            return Response(
                TemporadaTrabajoSerializer(temporada).data,
                status=status.HTTP_200_OK
            )

        except ValueError:
            return Response(
                {"error": "Las fechas deben tener el formato YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )

        except DjangoValidationError as e:
            if hasattr(e, "message_dict"):
                return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
