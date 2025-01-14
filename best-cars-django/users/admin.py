from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, EmailVerificationCode


# Register your models here.
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'phone_number', 'is_staff', 'is_active')  # Додаємо поле phone_number
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('phone_number',)}),  # Додаємо поле phone_number до форми редагування
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('phone_number',)}),  # Додаємо поле phone_number при створенні нового користувача
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(EmailVerificationCode)
