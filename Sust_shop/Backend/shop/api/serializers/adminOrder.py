# api/serializers/orders_admin.py

from rest_framework import serializers
from api.models.orders import Order, OrderItem

class AdminOrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    seller = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'seller']

    def get_seller(self, obj):
        uploader = obj.uploader
        if uploader:
            return {
                "id": uploader.id,
                "email": uploader.email,
                "user_type": uploader.user_type
            }
        return None

class AdminOrderSerializer(serializers.ModelSerializer):
    items = AdminOrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'full_name', 'phone', 'address', 'city', 'postal_code',
            'created_at', 'is_paid', 'items', 'total'
        ]

    def get_total(self, obj):
        return obj.total_price()
