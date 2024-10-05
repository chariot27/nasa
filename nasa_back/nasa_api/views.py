from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CometsSerializer
from .models import Comets

# Create your views here.
class CometView(APIView):
    def get(self, request):
        comets = Comets.objects.all()
        return Response({'comets': comets.values()})
    def post(self, request):
        serializer = CometsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


