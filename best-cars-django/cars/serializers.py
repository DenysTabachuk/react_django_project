from rest_framework import serializers
from cars.models import *


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']


class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields =  '__all__'


class CarPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['id', 'name', 'gear_box', 'fuel_type', "car_class",
                    'consumption', 'brand', "location", "discount_percentage",
                    'engine_power', 'prices', 'main_image',
                    'additional_functions', 'description']
    

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

    
class CarGetSerializer(serializers.ModelSerializer):
    additional_images = CarImageSerializer(many=True)
    main_image_url = serializers.SerializerMethodField()
    location = LocationSerializer()
    blocked_dates = serializers.SerializerMethodField()  

    class Meta:
        model = Car
        fields = ['id', 'name', 'gear_box', 'fuel_type', 'brand', "car_class",
                    'consumption', 'additional_images', "location", "discount_percentage",
                    'engine_power', 'prices', 'additional_functions',
                    'description', 'main_image_url', 'blocked_dates']
        
    def get_main_image_url(self, obj):
        request = self.context.get('request')
        if obj.main_image and request:
            return request.build_absolute_uri(obj.main_image.url)
        return None
    
    def get_blocked_dates(self, obj):
        return obj.get_blocked_dates()

