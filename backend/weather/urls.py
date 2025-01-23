# backend/weather/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('weather/', views.WeatherListCreate.as_view(), name='weather-list'),
]