from rest_framework.viewsets import ModelViewSet
from .models import Rental
from .serializers import RentalSerializer

class RentalViewSet(ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer