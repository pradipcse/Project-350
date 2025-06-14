from rest_framework import serializers
from ..models.accounts import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'user_type', 'is_active', 'is_staff']
