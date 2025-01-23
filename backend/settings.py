# Add 'weather' and 'rest_framework' to INSTALLED_APPS
INSTALLED_APPS = [
    # ...
    'weather',
    'rest_framework',
    'corsheaders',
    # new
    'weather',
]

# Add CORS middleware
MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# Allow all origins for development (adjust for production)
CORS_ALLOW_ALL_ORIGINS = True

# OpenWeatherMap API Key (use environment variable in production)
OPENWEATHERMAP_API_KEY = 'your_api_key_here'

