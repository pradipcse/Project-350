from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access to everyone
        if request.method in SAFE_METHODS:
            return True
        # Allow write access only to authenticated admins
        return request.user.is_authenticated and request.user.user_type == 'admin'
