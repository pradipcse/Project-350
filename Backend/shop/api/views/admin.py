from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from api.models.accounts import CustomUser
from api.serializers.admin import AdminUserSerializer

class IsAdminUserOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Only allow access if user is authenticated and is an admin
        return request.user.is_authenticated and request.user.user_type == 'admin'

class AdminUserViewSet(viewsets.ModelViewSet):
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUserOnly]

    def get_queryset(self):
        # Only show admin users
        return CustomUser.objects.filter(user_type='admin')
    
    def perform_create(self, serializer):
        # Ensure newly created users are of type 'admin'
        serializer.save(user_type='admin')
