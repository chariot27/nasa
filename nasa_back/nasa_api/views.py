from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Comets

# Create your views here.
class CometView(APIView):
    def get(self, request):
        comets = Comets.objects.all()
        return Response({'comets': comets.values()})

