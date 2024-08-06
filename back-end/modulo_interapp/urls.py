from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import receive_SirhIntegracion, send_SirhIntegracion

router = DefaultRouter()
router.register(r'send', send_ases, basename='send')
router.register(r'receive', receive_ases, basename='receive')

urlpatterns = [
    path('', include(router.urls)),
]