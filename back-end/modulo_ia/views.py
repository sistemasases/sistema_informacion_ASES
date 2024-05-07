from django.shortcuts import render
from modulo_usuario_rol import *
from modulo_ia.models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import  *
from modulo_ia.admin import *
from datetime import datetime

# Create your views here.


class predictor(APIView):
    def prediccion_red(codigo_estu):
        datos_estudiante = estudiante.objects.filter(codigo=codigo_estu).values()
        datos_datos_prediccion = datos_prediccion.objects.filter(id_estudiante=datos_estudiante.id).values()
        cultura_estudiante = datos_datos_prediccion['cultura']
       
        ano_actual = datetime.now().year
        edad_estudiante = ano_actual- datos_estudiante["fecha_nac"].year()
        
        valores={}
        return(valores)

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


        # Cuando se va a entrenar un nuevo modelo y seleccion de parametros
    def seleccion_prediccion_modelos(X_train, y_train, X_test, y_test):
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
                        y_pred_proba = model.predict_proba(X_test)[:, 1]  # Asume que la clase positiva está en la columna 1
                        auc_score = roc_auc_score(y_test, y_pred_proba)

                        resultados.append({
                            "Topología": topologia,
                            "Función de activación": activacion,
                            "Solver": solver,
                            "Accuracy": accuracy,
                            "Matriz de confusión": confusion,
                            "AUC": auc_score
                        })

            # DataFrame de resultados
            resultado_Riesgo = pd.DataFrame(resultados)
            mejor_modelo = resultado_Riesgo.loc[resultado_Riesgo['AUC'].idxmax()]

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


    
    def post(self,request):
        codigo_estudiante = request.data['codigo']
        print(codigo_estudiante)
        #valores = self.prediccion_red(codigo_estudiante)
        list_total_datos =[]
        
        #probabilidad_apro_valor = train_and_evaluate_models['Probabilidad_Clase_Aprobar']
        #prediccion_valor = train_and_evaluate_models['Prediccion']
        #mensaje_valor = train_and_evaluate_models['Mensaje']
        #datos_respuesta = {
        #            'Probabilidad_Clase_Aprobar': probabilidad_apro_valor,
        #            'Prediccion': prediccion_valor,
        #            'Mensaje': mensaje_valor,
        #            }
        #list_total_datos.append(datos_respuesta)
        #return Response(list_total_datos,status=status.HTTP_200_OK)
        
        try:
            # Acceso a datos del estudiante y su id
            estudiante_data = estudiante.objects.get(codigo=codigo_estudiante)
            datos_prediccion = datos_prediccion.objects.filter(estudiante_id=estudiante_data.id)

            # Preparar y transformar datos
            X_train, y_train, X_test, y_test = prepare_and_transform_data(datos_prediccion)
            resultados = self.seleccion_prediccion_modelos(X_train, y_train, X_test, y_test)

            # Seleccionar solo el resultado más relevante 
            resultado_final = resultados.iloc[0]  # seleccionar el mejor

            return Response({
                "Probabilidad Clase Aprobar": resultado_final['Probabilidad_Clase_Aprobar'],
                "Predicción": resultado_final['Prediccion'],
                "Mensaje": resultado_final['Mensaje']
            }, status=status.HTTP_200_OK)

        except estudiante.DoesNotExist:
            return Response({"error": "Estudiante no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    
class entrenamiento(APIView):
    def post(self,request):
        return Response(status=status.HTTP_200_OK)