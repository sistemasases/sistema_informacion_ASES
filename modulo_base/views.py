from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

# Create your views here.

def login_test(request):
    return render(request, "prueba_login.html")


def ingresar(request):

    if(request.POST["nombre_ingreso"] and request.POST["password"]):

        username_request = request.POST["nombre_ingreso"]
        var_usuario =get_object_or_404(User, username = username_request)
        contrasena_request =check_password( request.POST["password"],var_usuario.password)

        if (contrasena_request == True):

            return JsonResponse(True, safe=False)
        
    return JsonResponse(False, safe=False)
