from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import *
User = get_user_model()


# Create your views here.
@api_view(['POST'])
def delete_user(request, user_pk):
    if request.method == 'POST':
        user = User.objects.get(pk=user_pk)
        user.delete()
        return JsonResponse({
          'detail': f'유저 {user.username} 삭제'
        })
    
@api_view(['PUT'])
def update_user(request, user_pk):
    if request.method == 'PUT':
        user = User.objects.get(pk=user_pk)
        serializer = CustomUserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

from finlife.models import Product
@api_view(['PUT'])
def add_product(request, user_pk):
    user = User.objects.get(pk=user_pk)
    product_id = request.data.get('product').get('id')
    print(product_id)
    product = Product.objects.get(id=product_id)
    user.products.add(product)
    serializer = AddProductSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
def remove_product(request, user_pk):
    user = User.objects.get(pk=user_pk)
    product_id = request.data.get('product').get('id')
    product = Product.objects.get(id=product_id)
    user.products.remove(product)
    serializer = AddProductSerializer(user)
    return Response(serializer.data)


from finlife.serializers import ProductSerializer
@api_view(['GET'])
def show_user_products(request, user_pk):
    user = User.objects.get(pk=user_pk)
    products = user.products.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)