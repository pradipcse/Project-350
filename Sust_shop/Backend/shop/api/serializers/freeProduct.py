from rest_framework import serializers

from api.models.freeProduct import FreeProduct

class FreeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreeProduct
        fields = '__all__'
        read_only_fields = ['uploaded_by']
