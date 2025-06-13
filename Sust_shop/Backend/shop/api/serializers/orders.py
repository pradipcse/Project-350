from rest_framework import serializers

from api.models.orders import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    uploader_email = serializers.ReadOnlyField(source='uploader.email')

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'uploader_email']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'full_name', 'phone', 'address', 'city', 'postal_code', 'created_at', 'is_paid', 'items', 'total']
        read_only_fields = ['user', 'created_at', 'is_paid']

    def get_total(self, obj):
        return obj.total_price()
