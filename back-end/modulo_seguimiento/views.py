from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from modulo_seguimiento.serializers import *
from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante
from modulo_seguimiento.models import *
from modulo_instancia.models import *
from modulo_instancia.serializers import semestre_serializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class seguimiento_individual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class inasistencia_viewsets (viewsets.ModelViewSet):
    serializer_class = inasistencia_serializer
    permission_classes = (IsAuthenticated,)
    queryset = inasistencia_serializer.Meta.model.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class seguimientos_estudiante_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final =[]
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'],reverse=True)
        list_semestre = list(semestre.objects.all().order_by('-fecha_inicio'),)
        for i in list_semestre:
            lista_semestre = []
            serializer_semestre =semestre_serializer(i)
            dicccionario = {"nombre":serializer_semestre.data['nombre'],"Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            list_final.append(lista_semestre)
        return Response(list_final,status=status.HTTP_200_OK)
        



class seguimientos_estudiante_solo_semestre_actual_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    #permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_seguimientos = []
        list_final =[]
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_seguimientos.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)
        list_seguimientos.sort(key=lambda s: s['fecha'],reverse=True)

        list_semestre = list(semestre.objects.all().filter(semestre_actual = True))
        
        for i in list_semestre:
            lista_semestre = []
            serializer_semestre =semestre_serializer(i)
            dicccionario = {"nombre":serializer_semestre.data['nombre'],"Actual": serializer_semestre.data['semestre_actual']}
            lista_semestre.append(dicccionario)
            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_semestre.append(j)
            list_final.append(lista_semestre)
        return Response(list_final,status=status.HTTP_200_OK)




class conteo_seguimientos_estudiante_viewsets (viewsets.ModelViewSet):
    serializer_class = seguimiento_individual_serializer
    permission_classes = (IsAuthenticated,)
    queryset = seguimiento_individual_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        list_inasistencia = []
        list_seguimientos = []
        list_final =[]
        list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante = pk))
        list_inasistencia_individual = list(inasistencia.objects.filter(id_estudiante = pk))

        for i in list_inasistencia_individual: 
            serializer_inasistencia =inasistencia_serializer(i)
            list_inasistencia.append(serializer_inasistencia.data)
        for i in list_seguimientos_individual: 
            serializer_seguimiento_individual =seguimiento_individual_serializer(i)
            list_seguimientos.append(serializer_seguimiento_individual.data)

        list_semestre = list(semestre.objects.all().filter(semestre_actual = True))
        
        for i in list_semestre:
            lista_inasistencia = []
            inasistencias_revisados_practicante = []
            inasistencias_revisados_profesional = []

            lista_seguimientos = []
            seguimientos_revisados_practicante = []
            seguimientos_revisados_profesional = []

            serializer_semestre =semestre_serializer(i)

            for j in list_inasistencia:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_inasistencia.append(j)        
                    if j['revisado_practicante'] == False:
                        inasistencias_revisados_practicante.append(j)
                    if j['revisado_profesional'] == False:
                        inasistencias_revisados_profesional.append(j)

            for j in list_seguimientos:
                if j['fecha'] > serializer_semestre.data['fecha_inicio'] and j['fecha'] < serializer_semestre.data['fecha_fin']:
                    lista_seguimientos.append(j)
                    if j['revisado_practicante'] == False:
                        seguimientos_revisados_practicante.append(j)
                    if j['revisado_profesional'] == False:
                        seguimientos_revisados_profesional.append(j)

            count_inasistencias = len(lista_inasistencia)
            count_seguimientos = len(lista_seguimientos)

            count_inasistencias_revisados_practicante = len(inasistencias_revisados_practicante)
            count_inasistencias_revisados_profesional = len(inasistencias_revisados_profesional)

            count_seguimientos_revisados_practicante = len(seguimientos_revisados_practicante)
            count_seguimientos_revisados_profesional = len(seguimientos_revisados_profesional)

            counts = {
            'count_inasistencias': count_inasistencias,
            'count_seguimientos': count_seguimientos,
            'count_inasistencias_pendientes_practicante': count_inasistencias_revisados_practicante,
            'count_inasistencias_pendientes_profesional': count_inasistencias_revisados_profesional,
            'count_seguimientos_pendientes_practicante': count_seguimientos_revisados_practicante,
            'count_seguimientos_pendientes_profesional': count_seguimientos_revisados_profesional,
            }

        return Response(counts,status=status.HTTP_200_OK)







# class conteo_seguimientos_estudiante_viewsets(viewsets.ModelViewSet):
#     serializer_class = seguimiento_individual_serializer
#     queryset = seguimiento_individual_serializer.Meta.model.objects.all()

#     def retrieve(self, request, pk=None):
#         list_inasistencia = list(inasistencia.objects.filter(id_estudiante=pk))
#         list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante=pk))

#         count_inasistencias = len(list_inasistencia)
#         count_seguimientos = len(list_seguimientos_individual)

#         count_inasistencias_revisados_practicante = len([s for s in list_inasistencia if s.revisado_practicante])
#         count_inasistencias_revisados_profesional = len([s for s in list_inasistencia if s.revisado_profesional])

#         count_seguimientos_revisados_practicante = len([s for s in list_seguimientos_individual if s.revisado_practicante])
#         count_seguimientos_revisados_profesional = len([s for s in list_seguimientos_individual if s.revisado_profesional])

#         counts = {
#             'count_inasistencias': count_inasistencias,
#             'count_seguimientos': count_seguimientos,
#             'count_inasistencias_revisados_practicante': count_inasistencias_revisados_practicante,
#             'count_inasistencias_revisados_profesional': count_inasistencias_revisados_profesional,
#             'count_seguimientos_revisados_practicante': count_seguimientos_revisados_practicante,
#             'count_seguimientos_revisados_profesional': count_seguimientos_revisados_profesional,
#         }

#         return Response(counts, status=status.HTTP_200_OK)




# class conteo_seguimientos_estudiante_viewsets(viewsets.ModelViewSet):
#     serializer_class = seguimiento_individual_serializer
#     queryset = seguimiento_individual_serializer.Meta.model.objects.all()

#     @action(detail=False, methods=['get'])
#     def counts(self, request):
#         pk = request.query_params.get('pk')
#         if not pk:
#             return Response({'error': 'Missing student ID'}, status=status.HTTP_400_BAD_REQUEST)

#         list_inasistencia = list(inasistencia.objects.filter(id_estudiante=pk))
#         list_seguimientos_individual = list(seguimiento_individual.objects.filter(id_estudiante=pk))

#         count_inasistencias = len(list_inasistencia)
#         count_seguimientos = len(list_seguimientos_individual)

#         count_revisados_practicante = len([s for s in list_seguimientos_individual if s.revisado_practicante])
#         count_revisados_profesional = len([s for s in list_seguimientos_individual if s.revisado_profesional])

#         counts = {
#             'count_inasistencias': count_inasistencias,
#             'count_seguimientos': count_seguimientos,
#             'count_revisados_practicante': count_revisados_practicante,
#             'count_revisados_profesional': count_revisados_profesional
#         }

#         return Response(counts, status=status.HTTP_200_OK)