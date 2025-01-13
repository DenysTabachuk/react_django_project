from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, UserProfileUpdateSerializer
from django.contrib.auth import login

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from rents.models import Rental
from rents.serializers import RentalGetSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            is_admin = user.groups.filter(name='admin').exists()  
            login(request, user)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({
                        "message": "Login successful",
                        "access_token": access_token,
                        "refresh_token": str(refresh),
                        'is_admin' : is_admin
                    })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Перевіряє, чи користувач авторизований

    def get(self, request):
        user = request.user  # Отримуємо користувача з request (він автоматично розпізнається через токен)
        rentals = Rental.objects.filter(user=request.user)
        rentals_serializer = RentalGetSerializer(rentals, many=True, context={'request': request})
        profile_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number,
            'first_name': user.first_name, 
            'last_name': user.last_name,   
            'rentals': rentals_serializer.data
        }
        return Response(profile_data)
    
    def patch(self, request):
        user = request.user
        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)