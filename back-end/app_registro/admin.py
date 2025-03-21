from django.contrib import admin
from .models import Persona, PertenenciaGrupoPoblacional, TipoDocumento, EstadoCivil, IdentidadEtnicoRacial,ZonaResidencia

admin.site.register(PertenenciaGrupoPoblacional)
admin.site.register(Persona)
admin.site.register(TipoDocumento)
admin.site.register(EstadoCivil)
admin.site.register(ZonaResidencia)
admin.site.register(IdentidadEtnicoRacial)
