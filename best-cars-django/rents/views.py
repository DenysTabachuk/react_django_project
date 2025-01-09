from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RentalSerializer
from rest_framework.permissions import IsAuthenticated

class RentalView(APIView):
    permission_classes = [IsAuthenticated]  # Перевірка, чи користувач авторизований

    def post(self, request, *args, **kwargs):
        """Створення нової оренди."""
        data = request.data
        data['user'] = request.user.id
        print(data)

        serializer = RentalSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        errors = serializer.errors
        formatted_errors = {field: ", ".join(errors[field]) for field in errors}
        
        return Response({
            "message": "Створення оренди не вдалося.",
            "errors": formatted_errors
        }, status=status.HTTP_400_BAD_REQUEST)