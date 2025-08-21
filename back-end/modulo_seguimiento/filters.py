# modulo_seguimiento/filters.py

from django.db.models import Q
from modulo_usuario_rol.models import estudiante, cohorte_estudiante
from modulo_programa.models import programa_estudiante, programa
from modulo_instancia.models import sede, cohorte


# Genera filtros dinámicos según los datos recibidos (estudiante, fechas, programa, sede, cohorte).
# Devuelve una lista de Q objects para consultas complejas con múltiples condiciones.
def build_filtros(data):
    filters_and = []

    # Filtro por estudiante
    cod_univalle = data.get('estudiante')
    if cod_univalle:
        try:
            estudiante_obj = estudiante.objects.get(cod_univalle=cod_univalle)
            filters_and.append(Q(id_estudiante=estudiante_obj))
        except estudiante.DoesNotExist:
            # Si no existe el estudiante, forzamos resultados vacíos
            filters_and.append(Q(id_estudiante__isnull=True))

    # Filtro por fecha de inicio
    fecha_inicio = data.get('fecha_inicio')
    if fecha_inicio:
        filters_and.append(Q(fecha__gte=fecha_inicio))

    # Filtro por fecha de fin
    fecha_fin = data.get('fecha_fin')
    if fecha_fin:
        filters_and.append(Q(fecha__lte=fecha_fin))

    # Filtro por programa
    codigo_programa = data.get('programa')
    if codigo_programa:
        try:
            programas = programa.objects.filter(codigo_univalle=codigo_programa)
            estudiantes_programa = programa_estudiante.objects.filter(
                id_programa__in=programas
            ).values_list('id_estudiante', flat=True)
            filters_and.append(Q(id_estudiante__in=estudiantes_programa))
        except Exception:
            pass  # Puedes loguear si lo necesitas

    # Filtro por sede
    nombre_sede = data.get('sede')
    if nombre_sede:
        try:
            sedes = sede.objects.filter(nombre=nombre_sede)
            programas = programa.objects.filter(id_sede__in=sedes)
            estudiantes_programa = programa_estudiante.objects.filter(
                id_programa__in=programas
            ).values_list('id_estudiante', flat=True)
            filters_and.append(Q(id_estudiante__in=estudiantes_programa))
        except Exception:
            pass

    # Filtro por cohorte
    id_cohorte = data.get('cohorte')
    if id_cohorte:
        try:
            cohortes = cohorte.objects.filter(id_number=id_cohorte)
            estudiantes_cohorte = cohorte_estudiante.objects.filter(
                id_cohorte__in=cohortes
            ).values_list('id_estudiante', flat=True)
            filters_and.append(Q(id_estudiante__in=estudiantes_cohorte))
        except Exception:
            pass

    return filters_and