from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RentalViewSet

router = DefaultRouter()
router.register(r'rentals', RentalViewSet, basename='rental')

urlpatterns = [
    path('', include(router.urls)),  # Інтегруємо локальний маршрутизатор
]
