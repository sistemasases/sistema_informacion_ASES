from django.urls import path

import modulo_base
from .views import user_manage, login_manage
from modulo_base import views

urlpatterns = [
    path('login/', login_manage.as_view(), name='login'),
    path('alluser/', user_manage.as_view(), name='all_user'),
    path('', views.carga_test),
]
