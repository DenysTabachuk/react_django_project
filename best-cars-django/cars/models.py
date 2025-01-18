from django.db import models
from rents.models import Rental
from datetime import timedelta
from django.utils.timezone import localtime
from datetime import timedelta


class Brand(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    
class Location(models.Model):
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.city} - {self.address}"


class Car(models.Model):
    CAR_CLASS = [
        ('buisness', 'Бізнес'),
        ('economy', 'Економ'),
        ('middle', 'Середній'),
    ]

    FUEL_TYPE = [
        ('petrol', 'Бензин'),
        ('diesel', 'Дизель'),
        ('electric', 'Електричний'),
    ]   

    GEAR_BOX = [
        ('manual', 'Механічна'),
        ('automatic', 'Автоматична'),
        ('semi-automatic', 'Напівавтоматична'),
    ]

    name = models.CharField(max_length=255)
    gear_box = models.CharField(max_length=50, choices=GEAR_BOX, default='manual')
    fuel_type = models.CharField(max_length=50, choices=FUEL_TYPE, default='petrol')
    consumption = models.DecimalField(max_digits=5, decimal_places=1)  
    # engine_volume = models.DecimalField(max_digits=5, decimal_places=1)  не впевнений чи це дуже треба
    engine_power = models.IntegerField(default=100)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)  
    prices = models.JSONField()  
    main_image = models.ImageField(upload_to='cars/') 
    additional_functions = models.JSONField(default=list, blank=True)  
    description = models.TextField(blank=True)
    car_class = models.CharField(max_length=50, choices=CAR_CLASS, default='middle')
    location = models.ForeignKey('Location', on_delete=models.CASCADE, related_name='rentals')
    
    def __str__(self):
        return self.name
    

    def get_blocked_dates(self):
        """
        Повертає список заблокованих дат для цього автомобіля.
        Враховуються всі оренди, де автомобіль вже був заброньований.
        """
        rentals = Rental.objects.filter(car=self)

        blocked_dates = []

        for rental in rentals:
            if (rental.approval_status != 'rejected'):
                start_date = localtime(rental.start_date).date()
                end_date = localtime(rental.end_date).date()

                current_date = start_date
                while current_date <= end_date:
                    blocked_dates.append(current_date)
                    current_date += timedelta(days=1)

        return blocked_dates


class CarImage(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='additional_images')
    image = models.ImageField(upload_to='cars/')
    alt_text = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Image for {self.car.name}"
