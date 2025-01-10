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
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('rentals/', RentalView.as_view(), name='create-rental'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 