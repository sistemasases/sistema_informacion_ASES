from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from .models import SirhIntegracion
from .serializers import SirhIntegracion_Serializer

class send_ases(viewsets.GenericViewSet):
    queryset = SirhIntegracion.objects.all()
    serializer_class = SirhIntegracion_Serializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data,status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'],url_path='nombre_funcion')
    def custom_action(self, request):
        data = "hola"
        # Realizar alguna acción personalizada
        return Response({'data': data},status=status.HTTP_200_OK)
    
class receive_ases(viewsets.GenericViewSet):
    queryset = SirhIntegracion.objects.all()
    serializer_class = SirhIntegracion_Serializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        # Obtener los datos validados
        data = serializer.validated_data
        
        # Preparar una lista de objetos nuevos para el bulk_create
        objects_to_create = []

        # Verificar existencia y preparar objetos nuevos
        for item in data:
            # Aquí puedes definir la lógica para verificar si el registro ya existe
            exists = SirhIntegracion.objects.filter(
                documento=item['documento'],
                tipo_documento=item['tipo_documento'],
                primer_nombre=item['primer_nombre'],
                # Agrega más campos si es necesario para identificar de manera única
            ).exists()

            if not exists:
                # Crear una instancia del modelo con los datos validados
                obj = SirhIntegracion(
                    documento=item['documento'],
                    tipo_documento=item['tipo_documento'],
                    primer_nombre=item['primer_nombre'],
                    segundo_nombre=item.get('segundo_nombre', None),
                    primer_apellido=item['primer_apellido'],
                    segundo_apellido=item.get('segundo_apellido', None),
                    nombre_estamento=item['nombre_estamento'],
                    grupo_liquidacion_codigo=item.get('grupo_liquidacion_codigo', None),
                    telefono_residencia=item.get('telefono_residencia', None),
                    telefono_movil=item.get('telefono_movil', None),
                    elemento_estructura_codigo=item.get('elemento_estructura_codigo', None),
                    fecha_inicio=item['fecha_inicio'],
                    fecha_fin=item.get('fecha_fin', None),
                    codigo_empleado=item.get('codigo_empleado', None),
                    estado=item.get('estado', None),
                    codigo_facultad=item.get('codigo_facultad', None),
                    tipo_empleado=item.get('tipo_empleado', None),
                    fecha_registro=item.get('fecha_registro', None),
                    cargo=item.get('cargo', None)
                )
                objects_to_create.append(obj)
        
        # Insertar los registros nuevos en la base de datos
        with transaction.atomic():
            SirhIntegracion.objects.bulk_create(objects_to_create)

        return Response({'status': 'Data created'}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'],url_path='nombre_funcion')
    def custom_action(self, request):
        data = request.data
        # Realizar alguna acción personalizada
        return Response({'data': data},status=status.HTTP_200_OK)