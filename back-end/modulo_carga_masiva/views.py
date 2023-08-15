from urllib import request
from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
from modulo_usuario_rol.models import estudiante
from django.contrib.auth.models import User
from modulo_programa.models import programa, programa_estudiante, estado_programa
from modulo_carga_masiva.models import retiro, motivo
from modulo_academico.models import historial_academico, materia, facultad
from modulo_instancia.models import semestre, sede
from modulo_seguimiento.models import seguimiento_individual, inasistencia
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from modulo_carga_masiva import serializers
from datetime import datetime

# Create your views here.

def carga_test(request):
    return render(request, "prueba_carga.html")

class Validador_carga(APIView):
    def post(self,request):
            tipo = request.data.get('tipo_de_carga')
            file = request.data.get('FILES')
            if(tipo == 'Estudiante'):
                return carga_estudiantes(file)
            elif(tipo == "Programa_estudiante"):
                return carga_programa_estudiante(file)
            elif(tipo == "Usuario"):
                return carga_usuarios(file)
            elif(tipo == "Programa"):
                return carga_programas(file)
            elif(tipo == "Materia"):
                return carga_materias(file)
            # elif(tipo == "Nota"):
            #     return carga_notas(file)
            elif(tipo == "Retiro"):
                return carga_retiros(file)
            elif(tipo == "Ficha"):
                return carga_fichas(file)
            elif(tipo == "Estudiante_Cohorte"):
                return carga_estudiante_cohorte(file)
            elif(tipo == "Vcd_academico"):
                return carga_vcd_academicos(file)
            elif(tipo == "Dir_programa"):
                return carga_dir_programa(file)
            else:
                return Response({'ERROR': 'No se selecciono un tipo de carga valido.'})

def carga_estudiantes(file):
    list_dict_result = []
    lista_estudiantes =[]
    
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
    
def carga_programa_estudiante(file):
    list_dict_result = []
    lista_programa_estudiante =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        if (estudiante.objects.filter(num_doc = datos.iat[i,0]).first()):
            consulta_estudiante = estudiante.objects.filter(num_doc = datos.iat[i,0]).first()
            if(programa.objects.filter(codigo_univalle= datos.iat[i,1],id_sede = datos.iat[i,2]).first()):
                consulta_programa = programa.objects.filter(codigo_univalle= datos.iat[i,1],id_sede = datos.iat[i,2]).first()
                if(programa_estudiante.objects.filter(id_estudiante = consulta_estudiante,id_programa=consulta_programa).values()):
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Este estudiante ya está matriculado en este programa.'
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
                                    'mensaje' : 'Se relacionó correctamente este estudiante con su programa.'
                                }
                        list_dict_result.append(dict_result)
                    except:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Error al relacionar el estudiante con su programa.'
                        }
                        list_dict_result.append(dict_result)   
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'El programa al que se quiere matricular el estudiante no existe.'
                }
                list_dict_result.append(dict_result) 
        else:
            dict_result = {
                'dato' : datos.iat[i,0],
                'mensaje' : 'No existe un estudiante con este numero de documento.'
            }
            list_dict_result.append(dict_result)

    programa_estudiante.objects.bulk_create(lista_programa_estudiante)
    return Response(list_dict_result)

def carga_usuarios(file):
    list_dict_result = []
    lista_usuarios =[]
    datos = pd.read_csv(file,header=0)
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
                password = make_password("ases2023"),
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
    list_dict_result = []
    lista_programas =[]
    datos = pd.read_csv(file,header=0)
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
    programa.objects.bulk_create(lista_programas)
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
                consulta_profesor= User.objects.get(username =datos.iat[i,6])
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

# def carga_notas(file):
#     print("entro al carga_notas")
#     list_dict_result = []
#     lista_notas =[]
#     datos = pd.read_csv(file,header=0)
#     for i in range(datos.shape[0]):
#         try:
#             consulta_programa_estudiante= programa_estudiante.objects.get(id =datos.iat[i,0])
#             consulta_semestre= semestre.objects.get(id =datos.iat[i,1])
#             consulta_estudiante= estudiante.objects.get(id =datos.iat[i,5])
#             Nota = historial_academico(
#             id_programa_estudiante= consulta_programa_estudiante,
#             id_semestre= consulta_semestre,
#             promedio_semestral = float(datos.iat[i,2]),
#             promedio_acumulado= float(datos.iat[i,3]),
#             json_materias = str(datos.iat[i,4]),
#             id_estudiante= consulta_estudiante,

#             )
#             lista_notas.append(Nota)

#             dict_result = {
#                 'dato' : datos.iat[i,1],
#                 'mensaje' : 'Se cargó correctamente este registro de notas'
#             }
#             list_dict_result.append(dict_result)
#         except:
#             dict_result = {
#                 'dato' : datos.iat[i,1],
#                 'mensaje' : 'Error al cargar este registro de notas.'
#             }
#             list_dict_result.append(dict_result)

#     historial_academico.objects.bulk_create(lista_notas)
#     return Response(list_dict_result)

def carga_retiros(file):
    list_dict_result = []
    lista_retiros =[]
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        try:
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

def carga_fichas(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        print(datos.iat[i,60])
        if (User.objects.filter(id = datos.iat[i,60]).values()):
            consulta_creador= User.objects.get(id =datos.iat[i,60])

            if (User.objects.filter(id = datos.iat[i,61]).values()):
                consulta_editor= User.objects.get(id =datos.iat[i,61])

                if (estudiante.objects.filter(id = datos.iat[i,62]).values()):
                    consulta_estudiante= estudiante.objects.get(id =datos.iat[i,62])

                    try:
                        Seguimiento_individual =seguimiento_individual(
                            fecha = datetime.strptime(str(datos.iat[i,0]),'%d/%m/%Y'),
                            lugar = str(datos.iat[i,1]),
                            hora_inicio = datetime.strptime(str(datos.iat[i,2]),'%H:%M %p'),
                            hora_finalización= datetime.strptime(str(datos.iat[i,3]),'%H:%M %p'),
                            objetivos= str(datos.iat[i,4]),
                            individual= str(datos.iat[i,5]),
                            riesgo_individual= int(datos.iat[i,6]),
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
                            familiar=str(datos.iat[i,17]),
                            riesgo_familiar=int(datos.iat[i,18]),
                            dinamica_familiar=bool(datos.iat[i,19]),
                            academico=str(datos.iat[i,20]),
                            riesgo_academico= int(datos.iat[i,21]),
                            desempeño_académico=bool(datos.iat[i,22]),
                            elección_vocacional=bool(datos.iat[i,23]),
                            manejo_del_tiempo =bool(datos.iat[i,24]),
                            economico=str(datos.iat[i,25]),
                            riesgo_economico=int(datos.iat[i,26]),
                            apoyos_económicos_institucionales=bool(datos.iat[i,27]),
                            manejo_finanzas=bool(datos.iat[i,28]),
                            apoyo_económico_familiar=bool(datos.iat[i,29]),
                            situación_laboral_ocupacional=bool(datos.iat[i,30]),
                            vida_universitaria_ciudad=str(datos.iat[i,31]),
                            riesgo_vida_universitaria_ciudad=int(datos.iat[i,32]),
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

                            observaciones=str(datos.iat[i,55]),
                            revisado_profesional = bool(datos.iat[i,56]),
                            revisado_practicante = bool(datos.iat[i,57]),
                            primer_acercamiento =bool(datos.iat[i,58]),
                            cierre =bool(datos.iat[i,59]),

                            id_creador = consulta_creador,
                            id_modificador = consulta_editor,
                            id_estudiante =  consulta_estudiante,

                        )
                        list_fichas.append(Seguimiento_individual)
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Se cargó correctamente la ficha del estudiante con id: '+str(datos.iat[i,62])+'.'
                        }
                        list_dict_result.append(dict_result)
                    except:
                        dict_result = {
                            'dato' : datos.iat[i,0],
                            'mensaje' : 'Error al cargar este la ficha del estudiante con id: '+str(datos.iat[i,62])+'.'
                        }
                        list_dict_result.append(dict_result)
                else:
                    dict_result = {
                        'dato' : datos.iat[i,0],
                        'mensaje' : 'Error al cargar este la ficha del estudiante con id: '+str(datos.iat[i,62])+'.'
                    }
                    list_dict_result.append(dict_result)
            else:
                dict_result = {
                    'dato' : datos.iat[i,0],
                    'mensaje' : 'El usuario suministrado como editor de la ficha no existe.'
                }
                list_dict_result.append(dict_result)
        else:
            dict_result = {
                'dato' : datos.iat[i,0],
                'mensaje' : 'El usuario suministrado como creador de la ficha no existe.'
            }
            list_dict_result.append(dict_result)
    seguimiento_individual.objects.bulk_create(list_fichas)
    return Response(list_dict_result)

def carga_estudiante_cohorte(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        try:
            Seguimiento_individual =seguimiento_individual(

            )
            list_fichas.append(Seguimiento_individual)
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
    retiro.objects.bulk_create(list_fichas)
    return Response(list_dict_result)

def carga_vcd_academicos(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        try:
            Seguimiento_individual =seguimiento_individual(

            )
            list_fichas.append(Seguimiento_individual)
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
    retiro.objects.bulk_create(list_fichas)
    return Response(list_dict_result)
def carga_dir_programa(file):
    list_dict_result = []
    list_fichas = []
    datos = pd.read_csv(file,header=0)
    for i in range(datos.shape[0]):
        try:
            Seguimiento_individual =seguimiento_individual(

            )
            list_fichas.append(Seguimiento_individual)
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
    retiro.objects.bulk_create(list_fichas)
    return Response(list_dict_result)
