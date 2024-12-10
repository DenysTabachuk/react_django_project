from django.db import models

# Create your models here.
class Car(models.Model):
    name = models.CharField(max_length=255)
    gearBox = models.CharField(max_length=50, null=True, blank=True) 
    fuelType = models.CharField(max_length=50, null=True, blank=True)  
    consumption = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)  
    engineVolume = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)  
    enginePower = models.IntegerField(null=True, blank=True)
    prices = models.JSONField(null=True, blank=True)  
    mainImage = models.ImageField(upload_to='cars/', null=True, blank=True) 
    additionalFunctions = models.JSONField(default=list, null=True, blank=True)  # default to an empty list
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='cars/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image for {self.car.name}"
