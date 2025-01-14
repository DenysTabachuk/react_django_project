from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rents.models import Rental
from rents.serializers import RentalGetSerializer
from .models import EmailVerificationCode
from .serializers import *
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            user = serializer.save()
            verification = EmailVerificationCode.objects.create(user=user)
            send_mail(  
                'Підтвердження реєстрації',
                f"Ваш код підтвердження: {verification.code}",
                'your_email@gmail.com',
                [user.email],)
            return Response({'message': 'Verification code sent to email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # confirm email
    def put(self, request):
        print(request.data)
        serializer = VerifyEmailSerializer(data=request.data)
        if serializer.is_valid():
            print("Validate data", serializer.validated_data)
            user = serializer.validated_data['user']
            user.is_active = True
            email_verif = EmailVerificationCode.objects.get(user = user)
            email_verif.delete() 
            user.save()
            return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
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
        data = request.data

        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if old_password and new_password:
            if not check_password(old_password, user.password):
                return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
        
            # Змінити пароль
            user.set_password(new_password)
            user.save()

            return Response({'message': 'Password updated successfully'})

        serializer = UserProfileUpdateSerializer(user, data=request.data, partial=True)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
