# api/views/orders_admin.py

from rest_framework import generics, permissions
from api.models.orders import Order
from api.serializers.adminOrder import AdminOrderSerializer


class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = AdminOrderSerializer
    permission_classes = [permissions.IsAdminUser]

class AdminOrderDeleteView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = AdminOrderSerializer
    permission_classes = [permissions.IsAdminUser]
