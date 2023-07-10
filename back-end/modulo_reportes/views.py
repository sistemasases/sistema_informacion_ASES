from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from modulo_usuario_rol.serializers import  user_serializer,estudiante_serializer
from modulo_usuario_rol.models import rol, usuario_rol, estudiante


# Create your views here.
