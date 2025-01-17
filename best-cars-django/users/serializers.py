from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import *

User = get_user_model()


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=4)

    def validate(self, attrs):
        email = attrs.get('email')
        user = CustomUser.objects.get(email = email)
        code = attrs.get('code')
        try:
            email_verification = EmailVerificationCode.objects.get(user=user, code=code)
        except EmailVerificationCode.DoesNotExist:
            raise serializers.ValidationError('Невірний код.')

        attrs['user'] = user
        return attrs


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ 'email', 'password', 'first_name', 'last_name']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Цей email вже використовується або він не існує.")
        return value


    def create(self, validated_data):      
        username   =  validated_data['email']

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return user


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number', 'first_name', 'last_name', 'password']

       
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']  # Вкажіть потрібні поля
