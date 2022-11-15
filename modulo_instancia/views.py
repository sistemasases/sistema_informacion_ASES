from pickle import TRUE
from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
from rest_framework import generics
from .models import instancia
from .models import semestre
from django.http import JsonResponse
from rest_framework.response import Response
from django.forms.models import model_to_dict
from .serializers import  semestre_serializer, instancia_serializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.

class instancia_viewsets (viewsets.ModelViewSet):
    serializer_class = instancia_serializer
    permission_classes = (IsAuthenticated,)
    queryset = instancia_serializer.Meta.model.objects.all()

class semestre_viewsets (viewsets.ModelViewSet):
    serializer_class = semestre_serializer
    permission_classes = (IsAuthenticated,)
    queryset = semestre_serializer.Meta.model.objects.all()

    def retrieve(self, request, pk=None):
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual)
        return Response (semestreActual_serializer.data)

    def create(self, request, pk=None):
        semestreActual_serializer = semestre_serializer(data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

    def update(self, request, pk):
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = semestre_serializer(semestreActual, data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

# class instancia_manage (APIView):

#     def get(self, request):
#         print(request)
#         list_instancia =instancia.objects.all()
#         return Response (list(list_instancia.values()))

# class semestre_manage (APIView):

#     def get(self, request):
#         print(request)
#         list_instancia =semestre.objects.all()
#         return Response (list(list_instancia.values()))

# class end_semestry_manage (APIView):
#     def get(self, request, pk):
#         print(request)
#         semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
#         semestreActual_serializer = SemestreSerializer(semestreActual)
#         return Response (semestreActual_serializer.data)


    # def put(self, request, pk):
    #     print(request)
    #     semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
    #     semestreActual_serializer = SemestreSerializer(semestreActual, data=request.data)
    #     if semestreActual_serializer.is_valid():
    #         semestreActual_serializer.save()
    #         return Response (semestreActual_serializer.data)
    #     return Response (semestreActual_serializer.errors)

    # def post(self, request, pk):
    #     print(request)
    #     semestreActual_serializer = SemestreSerializer(data=request.data)
    #     if semestreActual_serializer.is_valid():
    #         semestreActual_serializer.save()
    #         return Response (semestreActual_serializer.data)
    #     return Response (semestreActual_serializer.errors)
