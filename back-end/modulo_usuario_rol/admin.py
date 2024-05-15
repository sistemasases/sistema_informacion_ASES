from django.contrib import admin
from modulo_usuario_rol.models import *

class permiso_admin(admin.ModelAdmin):
    list_display = ('id','nombre') 

class rol_admin(admin.ModelAdmin):
    list_display = ('id','nombre') 

class estudiante_admin(admin.ModelAdmin):
    list_display = ('id','nombre', 'apellido','cod_univalle','num_doc','estudiante_elegible','es_discapacidad')
    list_filter = ('nombre', 'apellido','cod_univalle','num_doc')
    search_fields = ('nombre', 'apellido','cod_univalle','num_doc')

class monitor_admin(admin.ModelAdmin):
    list_display = ('id','id_user', 'cod_univalle','num_doc') 

class usuario_rol_admin(admin.ModelAdmin):
    list_display = ('id','obtener_rol', 'id_usuario','obtener_semestre','estado') 

    def obtener_rol(self, obj):
        return obj.id_rol.nombre
    def obtener_semestre(self, obj):
        return obj.id_semestre.nombre
    obtener_rol.short_description = 'Rol'
    obtener_semestre.short_description = 'Semestre'

class rol_permiso_admin(admin.ModelAdmin):
    list_display = ('id','obtener_rol', 'obtener_permiso') 

    def obtener_rol(self, obj):
        return obj.id_rol.nombre
    def obtener_permiso(self, obj):
        return obj.id_permiso.nombre
    obtener_rol.short_description = 'Rol'
    obtener_permiso.short_description = 'Permiso'

class act_simultanea_admin(admin.ModelAdmin):
    list_display = ('id','actividad') 

class cond_excepcion_admin(admin.ModelAdmin):
    list_display = ('id','alias') 

class discap_men_admin(admin.ModelAdmin):
    list_display = ('id','nombre') 

class estado_civil_admin(admin.ModelAdmin):
    list_display = ('id','estado_civil') 

class etnia_admin(admin.ModelAdmin):
    list_display = ('id','etnia') 

class identidad_gen_admin(admin.ModelAdmin):
    list_display = ('id','genero') 

class cohorte_estudiante_admin(admin.ModelAdmin):
    list_display = ('id','obtener_cohorte', 'obtener_estudiante') 

    def obtener_cohorte(self, obj):
        return obj.id_cohorte.id_number
    def obtener_estudiante(self, obj):
        return obj.id_estudiante.cod_univalle
    obtener_cohorte.short_description = 'Cohorte'
    obtener_estudiante.short_description = 'Estudiante'




admin.site.register(permiso,permiso_admin)
admin.site.register(rol,rol_admin)
admin.site.register(estudiante,estudiante_admin)
admin.site.register(monitor,monitor_admin)
admin.site.register(usuario_rol,usuario_rol_admin)
admin.site.register(rol_permiso,rol_permiso_admin)
admin.site.register(act_simultanea,act_simultanea_admin)
admin.site.register(cond_excepcion,cond_excepcion_admin)
admin.site.register(discap_men,discap_men_admin)
admin.site.register(estado_civil,estado_civil_admin)
admin.site.register(etnia,etnia_admin)
admin.site.register(identidad_gen,identidad_gen_admin)
admin.site.register(cohorte_estudiante,cohorte_estudiante_admin)
admin.site.register(firma_tratamiento_datos)
