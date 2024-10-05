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
        obj = request.data
        obj_name = obj['obj_name']
        p_ir = obj['p_ir']
        moid_au = obj['moid_au']
        w_deg = obj['w_deg']
        ref = obj['ref']
        comet = Comets(obj_name,p_ir,moid_au,w_deg,ref)
        comet.full_clean()
        comet.save()
        return Response({
            'status' : 'succes'
        })

        
       


