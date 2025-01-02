from rest_framework import serializers
from .models import Car, CarImage

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields =  '__all__'  # Включаємо URL зображення та інші поля

class CarPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'gear_box', 'fuel_type',
                    'consumption', 'engine_volume',
                    'engine_power', 'prices', 'main_image',
                    'additional_functions', 'description']
    
class CarGetSerializer(serializers.ModelSerializer):
    additional_images = CarImageSerializer(many=True)

    class Meta:
        model = Car
        fields = ['id', 'name', 'gear_box', 'fuel_type',
                    'consumption', 'engine_volume', 'additional_images',
                    'engine_power', 'prices', 'main_image',
                    'additional_functions', 'description']
        
