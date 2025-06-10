from rest_framework import serializers
from ..models.accounts import CustomUser

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user_type')
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'role']
