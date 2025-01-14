from rest_framework import serializers
from .models import Rental, Location
from cars.serializers import CarGetSerializer
from users.serializers import UserDetailSerializer


class RentalCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        exclude = ['total_price']  

    def validate(self, data):
        """Перевірка всієї оренди."""
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        # Перевірка на правильність діапазону дат
        if start_date and end_date and start_date >= end_date:
            raise serializers.ValidationError({
                'end_date': "Дата закінчення оренди має бути пізніше за дату початку."
            })

        return data

    def validate_payment_method(self, value):
        """Перевірка способу оплати."""
        if value not in ['card', 'cash']:
            raise serializers.ValidationError("Неправильний спосіб оплати.")
        return value


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class RentalGetSerializer(serializers.ModelSerializer):
    car = CarGetSerializer()
    user = UserDetailSerializer()
    location = LocationSerializer()

    class Meta:
        model = Rental
        fields = '__all__'  # Включаємо всі поля


