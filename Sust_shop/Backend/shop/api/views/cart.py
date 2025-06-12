from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from ..models.cart import CartItem
from ..models.product import Product
from ..serializers.cart import CartItemSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product = serializer.validated_data['product']
        user = self.request.user

        # Check if the item already exists — update quantity instead of duplicate
        existing = CartItem.objects.filter(user=user, product=product).first()
        if existing:
            existing.quantity += serializer.validated_data['quantity']
            existing.save()
        else:
            serializer.save(user=user)

    def destroy(self, request, *args, **kwargs):
        item = self.get_object()
        if item.user != request.user:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
