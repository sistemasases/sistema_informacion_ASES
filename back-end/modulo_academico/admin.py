from django.contrib import admin
from modulo_academico.models import *
# Register your models here.

admin.site.register(historial_academico)
admin.site.register(materia)

admin.site.register(profesores)
admin.site.register(curso)
admin.site.register(matricula)
admin.site.register(items_historico)
admin.site.register(items_semestre)
admin.site.register(notas_historico)
admin.site.register(notas_semestre)
admin.site.register(historial_academico_del_estudiante)


