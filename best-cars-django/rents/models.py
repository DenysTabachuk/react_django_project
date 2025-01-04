from django.conf import settings
from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from cars.models import Car
from datetime import timedelta


class Rental(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='rentals')
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='rentals')  
    start_date = models.DateTimeField()  
    end_date = models.DateTimeField() 
    additional_services = models.JSONField(default=list, blank=True)  
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def calculate_total_price(self):
        """Обчислення загальної ціни на основі кількості днів оренди та додаткових послуг."""
        rental_duration = (self.end_date - self.start_date).days
        car_price_per_day = self.car.prices.get('price_per_day', 0)
        services_price = sum(service.get('price', 0) for service in self.additional_services)
        return rental_duration * car_price_per_day + services_price

    def save(self, *args, **kwargs):
        if not self.total_price:  # Обчислення ціни перед збереженням
            self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Rental: {self.car.name} by {self.user.username} from {self.start_date} to {self.end_date}"
