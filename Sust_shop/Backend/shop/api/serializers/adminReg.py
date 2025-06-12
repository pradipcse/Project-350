from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class AdminUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'phone_number', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        # Always create as admin with is_staff = True
        validated_data['user_type'] = 'admin'
        validated_data['is_staff'] = True
        return User.objects.create_user(**validated_data)
