# serializers/user_management.py

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRoleManagementSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='user_type', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'phone_number', 'role', 'is_active', 'is_staff']
        read_only_fields = ['id', 'email', 'role', 'is_staff']
