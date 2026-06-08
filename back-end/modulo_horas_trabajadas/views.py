from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import RegistroHoras
from .serializers import RegistroHorasSerializer
from modulo_usuario_rol.models import usuario_rol
from modulo_instancia.models import semestre
from django.contrib.auth.models import User
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from collections import defaultdict



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
        trabajador = request.data.get('trabajador')
        semestre_id = request.data.get('semestre')

        semestre_actual = semestre.objects.get(id=semestre_id)
        fecha_inicio = semestre_actual.fecha_inicio

        registros_filtrados = RegistroHoras.objects.select_related(
            'rol',
            'rol__id_rol'
        ).filter(
            trabajador=trabajador,
            fecha__gt=fecha_inicio
        )

        serializer = self.get_serializer(registros_filtrados, many=True)        
        total_horas = registros_filtrados.aggregate(
            total=Sum('horas_trabajadas')
        )['total'] or 0

        return Response({
            "registros": serializer.data,
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

        # Verificar que el registro pertenece al trabajador autenticado (opcional pero recomendado)
        # if registro.trabajador != request.user:
        #     return Response({"error": "No tienes permiso para eliminar este registro."}, status=status.HTTP_403_FORBIDDEN)

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
        try:
            registros_nivel1 = RegistroHoras.objects.select_related(
                'trabajador', 'rol'
            ).filter(
                rol__id_jefe=request.user
            ).order_by('trabajador')

            ids_practicantes = registros_nivel1.values_list(
                'trabajador', flat=True
            ).distinct()

            # parte 2: registros donde el jefe es alguno de los practicantes (monitores)
            registros_nivel2 = RegistroHoras.objects.select_related(
                'trabajador', 'rol'
            ).filter(
                rol__id_jefe__in=ids_practicantes
            ).order_by('trabajador')

            # unir ambos querysets
            todos_registros = registros_nivel1 | registros_nivel2

            if not todos_registros.exists():
                return Response(
                    {"message": "No se encontraron registros."},
                    status=status.HTTP_404_NOT_FOUND
                )

            # agrupar por trabajador
            trabajadores_ids = todos_registros.values_list(
                'trabajador', flat=True
            ).distinct()

            subordinados_info = []

            for trabajador_id in trabajadores_ids:
                registros_trabajador = todos_registros.filter(trabajador=trabajador_id)
                serializer = self.get_serializer(registros_trabajador, many=True)
                total_horas = registros_trabajador.aggregate(
                    total=Sum('horas_trabajadas')
                )['total'] or 0

                user = User.objects.filter(id=trabajador_id).first()
                nombre_completo = f"{user.first_name} {user.last_name}".strip() if user else str(trabajador_id)

                subordinados_info.append({
                    "trabajador_id": trabajador_id,
                    "nombre": nombre_completo,
                    "registros": serializer.data,
                    "horasTotal": float(total_horas)
                })

            print(subordinados_info)
            return Response(subordinados_info, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )