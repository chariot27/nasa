from django.db import models

# Create your models here.
class Comet(models.Model):
    comet_name = models.CharField(max_length=100,primary_key=True,default='')
    

    
    
class Planet(models.Model):
    planet_name = models.CharField(max_length=100,primary_key=True,default='')

    def __str__(self):
        return f'Planet name: {self.planet_name}'
    
class Satelite(models.Model):
    satelite_name = models.CharField(max_length=100,primary_key=True,default='')

    def __str__(self):
        return f'Planet name: {self.satelite_name}'

