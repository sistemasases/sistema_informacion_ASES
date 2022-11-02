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
from rest_framework import viewsets
from .serializers import  InstanciaSerializer
from .serializers import  SemestreSerializer

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.

class instancia_manage (APIView):

    def get(self, request):
        print(request)
        list_instancia =instancia.objects.all()
        return Response (list(list_instancia.values()))

class semestre_manage (APIView):

    def get(self, request):
        print(request)
        list_instancia =semestre.objects.all()
        return Response (list(list_instancia.values()))

class end_semestry_manage (APIView):
    def get(self, request, pk):
        print(request)
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = SemestreSerializer(semestreActual)
        return Response (semestreActual_serializer.data)


    def put(self, request, pk):
        print(request)
        semestreActual = semestre.objects.filter(semestre_actual=True).filter(id_instancia_id=pk).first()
        semestreActual_serializer = SemestreSerializer(semestreActual, data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)

    def post(self, request, pk):
        print(request)
        semestreActual_serializer = SemestreSerializer(data=request.data)
        if semestreActual_serializer.is_valid():
            semestreActual_serializer.save()
            return Response (semestreActual_serializer.data)
        return Response (semestreActual_serializer.errors)


def carga_test(request):
    return render(request, "prueba_wizard.html")

class TodoView(viewsets.ModelViewSet):
 
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = SemestreSerializer
 
    # define a variable and populate it
    # with the Todo list objects
    queryset = semestre.objects.all()