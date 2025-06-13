from rest_framework import serializers

from api.models.orders import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', read_only=True, max_digits=10, decimal_places=2)
    seller = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_price', 'quantity', 'seller']

    def get_seller(self, obj):
        return {
            "id": obj.product.uploader.id,
            "email": obj.product.uploader.email,
            "user_type": obj.product.uploader.user_type
        }

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'full_name', 'phone', 'address', 'city', 'postal_code', 'created_at', 'is_paid', 'items', 'total']
        read_only_fields = ['user', 'created_at', 'is_paid']

    def get_total(self, obj):
        return obj.total_price()
