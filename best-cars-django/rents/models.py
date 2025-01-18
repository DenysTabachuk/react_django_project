from django.conf import settings
from django.db import models
from django.core.validators import RegexValidator


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
    car = models.ForeignKey('cars.Car', on_delete=models.CASCADE, related_name='rentals')  
    start_date = models.DateTimeField()  
    end_date = models.DateTimeField() 
    additional_services = models.JSONField(blank=True, null=True) 
    total_price = models.DecimalField(max_digits=10, decimal_places=2,  default=0 )  # Це поле не можна буде редагувати вручну, загальна ціна оренди обчислюється автоматично
    comment = models.TextField( blank=True,  null=True, help_text="Додаткові коментарі або побажання від користувача")
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS, default='cash')
    is_paid = models.BooleanField(default=False)
    approval_status = models.CharField(
        max_length=10,
        choices=APPROVAL_STATUS,
        default='pending',
    )
    phone_number = models.CharField(
        max_length=15,  # Включає код країни і номер
        default="+380")



    def calculate_total_price(self):
        """Обчислення загальної ціни на основі кількості днів оренди та додаткових послуг."""
        rental_duration = (self.end_date - self.start_date).days + 1
        rental_price = 0
        price_per_day = 0

        if 1 < rental_duration < 4:
            price_per_day = int(self.car.prices[0]['price'])
        elif 4 <= rental_duration < 10:
            price_per_day = int(self.car.prices[1]['price'])
        elif 10 <= rental_duration < 26:
            price_per_day = int(self.car.prices[2]['price'])
        else:
            price_per_day = int(self.car.prices[3]['price'])

        rental_price = price_per_day * (1 - self.car.discount_percentage / 100) * rental_duration

        services_price = 0
        for service in self.additional_services:
            services_price+= int(service['price'])

        return rental_price + services_price

    def save(self, *args, **kwargs):
        self.total_price = self.calculate_total_price()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Rental: {self.car.name} by {self.user.username} from {self.start_date} to {self.end_date}"

