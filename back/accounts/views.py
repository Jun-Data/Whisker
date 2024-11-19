from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import CustomUserDetailsSerializer, CustomUserUpdateSerializer
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
  