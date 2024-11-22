from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from django.contrib.auth import get_user_model
from django.http import JsonResponse

User = get_user_model()
# Create your views here.
@api_view(['GET'])
def article_list(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    user = get_object_or_404(User, id=article.user.id)
    comments = article.comments.all()
    if request.method == 'GET':
        serializer = ArticleDetailSerializer(article)
        comments_serializer = CommentUserSerializer(comments, many=True)
        data = {
                **serializer.data,
                'user': {
                    'id': article.user.id,
                    'username': user.username,
                },
                'comments': comments_serializer.data,
            }
        return Response(data)
    
    if request.method == 'PUT':
        serializer = ArticleDetailSerializer(article, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            data = {
                **serializer.data,
                'user': {
                    'id': article.user.id,
                    'username': user.username,
                }
            }
            return Response(data)

    if request.method == 'DELETE':
        article.delete()
        return JsonResponse({'detail' : f'{article_pk}번 게시글을 삭제했습니다.'})
    
@api_view(['POST'])
def create_article(request):
    if request.method == 'POST':
        serializer = ArticleDetailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            # serializer.save(user=User.objects.get(id=2))
            return Response(serializer.data)

@api_view(['GET'])
def comment_list(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comments = article.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_comment(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print(request.user)
            serializer.save(article=article, user=request.user)
            # serializer.save(article=article, user=User.objects.get(id=2))
            data = {
                **serializer.data,
                'user': UserSerializer(request.user).data
            }
            return Response(data)

@api_view(['PUT', 'DELETE'])    
def comment_detail(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    if request.method == 'DELETE':
        comment.delete()
        return JsonResponse({'detail' : f'{article_pk}번 게시글 {comment_pk}번 댓글 삭제'})