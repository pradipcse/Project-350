from django.db import models
from django.conf import settings
from ..models.product import Product

class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product')  # Prevent duplicates
        ordering = ['-id']

    def __str__(self):
        return f"{self.quantity} x {self.product.name} for {self.user.email}"
