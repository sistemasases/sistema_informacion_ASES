from django.contrib import admin
from modulo_usuario_rol.models import *
# Register your models here.

admin.site.register(permiso)
admin.site.register(rol)
admin.site.register(estudiante)
admin.site.register(usuario_rol)
admin.site.register(rol_permiso)
admin.site.register(act_simultanea)
admin.site.register(cond_excepcion)
admin.site.register(discap_men)
admin.site.register(estado_civil)
admin.site.register(etnia)
admin.site.register(identidad_gen)
admin.site.register(cohorte_estudiante)
