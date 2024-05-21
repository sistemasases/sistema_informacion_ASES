import pandas as pd
import numpy as np
import joblib
from urllib.request import urlopen
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import os

# Función para cargar el modelo y realizar predicciones para un solo usuario
def predecir_usuarios(datos_estudiantes):
    # URL del preprocesador en GitHub (enlace raw)
    url_preprocesador = 'https://raw.githubusercontent.com/sistemasases/sistema_informacion_ASES/mavelyn/back-end/modulo_ia/preprocesador.pkl'
    
    # Descargar el preprocesador desde la URL
    response_preprocesador = urlopen(url_preprocesador)
    # Cargar el preprocesador
    preprocesador = joblib.load(response_preprocesador)
    
    # URL del modelo en GitHub (enlace raw)
    url_modelo = 'https://raw.githubusercontent.com/sistemasases/sistema_informacion_ASES/mavelyn/back-end/modulo_ia/mejor_modelo.pkl'
    
    # Descargar el modelo desde la URL
    response = urlopen(url_modelo)
    # Cargar el modelo entrenado
    modelo = joblib.load(response)
    
    # Variables categóricas
    cat_attribs = ['periodo_matricula', 'EA_Sexo', 'EA_Pasdenacimiento', 'EA_departamentodenacimiento',
                   'EA_Municipiodenacimiento', 'EA_Tienealgntipodediscapac', 'EA_Estadocivil',
                   'EA_Deacuerdoconsuculturapu', 'EA_Estratodelaresidenciaactu', 'EA_Pasdelaresidenciaactual',
                   'EA_Departamentodelaresidencia', 'EA_Municipiodelaresidenciaac', 'EA_Consideraustedquetieneun',
                   'EA_Ocupacindelestudiante', 'EA_Ingresosmensualesdelhogar', 'EA_GastosmensualesdelhogarG',
                   'EA_Mximoniveleducativodelpa', 'EA_Mximoniveleducativodela', 'EA_Consideraquelosingresosd',
                   'EA_Cuntoshijostiene', 'EA_Piensaafuturocambiarsede', 'EA_Indiqueycalifiquesushabil',
                   'EA_Tieneaccesoacomputador', 'EA_TieneaccesoaInternet', 'EA_Facultad']
    
    for col in cat_attribs:
        datos_estudiantes[col] = datos_estudiantes[col].astype(str)

    # Transformar datos del DataFrame usando el preprocesador
    datos_preprocesados = preprocesador.transform(datos_estudiantes)
    
    # Realizar las predicciones
    probabilidades_clase_positiva = modelo.predict_proba(datos_preprocesados)[:, 0]

    # Generar mensajes basados en la probabilidad de aprobar
    mensajes = []
    for prob in probabilidades_clase_positiva:
        if prob < 0.5:
            mensaje = ("De acuerdo al resultado prueba diagnostica y las características de estudiantes, "
                       "te recomendamos asistir al cursillo de nivelación por 2 semanas, también asistir las monitorias "
                       "del departamento de matemáticas o las monitorias académicas de ASES.")
        else:
            mensaje = ("De acuerdo al resultado prueba diagnostica y las características de estudiantes, "
                       "te recomendamos seguir estudiando y en caso que necesites asistir a las monitorias del departamento "
                       "de matemáticas o las monitorias académicas de ASES.")
        mensajes.append(mensaje)

    # Crear un DataFrame con los resultados
    resultados_df = datos_estudiantes.copy()
    resultados_df['Probabilidad de aprobar'] = np.round(probabilidades_clase_positiva, 4)
    resultados_df['Mensaje'] = mensajes

    return resultados_df