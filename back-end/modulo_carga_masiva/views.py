from urllib import request
from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
from modulo_usuario_rol.models import estudiante, cohorte_estudiante, cond_excepcion, usuario_rol, firma_tratamiento_datos, rol
from django.contrib.auth.models import User
from modulo_programa.models import programa, programa_estudiante, estado_programa,vcd_academico,dir_programa
from modulo_discapacidad.models import asignacion_discapacidad
from modulo_academico.models import historial_academico, materia, facultad, matricula
from modulo_instancia.models import semestre, sede, cohorte
from modulo_seguimiento.models import seguimiento_individual, inasistencia
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_carga_masiva import serializers
from datetime import datetime
import math
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError, transaction
# Create your views here.

def carga_test(request):
    return render(request, "prueba_carga.html")

class Validador_carga(APIView):
    # permission_classes = (IsAuthenticated,)
    def post(self,request):
            tipo = request.data.get('tipo_de_carga')
            file = request.data.get('FILES')
            if(tipo == 'Estudiante'):
                return carga_estudiantes(file)
            elif(tipo == "Activar_estudiante"):
                return activar_estudiante(file)
            elif(tipo == "Programa_estudiante"):
                return carga_programa_estudiante(file)
            elif(tipo == "Estudiante_Cohorte"):
                return carga_estudiante_cohorte(file)
            elif(tipo == "Usuario"):
                return carga_usuarios(file)
            elif(tipo == "Usuario_rol"):
                return carga_usuario_rol(file)
            elif(tipo == "Programa"):
                return carga_programas(file)
            elif(tipo == "Materia"):
                return carga_materias(file)
            elif(tipo == "Matricula"):
                return carga_matricula(file)
            elif(tipo == "Ficha"):
                return carga_fichas(file)
            elif(tipo == "FichaV2"):
                return carga_fichas2(file)
            elif(tipo == "Inasistencia"):
                return carga_inasistencias(file)
            elif(tipo == "Vcd_academico"):
                return carga_vcd_academicos(file)
            elif(tipo == "Dir_programa"):
                return carga_dir_programa(file)
            elif(tipo == "Cambio_contrasena"):
                return cambio_contrasena(file)
            elif(tipo == "Eliminar_matricula"):
                return eliminar_matricula(file)
            elif(tipo == "Firma_datos"):
                return carga_autorizacion(file)
            elif(tipo == "estudiante_academico"):
                return carga_estudiantes_aca(file)
            elif(tipo == "estudiante_disc"):
                return carga_estudiantes_disc(file)
            elif(tipo == "volver_estudiante_disc"):
                return volver_discapacidad(file)
            elif(tipo == "quitar_estudiante_disc"):
                return quitar_discapacidad(file)
            elif(tipo == "asignacion_disc"):
                return discapacidad_asignacion(file)
            else:
                return Response({'ERROR': 'No se selecciono un tipo de carga valido.'})
            
def activar_estudiante(file):
    list_dict_result = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0],cod_univalle =datos.iat[i,1]).first()
            if (consulta_estudiante):
                try:
                    consulta_estudiante.estudiante_elegible = True
                    consulta_estudiante.save()
                    dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Se activo correctamente este estudiante.' 
                            }
                    list_dict_result.append(dict_result)
                except:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al activar el estudiante.'
                    }
                    list_dict_result.append(dict_result)   
            
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este numero de documento ' + str(datos.iat[i,0]) +' y código ' + str(datos.iat[i,1])
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )

    return Response(list_dict_result)

def carga_estudiantes(file):
    list_dict_result = []
    lista_estudiantes =[]
    try:
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
                    dict_result = {
                        'dato' : datos.iat[i,22],
                        'mensaje' : 'El estudiante existe pero No en este programa.'
                    }
                    list_dict_result.append(dict_result)
            else:
                try:
                    if(datos.iat[i,25]):
                        consulta_cond_excep= cond_excepcion.objects.filter(alias = datos.iat[i,25]).first()
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
                        cod_univalle = str(datos.iat[i,22]),
                        id_cond_excepcion=consulta_cond_excep,
                        fecha_nac = datetime.strptime("1900-1-1",'%Y-%m-%d'),
                        )
                    else:
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
                        cod_univalle = str(datos.iat[i,22]),
                        fecha_nac = datetime.strptime("1900-1-1",'%Y-%m-%d'),
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
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )

    try:
        with transaction.atomic():
            estudiante.objects.bulk_create(lista_estudiantes)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los estudiantes.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )
    
def carga_programa_estudiante(file):
    list_dict_result = []
    lista_programa_estudiante =[]
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (estudiante.objects.filter(num_doc = datos.iat[i,0],cod_univalle =datos.iat[i,1]).first()):
                consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0],cod_univalle =datos.iat[i,1]).first()
                if(programa.objects.filter(codigo_univalle= datos.iat[i,2],id_sede = datos.iat[i,3]).first()):
                    consulta_programa = programa.objects.filter(codigo_univalle= datos.iat[i,2],id_sede = datos.iat[i,3]).first()
                    if(programa_estudiante.objects.filter(id_estudiante = consulta_estudiante,id_programa=consulta_programa).values()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Este estudiante ya está matriculado en este programa: '+ str(datos.iat[i,2])
                        }
                        list_dict_result.append(dict_result)
                    else:
                        consulta_estado_programa = estado_programa.objects.filter(id= '1').first()
                        try:
                            Programa_estudiante = programa_estudiante(
                                id_programa = consulta_programa,
                                id_estudiante = consulta_estudiante,
                                id_estado = consulta_estado_programa,
                                traker = True
                            )
                            lista_programa_estudiante.append(Programa_estudiante)
                            dict_result = {
                                        'dato' : datos.iat[i,0],
                                        'mensaje' : 'Se relacionó correctamente este estudiante con su programa: '+ str(datos.iat[i,2])
                                    }
                            list_dict_result.append(dict_result)
                        except:
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Error al relacionar el estudiante con su programa: '+ str(datos.iat[i,2])
                            }
                            list_dict_result.append(dict_result)   
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'El programa al que se quiere matricular el estudiante no existe: '+ str(datos.iat[i,2])
                    }
                    list_dict_result.append(dict_result) 
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este numero de documento.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    
    try:
        with transaction.atomic():
            programa_estudiante.objects.bulk_create(lista_programa_estudiante)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar asignar los estudiantes al programa.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_estudiante_cohorte(file):
    list_dict_result = []
    list_estudiante_cohorte = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (estudiante.objects.filter(num_doc = datos.iat[i,0]).first()):
                consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0]).first()
                if(cohorte.objects.filter(id_number= datos.iat[i,1]).first()):
                    consulta_cohorte = cohorte.objects.filter(id_number= datos.iat[i,1]).first()
                    if(cohorte_estudiante.objects.filter(id_cohorte = consulta_cohorte,id_estudiante=consulta_estudiante).values()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'El estudiante ya está relacionado con esta cohorte.'
                        }
                        list_dict_result.append(dict_result)
                    else:
                        try:
                            Cohorte_estudiante =cohorte_estudiante(
                                id_cohorte = consulta_cohorte,
                                id_estudiante = consulta_estudiante,
                            )
                            list_estudiante_cohorte.append(Cohorte_estudiante)
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Se relacionó correctamente el estudiante con la cohorte.'
                            }
                            list_dict_result.append(dict_result)
                        except:
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Error al relacionar el estudiante con la cohorte.'
                            }
                            list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,1],
                        'mensaje' : 'No existe una cohorte con este id_number.'
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este numero de documento.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            cohorte_estudiante.objects.bulk_create(list_estudiante_cohorte)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar asignar los estudiantes a la cohorte.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )            

def carga_usuarios(file):
    list_dict_result = []
    lista_usuarios =[]
    datos = pd.read_csv(file,header=0)
    try:
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
                    password = make_password(str(datos.iat[i,4])),
                    is_superuser = False,
                    username = str(datos.iat[i,0]),
                    first_name = str(datos.iat[i,1]),
                    last_name = str(datos.iat[i,2]),
                    email = str(datos.iat[i,3]),
                    is_staff = False,
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

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            User.objects.bulk_create(lista_usuarios)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los usuarios.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_usuario_rol(file):
    list_dict_result = []
    lista_usuarios_rol =[]
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (User.objects.filter(username = datos.iat[i,0]).values()):
                consulta_usuario= User.objects.filter(username =datos.iat[i,0]).first()
    
                if (User.objects.filter(username = datos.iat[i,3]).values()):
                    consulta_jefe= User.objects.filter(username =datos.iat[i,3]).first()

                    if (rol.objects.filter(id = datos.iat[i,1]).values()):
                        consulta_rol= rol.objects.filter(id =datos.iat[i,1]).first()

                        if (semestre.objects.filter(id = datos.iat[i,2]).values()):
                            consulta_semestre= semestre.objects.filter(id =datos.iat[i,2]).first()

                            if (usuario_rol.objects.filter(id_usuario = consulta_usuario,id_semestre = consulta_semestre).values()):
                            
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'El usuario ya tiene un rol en este semestre: '+ str(datos.iat[i,2])
                                }
                                list_dict_result.append(dict_result)
                            else:
                                try:
                                    Usuario_rol = usuario_rol(
                                    id_rol = consulta_rol,
                                    id_usuario = consulta_usuario,
                                    estado = 'ACTIVO',
                                    id_semestre = consulta_semestre,
                                    id_jefe = consulta_jefe,
                                    )
                                    lista_usuarios_rol.append(Usuario_rol)
                            
                                    dict_result = {
                                        'dato' : datos.iat[i,0],
                                        'mensaje' : 'Se le asignó correctamente el rol al usuario.'
                                    }
                                    list_dict_result.append(dict_result)
                                except:
                                    dict_result = {
                                        'dato' : datos.iat[i,0],
                                        'mensaje' : 'Error al asignar rol al usuario.'
                                    }
                                    list_dict_result.append(dict_result)
                                

                        else:
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'No existe un semestre con este id: '+ str(datos.iat[i,2])
                            }
                            list_dict_result.append(dict_result)

                    else:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'No existe un rol con este id: '+ str(datos.iat[i,1])
                        }
                        list_dict_result.append(dict_result)
                
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'No existe el usuario a asignar como jefe: '+ str(datos.iat[i,3])
                    }
                    list_dict_result.append(dict_result)
                    
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un usuario con ese username.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
    try:
        with transaction.atomic():
            usuario_rol.objects.bulk_create(lista_usuarios_rol)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar aisgnar los roles a los usuarios.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_programas(file):
    list_dict_result = []
    lista_programas =[]
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if(sede.objects.filter(id =datos.iat[i,5]).first()):
                consulta_sede = sede.objects.filter(id =datos.iat[i,5]).first()
                    
                if(facultad.objects.filter(id =datos.iat[i,4]).first()):
                    consulta_facultad = facultad.objects.filter(id =datos.iat[i,4]).first()

                    if(programa.objects.filter(codigo_univalle= datos.iat[i,1],id_sede = datos.iat[i,5],jornada = datos.iat[i,3]).first()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe este programa.'
                        }
                        list_dict_result.append(dict_result)
                    else:
                    
                        try:
                            Programa = programa(
                            codigo_snies = int(datos.iat[i,0]),
                            codigo_univalle = int(datos.iat[i,1]),
                            nombre = str(datos.iat[i,2]),
                            jornada = str(datos.iat[i,3]),
                            id_facultad = consulta_facultad,
                            id_sede = consulta_sede,
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
                else:
                    dict_result = {
                        'dato' : datos.iat[i,2],
                        'mensaje' : 'No existe la facultad suministrada: '+ str(datos.iat[i,4])
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,2],
                    'mensaje' : 'no existe la sede suministrada: '+str(datos.iat[i,5])
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            programa.objects.bulk_create(lista_programas)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los programas.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )
    
def carga_materias(file):
    list_dict_result = []
    lista_materias =[]
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if(sede.objects.filter(id =datos.iat[i,5]).first()):
                consulta_sede = sede.objects.filter(id =datos.iat[i,5]).first()

                if(semestre.objects.filter(id =datos.iat[i,4]).first()):
                    consulta_semestre= semestre.objects.filter(id =datos.iat[i,4]).first()

                    if(User.objects.filter(username =datos.iat[i,3]).first()):
                        consulta_profesor= User.objects.filter(username =datos.iat[i,3]).first()


                        if (materia.objects.filter(cod_materia = datos.iat[i,0],franja = datos.iat[i,2],id_sede=datos.iat[i,5],id_semestre=datos.iat[i,4],id_profesor = consulta_profesor).first()):
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Ya existe una materia con este codigo, en este semestre, en la sede suministrada.'
                            }
                            list_dict_result.append(dict_result)
                        else:
                            try:
                                consulta_facultad= facultad.objects.filter(id ='1').first()
                                Materia = materia(
                                cod_materia = str(datos.iat[i,0]),
                                nombre = str(datos.iat[i,1]),
                                franja = str(datos.iat[i,2]),
                                id_profesor = consulta_profesor,
                                id_semestre = consulta_semestre,
                                id_sede = consulta_sede,
                                id_facultad = consulta_facultad,
                                
                                )
                                lista_materias.append(Materia)
                        
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Se cargó correctamente esta materia'
                                }
                                list_dict_result.append(dict_result)
                            except:
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Error al cargar la materia.'
                                }
                                list_dict_result.append(dict_result)
                    else:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'no existe el semestre suministrada: '+str(datos.iat[i,4])
                        }
                        list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'no existe la sede suministrada: '+str(datos.iat[i,5])
                    }
                    list_dict_result.append(dict_result)
                    
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'no existe la sede suministrada: '+str(datos.iat[i,5])
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            materia.objects.bulk_create(lista_materias)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear las materias.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_matricula(file):
    list_dict_result = []
    list_matricula = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if(User.objects.filter(username =datos.iat[i,3]).first()):
                consulta_profesor= User.objects.filter(username =datos.iat[i,3]).first()
                
                if(estudiante.objects.filter(cod_univalle =datos.iat[i,0]).first()):
                    consulta_estudiante= estudiante.objects.filter(cod_univalle =datos.iat[i,0]).first()

                    if (materia.objects.filter(cod_materia = datos.iat[i,1],id_profesor=consulta_profesor,franja=datos.iat[i,2]).first()):
                        consulta_materia=materia.objects.filter(cod_materia = datos.iat[i,1],id_profesor=consulta_profesor,franja=datos.iat[i,2]).first()

                        if(matricula.objects.filter(id_curso =consulta_materia,id_estudiante = consulta_estudiante).first()):

                            dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'El estudiante ya está matriculado en este curso: '+str(datos.iat[i,1])
                                }
                            list_dict_result.append(dict_result)

                        else:
                            try:
                                Matricula =matricula(
                                    id_curso =consulta_materia,
                                    id_estudiante = consulta_estudiante,

                                )
                                list_matricula.append(Matricula)
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Se matriculó correstamente al estudiante en el curso: '+str(datos.iat[i,1])
                                }
                                list_dict_result.append(dict_result)
                            except:
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Error al matricular al estudiante en el curso: '+str(datos.iat[i,1])
                                }
                                list_dict_result.append(dict_result)
                            
                    else:
                        dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'No existe la materia a la que se quiere matricular el estudiante: '+str(datos.iat[i,1])
                            }
                        list_dict_result.append(dict_result)
                else:
                    dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'No existe este estudiante.'
                        }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'No existe el profesor relacionado con el correo suministrado: '+ str(datos.iat[i,3])
                    }
                list_dict_result.append(dict_result)

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            matricula.objects.bulk_create(list_matricula)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear las matriculas.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )



def eliminar_matricula(file):
    list_dict_result = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if(User.objects.filter(username =datos.iat[i,3]).first()):
                consulta_profesor= User.objects.filter(username =datos.iat[i,3]).first()
                
                if(estudiante.objects.filter(cod_univalle =datos.iat[i,0]).first()):
                    consulta_estudiante= estudiante.objects.filter(cod_univalle =datos.iat[i,0]).first()

                    if (materia.objects.filter(cod_materia = datos.iat[i,1],id_profesor=consulta_profesor,franja=datos.iat[i,2]).first()):
                        consulta_materia=materia.objects.filter(cod_materia = datos.iat[i,1],id_profesor=consulta_profesor,franja=datos.iat[i,2]).first()

                        if(matricula.objects.filter(id_curso =consulta_materia,id_estudiante = consulta_estudiante).first()):

                            matricula.objects.filter(id_curso =consulta_materia,id_estudiante = consulta_estudiante).delete()
                            dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Se borró correctamente la matricula del estudiante '+str(datos.iat[i,0])
                                }
                            list_dict_result.append(dict_result)

                        else:

                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'El estudiante no está matriculado en este curso: '+str(datos.iat[i,1])
                            }
                            list_dict_result.append(dict_result)
                            
                    else:
                        dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'No existe la materia suministrada: '+str(datos.iat[i,1])
                            }
                        list_dict_result.append(dict_result)
                else:
                    dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'No existe este estudiante.'
                        }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'No existe el profesor relacionado con el correo suministrado: '+ str(datos.iat[i,3])
                    }
                list_dict_result.append(dict_result)

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    return Response(list_dict_result)



def carga_fichas(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (User.objects.filter(id = datos.iat[i,61]).values()):
                consulta_creador= User.objects.get(id =datos.iat[i,61])



                if (estudiante.objects.filter(id = datos.iat[i,60]).values()):
                    consulta_estudiante= estudiante.objects.get(id =datos.iat[i,60])
                    if (seguimiento_individual.objects.filter(fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                                            hora_inicio = datetime.strptime(str(datos.iat[i,2]),'%H:%M'),
                                                            hora_finalización= datetime.strptime(str(datos.iat[i,3]),'%H:%M'),
                                                            id_creador = consulta_creador,
                                                            id_estudiante =  consulta_estudiante,).first()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe esta ficha.'
                        }
                        list_dict_result.append(dict_result)
                    else:
                            if math.isnan(datos.iat[i,6]):
                                riesgo_individual_dato = int('-1')
                            else:
                                riesgo_individual_dato =  int(datos.iat[i,6]) 
                            if math.isnan(datos.iat[i,18]):
                                riesgo_familiar_dato = int('-1')
                            else:
                                riesgo_familiar_dato =  int(datos.iat[i,18])  
                            if math.isnan(datos.iat[i,21]):
                                riesgo_academico_dato = int('-1')
                            else:
                                riesgo_academico_dato =  int(datos.iat[i,21]) 
                            if math.isnan(datos.iat[i,26]):
                                riesgo_economico_dato = int('-1')
                            else:
                                riesgo_economico_dato =  int(datos.iat[i,26]) 
                            if math.isnan(datos.iat[i,32]):
                                riesgo_vida_universitaria_ciudad_dato = int('-1')
                            else:
                                riesgo_vida_universitaria_ciudad_dato =  int(datos.iat[i,32]) 

                            if str(datos.iat[i,4]) == "nan":
                                objetivo_dato = str("")
                            else:
                                objetivo_dato =  str(datos.iat[i,4])

                            if str(datos.iat[i,5]) == "nan":
                                individual_dato = str("")
                            else:
                                individual_dato =  str(datos.iat[i,5]) 

                            if str(datos.iat[i,17])== "nan":
                                familiar_dato = str("")
                            else:
                                familiar_dato =  str(datos.iat[i,17]) 
                            if str(datos.iat[i,20])=="nan":
                                academico_dato = str("")
                            else:
                                academico_dato =  str(datos.iat[i,20]) 
                            if str(datos.iat[i,25])=="nan":
                                economico_dato = str("")
                            else:
                                economico_dato =  str(datos.iat[i,25]) 
                            if str(datos.iat[i,31]) == "nan":
                                vida_universitaria_ciudad_dato = str("")
                            else:
                                vida_universitaria_ciudad_dato =  str(datos.iat[i,31]) 
                            if str(datos.iat[i,55]) == "nan":
                                observaciones_dato = str("")
                            else:
                                observaciones_dato =  str(datos.iat[i,55]) 


                            try:
                                Seguimiento_individual =seguimiento_individual(
                                    fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                    lugar = str(datos.iat[i,1]),
                                    hora_inicio = datetime.strptime(str(datos.iat[i,2]),'%H:%M'),
                                    hora_finalización= datetime.strptime(str(datos.iat[i,3]),'%H:%M'),
                                    objetivos= objetivo_dato,
                                    individual= individual_dato,
                                    riesgo_individual= riesgo_individual_dato,
                                    autoconocimiento= bool(datos.iat[i,7]),
                                    rasgos_de_personalidad=bool(datos.iat[i,8]),
                                    identificación=bool(datos.iat[i,9]),
                                    red_de_apoyo=bool(datos.iat[i,10]),
                                    proyecto_de_vida= bool(datos.iat[i,11]),
                                    salud=bool(datos.iat[i,12]),
                                    aspectos_motivacionales=bool(datos.iat[i,13]),
                                    historia_de_vida=bool(datos.iat[i,14]),
                                    relación_eriótico_afectivas=bool(datos.iat[i,15]),
                                    diversidad_sexual=bool(datos.iat[i,16]),
                                    familiar=familiar_dato,
                                    riesgo_familiar=riesgo_familiar_dato,
                                    dinamica_familiar=bool(datos.iat[i,19]),
                                    academico=academico_dato,
                                    riesgo_academico= riesgo_academico_dato,
                                    desempeño_académico=bool(datos.iat[i,22]),
                                    elección_vocacional=bool(datos.iat[i,23]),
                                    manejo_del_tiempo =bool(datos.iat[i,24]),
                                    economico=economico_dato,
                                    riesgo_economico=riesgo_economico_dato,
                                    apoyos_económicos_institucionales=bool(datos.iat[i,27]),
                                    manejo_finanzas=bool(datos.iat[i,28]),
                                    apoyo_económico_familiar=bool(datos.iat[i,29]),
                                    situación_laboral_ocupacional=bool(datos.iat[i,30]),
                                    vida_universitaria_ciudad=vida_universitaria_ciudad_dato,
                                    riesgo_vida_universitaria_ciudad=riesgo_vida_universitaria_ciudad_dato,
                                    motivación_compañamiento=bool(datos.iat[i,33]),
                                    referencia_geográfica=bool(datos.iat[i,34]),
                                    adaptación_ciudad_Universidad=bool(datos.iat[i,35]),
                                    oferta_servicios=bool(datos.iat[i,36]),
                                    vivienda=bool(datos.iat[i,37]),
                                    vinculación_grupos_actividades_extracurriculares=bool(datos.iat[i,38]),

                                    apoyo_académico = bool(datos.iat[i,39]),
                                    taller_par_par = bool(datos.iat[i,40]),
                                    reconocimiento_ciudad_U = bool(datos.iat[i,41]),
                                    rem_profesional_SE = bool(datos.iat[i,42]),
                                    rem_racticante_SE = bool(datos.iat[i,43]),
                                    rem_actividades_grupales = bool(datos.iat[i,44]),
                                    rem_monitorías_académicas = bool(datos.iat[i,45]),
                                    rem_proyectos_Universidad = bool(datos.iat[i,46]),
                                    rem_servicio_salud = bool(datos.iat[i,47]),
                                    rem_registro_académico = bool(datos.iat[i,48]),
                                    rem_matrícula_financiera = bool(datos.iat[i,49]),
                                    rem_desarrollo_humano_promoción_SE = bool(datos.iat[i,50]),
                                    rem_directores_programa = bool(datos.iat[i,51]),
                                    rem_grupos_universidad = bool(datos.iat[i,52]),
                                    rem_externa = bool(datos.iat[i,53]),
                                    Ninguna_acción_realizada = bool(datos.iat[i,54]),

                                    observaciones=observaciones_dato,
                                    revisado_profesional = bool(datos.iat[i,56]),
                                    revisado_practicante = bool(datos.iat[i,57]),
                                    primer_acercamiento =bool(datos.iat[i,58]),
                                    cierre =bool(datos.iat[i,59]),

                                    id_creador = consulta_creador,
                                    id_modificador = None,
                                    id_estudiante =  consulta_estudiante,

                                )
                                list_fichas.append(Seguimiento_individual)
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Se cargó correctamente la fichaW del estudiante con id: '+str(datos.iat[i,60])+'.'
                                }
                                list_dict_result.append(dict_result)
                            except:
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,60])+'.'
                                }
                                list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,60])+'.'
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'El usuario suministrado como creador de la ficha no existe.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            seguimiento_individual.objects.bulk_create(list_fichas)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los seguimientos.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_fichas2(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (User.objects.filter(id = datos.iat[i,75]).values()):
                consulta_creador= User.objects.get(id =datos.iat[i,75])



                if (estudiante.objects.filter(id = datos.iat[i,74]).values()):
                    consulta_estudiante= estudiante.objects.get(id =datos.iat[i,74])
                    if (seguimiento_individual.objects.filter(fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                                            hora_inicio = datetime.strptime(str(datos.iat[i,2]),'%H:%M'),
                                                            hora_finalización= datetime.strptime(str(datos.iat[i,3]),'%H:%M'),
                                                            id_creador = consulta_creador,
                                                            id_estudiante =  consulta_estudiante,).first()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe esta ficha.'
                        }
                        list_dict_result.append(dict_result)
                    else:
                            if math.isnan(datos.iat[i,8]):
                                riesgo_individual_dato = int('-1')
                            else:
                                riesgo_individual_dato =  int(datos.iat[i,8]) 
                            if math.isnan(datos.iat[i,20]):
                                riesgo_familiar_dato = int('-1')
                            else:
                                riesgo_familiar_dato =  int(datos.iat[i,20])  
                            if math.isnan(datos.iat[i,23]):
                                riesgo_academico_dato = int('-1')
                            else:
                                riesgo_academico_dato =  int(datos.iat[i,23]) 
                            if math.isnan(datos.iat[i,28]):
                                riesgo_economico_dato = int('-1')
                            else:
                                riesgo_economico_dato =  int(datos.iat[i,28]) 
                            if math.isnan(datos.iat[i,34]):
                                riesgo_vida_universitaria_ciudad_dato = int('-1')
                            else:
                                riesgo_vida_universitaria_ciudad_dato =  int(datos.iat[i,34]) 

                            if str(datos.iat[i,4]) == "nan":
                                objetivo1_dato = str("")
                            else:
                                objetivo1_dato =  str(datos.iat[i,4])

                            if str(datos.iat[i,5]) == "nan":
                                objetivo2_dato = str("")
                            else:
                                objetivo2_dato =  str(datos.iat[i,5])

                            if str(datos.iat[i,6]) == "nan":
                                objetivo3_dato = str("")
                            else:
                                objetivo3_dato =  str(datos.iat[i,6])

                            if str(datos.iat[i,7]) == "nan":
                                individual_dato = str("")
                            else:
                                individual_dato =  str(datos.iat[i,7]) 

                            if str(datos.iat[i,19])== "nan":
                                familiar_dato = str("")
                            else:
                                familiar_dato =  str(datos.iat[i,19]) 

                            if str(datos.iat[i,22])=="nan":
                                academico_dato = str("")
                            else:
                                academico_dato =  str(datos.iat[i,22]) 

                            if str(datos.iat[i,27])=="nan":
                                economico_dato = str("")
                            else:
                                economico_dato =  str(datos.iat[i,27]) 

                            if str(datos.iat[i,33]) == "nan":
                                vida_universitaria_ciudad_dato = str("")
                            else:
                                vida_universitaria_ciudad_dato =  str(datos.iat[i,33]) 

                            if str(datos.iat[i,69]) == "nan":
                                observaciones_dato = str("")
                            else:
                                observaciones_dato =  str(datos.iat[i,69]) 


                            try:
                                Seguimiento_individual =seguimiento_individual(
                                    fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                    lugar = str(datos.iat[i,1]),
                                    hora_inicio = datetime.strptime(str(datos.iat[i,2]),'%H:%M'),
                                    hora_finalización= datetime.strptime(str(datos.iat[i,3]),'%H:%M'),
                                    objetivos= objetivo1_dato,
                                    objetivos2= objetivo2_dato,
                                    objetivos3= objetivo3_dato,
                                    individual= individual_dato,
                                    riesgo_individual= riesgo_individual_dato,
                                    autoconocimiento= bool(datos.iat[i,9]),
                                    rasgos_de_personalidad=bool(datos.iat[i,10]),
                                    identificación=bool(datos.iat[i,11]),
                                    red_de_apoyo=bool(datos.iat[i,12]),
                                    proyecto_de_vida= bool(datos.iat[i,13]),
                                    salud=bool(datos.iat[i,14]),
                                    aspectos_motivacionales=bool(datos.iat[i,15]),
                                    historia_de_vida=bool(datos.iat[i,16]),
                                    relación_eriótico_afectivas=bool(datos.iat[i,17]),
                                    diversidad_sexual=bool(datos.iat[i,18]),
                                    familiar=familiar_dato,
                                    riesgo_familiar=riesgo_familiar_dato,
                                    dinamica_familiar=bool(datos.iat[i,21]),
                                    academico=academico_dato,
                                    riesgo_academico= riesgo_academico_dato,
                                    desempeño_académico=bool(datos.iat[i,24]),
                                    elección_vocacional=bool(datos.iat[i,25]),
                                    manejo_del_tiempo =bool(datos.iat[i,26]),
                                    economico=economico_dato,
                                    riesgo_economico=riesgo_economico_dato,
                                    apoyos_económicos_institucionales=bool(datos.iat[i,29]),
                                    manejo_finanzas=bool(datos.iat[i,30]),
                                    apoyo_económico_familiar=bool(datos.iat[i,31]),
                                    situación_laboral_ocupacional=bool(datos.iat[i,32]),
                                    vida_universitaria_ciudad=vida_universitaria_ciudad_dato,
                                    riesgo_vida_universitaria_ciudad=riesgo_vida_universitaria_ciudad_dato,
                                    motivación_compañamiento=bool(datos.iat[i,35]),
                                    referencia_geográfica=bool(datos.iat[i,36]),
                                    adaptación_ciudad_Universidad=bool(datos.iat[i,37]),
                                    oferta_servicios=bool(datos.iat[i,38]),
                                    vivienda=bool(datos.iat[i,39]),
                                    vinculación_grupos_actividades_extracurriculares=bool(datos.iat[i,40]),

                                    apoyo_académico = bool(datos.iat[i,41]),
                                    taller_par_par = bool(datos.iat[i,42]),
                                    reconocimiento_ciudad_U = bool(datos.iat[i,43]),
                                    rem_profesional_SE = bool(datos.iat[i,44]),
                                    rem_racticante_SE = bool(datos.iat[i,45]),
                                    rem_actividades_grupales = bool(datos.iat[i,46]),
                                    rem_monitorías_académicas = bool(datos.iat[i,47]),
                                    rem_proyectos_Universidad = bool(datos.iat[i,48]),
                                    rem_servicio_salud = bool(datos.iat[i,49]),
                                    rem_registro_académico = bool(datos.iat[i,50]),
                                    rem_matrícula_financiera = bool(datos.iat[i,51]),
                                    rem_desarrollo_humano_promoción_SE = bool(datos.iat[i,52]),
                                    rem_directores_programa = bool(datos.iat[i,53]),
                                    rem_grupos_universidad = bool(datos.iat[i,54]),
                                    rem_externa = bool(datos.iat[i,55]),
                                    Ninguna_acción_realizada = bool(datos.iat[i,56]),

                                    asist_actividades_grupales=bool(datos.iat[i,57]),
                                    asist_monitoria_aca=bool(datos.iat[i,58]),
                                    asist_matricula_financiera=bool(datos.iat[i,59]),
                                    asist_desa_humano=bool(datos.iat[i,60]),
                                    asist_proyect_uni=bool(datos.iat[i,61]),
                                    asist_dir_programa=bool(datos.iat[i,62]),
                                    asist_prof_se=bool(datos.iat[i,63]),
                                    asist_servi_salud=bool(datos.iat[i,64]),
                                    asist_grupo_uni=bool(datos.iat[i,65]),
                                    asist_practicante_se=bool(datos.iat[i,66]),
                                    asist_regis_academico=bool(datos.iat[i,67]),
                                    asist_rem_externa=bool(datos.iat[i,68]),

                                    observaciones=observaciones_dato,
                                    revisado_profesional = bool(datos.iat[i,70]),
                                    revisado_practicante = bool(datos.iat[i,71]),
                                    primer_acercamiento =bool(datos.iat[i,72]),
                                    cierre =bool(datos.iat[i,73]),

                                    id_creador = consulta_creador,
                                    id_modificador = None,
                                    id_estudiante =  consulta_estudiante,

                                )
                                list_fichas.append(Seguimiento_individual)
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Se cargó correctamente la fichaW del estudiante con id: '+str(datos.iat[i,74])+'.'
                                }
                                list_dict_result.append(dict_result)
                            except:
                                dict_result = {
                                    'dato' : datos.iat[i,0],
                                    'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,74])+'.'
                                }
                                list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,74])+'.'
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'El usuario suministrado como creador de la ficha no existe.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            seguimiento_individual.objects.bulk_create(list_fichas)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los seguimientos.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def carga_inasistencias(file):
    list_dict_result = []
    list_inasistencia = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (User.objects.filter(id = datos.iat[i,4]).values()):
                consulta_creador= User.objects.get(id =datos.iat[i,4])


                if (estudiante.objects.filter(id = datos.iat[i,6]).values()):
                    consulta_estudiante= estudiante.objects.get(id =datos.iat[i,6])

                    if (inasistencia.objects.filter(fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                                            id_creador = consulta_creador,
                                                            id_estudiante =  consulta_estudiante,).first()):
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe esta inasistencia.'
                        }
                        list_dict_result.append(dict_result)
                    else:

                        try:
                            if str(datos.iat[i,1]) == "nan":
                                observacion_dato = str("")
                            else:
                                observacion_dato =  str(datos.iat[i,1])

                            Inasistencia =inasistencia(
                                fecha = datetime.strptime(str(datos.iat[i,0]),'%Y-%m-%d'),
                                observaciones=observacion_dato,
                                revisado_profesional = bool(datos.iat[i,2]),
                                revisado_practicante = bool(datos.iat[i,3]),

                                id_creador = consulta_creador,
                                id_modificador = None,
                                id_estudiante =  consulta_estudiante,

                            )
                            list_inasistencia.append(Inasistencia)
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Se cargó correctamente la ficha del estudiante con id: '+str(datos.iat[i,6])+'.'
                            }
                            list_dict_result.append(dict_result)
                        except:
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,6])+'.'
                            }
                            list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al cargar la ficha del estudiante con id: '+str(datos.iat[i,6])+'.'
                    }
                    list_dict_result.append(dict_result)

            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'El usuario suministrado como creador de la ficha no existe.'
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            inasistencia.objects.bulk_create(list_inasistencia)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear las inasistencias.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )


def carga_autorizacion(file):
    list_dict_result = []
    list_autorizacion = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):

            if (estudiante.objects.filter(num_doc = datos.iat[i,4]).values()):
                consulta_estudiante= estudiante.objects.filter(num_doc =datos.iat[i,4]).first()

                if (firma_tratamiento_datos.objects.filter(id_estudiante = consulta_estudiante,).first()):
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Ya existe una firma del estudiante con cédula: '+str(datos.iat[i,4])+'.'
                    }
                    list_dict_result.append(dict_result)
                else:

                    try:
                        if str(datos.iat[i,5]) == "nan":
                            firma_datos = False
                        elif str(datos.iat[i,5]) == "Sí":
                            firma_datos = True
                        elif str(datos.iat[i,5]) == "No":
                            firma_datos = False
                        else:
                            firma_datos =  str(datos.iat[i,5])

                        if str(datos.iat[i,6]) == "nan":
                            firma_imagen = False
                        elif str(datos.iat[i,6]) == "Sí":
                            firma_imagen = True
                        elif str(datos.iat[i,6]) == "No":
                            firma_imagen = False
                        else:
                            firma_imagen =  str(datos.iat[i,6])

                        Firma =firma_tratamiento_datos(
                            id_estudiante =  consulta_estudiante,
                            tipo_id_estudiante= str(datos.iat[i,3]),
                            fecha_firma = datetime.strptime(str(datos.iat[i,0]),'%d/%m/%Y %H:%M:%S'),
                            nombre_firma= str(datos.iat[i,2]),
                            correo_firma= str(datos.iat[i,1]),
                            autoriza_tratamiento_datos= firma_datos,
                            autoriza_tratamiento_imagen= firma_imagen,

                        )
                        list_autorizacion.append(Firma)
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Se cargó correctamente la firma del estudiante con documento: '+str(datos.iat[i,4])+'.'
                        }
                        list_dict_result.append(dict_result)
                    except:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Error al cargar la firma del estudiante con documento: '+str(datos.iat[i,4])+'.'
                        }
                        list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe el estudiante con ID: '+str(datos.iat[i,6])+'.'
                }
                list_dict_result.append(dict_result)

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            firma_tratamiento_datos.objects.bulk_create(list_autorizacion)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear las inasistencias.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )


def carga_vcd_academicos(file):
    list_dict_result = []
    lista_vcd_academico =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        if(usuario_rol.objects.filter(id_usuario =datos.iat[i,0],id_semestre=datos.iat[i,2],estado='ACTIVO').first()):
            consulta_usuario_rol= usuario_rol.objects.filter(id_usuario =datos.iat[i,0],id_semestre=datos.iat[i,2],estado='ACTIVO').first()

            if(facultad.objects.filter(id =datos.iat[i,1]).first()):
                consulta_facultad= facultad.objects.filter(id =datos.iat[i,1]).first()

                if(vcd_academico.objects.filter(id_facultad= consulta_facultad,id_usuario_rol= consulta_usuario_rol)):

                    dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe esta relación: '+str(datos.iat[i,1])
                        }
                    list_dict_result.append(dict_result)

                else:
                    try:
                        Vcd_academico = vcd_academico(
                        id_facultad= consulta_facultad,
                        id_usuario_rol= consulta_usuario_rol,

                        )
                        lista_vcd_academico.append(Vcd_academico)
                    
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Se relacionó correctamente el vicedecano con su facultad: '+str(datos.iat[i,1])
                        }
                        list_dict_result.append(dict_result)
                    except:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ocurrio un Error al relacionar al vicedecano con su facultad: '+str(datos.iat[i,1])
                        }
                        list_dict_result.append(dict_result)
            else:        
                dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'No existe una facultad con el id suministrado: '+str(datos.iat[i,1])
                    }
                list_dict_result.append(dict_result)
        else:        
            dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un usuario_rol relacionado con este id.'
                }
            list_dict_result.append(dict_result)

    vcd_academico.objects.bulk_create(lista_vcd_academico)
    return Response(list_dict_result)

def carga_dir_programa(file):
    list_dict_result = []
    lista_dir_programa =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        if(usuario_rol.objects.filter(id_usuario =datos.iat[i,0],id_semestre=datos.iat[i,3],estado='ACTIVO').first()):
            consulta_usuario_rol= usuario_rol.objects.filter(id_usuario =datos.iat[i,0],id_semestre=datos.iat[i,3],estado='ACTIVO').first()

            if(programa.objects.filter(codigo_univalle =datos.iat[i,1],id_sede=datos.iat[i,2]).first()):
                consulta_programa= programa.objects.filter(codigo_univalle =datos.iat[i,1],id_sede=datos.iat[i,2]).first()
                if(dir_programa.objects.filter(id_programa= consulta_programa,id_usuario_rol= consulta_usuario_rol)):

                    dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ya existe esta relación: '+str(datos.iat[i,1])
                        }
                    list_dict_result.append(dict_result)

                else:
                    try:
                        Dir_programa = dir_programa(
                        id_programa= consulta_programa,
                        id_usuario_rol= consulta_usuario_rol,

                        )
                        lista_dir_programa.append(Dir_programa)
                    
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Se relacionó correctamente el director con su programa: '+str(datos.iat[i,1])
                        }
                        list_dict_result.append(dict_result)
                    except:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Ocurrio un problema al relacionar el director con el programa: '+str(datos.iat[i,1])
                        }
                        list_dict_result.append(dict_result)
                

            else:        
                dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'No existe el programa suministrado: '+str(datos.iat[i,1])
                    }
                list_dict_result.append(dict_result)
        else:        
            dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un usuario_rol relacionado con este id.'
                }
            list_dict_result.append(dict_result)

    dir_programa.objects.bulk_create(lista_dir_programa)
    return Response(list_dict_result)

def cambio_contrasena(file):
    list_dict_result = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            if (User.objects.filter(username = datos.iat[i,0])):
                try:
                    User.objects.filter(username = datos.iat[i,0]).update(password=make_password(datos.iat[i,1]))
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Cambio de contraseña realizado.'
                    }
                    list_dict_result.append(dict_result)
                except:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al cambiar la contraseña.'
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un usuario con este username.'
                }
                list_dict_result.append(dict_result)

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    return Response(list_dict_result)

def carga_estudiantes_aca(file):
    list_dict_result = []
    lista_estudiantes =[]
    
    datos = pd.read_csv(file,header=0)
    try:
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
                    dict_result = {
                        'dato' : datos.iat[i,22],
                        'mensaje' : 'El estudiante existe pero No en este programa.'
                    }
                    list_dict_result.append(dict_result)
            else:
                try:
                    if(datos.iat[i,25]):
                        consulta_cond_excep= cond_excepcion.objects.filter(alias = datos.iat[i,25]).first()
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
                        telefono_res = str(datos.iat[i,9]),
                        email = str(datos.iat[i,10]),
                        acudiente = str(datos.iat[i,11]),
                        telefono_acudiente =str( datos.iat[i,12]),
                        sexo = str(datos.iat[i,13]),
                        colegio = str(datos.iat[i,14]),
                        estamento = str(datos.iat[i,15]),
                        celular = datos.iat[i,16],
                        hijos = datos.iat[i,17],
                        barrio_res_id = int(datos.iat[i,18]),
                        ciudad_res_id = int(datos.iat[i,19]),
                        nombre = str(datos.iat[i,20]),
                        apellido = str(datos.iat[i,21]),
                        cod_univalle = str(datos.iat[i,22]),
                        id_cond_excepcion=consulta_cond_excep,
                        es_academico=True
                        )
                    else:
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
                        cod_univalle = str(datos.iat[i,22]),
                        es_academico=True
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
    
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            estudiante.objects.bulk_create(lista_estudiantes)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los estudiantes.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )
    
def carga_estudiantes_disc(file):
    list_dict_result = []
    lista_estudiantes =[]
    
    datos = pd.read_csv(file,header=0)
    try:
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
                    dict_result = {
                        'dato' : datos.iat[i,22],
                        'mensaje' : 'El estudiante existe pero No en este programa.'
                    }
                    list_dict_result.append(dict_result)
            else:
                try:
                    if(datos.iat[i,25]):
                        consulta_cond_excep= cond_excepcion.objects.filter(alias = datos.iat[i,25]).first()
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
                        telefono_res = str(datos.iat[i,9]),
                        email = str(datos.iat[i,10]),
                        acudiente = str(datos.iat[i,11]),
                        telefono_acudiente =str( datos.iat[i,12]),
                        sexo = str(datos.iat[i,13]),
                        colegio = str(datos.iat[i,14]),
                        estamento = str(datos.iat[i,15]),
                        celular = datos.iat[i,16],
                        hijos = datos.iat[i,17],
                        barrio_res_id = int(datos.iat[i,18]),
                        ciudad_res_id = int(datos.iat[i,19]),
                        nombre = str(datos.iat[i,20]),
                        apellido = str(datos.iat[i,21]),
                        cod_univalle = str(datos.iat[i,22]),
                        id_cond_excepcion=consulta_cond_excep,
                        es_discapacidad=True
                        )
                    else:
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
                        cod_univalle = str(datos.iat[i,22]),
                        es_discapacidad=True
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
    
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            estudiante.objects.bulk_create(lista_estudiantes)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear los estudiantes.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )

def volver_discapacidad(file):
    list_dict_result = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0],cod_univalle =datos.iat[i,1]).first()
            if (consulta_estudiante):
                try:
                    consulta_estudiante.es_discapacidad = True
                    consulta_estudiante.save()
                    dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Se activo correctamente este estudiante.' 
                            }
                    list_dict_result.append(dict_result)
                except:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al activar el estudiante.'
                    }
                    list_dict_result.append(dict_result)   
            
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este numero de documento y código: ' + str(datos.iat[i,1])
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )

    return Response(list_dict_result)

def quitar_discapacidad(file):
    list_dict_result = []
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0],cod_univalle =datos.iat[i,1]).first()
            if (consulta_estudiante):
                try:
                    consulta_estudiante.es_discapacidad = False
                    consulta_estudiante.save()
                    dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Se desactivo correctamente este estudiante.' 
                            }
                    list_dict_result.append(dict_result)
                except:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al activar el estudiante.'
                    }
                    list_dict_result.append(dict_result)   
            
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este numero de documento y código: ' + str(datos.iat[i,1])
                }
                list_dict_result.append(dict_result)
    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    return Response(list_dict_result)

def discapacidad_asignacion(file):
    list_dict_result = []
    lista_asignaciones =[]
    datos = pd.read_csv(file,header=0)
    try:
        for i in range(datos.shape[0]):
            consulta_estudiante = estudiante.objects.filter(cod_univalle =datos.iat[i,0]).first()
            if (consulta_estudiante):
                consulta_usuario= User.objects.filter(username =datos.iat[i,1]).first()
                consulta_usuario_rol= usuario_rol.objects.filter(id_usuario =consulta_usuario,id_semestre=datos.iat[i,2],estado='ACTIVO').first()
                if(consulta_usuario_rol):
                    if(asignacion_discapacidad.objects.filter(id_usuario =consulta_usuario,id_estudiante = consulta_estudiante,id_semestre=datos.iat[i,2]).first()):
                        dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Ya existe esta realción.'
                            }
                        list_dict_result.append(dict_result)
                        
                    else: 
                        try:
                            Asignacion= asignacion_discapacidad(
                                id_usuario = consulta_usuario,
                                id_estudiante = consulta_estudiante,
                                id_semestre = semestre.objects.get(id = int(datos.iat[i,2])),
                                estado = True
                            )
                            lista_asignaciones.append(Asignacion)

                            dict_result = {
                                        'dato' : datos.iat[i,0],
                                        'mensaje' : 'Se relacionó correctamente este estudiante.' 
                                    }
                            list_dict_result.append(dict_result)
                        except:
                            dict_result = {
                                'dato' : datos.iat[i,0],
                                'mensaje' : 'Error al relacionar este estudiante.'
                            }
                            list_dict_result.append(dict_result)        
                        
                else:        
                    dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'No existe un usuario_rol relacionado a este usuario: ' + str(datos.iat[i,1])
                        }
                    list_dict_result.append(dict_result) 
            
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'No existe un estudiante con este código.'
                }
                list_dict_result.append(dict_result)

    except Exception as e:
                error_detail = str(e)
                return Response(
                    {"error": "Ocurrió un error al procesar los datos.", "detail": error_detail},
                    status=status.HTTP_400_BAD_REQUEST
                )
    try:
        with transaction.atomic():
            asignacion_discapacidad.objects.bulk_create(lista_asignaciones)
        return Response(list_dict_result, status=status.HTTP_201_CREATED)

    except Exception as e:
        error_detail = str(e)
        return Response(
            {"error": "Ocurrió un error al intentar crear las inasistencias.", "detail": error_detail},
            status=status.HTTP_400_BAD_REQUEST
        )



