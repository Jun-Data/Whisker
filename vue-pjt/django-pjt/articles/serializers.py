from rest_framework import serializers
from .models import Article


class ArticleListSerializer(serializers.ModelSerializer):
    
    user = serializers.StringRelatedField()
    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'user')


class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)
