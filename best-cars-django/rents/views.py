from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Rental, Location
from rest_framework.exceptions import NotFound

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
    
    def get(self, request):
        status_filter = request.query_params.get('status', None)


        if status_filter:
            rentals = Rental.objects.filter(approval_status=status_filter)
        else:
            rentals = Rental.objects.all()

        serializer =  RentalGetSerializer(rentals, many = True,context={'request': request} )
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def patch(self, request, rental_id):
        """Оновлення статусу оренди."""
        try:
            rental = Rental.objects.get(id=rental_id)
        except Rental.DoesNotExist:
            raise NotFound("Оренду не знайдено.")
        
        if  not request.user.is_staff:
            return Response({
                "message": "У вас немає прав для зміни статусу цієї оренди."
            }, status=status.HTTP_403_FORBIDDEN)

        approval_status = request.data.get('approval_status')
        if approval_status not in ['pending', 'approved', 'rejected']:
            return Response({
                "message": "Невірний статус. Використовуйте 'pending', 'approved' або 'rejected'."
            }, status=status.HTTP_400_BAD_REQUEST)
          # Оновлюємо статус
        rental.approval_status = approval_status
        rental.save()

        # Повертаємо відповідь з оновленими даними оренди
        serializer = RentalGetSerializer(rental)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class LocationsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        locations = Location.objects.all()  
        serializer = LocationSerializer(locations, many=True) 
        return Response(serializer.data) 


