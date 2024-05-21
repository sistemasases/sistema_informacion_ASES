import pandas as pd
import numpy as np
import joblib
from urllib.request import urlopen
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import os

test_data_url = 'https://raw.githubusercontent.com/MavelSterling/datos_ML/main/test_data_mayo.csv'

# Cargar datos desde la URL
datos_usuario = pd.read_csv(test_data_url)

# Eliminar la última columna
datos_usuario = datos_usuario.drop(columns=datos_usuario.columns[-1])

#print("Nombres de las columnas en el DataFrame:", datos_usuario.columns)

# Renombrar las columnas en el DataFrame para el modelo
nombres_columnas = {
    'periodo_matricula': 'periodo_matricula',
    'edad': 'EA_Edad',
    'sexo': 'EA_Sexo',
    'pais_nac': 'EA_Pasdenacimiento',
    'departamento_nac': 'EA_departamentodenacimiento',
    'municipio_nac': 'EA_Municipiodenacimiento',
    'discapacidad': 'EA_Tienealgntipodediscapac',
    'estadocivil': 'EA_Estadocivil',
    'cultura': 'EA_Deacuerdoconsuculturapu',
    'estrato_actual': 'EA_Estratodelaresidenciaactu',
    'pais_res': 'EA_Pasdelaresidenciaactual',
    'departamento_res': 'EA_Departamentodelaresidencia',
    'municipio_res': 'EA_Municipiodelaresidenciaac',
    'lugar_adeacuado': 'EA_Consideraustedquetieneun',
    'ocupacion_estu': 'EA_Ocupacindelestudiante',
    'ingresos_hogar': 'EA_Ingresosmensualesdelhogar',
    'gastos_hogar': 'EA_GastosmensualesdelhogarG',
    'max_nivel_educativo_padre': 'EA_Mximoniveleducativodelpa',
    'max_nivel_educativo_madre': 'EA_Mximoniveleducativodela',
    'ingresos_suficientes': 'EA_Consideraquelosingresosd',
    'hijos': 'EA_Cuntoshijostiene',
    'cambiar_programa': 'EA_Piensaafuturocambiarsede',
    'habilidades_mate': 'EA_Indiqueycalifiquesushabil',
    'tiene_acceso_computador': 'EA_Tieneaccesoacomputador',
    'tiene_accesoa_internet': 'EA_TieneaccesoaInternet',
    'facultad': 'EA_Facultad',
    'prueba_diagnostica': 'EA_PruebaDiagnostica'
}

# Renombrar las columnas en el DataFrame
datos_usuario.rename(columns=nombres_columnas, inplace=True)

# Imprimir los nombres de las columnas después de renombrar
#print("Nombres de las columnas después de renombrar:", datos_usuario.columns)


datos_usuario.rename(columns=nombres_columnas, inplace=True)

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
        datos_usuario[col] = datos_usuario[col].astype(str)

    # Transformar datos del DataFrame usando el preprocesador
    datos_preprocesados = preprocesador.transform(datos_usuario)
    
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
    resultados_df = datos_usuario.copy()
    resultados_df['Probabilidad de aprobar'] = np.round(probabilidades_clase_positiva, 4)
    resultados_df['Mensaje'] = mensajes

    return resultados_df


# Llamar a la función con los datos cargados
resultados_mensaje = predecir_usuario(datos_usuario)
print(resultados_mensaje)
