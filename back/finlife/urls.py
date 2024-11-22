from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products),
    path('products/<int:product_id>/', views.get_detail),
    # path('deposits/', views.get_deposits),
    # path('deposit/<int:deposit_id>/<int:option_id>/', views.deposit_detail),
    # path('savings/', views.get_savings),
    # path('saving/<int:saving_id>/<int:option_id>/', views.saving_detail),
    path('exchange/', views.exchange),
    # path('chatbot/', Chatbot.as_view()),

]