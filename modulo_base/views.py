from django.views import View
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
from rest_framework import viewsets
from .serializers import  UserSerializer

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.hashers import check_password

# Create your views here.

class user_manage (View):

    def get(self, request):
        print(request)
        list_user =User.objects.all()
        return JsonResponse (list(list_user.values()), safe=False)

class login_manage (View):
    def post(self, request):
        print(request)
        if(request.POST["username"] and request.POST["password"]):

            username_request = request.POST["username"]
            var_usuario =get_object_or_404(User, username = username_request)
            contrasena_request =check_password( request.POST["password"],var_usuario.password)

            if (contrasena_request == True):

                return JsonResponse(True, safe=False)
        
        return JsonResponse(False, safe=False)
def carga_test(request):
    return render(request, "prueba_login.html")

class TodoView(viewsets.ModelViewSet):
 
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = UserSerializer
 
    # define a variable and populate it
    # with the Todo list objects
    queryset = User.objects.all()