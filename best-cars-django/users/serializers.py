from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
   
    class Meta:
        model = User
        fields = [ 'phone_number', 'password']

    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError('Користувач з таким номером телефона вже зареєстрований.')
        return value

    def create(self, validated_data):      
        username   = "user" + validated_data['phone_number']

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email', None),
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(phone_number=data['phone_number'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return user


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'phone_number', 'first_name', 'last_name']
        extra_kwargs = {
            'username' : {'required' : True},
            'email': {'required': False},
            'phone_number': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }