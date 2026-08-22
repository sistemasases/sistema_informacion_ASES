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
from django.contrib.auth.models import User
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from collections import defaultdict
import datetime
from datetime import date, timedelta
from decimal import Decimal, ROUND_HALF_UP




class registros_horas_viewset(viewsets.GenericViewSet):
    """Viewset para el modelo de RegistroHoras"""
    queryset = RegistroHoras.objects.all()
    serializer_class = RegistroHorasSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=False,
        methods=['post'],
        url_path='crear_registro'
    )
    def crear_registro(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            trabajador = serializer.validated_data.get('trabajador')
            fecha = serializer.validated_data.get('fecha')

            # Validar que la fecha esté dentro del rango del semestre actual
            semestre_obj = semestre.objects.filter(semestre_actual=True).first()
            if semestre_obj is None:
                return Response(
                    {"error": "No hay un semestre activo configurado."},
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

            # Buscar el rol activo del trabajador
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
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # endpoint para obtener todos los regostros de trabajador, por el id 
    @action(detail=False, methods=['post'], url_path='by_trabajador')
    def get_by_id(self, request):
        trabajador_id = request.data.get('trabajador')
        semestre_id = request.data.get('semestre')

        trabajador_registro = get_object_or_404(User, pk=trabajador_id)
        
        print("=========")
        print("trabajador_id: " + str(trabajador_id))
        print("=========")
        print("trabajador_id: " + str(trabajador_registro))

        nombre_trabajador = trabajador_registro.first_name 
        apellido_trabajador = trabajador_registro.last_name

        nombre_completo = nombre_trabajador + " " + apellido_trabajador

        semestre_actual = semestre.objects.get(id=semestre_id)
        fecha_inicio = semestre_actual.fecha_inicio

        registros_filtrados = RegistroHoras.objects.select_related(
            'rol',
            'rol__id_rol'
        ).filter(
            trabajador=trabajador_id,
            fecha__gt=fecha_inicio
        )

        serializer = self.get_serializer(registros_filtrados, many=True)        
        total_horas = registros_filtrados.aggregate(
            total=Sum('horas_trabajadas')
        )['total'] or 0

        print(nombre_completo)

        return Response({
            "registros": serializer.data,
            "nombre_trabajador": nombre_completo,
            "total_horas": float(total_horas)
        }, status=status.HTTP_200_OK)
    

    
    @action(
        detail=True,  
        methods=['patch'],
        url_path='actualizar_registro'
    )
    def actualizar_registro(self, request, pk=None):
        """Actualiza parcialmente un registro de horas por su ID"""
        registro = get_object_or_404(RegistroHoras, pk=pk)

        

        serializer = self.get_serializer(registro, data=request.data, partial=True)

        if serializer.is_valid():
            # Validar que la fecha (nueva o existente) esté dentro del semestre activo
            fecha = serializer.validated_data.get('fecha', registro.fecha)

            semestre_obj = semestre.objects.filter(semestre_actual=True).first()
            if semestre_obj is None:
                return Response(
                    {"error": "No hay un semestre activo configurado."},
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

            # Si cambia el trabajador, recalcular el rol activo
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


    @action(
        detail=True,
        methods=['delete'],
        url_path='eliminar_registro'
    )
    def eliminar_registro(self, request, pk=None):
        """Elimina un registro de horas por su ID"""
        registro = get_object_or_404(RegistroHoras, pk=pk)


        registro.delete()
        return Response(
            {"message": "Registro eliminado correctamente."},
            status=status.HTTP_200_OK
        )
    

    @action(
        detail=True,
        methods=['get'],
        url_path='get_info_profesional'
    )
    def obtener_registros_profesional(self, request, pk=None):

        semestre_id = request.query_params.get('semestre', None)
        num_festivos = int(request.query_params.get('dias_festivos', 0) or 0)

        try:
            registros_nivel1 = RegistroHoras.objects.select_related(
                'trabajador', 'rol'
            ).filter(
                rol__id_jefe=request.user
            ).order_by('trabajador')

            ids_practicantes = registros_nivel1.values_list(
                'trabajador', flat=True
            ).distinct()

            registros_nivel2 = RegistroHoras.objects.select_related(
                'trabajador', 'rol'
            ).filter(
                rol__id_jefe__in=ids_practicantes
            ).order_by('trabajador')

            todos_registros = registros_nivel1 | registros_nivel2

            if not todos_registros.exists():
                return Response(
                    {"message": "No se encontraron registros."},
                    status=status.HTTP_404_NOT_FOUND
                )

            trabajadores_ids = list(
                todos_registros.values_list('trabajador', flat=True).distinct()
            )

            # ── semestre ──────────────────────────────────────────────
            if semestre_id:
                semestre_obj = get_object_or_404(semestre, id=semestre_id)
            else:
                semestre_obj = semestre.objects.filter(semestre_actual=True).first()

            if not semestre_obj:
                return Response(
                    {"error": "No hay semestre activo."},
                    status=status.HTTP_404_NOT_FOUND
                )

            fecha_inicio = semestre_obj.fecha_inicio.date()
            fecha_fin    = semestre_obj.fecha_fin.date()

            # ── calcular horas_total_contratadas por defecto ──────────
            dias_habiles = sum(
                1 for i in range((fecha_fin - fecha_inicio).days)
                if (fecha_inicio + datetime.timedelta(days=i)).weekday() < 5
            )
            dias_habiles -= num_festivos
            semanas_reales = dias_habiles / 5
            horas_total_default = round(semanas_reales * 20, 1)  # 20 horas semanales por defecto

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

            # ── loop sin queries adicionales ──────────────────────────
            subordinados_info = []

            for trabajador_id in trabajadores_ids:
                registros_trabajador = todos_registros.filter(trabajador=trabajador_id)
                serializer = self.get_serializer(registros_trabajador, many=True)
                total_horas = registros_trabajador.aggregate(
                    total=Sum('horas_trabajadas')
                )['total'] or 0

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
                    "horasTotal": float(total_horas)
                })

            return Response(subordinados_info, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class temporada_trabajo_viewset(viewsets.GenericViewSet):
    queryset = TemporadaTrabajo.objects.all()
    serializer_class = TemporadaTrabajoSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=False,
        methods=['post'],
        url_path='crear_temporada'
    )
    def crear_temporada(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            trabajador = serializer.validated_data.get('trabajador')
            semestre_obj = serializer.validated_data.get('semestre')

            # Validar que no exista ya una temporada para ese trabajador y semestre
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
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )




    @action(
        detail=True,
        methods=["patch"],
        url_path="actualizar_temporada"
    )
    def actualizar_temporada(self, request, pk=None):

        try:
            temporada = self.get_object()

            # Actualizar únicamente los campos permitidos

            if "fecha_inicio" in request.data:
                temporada.fecha_inicio = date.fromisoformat(
                    request.data["fecha_inicio"]
                )

            if "fecha_fin" in request.data:
                temporada.fecha_fin = date.fromisoformat(
                    request.data["fecha_fin"]
                )

            if "horas_semanales" in request.data:
                temporada.horas_semanales = int(
                    request.data["horas_semanales"]
                )

            if "total_festivos_temporada" in request.data:
                temporada.total_festivos_temporada = int(
                    request.data["total_festivos_temporada"]
                )

            # Recalcular horas contratadas
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

            # Ejecuta el clean() del modelo

            temporada.is_default = False

            temporada.full_clean()

            temporada.save()

            return Response(
                TemporadaTrabajoSerializer(temporada).data,
                status=status.HTTP_200_OK
            )

        except ValueError:
            return Response(
                {
                    "error": "Las fechas deben tener el formato YYYY-MM-DD."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        except DjangoValidationError as e:
            if hasattr(e, "message_dict"):
                return Response(
                    e.message_dict,
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response(
                {"error": e.messages},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )