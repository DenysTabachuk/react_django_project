from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Q
from datetime import datetime
from rents.views import IsAdmin


class BrandListView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]


    def get(self, request):
        brands = Brand.objects.all().values('id', 'name')
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data, status=200)
    

class CarView(APIView):
    # authentication_classes = []
    # permission_classes = []
    def get_permissions(self):
        """
        Повертаємо відповідні дозволи для кожного методу:
        - Для post: IsAuthenticated (тільки авторизовані користувачі)
        - Для get, patch, delete: IsAdmin (тільки адміністратори)
        """
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAdmin()]
    

    def get(self, request, pk=None):
        if pk is None:
            cars = Car.objects.all()

            filters = Q()

            name = request.GET.get('name')
            brand = request.GET.get('brand')
            fuelType = request.GET.get('fuel_type')
            gearBox = request.GET.get('gear_box')
            carClass = request.GET.get('car_class')
            location = request.GET.get('location')
            start_date_str = request.GET.get('start_date')
            end_date_str = request.GET.get('end_date')  

            try:
                start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date() if start_date_str else None
                end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date() if end_date_str else None
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=400)

            if name:
                filters &= Q(name__icontains=name)
            if brand:
                filters &= Q(brand__name__iexact=brand)
            if fuelType:
                filters &= Q(fuel_type__iexact=fuelType)
            if gearBox:
                filters &= Q(gear_box__iexact=gearBox)
            if carClass:
                filters &= Q(car_class__iexact=carClass)
            if location:
                filters &= Q(location__exact=location)

            if start_date and end_date:
                cars = cars.exclude(
                    Q(rentals__start_date__lte=end_date) & Q(rentals__end_date__gte=start_date)
                )

            cars = cars.filter(filters)
            serializer = CarGetSerializer(cars, many=True, context={'request': request})
            return Response(serializer.data, status=200)
        else:
            try:
                car = Car.objects.get(pk=pk)
                serializer = CarGetSerializer(car, context={'request': request})
                return Response(serializer.data, status=200)
            except Car.DoesNotExist:
                return Response({"error": "Car not found"}, status=404)

    

    def post(self, request):
        serializer = CarPostSerializer(data=request.data)
        if serializer.is_valid():
            car = serializer.save()  

            images_data = []
            for key in request.FILES:
                if key.startswith('additional_images'):
                    images_data.append(request.FILES[key])

            for image in images_data:
                CarImage.objects.create(car=car, image=image)

            return Response(serializer.data, status=201)
        
        return Response({"errors": serializer.errors}, status=400)
    
    def put(self, request, pk):
        try:
            car = Car.objects.get(pk=pk)
            car_images = CarImage.objects.filter(car=car)  
            for image in car_images:
                image.image.delete()
                image.delete()

        except Car.DoesNotExist:
            return Response({"error": "Car not found"})

        serializer = CarPostSerializer(car, data=request.data)
        if serializer.is_valid():
            car = serializer.save()

            images_data = []
            for key in request.FILES:
                if key.startswith('additional_images'):
                    images_data.append(request.FILES[key])

            for image in images_data:
                CarImage.objects.create(car=car, image=image)
        else:
            return Response({"errors": serializer.errors}, status=400)

        return Response(serializer.data, status=200)
        

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                car = Car.objects.get(pk=pk)
                car_images = CarImage.objects.filter(car=car)  
                
                for image in car_images:
                    image.image.delete()
                    image.delete()

                if car.main_image:
                    car.main_image.delete()


                car.delete()
                return Response({"message": "Car deleted successfully"}, status=204)
            except Car.DoesNotExist:
                return Response({"error": "Car not found"}, status=404)
        return Response({"error": "Car id not provided"}, status=400)
    

class CarClassList(APIView):
    authentication_classes = []
    def get(self, request):
        car_classes = Car.CAR_CLASS  
        return Response(car_classes)

class LocationsView(APIView):
    authentication_classes = []

    def get(self, request):
        locations = Location.objects.all()  
        serializer = LocationSerializer(locations, many=True) 
        return Response(serializer.data) 
