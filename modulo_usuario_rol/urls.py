from django.urls import path
from modulo_usuario_rol import views

urlpatterns = [
    path('alluser/', views.All_user.as_view()),
    path('user/', views.User_manage.as_view()),
    path('allrol/', views.All_rol.as_view()),
    path('rol/', views.Rol_manage.as_view()),
]

