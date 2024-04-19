from django.contrib import admin

from modulo_usuario_rol.models import datos_prediccion
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from imblearn.over_sampling import SMOTE
import pandas as pd

from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import numpy as np


# Register your models here.


def prepare_and_transform_data():
    # Carga de datos desde la base de datos
    queryset = datos_prediccion.objects.all().values(
        'cultura', 'lugar_adecuado_estudio', 'ocupacion', 'max_lvl_estudio_padre',
        'max_lvl_estudio_madre', 'ingresos_mensuales', 'gastos_mensuales',
        'ingresos_suficientes', 'cambiar_programa', 'habilidades_razonamiento',
        'acceso_computador', 'acceso_internet', 'calificacion_prueba_diagnostica',
        'estado_civil', 'ciudad_res', 'sexo', 'hijos', 'anio_ingreso','ciudad_nac',
        'discap_men','estrato','pais_nac','depart_nac','pais_res','depart_res','facultad',
        'edad'
    )
    data_frame = pd.DataFrame.from_records(queryset)


    # Definición de atributos categóricos y numéricos
    cat_attribs = ['cultura', 'ocupacion', 'max_lvl_estudio_padre', 'max_lvl_estudio_madre',
                   'habilidades_razonamiento','estado_civil', 'ciudad_res', 'ciudad_nac',
                   'lugar_adecuado_estudio','acceso_internet','acceso_computador',
                   'anio_ingreso','sexo','cambiar_programa','discap_men','estrato',
                   'pais_nac','depart_nac','pais_res','depart_res','facultad','ingresos_suficientes']
    
    num_attribs = ['ingresos_mensuales', 'gastos_mensuales', 'edad','hijos']

    # Pipelines para procesamiento
    cat_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("cat_encoder", OneHotEncoder(sparse=False, handle_unknown='ignore'))
    ])

    num_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])

    full_pipeline = ColumnTransformer([
        ("num", num_pipeline, num_attribs),
        ("cat", cat_pipeline, cat_attribs),
    ])

    # Aplicar transformaciones
    X = full_pipeline.fit_transform(data_frame)
    y = data_frame['calificacion_prueba_diagnostica'].values

    # División de datos en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Balanceo de clases con SMOTE
    smote = SMOTE(random_state=123)
    X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

    return X_train_balanced, y_train_balanced, X_test, y_test



def train_and_evaluate_models(X_train, y_train, X_test, y_test):
    resultados = []
    topologias = [(10,), (10, 10), (20,), (20, 20), (30,)]
    func_activacion = ["relu", "logistic"]
    solvers = ["adam", "sgd"]

    for topologia in topologias:
        for activacion in func_activacion:
            for solver in solvers:
                model = MLPClassifier(hidden_layer_sizes=topologia, activation=activacion, solver=solver, random_state=123)
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
                accuracy = round(accuracy_score(y_test, y_pred), 4)
                confusion = confusion_matrix(y_test, y_pred)
                resultados.append({
                    "Topología": topologia,
                    "Función de activación": activacion,
                    "Solver": solver,
                    "Accuracy": accuracy,
                    "Matriz de confusión": confusion
                })

    # DataFrame de resultados
    resultado_Riesgo = pd.DataFrame(resultados)
    mejor_modelo = resultado_Riesgo.loc[resultado_Riesgo['Accuracy'].idxmax()]

    # Entrenar y evaluar el mejor modelo
    modelo_mejor = MLPClassifier(hidden_layer_sizes=mejor_modelo['Topología'],
                                 activation=mejor_modelo['Función de activación'],
                                 solver=mejor_modelo['Solver'], random_state=123)
    modelo_mejor.fit(X_train, y_train)
    y_pred_proba = modelo_mejor.predict_proba(X_test)
    
    # Probabilidades de clase
    probabilidad_clase_positiva_test = np.round(y_pred_proba[:, 1], 3)
    probabilidad_clase_positiva_test_0 = np.round(y_pred_proba[:, 0], 3)

    # DataFrame con predicciones
    df_test = pd.DataFrame(X_test)
    df_test['Probabilidad_Clase_No_Aprobar'] = probabilidad_clase_positiva_test
    df_test['Probabilidad_Clase_Aprobar'] = probabilidad_clase_positiva_test_0
    df_test['Prediccion'] = modelo_mejor.predict(X_test)

    # Mensaje basado en la probabilidad de aprobar
    df_test['Mensaje'] = df_test['Probabilidad_Clase_Aprobar'].apply(
        lambda x: "De acuerdo al resultado prueba diagnostica, te recomendamos asistir al cursillo de nivelación por 2 semanas, también asistir las monitorias del departamento de matemáticas."
        if x < 0.5 else "De acuerdo al resultado prueba diagnostica, te recomendamos seguir estudiando y en caso que necesites asistir a las monitorias del departamento de matemáticas."
    )

    # Seleccionar columnas relevantes para mostrar
    return df_test[['CALIFICACION_SEMESTRE', 'Probabilidad_Clase_No_Aprobar', 'Probabilidad_Clase_Aprobar', 'Prediccion', 'Mensaje']]




