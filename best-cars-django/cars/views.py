from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Car, CarImage, Brand
from .serializers import CarGetSerializer, CarPostSerializer, BrandSerializer
from rest_framework.permissions import AllowAny, IsAdminUser
from django.db.models import Q


class BrandListView(APIView):
    def get(self, request):
        brands = Brand.objects.all().values('id', 'name')
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data, status=200)
    

class CarView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAdminUser()]

    def get(self, request, pk=None):
        if pk is None:
            cars = Car.objects.all()
            
            filters = Q()

            name = request.GET.get('name')
            brand = request.GET.get('brand')
            fuelType = request.GET.get('fuel_type')
            gearBox = request.GET.get('gear_box')
            carClass = request.GET.get('car_class')

            if name:
                print(name)
                filters &= Q(name__icontains=name) 
            if brand:
                filters &= Q(brand__name__exact=brand) 
            if fuelType:
                print(fuelType)
                filters &= Q(fuel_type__exact=fuelType)
            if gearBox:
                filters &= Q(gear_box__exact=gearBox)
            if carClass:
                filters &= Q(car_class__exact=carClass)

            cars = cars.filter(filters)
            serializer = CarGetSerializer(cars, many=True, context={'request': request})
            return Response(serializer.data, status=200)
        else:
            try:
                car = Car.objects.get(pk=pk)
                serializer = CarGetSerializer(car, context={'request': request})
                print("Car", serializer.data)
                return Response(serializer.data, status=200)
            except Car.DoesNotExist:
                return Response({"error": "Car not found"}, status=404)

    def post(self, request):
        serializer = CarPostSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            car = serializer.save()  

            images_data = []
            for key in request.FILES:
                if key.startswith('additional_images'):
                    print(request.FILES[key])
                    images_data.append(request.FILES[key])

            for image in images_data:
                CarImage.objects.create(car=car, image=image)

            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response({"errors": serializer.errors}, status=400)

    def delete(self, request, pk=None):
        if pk is not None:
            try:
                car = Car.objects.get(pk=pk)
                car.delete()
                return Response({"message": "Car deleted successfully"}, status=204)
            except Car.DoesNotExist:
                return Response({"error": "Car not found"}, status=404)
        return Response({"error": "Car id not provided"}, status=400)
    

class CarClassList(APIView):
    def get(self, request):
        car_classes = Car.CAR_CLASS  
        return Response(car_classes)
