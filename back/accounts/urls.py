from django.urls import path, include
from . import views

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('update/<int:user_pk>/', views.update_user),
    path('delete/<int:user_pk>/', views.delete_user),
]
