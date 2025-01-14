from django.contrib.auth.models import User
from django.contrib.auth.backends import BaseBackend
from .models import CustomUser

class PhoneNumberBackend(BaseBackend):
    def authenticate_by_number(self, request, phone_number, password):
        try:
            user = CustomUser.objects.get(phone_number=phone_number)
            if user.check_password(password): 
                return user
        except CustomUser.DoesNotExist:
            return None

class EmailBackend(BaseBackend):
    def authenticate(self, request, email, password):
        try:
            user = CustomUser.objects.get(email=email)
            if user.check_password(password): 
                return user
        except CustomUser.DoesNotExist:
            return None