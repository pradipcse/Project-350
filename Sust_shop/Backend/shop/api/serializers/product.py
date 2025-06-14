from rest_framework import serializers
from ..models.product import Product
from ..models.category import Category

class ProductSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)
    number_of_reviews = serializers.IntegerField(read_only=True)
    current_price = serializers.FloatField(read_only=True)
    image = serializers.ImageField(required=False, allow_null=True, use_url=True)
    
    # Category shows category name, input expects category name
    category = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Product
        fields = [ 
            'id', 'name', 'slug', 'image', 'category',
            'price', 'discount_price', 'current_price', 'stock',
            'description', 'average_rating', 'number_of_reviews',
            'uploader', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'uploader', 'created_at', 'updated_at']
