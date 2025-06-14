from rest_framework import serializers

from api.models.caurosel import Carousel

class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'
