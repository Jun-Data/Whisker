from django.urls import path
from . import views

urlpatterns = [
    path('', views.article_list),
    path('create/', views.create_article),
    path('<int:article_pk>/', views.article_detail),
    path('<int:article_pk>/comment/create/', views.create_comment),
    path('<int:article_pk>/comments/', views.comment_list),
    path('<int:article_pk>/comment/<int:comment_pk>/', views.comment_detail),
]