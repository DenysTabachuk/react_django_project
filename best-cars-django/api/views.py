from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *

# Create your views here.
class CarView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        
        cars = [
            {"name": "Car 1", "detail": "Description of Car 1"},
            {"name": "Car 2", "detail": "Description of Car 2"},
            {"name": "Car 3", "detail": "Description of Car 3"}
        ]
        return Response(cars)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)