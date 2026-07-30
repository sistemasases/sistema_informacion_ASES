from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from datetime import datetime, timedelta
from django.db import transaction
from django.contrib.auth.models import User
from modulo_usuario_rol.serializers import estudiante_serializer
from modulo_usuario_rol.models import estudiante, usuario_rol
from modulo_instancia.models import semestre, sede
from modulo_instancia.serializers import semestre_serializer
from modulo_seguimiento.models import seguimiento_individual, inasistencia, riesgo_individual
from modulo_asignacion.models import asignacion
from modulo_academico.models import programa_estudiante
from .serializers import ases_dexia_serializer

class send_ases(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]

    # Número de sesiones requeridas para completar el acompañamiento socioeducativo
    SESIONES_REQUERIDAS = 5

    def get_nivel_riesgo(self, riesgo): 
        if riesgo == 0:
            return 'BAJO'
        if riesgo == 1:
            return 'MEDIO'
        elif riesgo == 2:
            return 'ALTO'
        elif riesgo == None or riesgo == 'None':
            return 'SIN RIESGO'

    # API: Retorna el listado de estudiantes de acompañamiento socioeducativo
    # - Filtrados por sede y semestre.
    # - Incluye información básica del estudiante, responsable de acompañamiento,
    #   porcentaje de avance y estado de culminación del acompañamiento.
    # - Ejemplo:
    #   /interapp/send_ases/0/estudiantes_socioedu/?semestre=2026-1
        
    @action(detail=True, methods=['get'], url_path='estudiantes_socioedu')
    def estudiantes_socioedu_ases_dexia(self, request,pk=None):
        lista_estudiantes = list()
        try:
            request_sede = sede.objects.get(codigo_univalle=pk)
        except sede.DoesNotExist:
            return Response({'error': 'Sede no encontrada con ese código_univalle.'}, status=status.HTTP_404_NOT_FOUND)

        # Resolver semestre
        nombre_semestre = request.query_params.get('semestre')

        if nombre_semestre:
            try:
                año, periodo = nombre_semestre.split('-')
                if periodo not in ['1', '2']:
                    raise ValueError
                int(año)
            except ValueError:
                return Response(
                    {'error': 'Formato de semestre inválido. Use "2026-1" o "2026-2"'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            letra = 'A' if periodo == '1' else 'B'
            var_semestre = semestre.objects.filter(
                nombre__startswith=f'{año}{letra}',
                id_sede=request_sede.id
            ).first()

            if not var_semestre:
                return Response(
                    {'error': f'No se encontró el semestre {nombre_semestre} para esta sede'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            try:
                var_semestre = semestre.objects.get(
                    semestre_actual=True,
                    id_sede=request_sede.id
                )
            except semestre.DoesNotExist:
                return Response(
                    {'error': 'No hay semestre actual para esta sede.'},
                    status=status.HTTP_404_NOT_FOUND
                )        

        # Filtrar estudiantes relacionados con la sede y semestre actual
        var_estudiante = estudiante.objects.filter(
            estudiante_elegible=True,
            # es_discapacidad=False,
            # es_academico=False,
            id_estudiante_in_asignacion__id_semestre=var_semestre,
            id_estudiante_in_asignacion__estado=True
        ).distinct()        

        for estudiante23 in var_estudiante :
            serializer_estudiante = ases_dexia_serializer(estudiante23)            
            conteo_seguimientos = seguimiento_individual.objects.filter(
                id_estudiante=estudiante23,
                fecha__gte=var_semestre.fecha_inicio,
                fecha__lte=var_semestre.fecha_fin,
            ).count()
            seguimiento_reciente = riesgo_individual.objects.filter( id_estudiante = estudiante23).order_by('-fecha').values('id_estudiante', 'riesgo_individual', 'riesgo_familiar', 'riesgo_academico', 'riesgo_economico', 'riesgo_vida_universitaria_ciudad', 'fecha')
            if seguimiento_reciente:
                riesgo = {
                                'riesgo_individual': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_individual']),
                                'riesgo_familiar': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_familiar']),
                                'riesgo_academico': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_academico']),
                                'riesgo_economico': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_economico']),
                                'riesgo_vida_universitaria_ciudad': self.get_nivel_riesgo(seguimiento_reciente[0]['riesgo_vida_universitaria_ciudad']),
                            }
            else:
                riesgo = {
                            'riesgo_individual': "SIN RIESGO",
                            'riesgo_familiar': "SIN RIESGO",
                            'riesgo_academico': "SIN RIESGO",
                            'riesgo_economico': "SIN RIESGO",
                            'riesgo_vida_universitaria_ciudad': "SIN RIESGO",
                        }
             # Obtener datos del profesional responsable
            try:
                monitor_asignado = asignacion.objects.filter(
                    id_estudiante=estudiante23,
                    id_semestre=var_semestre,
                    estado=True
                ).first()
                practicante = usuario_rol.objects.filter(
                    id_usuario=monitor_asignado.id_usuario,
                    id_semestre=var_semestre
                ).first()
                profesional = usuario_rol.objects.filter(
                    id_usuario=practicante.id_jefe,
                    id_semestre=var_semestre
                ).first()
                responsable = {
                    "nombres": profesional.id_jefe.first_name,
                    "apellidos": profesional.id_jefe.last_name,
                    "email_institucional": profesional.id_jefe.email,
                }
            except (
                asignacion.DoesNotExist,
                usuario_rol.DoesNotExist,
                AttributeError
            ) as e:
                print("ERROR RESPONSABLE:", e)
                responsable = None
                
            porcentaje_avance = (conteo_seguimientos / self.SESIONES_REQUERIDAS) * 100
            if porcentaje_avance >= 100 :
                conteo = {
                        'criterio': [{'id':6,'porcentaje_avance': 100,}],
                        'culmino_acompañamiento' : True,
                        'responsable': responsable,
                }
            else :
                conteo = {
                        'criterio': [{'id':6,'porcentaje_avance': porcentaje_avance,}],
                        'culmino_acompañamiento' : False,
                        'responsable': responsable,
                    }

            data = dict(serializer_estudiante.data,**conteo,**riesgo)
            lista_estudiantes.append(data)
        return Response(lista_estudiantes,status=status.HTTP_200_OK)

    
    # API: Retorna los detalles de un estudiante de acompañamiento socioeducativo
    # - Incluye información básica del estudiante, programa, sede, semestre,
    #   responsable de acompañamiento, porcentaje de avance total y sesiones de seguimiento con sus respectivos porcentajes de avance.
    # - Ejemplo:
    #   /interapp/send_ases/0/estudiante/1234567890/?semestre=2026-1
    
    @action(
        detail=False,
        methods=['get'],
        url_path=r'estudiante/(?P<codigo>[^/.]+)'
    )
    def detalle_estudiante(self, request, codigo=None):

        # 1. Buscar estudiante
        try:
            estudiante_obj = estudiante.objects.get(cod_univalle=codigo)
        except estudiante.DoesNotExist:
            return Response(
                {'error': 'Estudiante no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        # 2. Obtener programa activo y sede
        programa_est = programa_estudiante.objects.select_related(
            'id_programa',
            'id_programa__id_sede'
        ).filter(
            id_estudiante=estudiante_obj,
            traker=True
        ).first()

        if not programa_est:
            return Response(
                {'error': 'No se encontró programa activo para el estudiante'},
                status=status.HTTP_404_NOT_FOUND
            )
        programa_codigo = programa_est.id_programa.codigo_univalle
        programa_nombre = programa_est.id_programa.nombre
        sede = programa_est.id_programa.id_sede
        sede_nombre = sede.nombre

        # 3. Resolver semestre
        nombre_semestre = request.query_params.get('semestre')

        if nombre_semestre:
            # Validar formato esperado: "2026-1" o "2026-2"
            try:
                año, periodo = nombre_semestre.split('-')
                if periodo not in ['1', '2']:
                    raise ValueError
                int(año)
            except ValueError:
                return Response(
                    {'error': 'Formato de semestre inválido. Use "2026-1" o "2026-2"'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            letra = 'A' if periodo == '1' else 'B'

            semestre_obj = semestre.objects.filter(
                nombre__startswith=f'{año}{letra}',
                id_sede=sede
            ).first()

            if not semestre_obj:
                return Response(
                    {'error': f'No se encontró el semestre {nombre_semestre} para la sede {sede_nombre}'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            semestre_obj = semestre.objects.filter(
                semestre_actual=True,
                id_sede=sede
            ).first()

            if not semestre_obj:
                return Response(
                    {'error': 'No se encontró semestre actual para la sede'},
                    status=status.HTTP_404_NOT_FOUND
                )

        # 4. Responsable
        try:
            monitor_asignado = asignacion.objects.get(
                id_estudiante=estudiante_obj,
                id_semestre=semestre_obj,
                estado=True
            )
            practicante = usuario_rol.objects.get(
                id_usuario=monitor_asignado.id_usuario,
                id_semestre=semestre_obj
            )
            profesional = usuario_rol.objects.get(
                id_usuario=practicante.id_jefe,
                id_semestre=semestre_obj
            )
            responsable = {
                "nombres": profesional.id_jefe.first_name,
                "apellidos": profesional.id_jefe.last_name,
                "email_institucional": profesional.id_jefe.email,
            }
        except (
            asignacion.DoesNotExist,
            usuario_rol.DoesNotExist,
            AttributeError
        ) as e:
            print("ERROR RESPONSABLE:", e)
            responsable = None

        # 5. Sesiones del semestre (asistencias + inasistencias)
        sesiones = []
        contador_asistencias = 0

        seguimientos = seguimiento_individual.objects.filter(
            id_estudiante=estudiante_obj,
            fecha__gte=semestre_obj.fecha_inicio,
            fecha__lte=semestre_obj.fecha_fin
        ).order_by('fecha')

        for s in seguimientos:
            contador_asistencias += 1
            sesiones.append({
                "id_sesion": s.id,
                "fecha_sesion": s.fecha,
                "tipo": "SEGUIMIENTO",
                "asistio": True,
                "porcentaje_avance": min(round((contador_asistencias / self.SESIONES_REQUERIDAS) * 100, 2), 100),
                "riesgo_individual": self.get_nivel_riesgo(s.riesgo_individual),
                "riesgo_familiar": self.get_nivel_riesgo(s.riesgo_familiar),
                "riesgo_academico": self.get_nivel_riesgo(s.riesgo_academico),
                "riesgo_economico": self.get_nivel_riesgo(s.riesgo_economico),
                "riesgo_vida_universitaria_ciudad": self.get_nivel_riesgo(s.riesgo_vida_universitaria_ciudad)
            })

        inasistencias = inasistencia.objects.filter(
            id_estudiante=estudiante_obj,
            fecha__gte=semestre_obj.fecha_inicio,
            fecha__lte=semestre_obj.fecha_fin
        )

        for i in inasistencias:
            sesiones.append({
                "id_sesion": i.id,
                "fecha_sesion": i.fecha,
                "tipo": "INASISTENCIA",
                "asistio": False,
                "porcentaje_avance": None,
                "riesgo_individual": None,
                "riesgo_familiar": None,
                "riesgo_academico": None,
                "riesgo_economico": None,
                "riesgo_vida_universitaria_ciudad": None,
            })

        sesiones.sort(key=lambda x: x['fecha_sesion'])

        total_asistencias = sum(1 for s in sesiones if s["asistio"])
        porcentaje_total = min(round((total_asistencias / self.SESIONES_REQUERIDAS) * 100, 2), 100)

        return Response({
            'codigo_estudiante': estudiante_obj.cod_univalle,
            'nombres': estudiante_obj.nombre,
            'apellidos': estudiante_obj.apellido,
            'numero_documento': estudiante_obj.num_doc,
            'programa': {'codigo': programa_codigo, 'nombre': programa_nombre},
            'sede': sede_nombre,
            'semestre': semestre_obj.nombre,
            'responsable_acompanamiento': responsable,
            'cumplio_acompanamiento': total_asistencias >= self.SESIONES_REQUERIDAS,
            'porcentaje_total': porcentaje_total,
            'sesiones': sesiones,
        })
    
class receive_ases(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]

class send_disc(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]

class receive_disc(viewsets.GenericViewSet):
    queryset = estudiante.objects.all()
    serializer_class = estudiante_serializer
    permission_classes = [IsAuthenticated]