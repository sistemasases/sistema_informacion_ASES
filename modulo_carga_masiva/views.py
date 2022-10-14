from urllib import request
from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
from modulo_usuario_rol.models import estudiante
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_carga_masiva import serializers

# Create your views here.

def carga_test(request):
    return render(request, "prueba_carga.html")

class Validador_carga(APIView):
    serializer_class =serializers.Validador_carga
    def post(self,request):
            tipo = request.data.get('tipo_de_carga')
            file = request.data.get('FILES')
            if(tipo == 'Estudiante'):
                print("entro al if")
                return carga_estudiantes(file)
            elif(tipo == "Usuario"):
                print("entro al if")
                return carga_usuarios(file)
            elif(tipo == "Materia"):
                return carga_materias(file)
            elif(tipo == "Nota"):
                return carga_notas(file)
            elif(tipo == "Resolución"):
                return carga_resoluciones(file)
            elif(tipo == "Programa"):
                return carga_programas(file)
            elif(tipo == "Retiro"):
                return carga_retiros(file)
            else:
                return Response({'ERROR': 'No se selecciono un tipo de carga valido.'})

def carga_estudiantes(file):
    print("entro al carga_estudiantes")
    list_dict_result = []
    lista_estudiantes =[]
    datos = pd.read_csv(file,header=0)
    print("estos son los datos: "+str(datos))
    for i in range(datos.shape[0]):
        if (estudiante.objects.filter(cod_univalle = datos.iat[i,22]).values()):
            dict_result = {
                'dato' : datos.iat[i,22],
                'mensaje' : 'Ya existe en la BD este estudiante.'
            }
            list_dict_result.append(dict_result)
        else:
            try:
                Estudiante = estudiante(
                tipo_doc_ini = str(datos.iat[i,0]),
                num_doc_ini = int(datos.iat[i,1]),
                tipo_doc = str(datos.iat[i,2]),
                num_doc = str(datos.iat[i,3]),
                barrio_ini_id = int(datos.iat[i,4]),
                ciudad_ini_id = int(datos.iat[i,5]),
                dir_ini = str(datos.iat[i,6]),
                telefono_ini = datos.iat[i,7],
                dir_res = str(datos.iat[i,8]),
                telefono_res = int(datos.iat[i,9]),
                email = str(datos.iat[i,10]),
                acudiente = str(datos.iat[i,11]),
                telefono_acudiente =int( datos.iat[i,12]),
                sexo = str(datos.iat[i,13]),
                colegio = str(datos.iat[i,14]),
                estamento = str(datos.iat[i,15]),
                celular = datos.iat[i,16],
                hijos = datos.iat[i,17],
                barrio_res_id = int(datos.iat[i,18]),
                ciudad_res_id = int(datos.iat[i,19]),
                nombre = str(datos.iat[i,20]),
                apellido = str(datos.iat[i,21]),
                cod_univalle = str(datos.iat[i,22])
                )
                lista_estudiantes.append(Estudiante)
                dict_result = {
                    'dato' : datos.iat[i,22],
                    'mensaje' : 'Se cargó correctamente este estudiante.'
                }
                list_dict_result.append(dict_result)
            except:
                dict_result = {
                    'dato' : datos.iat[i,22],
                    'mensaje' : 'Error al cargar este estudiante.'
                }
                list_dict_result.append(dict_result)

    estudiante.objects.bulk_create(lista_estudiantes)
    return Response(list_dict_result)

def carga_usuarios(file):
    print("entro al carga_usuarios")
    list_dict_result = []
    lista_usuarios =[]
    datos = pd.read_csv(file,header=0)
    print("estos son los datos: "+str(datos))
    for i in range(datos.shape[0]):
        if (User.objects.filter(username = datos.iat[i,0]).values()):
            dict_result = {
                'dato' : datos.iat[i,0],
                'mensaje' : 'Ya existe un usuario con este username.'
            }
            list_dict_result.append(dict_result)
        else:
            try:
                Usuario = User(
                password = make_password("ases2022"),
                is_superuser = False,
                username = str(datos.iat[i,0]),
                first_name = str(datos.iat[i,1]),
                last_name = str(datos.iat[i,2]),
                email = str(datos.iat[i,3]),
                is_staff = True,
                is_active = True
                )
                lista_usuarios.append(Usuario)
        
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'Se cargó correctamente este usuario.'
                }
                list_dict_result.append(dict_result)
            except:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'Error al cargar este usuario.'
                }
                list_dict_result.append(dict_result)

    User.objects.bulk_create(lista_usuarios)
    return Response(list_dict_result)

def carga_programas(file):
    datos = pd.read_csv(file,header=0)
    print(datos.iloc[[2],[0,1]])
    print("filas:"+ str(datos.shape[0]))
    print("columnas:"+ str(datos.shape[1]))
    
def carga_materias(file):
    lista_permiso =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        Permiso = permiso(
        nombre = str(datos.iat[i,0]),
        descripcion = str(datos.iat[i,1])
        )
        lista_permiso.append(Permiso)
    permiso.objects.bulk_create(lista_permiso)

def carga_notas(file):
    datos = pd.read_csv(file,header=0)
    print(datos.iloc[[2],[0,1]])
    print("filas:"+ str(datos.shape[0]))
    print("columnas:"+ str(datos.shape[1]))

def carga_resoluciones(file):
    datos = pd.read_csv(file,header=0)
    print(datos.iloc[[2],[0,1]])
    print("filas:"+ str(datos.shape[0]))
    print("columnas:"+ str(datos.shape[1]))

def carga_retiros(file):
    datos = pd.read_csv(file,header=0)
    print(datos.iloc[[2],[0,1]])
    print("filas:"+ str(datos.shape[0]))
    print("columnas:"+ str(datos.shape[1]))
