from rest_framework import generics, permissions

from api.models.freeProduct import FreeProduct
from api.serializers.freeProduct import FreeProductSerializer


# Combined custom permission
class IsUploaderOrAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and (request.user.is_staff or obj.uploaded_by == request.user)

# List and Create View
class FreeProductListCreateView(generics.ListCreateAPIView):
    queryset = FreeProduct.objects.all()
    serializer_class = FreeProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)

# Retrieve, Update, and Delete View
class FreeProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FreeProduct.objects.all()
    serializer_class = FreeProductSerializer
    permission_classes = [IsUploaderOrAdminOrReadOnly]
