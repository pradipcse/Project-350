from rest_framework import serializers
from ..models.accounts import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    user_type = serializers.ChoiceField(choices=[('user', 'Normal User'), ('seller', 'Seller')])

    class Meta:
        model = CustomUser
        fields = ['email', 'phone_number', 'password', 'user_type']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user_type = validated_data.get('user_type', 'user')
        # Explicitly prevent creating admin users here
        if user_type == 'admin':
            raise serializers.ValidationError("Cannot register as admin via the API.")
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user