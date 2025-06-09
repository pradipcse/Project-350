# serializers/seller_details.py
from rest_framework import serializers
from api.models.sellerdetails import SellerDetails


class SellerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerDetails
        fields = '__all__'
        read_only_fields = ['user']  # user will be set automatically

    def create(self, validated_data):
        # check if the user is a seller
        if self.context['request'].user.user_type != 'seller':
            raise serializers.ValidationError("Only sellers can create seller details.")
        # check if the seller details already exist
        if SellerDetails.objects.filter(user=self.context['request'].user).exists():
            raise serializers.ValidationError("Seller details already exist.")
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # check if the user is the owner of the seller details
        if instance.user != self.context['request'].user:
            raise serializers.ValidationError("You are not authorized to update this seller details.")
        return super().update(instance, validated_data)