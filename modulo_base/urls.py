from django.urls import path, include

import modulo_base
from .views import user_manage, login_manage
from modulo_base import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'tasks',views.TodoView, 'task')

urlpatterns = [
    #path('login/', login_manage.as_view(), name='login'),
    path('alluser/', user_manage.as_view(), name='all_user'),
    path('api/', include(router.urls)),
    path('', views.carga_test),
]
