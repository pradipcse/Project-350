from rest_framework import permissions

class IsAdminOrUploader(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Admins can do anything
        if request.user.user_type == 'admin':
            return True
        # Sellers can only update/delete their own products
        return obj.uploader == request.user
