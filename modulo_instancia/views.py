from pickle import TRUE
from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView
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

class end_semestry_manage (APIView):
    serializer_class = SemestreSerializer
    def get(self, request):
        print(request)
        semestreActual = semestre.objects.filter(semestre_actual=True)
        return Response (list(semestreActual.values()))


def carga_test(request):
    return render(request, "prueba_wizard.html")

class TodoView(viewsets.ModelViewSet):
 
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = SemestreSerializer
 
    # define a variable and populate it
    # with the Todo list objects
    queryset = semestre.objects.all()