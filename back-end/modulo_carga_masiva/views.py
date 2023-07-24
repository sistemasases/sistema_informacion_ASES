from urllib import request
from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
from modulo_usuario_rol.models import estudiante
from django.contrib.auth.models import User
from modulo_programa.models import programa, programa_estudiante, estado_programa
from modulo_carga_masiva.models import retiro, motivo
from modulo_academico.models import historial_academico, materia, profesor, facultad
from modulo_instancia.models import semestre, sede
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_carga_masiva import serializers

# Create your views here.

def carga_test(request):
    return render(request, "prueba_carga.html")

class Validador_carga(APIView):
    def post(self,request):
            tipo = request.data.get('tipo_de_carga')
            file = request.data.get('FILES')
            if(tipo == 'Estudiante'):
                print("entro al if")
                return carga_estudiantes(file)
            elif(tipo == "Usuario"):
                print("entro al if")
                return carga_usuarios(file)
            elif(tipo == "Programa"):
                return carga_programas(file)
            elif(tipo == "Materia"):
                return carga_materias(file)
            elif(tipo == "Nota"):
                return carga_notas(file)
            elif(tipo == "Retiro"):
                return carga_retiros(file)
            elif(tipo == "Historial_academico"):
                return carga_retiros(file)
            elif(tipo == "Profesor"):
                return carga_retiros(file)
            elif(tipo == "Ficha"):
                return carga_retiros(file)
            else:
                return Response({'ERROR': 'No se selecciono un tipo de carga valido.'})

def carga_estudiantes(file):
    print("entro al carga_estudiantes")
    list_dict_result = []
    lista_estudiantes =[]
    lista_programa_estudiantes =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        if (estudiante.objects.filter(cod_univalle = datos.iat[i,22]).values()):
            consulta_estudiante = estudiante.objects.filter(cod_univalle = datos.iat[i,22]).first()
            consulta_programa = programa.objects.filter(codigo_univalle= datos.iat[i,23],id_sede = datos.iat[i,24]).first()
            if(programa_estudiante.objects.filter(id_estudiante = consulta_estudiante,id_programa=consulta_programa).values()):
                dict_result = {
                    'dato' : datos.iat[i,22],
                    'mensaje' : 'Ya existe en la BD este estudiante.'
                }
                list_dict_result.append(dict_result)
            else:
                dict_programa_estudiante = {
                    'num_doc': datos.iat[i,3],
                    'cod_programa': datos.iat[i,23],
                    'sede': datos.iat[i,24],
                }
                lista_programa_estudiantes.append(dict_programa_estudiante)

                dict_result = {
                    'dato' : datos.iat[i,22],
                    'mensaje' : 'Se le asignó un nuevo programa.'
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
                dict_programa_estudiante = {
                    'num_doc': datos.iat[i,3],
                    'cod_programa': datos.iat[i,23],
                    'sede': datos.iat[i,24],
                }
                lista_programa_estudiantes.append(dict_programa_estudiante)
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
    carga_programa_estudiantes = carga_programa_estudiante(lista_programa_estudiantes)
    if carga_programa_estudiantes:
        return Response(list_dict_result)
    else:
        return Response(list_dict_result)
    
def carga_programa_estudiante(lista):
    lista_programa_estudiante =[]
    for i in lista:

        consulta_estudiante = estudiante.objects.filter(num_doc =i['num_doc']).first()
        consulta_programa = programa.objects.filter(codigo_univalle= i['cod_programa'],id_sede = i['sede']).first()
        consulta_estado_programa = estado_programa.objects.filter(id= '1').first()
        Programa_estudiante = programa_estudiante(
            id_programa = consulta_programa,
            id_estudiante = consulta_estudiante,
            id_estado = consulta_estado_programa,
            traker = True
        )
        lista_programa_estudiante.append(Programa_estudiante)
    programa_estudiante.objects.bulk_create(lista_programa_estudiante)
    return True

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
    print("entro a la carga de programas")
    list_dict_result = []
    lista_programas =[]
    datos = pd.read_csv(file,header=0)
    print("estos son los datos: "+str(datos))
    for i in range(datos.shape[0]):
        
        try:
            Programa = programa(
            codigo_snies = int(datos.iat[i,0]),
            codigo_univalle = int(datos.iat[i,1]),
            nombre = str(datos.iat[i,2]),
            jornada = str(datos.iat[i,3]),
            facultad = int(datos.iat[i,4]),
            sede = int(datos.iat[i,5]),
            )
            lista_programas.append(Programa)
        
            dict_result = {
                'dato' : datos.iat[i,2],
                'mensaje' : 'Se cargó correctamente este programa.'
            }
            list_dict_result.append(dict_result)
        except:
            dict_result = {
                'dato' : datos.iat[i,2],
                'mensaje' : 'Error al cargar este programa.'
            }
            list_dict_result.append(dict_result)

    User.objects.bulk_create(lista_programas)
    return Response(list_dict_result)
    
def carga_materias(file):
    print("entro al carga_materias")
    list_dict_result = []
    lista_materias =[]
    datos = pd.read_csv(file,header=0)
    print("estos son los datos: "+str(datos))
    for i in range(datos.shape[0]):
        if (materia.objects.filter(cod_materia = datos.iat[i,0]).values()):
            dict_result = {
                'dato' : datos.iat[i,1],
                'mensaje' : 'Ya existe una materia con el codigo ' + str(datos.iat[i,0])
            }
            list_dict_result.append(dict_result)
        else:
            try:
                consulta_semestre= semestre.objects.get(id =datos.iat[i,3])
                consulta_sede= sede.objects.get(id =datos.iat[i,4])
                consulta_facultad= facultad.objects.get(id =datos.iat[i,5])
                consulta_profesor= profesor.objects.get(id =datos.iat[i,6])
                Materia = materia(
                cod_materia = str(datos.iat[i,0]),
                nombre = str(datos.iat[i,1]),
                franja = str(datos.iat[i,2]),
                id_semestre = consulta_semestre,
                id_sede = consulta_sede,
                id_facultad = consulta_facultad,
                id_profesor = consulta_profesor,

                )
                lista_materias.append(Materia)
        
                dict_result = {
                    'dato' : datos.iat[i,1],
                    'mensaje' : 'Se cargó correctamente esta materia'
                }
                list_dict_result.append(dict_result)
            except:
                dict_result = {
                    'dato' : datos.iat[i,1],
                    'mensaje' : 'Error al cargar esta materia.'
                }
                list_dict_result.append(dict_result)

    materia.objects.bulk_create(lista_materias)
    return Response(list_dict_result)

def carga_notas(file):
    print("entro al carga_notas")
    list_dict_result = []
    lista_notas =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        try:
            consulta_programa_estudiante= programa_estudiante.objects.get(id =datos.iat[i,0])
            consulta_semestre= semestre.objects.get(id =datos.iat[i,1])
            consulta_estudiante= estudiante.objects.get(id =datos.iat[i,5])
            Nota = historial_academico(
            id_programa_estudiante= consulta_programa_estudiante,
            id_semestre= consulta_semestre,
            promedio_semestral = float(datos.iat[i,2]),
            promedio_acumulado= float(datos.iat[i,3]),
            json_materias = str(datos.iat[i,4]),
            id_estudiante= consulta_estudiante,

            )
            lista_notas.append(Nota)

            dict_result = {
                'dato' : datos.iat[i,1],
                'mensaje' : 'Se cargó correctamente este registro de notas'
            }
            list_dict_result.append(dict_result)
        except:
            dict_result = {
                'dato' : datos.iat[i,1],
                'mensaje' : 'Error al cargar este registro de notas.'
            }
            list_dict_result.append(dict_result)

    historial_academico.objects.bulk_create(lista_notas)
    return Response(list_dict_result)

def carga_retiros(file):
    print("entro al carga_retiros")
    list_dict_result = []
    lista_retiros =[]
    datos = pd.read_csv(file,header=0)
    print("estos son los datos: "+str(datos))
    for i in range(datos.shape[0]):
        try:
            print("holaaaaaaa:"+str(datos.iat[i,0]))
            consulta_estudiante= estudiante.objects.get(id =datos.iat[i,0])
            consulta_motivo= motivo.objects.get(id =datos.iat[i,1])
            Retiro = retiro(
            id_estudiante= consulta_estudiante,
            id_motivo= consulta_motivo,
            detalle = str(datos.iat[i,2]),

            )
            lista_retiros.append(Retiro)
        
            dict_result = {
                'dato' : datos.iat[i,1],
                'mensaje' : 'Se cargó correctamente este retiro.'
            }
            list_dict_result.append(dict_result)
        except:
            dict_result = {
                'dato' : datos.iat[i,1],
                'mensaje' : 'Error al cargar este retiro.'
            }
            list_dict_result.append(dict_result)

    retiro.objects.bulk_create(lista_retiros)
    return Response(list_dict_result)
