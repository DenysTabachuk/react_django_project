from django.conf import settings
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from cars.models import Car
from datetime import timedelta


class Rental(models.Model):
    PAYMENT_METHODS = [
        ('card', 'Картка'),
        ('cash', 'Готівка'),
    ]

    APPROVAL_STATUS = [
        ('pending', 'Очікує'),
        ('approved', 'Прийнято'),
        ('rejected', 'Відхилено'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rentals')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='rentals')  
    start_date = models.DateTimeField()  
    end_date = models.DateTimeField() 
    additional_services = models.JSONField(blank=True, null=True) 
    total_price = models.DecimalField(max_digits=10, decimal_places=2,  default=0 )  # Це поле не можна буде редагувати вручну, загальна ціна оренди обчислюється автоматично
    comment = models.TextField( blank=True,  null=True, help_text="Додаткові коментарі або побажання від користувача")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='cash')
    location = models.ForeignKey('Location', on_delete=models.CASCADE, related_name='rentals', null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    approval_status = models.CharField(
        max_length=10,
        choices=APPROVAL_STATUS,
        default='pending',
    )


    def calculate_total_price(self):
        """Обчислення загальної ціни на основі кількості днів оренди та додаткових послуг."""
        rental_duration = (self.end_date - self.start_date).days
        rental_price = 0

        if (rental_duration < 1):
            raise ValueError("Rental duration must be at least 1 day.")
        elif (rental_duration > 1 < 4):
            rental_price+= int(self.car.prices[0]['price']) * rental_duration
        elif (rental_duration >= 4 < 10):
            rental_price+= int(self.car.prices[1]['price']) * rental_duration
        elif (rental_duration >= 10 < 26):
            rental_price+= int(self.car.prices[2]['price']) * rental_duration
        else:
            rental_price+= int(self.car.prices[3]['price']) * rental_duration
             
        services_price = 0
        for service in self.additional_services:
            services_price+= int(service['price'])

        return rental_price + services_price

    def save(self, *args, **kwargs):
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Rental: {self.car.name} by {self.user.username} from {self.start_date} to {self.end_date}"


class Location(models.Model):
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.city} - {self.address}"