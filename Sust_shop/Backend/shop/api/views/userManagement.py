from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model
from ..serializers.userManagement import UserRoleManagementSerializer

User = get_user_model()


# ✅ Custom Permission: Only Admins
class IsAdminOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'admin'


# ✅ List users by role (admin/seller/user)
class RoleBasedUserListView(generics.ListAPIView):
    serializer_class = UserRoleManagementSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOnly]

    def get_queryset(self):
        role = self.kwargs['role']  # 'admin', 'seller', 'user'
        return User.objects.filter(user_type=role)


# ✅ Retrieve, Update, Delete a specific user of a given role
class RoleBasedUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserRoleManagementSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOnly]
    lookup_field = 'pk'

    def get_queryset(self):
        role = self.kwargs['role']
        return User.objects.filter(user_type=role)
