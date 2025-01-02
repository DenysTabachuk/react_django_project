from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Car, CarImage
from .serializers import CarGetSerializer, CarPostSerializer
from rest_framework.permissions import AllowAny

class CarView(APIView):

    def get(self, request, pk=None):
        if pk is None:
            cars = Car.objects.all()
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