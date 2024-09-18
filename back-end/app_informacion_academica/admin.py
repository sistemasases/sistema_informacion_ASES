from django.contrib import admin
from .models import Estamento, InformacionAcademica, SedeUniversidad, NombrePrograma

admin.site.register(Estamento)
admin.site.register(InformacionAcademica)
admin.site.register(SedeUniversidad)
admin.site.register(NombrePrograma)