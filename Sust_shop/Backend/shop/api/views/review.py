from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from ..models.review import Review
from ..models.product import Product
from ..serializers.review import ReviewSerializer

class IsReviewerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.reviewer or request.user.user_type == 'admin'

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()  # ✅ Added to fix router error
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsReviewerOrAdmin]

    def perform_create(self, serializer):
        product_id = self.request.data.get('product')
        if not product_id:
            raise ValidationError("Product ID is required.")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise ValidationError("Invalid Product ID.")

        # Prevent duplicate reviews
        if Review.objects.filter(product=product, reviewer=self.request.user).exists():
            raise ValidationError("You have already reviewed this product.")

        serializer.save(product=product, reviewer=self.request.user)
