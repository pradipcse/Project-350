# serializers/login.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from ..models.accounts import CustomUser

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            if not user.is_active:
                raise serializers.ValidationError("User is deactivated.")
        else:
            raise serializers.ValidationError("Both email and password required.")

        attrs['user'] = user
        return attrs