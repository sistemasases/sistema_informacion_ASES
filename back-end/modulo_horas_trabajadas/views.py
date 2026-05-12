from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import RegistroHorasSerializer
from rest_framework.decorators import action
from .models import RegistroHoras
from rest_framework.permissions import IsAuthenticated

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

        data = None

        if serializer.is_valid():
            data = serializer.data
        
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        #return Response(
        #    serializer.errors,
        #    status=status.HTTP_400_BAD_REQUEST
        #)
