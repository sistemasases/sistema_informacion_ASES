from django.contrib import admin
from modulo_usuario_rol.models import *
# Register your models here.

admin.site.register(permiso)
admin.site.register(rol)
admin.site.register(estudiante)
admin.site.register(usuario_rol)
