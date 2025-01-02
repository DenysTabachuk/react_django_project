from django.db import models


class Car(models.Model):
    name = models.CharField(max_length=255)
    gear_box = models.CharField(max_length=50) 
    fuel_type = models.CharField(max_length=50)  
    consumption = models.DecimalField(max_digits=4, decimal_places=1)  
    engine_volume = models.DecimalField(max_digits=3, decimal_places=1)  
    engine_power = models.IntegerField(null=True, blank=True)
    prices = models.JSONField()  
    main_image = models.ImageField(upload_to='cars/', null=True, blank=True) 
    additional_functions = models.JSONField(default=list)  
    description = models.TextField()
    
    def __str__(self):
        return self.name


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField(upload_to='cars/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image for {self.car.name}"
