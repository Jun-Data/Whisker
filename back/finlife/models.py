from django.db import models

# Create your models here.

class Product(models.Model):
    type = models.CharField(default='deposit', max_length=10)
    fin_prdt_cd = models.CharField(max_length=255) # 금융상품 코드
    fin_co_no = models.TextField()              # 금융회사 코드
    kor_co_nm = models.TextField()              # 금융회사명
    fin_prdt_nm = models.TextField()            # 금융상품명
    etc_note = models.TextField()               # 금융상품설명
    join_deny = models.IntegerField()           # 가입제한(1: 제한없음, 2:서민전용, 3:일부제한)
    join_member = models.TextField()            # 가입대상
    join_way = models.TextField()               # 가입방법
    max_limit = models.IntegerField()           # 최고한도
    spcl_cnd = models.TextField()               # 우대조건
    intr_rate_type_nm = models.CharField(max_length=100)  # 저축금리 유형명
    rsrv_type_nm = models.CharField(max_length=100)       # 적립 유형명
    save_trm = models.IntegerField()                      # 저축기간(단위: 개월)
    intr_rate = models.FloatField()                       # 저축금리
    intr_rate2 = models.FloatField()                      # 최고우대금리



# 예금-상품
class DepositProducts(models.Model):
    type = models.CharField(default='deposit', max_length=10)
    fin_prdt_cd = models.TextField(unique=True) # 금융상품 코드
    fin_co_no = models.TextField()              # 금융회사 코드
    kor_co_nm = models.TextField()              # 금융회사명
    fin_prdt_nm = models.TextField()            # 금융상품명
    etc_note = models.TextField()               # 금융상품설명
    join_deny = models.IntegerField()           # 가입제한(1: 제한없음, 2:서민전용, 3:일부제한)
    join_member = models.TextField()            # 가입대상
    join_way = models.TextField()               # 가입방법
    max_limit = models.IntegerField()           # 최고한도
    spcl_cnd = models.TextField()               # 우대조건

# 예금-옵션
class DepositOptions(models.Model):
    product = models.ForeignKey(DepositProducts, on_delete=models.CASCADE, related_name='options')  # 외래 키
    fin_prdt_cd = models.TextField()                      # 금융상품 코드
    intr_rate_type_nm = models.CharField(max_length=100)  # 저축금리 유형명
    intr_rate = models.FloatField()                       # 저축금리
    intr_rate2 = models.FloatField()                      # 최고우대금리
    save_trm = models.IntegerField()                      # 저축기간(단위: 개월)

# 적금-상품
class SavingProducts(models.Model):
    type = models.CharField(default='saving', max_length=10)
    fin_prdt_cd = models.TextField(unique=True) # 금융상품 코드
    fin_co_no = models.TextField()              # 금융회사 코드
    kor_co_nm = models.TextField()              # 금융회사명
    fin_prdt_nm = models.TextField()            # 금융상품명
    etc_note = models.TextField()               # 금융상품설명
    join_deny = models.IntegerField()           # 가입제한(1: 제한없음, 2:서민전용, 3:일부제한)
    join_member = models.TextField()            # 가입대상
    join_way = models.TextField()               # 가입방법
    max_limit = models.IntegerField()           # 최고한도
    spcl_cnd = models.TextField()               # 우대조건

# 적금-옵션
class SavingOptions(models.Model):
    product = models.ForeignKey(SavingProducts, on_delete=models.CASCADE, related_name='options')  # 외래 키
    fin_prdt_cd = models.TextField()                      # 금융상품 코드
    intr_rate_type_nm = models.CharField(max_length=100)  # 저축금리 유형명
    rsrv_type_nm = models.CharField(max_length=100)       # 적립 유형명
    save_trm = models.IntegerField()                      # 저축기간(단위: 개월)
    intr_rate = models.FloatField()                       # 저축금리
    intr_rate2 = models.FloatField()                      # 최고우대금리

# 환율
class Exchange(models.Model):
    cur_unit = models.CharField(max_length=20)  # 통화 코드 (예: "MYR")
    cur_nm = models.CharField(max_length=50)  # 통화 이름 (예: "말레이시아 링깃")
    ttb = models.DecimalField(max_digits=10, decimal_places=2)  # 매도 환율
    tts = models.DecimalField(max_digits=10, decimal_places=2)  # 매입 환율
    deal_bas_r = models.DecimalField(max_digits=10, decimal_places=2)  # 기준 환율
    bkpr = models.DecimalField(max_digits=10, decimal_places=2)  # 은행 기준 환율
    yy_efee_r = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # 연간 수수료율
    ten_dd_efee_r = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # 10일 수수료율
    kftc_bkpr = models.DecimalField(max_digits=10, decimal_places=2)  # KFTC 은행 기준 환율
    kftc_deal_bas_r = models.DecimalField(max_digits=10, decimal_places=2)  # KFTC 기준 거래 환율```