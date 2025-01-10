from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Car(models.Model):
    CAR_CLASS = [
        ('buiness', 'Бізнес'),
        ('economy', 'Економ'),
        ('middle', 'Середній'),
    ]

    FUEL_TYPE = [
        ('petrol', 'Бензин'),
        ('diesel', 'Дизель'),
        ('electric', 'Електричний'),
        ('hybrid', 'Гібрид'),
    ]   

    GEAR_BOX = [
        ('manual', 'Механічна'),
        ('automatic', 'Автоматична'),
        ('semi-automatic', 'Напівавтоматична'),
    ]

    name = models.CharField(max_length=255)
    gear_box = models.CharField(max_length=50, choices=GEAR_BOX, default='manual')
    fuel_type = models.CharField(max_length=50, choices=FUEL_TYPE, default='petrol')
    consumption = models.DecimalField(max_digits=4, decimal_places=1)  
    engine_volume = models.DecimalField(max_digits=3, decimal_places=1)  
    engine_power = models.IntegerField(null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True, blank=True)  
    prices = models.JSONField()  
    main_image = models.ImageField(upload_to='cars/') 
    additional_functions = models.JSONField(default=list, blank=True)  
    description = models.TextField()
    car_class = models.CharField(max_length=50, choices=CAR_CLASS, default='middle')
    
    def __str__(self):
        return self.name


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField(upload_to='cars/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image for {self.car.name}"
