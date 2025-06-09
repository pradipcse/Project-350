from django.db import models
from django.conf import settings

class SellerDetails(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,                  # Links to your CustomUser model
        on_delete=models.CASCADE,
        related_name='seller_details'
    )
    phone_number = models.CharField(max_length=15, unique=True)    # Seller's contact number (unique)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    bank_name = models.CharField(max_length=100)
    bank_account_number = models.CharField(max_length=40)
    routing_number = models.CharField(max_length=40)
    id_frontpage = models.ImageField(upload_to='seller_ids/')
    id_backpage = models.ImageField(upload_to='seller_ids/')
    seller_image = models.ImageField(upload_to='sellers/')

    def __str__(self):
        return f"{self.user.email} - Seller Details"