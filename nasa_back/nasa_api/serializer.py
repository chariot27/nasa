from rest_framework import serializers
from .models import Comets

class CometsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comets
        fields = [
            'object_name',  
            'p_yr',         
            'moid_au',      
            'w_deg',        
            'ref'
        ]