from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from api.models.orders import OrderItem
from api.serializers.orders import OrderItemSerializer

# 🔹 View 1: List all order items for seller's uploaded products
class SellerOrderListView(generics.ListAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return order items for products uploaded by the current seller
        return OrderItem.objects.filter(product__uploader=self.request.user)

# 🔹 View 2: Allow seller to delete order item that belongs to their uploaded product
class SellerDeleteOrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            order_item = OrderItem.objects.get(pk=pk, product__uploader=request.user)
            order_item.delete()
            return Response({"message": "Order item deleted."}, status=status.HTTP_204_NO_CONTENT)
        except OrderItem.DoesNotExist:
            return Response({"error": "Order item not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)
