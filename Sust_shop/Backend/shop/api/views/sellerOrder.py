from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.models.orders import OrderItem
from api.serializers.orders import OrderItemSerializer


class SellerOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        seller = request.user
        orders = OrderItem.objects.filter(product__uploader=seller).select_related('product', 'order', 'order__user')
        serializer = OrderItemSerializer(orders, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            order_item = OrderItem.objects.get(pk=pk, product__uploader=request.user)
            order_item.delete()
            return Response({"message": "Order item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except OrderItem.DoesNotExist:
            return Response({"error": "Order item not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)
