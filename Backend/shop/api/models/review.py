from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

class Review(models.Model):
    product = models.ForeignKey(
        'Product',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='product_reviews'
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('product', 'reviewer')  # One review per product per user
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reviewer.email} - {self.product.name} - {self.rating}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_product_rating()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.update_product_rating()

    def update_product_rating(self):
        reviews = Review.objects.filter(product=self.product)
        total_reviews = reviews.count()
        if total_reviews > 0:
            avg_rating = sum(r.rating for r in reviews) / total_reviews
        else:
            avg_rating = 0
        self.product.average_rating = round(avg_rating, 2)
        self.product.number_of_reviews = total_reviews
        self.product.save()
