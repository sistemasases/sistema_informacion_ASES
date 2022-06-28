from django.shortcuts import render

# Create your views here.

def carga_test(request):
    return render(request, "prueba_carga.html")

def carga(request):
    return render(request, "prueba_carga.html")