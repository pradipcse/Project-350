from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models.product import Product
from ..serializers.product import ProductSerializer

class ProductSearchView(APIView):
    def get(self, request):
        name = request.query_params.get('name')
        category = request.query_params.get('category')

        if name:
            products = Product.objects.filter(name__icontains=name)
        elif category:
            products = Product.objects.filter(category__iexact=category)
        else:
            return Response({"detail": "Provide 'name' or 'category' as query param."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
