from django.shortcuts import render
from rest_framework.views import APIView
from .models import Comets

# Create your views here.
class CometView(APIView):
    def get(self, request):
        comets = Comets.objects.all()
        return comets

