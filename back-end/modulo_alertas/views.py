from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from modulo_usuario_rol.models import estudiante
from modulo_usuario_rol.serializers import user_serializer, estudiante_serializer, usuario_rol_serializer, user_selected

from modulo_instancia.models import semestre, sede

from django.shortcuts import render, get_object_or_404


# Create your views here.

class info_estudiante_viewsets(viewsets.ModelViewSet):
    
    serializer_class = estudiante_serializer
    queryset = estudiante_serializer.Meta.model.objects.all()
    
    def retrieve(self, request, *args, **kwargs):
        
        data_usuario_rol = request.GET.get('usuario_rol')
        data_sede = request.GET.get('sede')

        # var_semestre = get_object_or_404(semestre, semestre_actual = True)
        var_semestre = get_object_or_404(
            semestre, semestre_actual=True, id_sede=data_sede)
 
        list_estudiantes = list()
        
        if data_usuario_rol == "super_ases":

            # ven todo
            list_estudiantes = []
            # list_programas = []
            serializer_estudiante = estudiante_serializer(
                estudiante.objects.all(), many=True)

            return Response(serializer_estudiante.data)
      
        
        print(estudiante_serializer(self.get_object()).data)
        return Response(status=status.HTTP_200_OK, data=estudiante_serializer(self.get_object()).data)
    
    
    
    
