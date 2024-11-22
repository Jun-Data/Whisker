from rest_framework import serializers
from .models import *


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


# class DepositProductsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DepositProducts
#         fields = '__all__'

# class DepositOptionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DepositOptions
#         fields = '__all__'
#         read_only_fields = ('product',)

# class DepositCompleteSerializer(serializers.ModelSerializer):
#     options = DepositOptionsSerializer(many=True)
#     class Meta:
#         model = DepositProducts
#         fields = '__all__'



# class SavingProductsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SavingProducts
#         fields = '__all__'

# class SavingOptionsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SavingOptions
#         fields = '__all__'
#         read_only_fields = ('product',)

# class SavingCompleteSerializer(serializers.ModelSerializer):
#     options = SavingOptionsSerializer(many=True)
#     class Meta:
#         model = SavingProducts
#         fields = '__all__'

class ExchangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exchange
        fields = '__all__'