from django.db import models
from django.contrib.auth.models import AbstractUser
from allauth.account.adapter import DefaultAccountAdapter
from finlife.models import Product

class User(AbstractUser):
    
    nickname = models.CharField(null=True, blank=True, max_length=100)

## 개인정보 필드
    # 나이
    age = models.IntegerField(null=True, blank=True, default=0)
    # 소득 수준
    earn = models.IntegerField(null=True, blank=True, default=0)
    # 부양 가족 수
    family = models.IntegerField(null=True, blank=True, default=0)
    # 거주 지역
    location = models.CharField(max_length=100, default='Unknown')
    
    #  직업
    # job = models.CharField(max_length=100)
    
    ## 행동심리 필드
    # 위험 수용 성향
    risk = models.IntegerField(null=True, blank=True, default=0)
    # 장/단기 투자 성향
    term = models.IntegerField(null=True, blank=True, default=0)
    # 소비 패턴
    saving = models.IntegerField(null=True, blank=True, default=0)
    # 유지 이력 (인내심)
    patience = models.IntegerField(null=True, blank=True, default=0)
    # 금융 지식
    know = models.IntegerField(null=True, blank=True, default=0)
    # 가입 상품
    products = models.ManyToManyField(Product)






class CustomAccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        from allauth.account.utils import user_email, user_field, user_username
        
        data = form.cleaned_data
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        username = data.get("username")
        # nickname 필드를 추가
        nickname = data.get("nickname")
        
        age = data.get("age")
        earn = data.get("earn")
        family = data.get("family")
        location = data.get("location")
        # job = data.get("job")
        
        risk = data.get("risk")
        term = data.get("term")
        saving = data.get("saving")
        patience = data.get("patience")
        know = data.get("know")
        products = data.get("products")


        user_email(user, email)
        user_username(user, username)
        if first_name:
            user_field(user, "first_name", first_name)
        if last_name:
            user_field(user, "last_name", last_name)
        if nickname:
            user_field(user, "nickname", nickname)
        if age:
            user_field(user, "age", str(age))

        if earn:
            user_field(user, "earn", str(earn))
        if family:
            user_field(user, "family", str(family))
        if location:
            user_field(user, "location", location)
        if risk :
            user_field(user, "risk", str(risk) )
        if term :
            user_field(user, "term", str(term) )
        if saving :
            user_field(user, "saving", str(saving) )
        if patience :
            user_field(user, "patience", str(patience) )
        if know :
            user_field(user, "know", str(know) )
        if products :
            user_field(user, "products", products )


        if "password1" in data:
            user.set_password(data["password1"])
        else:
            user.set_unusable_password()

        self.populate_username(request, user)
        if commit:
        # Ability not to commit makes it easier to derive from
        # this adapter by adding
            user.save()
        return user
