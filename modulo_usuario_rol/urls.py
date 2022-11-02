from django.urls import path
from modulo_usuario_rol import views

urlpatterns = [
    path('alluser/', views.All_user.as_view()),
    path('user/', views.User_manage.as_view()),
    path('allrol/', views.All_rol.as_view()),
    path('rol/', views.Rol_manage.as_view()),
    path('user_rol/', views.User_rol.as_view()),
    path('user_rol_manage/', views.User_rol_manage.as_view()),
    path('all_estudiante/', views.All_estudiante.as_view()),
    path('estudiante_manage/', views.Estudiante_manage.as_view()),
    path('all_user_rol/<int:pk>/', views.All_user_with_rol.as_view()),
]

