from rest_framework import generics, permissions, status
from rest_framework.response import Response

from api.models.cart import CartItem
from api.models.orders import Order, OrderItem
from api.serializers.orders import OrderSerializer

class OrderCreateFromCartView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)

        if not cart_items.exists():
            return Response({"detail": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        order = Order.objects.create(
            user=user,
            full_name=data.get('full_name'),
            phone=data.get('phone'),
            address=data.get('address'),
            city=data.get('city'),
            postal_code=data.get('postal_code')
        )

        for cart_item in cart_items:
            product = cart_item.product
            uploader = product.uploader
            price = product.discount_price if product.discount_price else product.price
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=cart_item.quantity,
                price=price,
                uploader=uploader
            )
        # Clear user's cart
        cart_items.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
