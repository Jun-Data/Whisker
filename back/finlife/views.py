from django.shortcuts import render, get_object_or_404
from .models import *
from .serializers import *
import requests
import certifi
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings
from pprint import pprint
BASE_URL = "http://finlife.fss.or.kr/finlifeapi/"


# import openai
# from django.conf import settings
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from openai.error import OpenAIError

# # OpenAI API 키 설정
# openai.api_key = settings.OPENAI_API_KEY

# class Chatbot(APIView):
#     def post(self, request):
#         question = request.data.get('question')
#         if not question:
#             return Response({"error": "No question provided"}, status=400)

#         try:
#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=[
#                     {"role": "user", "content": question}
#                 ],
#                 max_tokens=100
#             )
#             answer = response['choices'][0]['message']['content'].strip()
#             return Response({"answer": answer})

#         except InvalidRequestError as e:
#             return Response({"error": f"Invalid request: {str(e)}"}, status=400)
#         except AuthenticationError as e:
#             return Response({"error": f"Authentication failed: {str(e)}"}, status=401)
#         except RateLimitError as e:
#             return Response({"error": f"Rate limit exceeded: {str(e)}"}, status=429)
#         except APIConnectionError as e:
#             return Response({"error": f"API connection error: {str(e)}"}, status=500)
#         except Exception as e:
#             return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=500)


@api_view(['GET'])
def get_products(request):
    API_KEY = '7649ed91ac98faab9730f3852543417b'
    params = {
        'auth': API_KEY,
        'topFinGrpNo': '020000',
        'pageNo': 1,
    }
    product_fields = [
    "fin_co_no",
    "kor_co_nm",
    "fin_prdt_nm",
    "etc_note",
    "join_deny",
    "join_member",
    "join_way",
    "max_limit",
    "spcl_cnd",
    "intr_rate_type_nm",
    "rsrv_type_nm",
    "save_trm",
    "intr_rate",
    "intr_rate2",
    ]
    opt_fields = [
        "intr_rate_type_nm",
        "rsrv_type_nm",
        "save_trm",
        "intr_rate",
        "intr_rate2",
        "fin_prdt_cd"
    ]
    
    prdt_type = 'deposit'
    for url in (BASE_URL+"depositProductsSearch.json", BASE_URL+"savingProductsSearch.json"):
        datas = dict()
        response = requests.get(url, params=params).json()

        for prdt in response.get('result', {}).get('baseList', []):
            temp = {'type': prdt_type}
            for field in product_fields:
                if prdt.get(field) is None:
                    temp[field] = -1
                else:
                    temp[field] = prdt.get(field, -1)
            datas[prdt.get('fin_prdt_cd')] = temp
        
        for opt in response.get('result', {}).get('optionList', []):
            temp2 = dict()
            for field in opt_fields:
                if opt.get(field) is None:
                    temp2[field] = -1
                else:
                    temp2[field] = opt.get(field, -1)
            # pprint(temp)
            complete_datas = {
                
                **datas[opt['fin_prdt_cd']],
                **temp2
            }
            # pprint(complete_datas)
            
            if Product.objects.filter(
                fin_prdt_cd=temp2['fin_prdt_cd'],
                intr_rate=temp2['intr_rate'],
                intr_rate2=temp2[f'intr_rate2'],
                ).exists():
                continue
            
            if opt['fin_prdt_cd'] == '10-01-20-388-0002':
                pprint(complete_datas)
                
            serializer = ProductSerializer(data=complete_datas)
            if serializer.is_valid():
                serializer.save()
    
        prdt_type = 'saving'
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)




@api_view(['GET'])
def exchange(request):
    url = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON'
    params = {
        'authkey': 'Ar4GiPppFvZOywPha5Vwi6gVPAGr5Q1T',
        'data': 'AP01',
    }
    response = requests.get(url=url, params=params).json()
    ex_fields = Exchange._meta.get_fields()
    
    for result in response:
        ex_check_datas = dict()
        for field in ex_fields:
            if result.get(field.name, False):
                ex_check_datas[field.name] = result.get(field.name).replace(',', '')
        
        if Exchange.objects.filter(**ex_check_datas).exists():
            continue
        
        serializer = ExchangeSerializer(data=ex_check_datas)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    exchanges = Exchange.objects.all()
    serializer = ExchangeSerializer(exchanges, many=True)
    return Response(serializer.data)

