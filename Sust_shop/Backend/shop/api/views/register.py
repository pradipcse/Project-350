from rest_framework import generics, permissions
from ..models.accounts import CustomUser
from ..serializers.register import UserRegistrationSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]