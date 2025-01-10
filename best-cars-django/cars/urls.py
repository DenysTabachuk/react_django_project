from django.urls import path
from cars.views import BrandListView, CarView, CarClassList
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', CarView.as_view()),
    path('<int:pk>/', CarView.as_view()),
    path('brands/', BrandListView.as_view()),
    path('classes/', CarClassList.as_view())
]
