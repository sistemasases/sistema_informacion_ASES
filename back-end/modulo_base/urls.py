from django.urls import path
from modulo_base import views


urlpatterns = [
    path('login', views.Login.as_view()),
    path('logout', views.Logout.as_view()),
    path('refresh', views.Refresh.as_view()),
    path('change_password', views.change_password.as_view()),
    path('validate', views.Validate.as_view()),
]
