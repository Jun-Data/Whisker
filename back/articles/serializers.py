from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')
            
class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    class Meta:
        model = Article        
        fields = '__all__'

class ArticleDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article        
        fields = '__all__'
        read_only_fields = ('user', )

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article', 'user',)

class CommentUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article', 'user',)