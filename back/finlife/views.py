from django.shortcuts import render, get_object_or_404
from .models import *
from .serializers import *
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings

BASE_URL = "http://finlife.fss.or.kr/finlifeapi/"

# 예금 API
@api_view(['GET'])
def get_deposits(request):
    url = BASE_URL + "depositProductsSearch.json"
    API_KEY = '7649ed91ac98faab9730f3852543417b'
    params = {
        'auth': API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1,
    }

    response = requests.get(url, params=params).json()
    # models 필드명 리스트 저장
    prdt_fields = DepositProducts._meta.get_fields()
    opt_fields = DepositOptions._meta.get_fields()
    # response 순회
    for prdt in response.get('result').get('baseList'):
        prdt_check_datas = dict()
        # 최고한도 null인 경우 -1 처리
        for field in prdt_fields:
            if field.name == 'max_limit' and prdt.get(field.name) is None:
                prdt_check_datas[field.name] = -1
            if prdt.get(field.name):
                prdt_check_datas[field.name] = prdt.get(field.name)

        # 이미 있으면 저장하지 않음
        # 주의: 값이 하나라도 바뀌면 추가됨
        if DepositProducts.objects.filter(**prdt_check_datas).exists():
            continue
        
        # 직렬화 후 저장
        serializer = DepositProductsSerializer(data=prdt_check_datas)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    for opt in response.get('result').get('optionList'):
        opt_check_datas = dict()
        # 금리가 null인 경우 -1 처리
        for field in opt_fields:
            if field.name == 'intr_rate' and opt.get(field.name) is None:
                opt_check_datas[field.name] = -1
                
            if opt.get(field.name, False):
                opt_check_datas[field.name] = opt.get(field.name)

        if DepositOptions.objects.filter(**opt_check_datas).exists():
            continue
        # fin_prdt_cd가 같은 상품 찾아서 외래키 등록
        product = DepositProducts.objects.get(fin_prdt_cd=opt.get('fin_prdt_cd'))
        # 직렬화 후 저장
        serializer = DepositOptionsSerializer(data=opt_check_datas)
        if serializer.is_valid(raise_exception=True):
            serializer.save(product=product)
    # 개별 상품의 옵션을 모두 가지도록 직렬화(CompleteSerializer)
    products = DepositProducts.objects.prefetch_related('options')
    serializer = DepositCompleteSerializer(products, many=True)
    return Response(serializer.data)

# 적금 API
@api_view(['GET'])
def get_savings(request):
    url = BASE_URL + "savingProductsSearch.json"
    API_KEY = '7649ed91ac98faab9730f3852543417b'
    params = {
        'auth': API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1,
    }

    response = requests.get(url, params=params).json()
    
    prdt_fields = SavingProducts._meta.get_fields()
    opt_fields = SavingOptions._meta.get_fields()

    for prdt in response.get('result').get('baseList'):
        prdt_check_datas = dict()
        
        for field in prdt_fields:
            if field.name == 'max_limit' and prdt.get(field.name) is None:
                prdt_check_datas[field.name] = -1
            if prdt.get(field.name):
                prdt_check_datas[field.name] = prdt.get(field.name)


        if SavingProducts.objects.filter(**prdt_check_datas).exists():
            continue
        

        serializer = SavingProductsSerializer(data=prdt_check_datas)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

    for opt in response.get('result').get('optionList'):
        opt_check_datas = dict()
        
        for field in opt_fields:
            if field.name == 'intr_rate' and opt.get(field.name) is None:
                opt_check_datas[field.name] = -1
                
            if opt.get(field.name, False):
                opt_check_datas[field.name] = opt.get(field.name)

        if SavingOptions.objects.filter(**opt_check_datas).exists():
            continue
        
        product = SavingProducts.objects.get(fin_prdt_cd=opt.get('fin_prdt_cd'))
        serializer = SavingOptionsSerializer(data=opt_check_datas)

        if serializer.is_valid(raise_exception=True):
            serializer.save(product=product)

    products = SavingProducts.objects.prefetch_related('options')
    serializer = SavingCompleteSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def exchange(request):
    url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
    params = {
        'authkey': 'Ar4GiPppFvZOywPha5Vwi6gVPAGr5Q1T',
        'data': 'AP01',
    }
    response = requests.get(url=url, params=params, verify=False).json()
    
    return JsonResponse(response[0])

