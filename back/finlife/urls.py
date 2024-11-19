from django.urls import path
from . import views

urlpatterns = [
    path('deposits/', views.get_deposits),
    path('savings/', views.get_savings),
    path('exchange/', views.exchange)
]