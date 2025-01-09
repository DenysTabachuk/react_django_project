from django.contrib import admin
from .models import Rental

class RentalAdmin(admin.ModelAdmin):
    # Вкажіть поля, які повинні відображатися в адмінці
    list_display = ('user', 'car', 'start_date', 'end_date', 'total_price', 'is_paid')

admin.site.register(Rental, RentalAdmin)