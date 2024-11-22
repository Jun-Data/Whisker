from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from django.contrib.auth import get_user_model
from .models import User

UserModel = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    # 필요한 필드들을 추가합니다.
    nickname = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=255
    )
    age = serializers.IntegerField(
        required=False,

    )

    earn = serializers.IntegerField(
        required=False,

    )

    family = serializers.IntegerField(
        required=False,

    )

    location = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=255
    )
    
    risk = serializers.IntegerField(
        required=False,

    )

    term = serializers.IntegerField(
        required=False,

    )

    saving = serializers.IntegerField(
        required=False,

    )

    patience = serializers.IntegerField(
        required=False,

    )

    know = serializers.IntegerField(
        required=False,

    )
    

    # 해당 필드도 저장 시 함께 사용하도록 설정합니다.
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            # nickname 필드 추가
            'nickname': self.validated_data.get('nickname', ''),
            'age': self.validated_data.get('age', ''),\
            
            'earn' : self.validated_data.get('earn', ''),
            'family' : self.validated_data.get('family', ''),
            'location' :self.validated_data.get('location', ''), 
            
            'risk' : self.validated_data.get('risk', ''),
            'term': self.validated_data.get('term', ''),
            'saving' : self.validated_data.get('saving', ''),
            'patience' : self.validated_data.get('patience', ''),
            'know' : self.validated_data.get('know', ''),
            # 'products' : self.validated_data.get('products', ''),

        }

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        extra_fields = []
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(UserModel, 'USERNAME_FIELD'):
            extra_fields.append(UserModel.USERNAME_FIELD)
        if hasattr(UserModel, 'EMAIL_FIELD'):
            extra_fields.append(UserModel.EMAIL_FIELD)
        if hasattr(UserModel, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(UserModel, 'last_name'):
            extra_fields.append('last_name')
        if hasattr(UserModel, 'nickname'):
            extra_fields.append('nickname')
        if hasattr(UserModel, 'age'):
            extra_fields.append('age')

        if hasattr(UserModel, 'earn'):
            extra_fields.append('earn')
        if hasattr(UserModel, 'family'):
            extra_fields.append('family')
        if hasattr(UserModel, 'location'):
            extra_fields.append('location')
        if hasattr(UserModel, 'risk'):
            extra_fields.append('risk')
        if hasattr(UserModel, 'term'):
            extra_fields.append('term')
        if hasattr(UserModel, 'saving'):
            extra_fields.append('saving')
        if hasattr(UserModel, 'patience'):
            extra_fields.append('patience')
        if hasattr(UserModel, 'know'):
            extra_fields.append('know')
        if hasattr(UserModel, 'products'):
            extra_fields.append('products')


        model = UserModel
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)

class CustomUserUpdateSerializer(UserDetailsSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'nickname', 'age', 'earn', 'family', 'location', 'risk', 'term', 'saving', 'patience', 'know')

from finlife.serializers import ProductSerializer
class AddProductSerializer(UserDetailsSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = UserModel
        fields = ('products',)
