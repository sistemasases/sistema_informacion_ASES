from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import send_ases, receive_ases, receive_disc, send_disc

router = DefaultRouter()
router.register(r'send_ases', send_ases, basename='send_ases')
router.register(r'receive_ases', receive_ases, basename='receive_ases')
router.register(r'send_disc', send_disc, basename='send_disc')
router.register(r'receive_disc', receive_disc, basename='receive_disc')

urlpatterns = [
    path('', include(router.urls)),
]