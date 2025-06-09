from rest_framework import viewsets, permissions
from ..models.product import Product
from ..serializers.product import ProductSerializer
from .permission import IsAdminOrUploader

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminOrUploader()]
        elif self.action == 'create':
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}
