# backend/weather/views.py

from rest_framework import generics
from .models import Weather
from .serializers import WeatherSerializer

class WeatherListCreate(generics.ListCreateAPIView):
    queryset = Weather.objects.all()
    serializer_class = WeatherSerializer