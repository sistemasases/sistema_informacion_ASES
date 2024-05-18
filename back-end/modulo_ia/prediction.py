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
def predecir_usuario(datos_usuario):
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

    # Convertir datos_usuario en DataFrame
    datos_usuario_df = pd.DataFrame(datos_usuario, columns=['periodo_matricula', 'EA_Edad', 'EA_Sexo',
       'EA_Pasdenacimiento', 'EA_departamentodenacimiento',
       'EA_Municipiodenacimiento', 'EA_Tienealgntipodediscapac',
       'EA_Estadocivil', 'EA_Deacuerdoconsuculturapu',
       'EA_Estratodelaresidenciaactu', 'EA_Pasdelaresidenciaactual',
       'EA_Departamentodelaresidencia', 'EA_Municipiodelaresidenciaac',
       'EA_Consideraustedquetieneun', 'EA_Ocupacindelestudiante',
       'EA_Ingresosmensualesdelhogar', 'EA_GastosmensualesdelhogarG',
       'EA_Mximoniveleducativodelpa', 'EA_Mximoniveleducativodela',
       'EA_Consideraquelosingresosd', 'EA_Cuntoshijostiene',
       'EA_Piensaafuturocambiarsede', 'EA_Indiqueycalifiquesushabil',
       'EA_Tieneaccesoacomputador', 'EA_TieneaccesoaInternet', 'EA_Facultad',
       'CAL_pruebadiagnosticamate', 'CALIFICACION_SEMESTRE'])  # Reemplaza con tus nombres de columnas

    # Variables categóricas
    cat_attribs = ['periodo_matricula', 'EA_Sexo', "EA_Pasdenacimiento",
               'EA_departamentodenacimiento',
       'EA_Municipiodenacimiento', 'EA_Tienealgntipodediscapac',
       'EA_Estadocivil', 'EA_Deacuerdoconsuculturapu',
       'EA_Estratodelaresidenciaactu',
       'EA_Pasdelaresidenciaactual',
       'EA_Departamentodelaresidencia', 'EA_Municipiodelaresidenciaac',
       'EA_Consideraustedquetieneun', 'EA_Ocupacindelestudiante',
       'EA_Mximoniveleducativodelpa',
       'EA_Mximoniveleducativodela',
       'EA_Consideraquelosingresosd',
       'EA_Piensaafuturocambiarsede',
       'EA_Indiqueycalifiquesushabil',
       'EA_Tieneaccesoacomputador',
       'EA_TieneaccesoaInternet', 'EA_Facultad']
    
    # Convertir todas las variables categóricas a tipo string en los datos del usuario
    for col in cat_attribs:
        datos_usuario_df[col] = datos_usuario_df[col].astype(str)

    # Transformar datos del usuario usando el preprocesador
    datos_usuario_preprocesados = preprocesador.transform(datos_usuario_df)

    # Realizar la predicción
    probabilidad_clase_positiva = modelo.predict_proba(datos_usuario_preprocesados)[0, 1]
    
    # Mensaje basado en la probabilidad de aprobar
    if probabilidad_clase_positiva < 0.5:
        mensaje = ("De acuerdo al resultado prueba diagnostica y las características de estudiantes, "
                   "te recomendamos asistir al cursillo de nivelación por 2 semanas, también asistir las monitorias "
                   "del departamento de matemáticas o las monitorias académicas de ASES.")
    else:
        mensaje = ("De acuerdo al resultado prueba diagnostica y las características de estudiantes, "
                   "te recomendamos seguir estudiando y en caso que necesites asistir a las monitorias del departamento "
                   "de matemáticas o las monitorias académicas de ASES.")
    
    return probabilidad_clase_positiva, mensaje


