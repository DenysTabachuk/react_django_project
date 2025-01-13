from django.contrib import admin
from django.urls import path, include
from cars.views import *
from rents.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cars/', include('cars.urls')),
    path('users/', include('users.urls')),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('rentals/', RentalView.as_view()),
    path('locations/', LocationsView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 