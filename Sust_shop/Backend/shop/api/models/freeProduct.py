from django.db import models
from django.conf import settings

class FreeProduct(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='free_products/')
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='free_products')
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return self.name
