from django.db import models

class Carousel(models.Model):
    image = models.ImageField(upload_to='carousel/')
    description = models.CharField(max_length=255)
    todays_offer = models.BooleanField(default=False)
    todays_offer_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Carousel {self.id} - Offer: {self.todays_offer}"
