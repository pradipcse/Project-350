from rest_framework import serializers
from ..models.product import Product

class ProductSerializer(serializers.ModelSerializer):
    uploader = serializers.ReadOnlyField(source='uploader.email')
    average_rating = serializers.FloatField(read_only=True)
    number_of_reviews = serializers.IntegerField(read_only=True)
    current_price = serializers.FloatField(read_only=True)

    # Use ImageField instead of SerializerMethodField
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'image', 'category',
            'price', 'discount_price', 'current_price', 'stock',
            'description', 'average_rating', 'number_of_reviews',
            'uploader', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'uploader', 'created_at', 'updated_at']
