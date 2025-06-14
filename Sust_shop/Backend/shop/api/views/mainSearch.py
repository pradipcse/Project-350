from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.product import Product
from ..serializers.product import ProductSerializer

class ProductSearchView(APIView):
    def get(self, request):
        name = request.query_params.get('name')
        category = request.query_params.get('category')

        # Start with all products
        products = Product.objects.all()

        # Filter by name if provided
        if name:
            products = products.filter(name__icontains=name)

        # Filter by category name if provided
        if category:
            products = products.filter(category__name__iexact=category)

        # If no filters provided, return an error
        if not name and not category:
            return Response(
                {"detail": "Provide 'name' or 'category' as query param."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
