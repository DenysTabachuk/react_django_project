from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RentalCreateSerializer, LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Rental, Location

class RentalView(APIView):
    permission_classes = [IsAuthenticated]  # Перевірка, чи користувач авторизований

    def post(self, request):
        """Створення нової оренди."""
        data = request.data
        data['user'] = request.user.id

        serializer = RentalCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        errors = serializer.errors
        formatted_errors = {field: ", ".join(errors[field]) for field in errors}
        
        return Response({
            "message": "Створення оренди не вдалося.",
            "errors": formatted_errors
        }, status=status.HTTP_400_BAD_REQUEST)
    

class LocationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        locations = Location.objects.all()  
        serializer = LocationSerializer(locations, many=True) 
        return Response(serializer.data) 

