"""modulo_ases URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('modulo_base.urls')),
    path('carga_masiva/', include('modulo_carga_masiva.urls')),
    path('wizard/', include('modulo_instancia.routers')),
    path('usuario_rol/', include('modulo_usuario_rol.routers')),
    path('seguimiento/', include('modulo_seguimiento.routers')),
    path('asignacion/', include('modulo_asignacion.routers')),
    path('reportes/', include('modulo_reportes.routers')),
    path('alertas/', include('modulo_alertas.routers')),
    path('correos/', include('modulo_correos.routers')),
    path('academico/', include('modulo_academico.routers')),
    path('formularios_externos/', include('modulo_formularios_externos.routers')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('usuario_rol_firma/', include('modulo_usuario_rol.urls')),
    path('persona/', include('app_registro.routers')),
    path('diversidad-sexual/', include('app_diversidad_sexual.routers')),
    path('informacion-academica/', include('app_informacion_academica.routers')),
    path('informacion-general/', include('app_informacion_general.routers')),
    path('documentos-autorizacion/', include('app_documentos_autorizacion.routers')),
    path('seguimiento-campus/', include('app_seguimiento.routers')),
    path('discapacidad/', include('modulo_discapacidad.routers')),
    path('interapp/', include('modulo_interapp.urls')),
    # path('forms/', include('modulo_formularios_externos.routers')),
]
