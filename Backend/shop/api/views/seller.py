# views/seller_details.py
from rest_framework import generics, permissions

from api.models.sellerdetails import SellerDetails
from api.serializers.seller import SellerDetailsSerializer


class IsSellerOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if request.user == obj.user:
            return True
        return False

class SellerDetailsDetailView(generics.RetrieveUpdateAPIView):
    queryset = SellerDetails.objects.all()
    serializer_class = SellerDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsSellerOwnerOrAdmin]

    def get_object(self):
        try:
            return SellerDetails.objects.get(user=self.request.user)
        except SellerDetails.DoesNotExist:
            raise generics.Http404("Seller details not found.")

    def get_serializer_context(self):
        return {'request': self.request}

class SellerDetailsCreateView(generics.CreateAPIView):
    queryset = SellerDetails.objects.all()
    serializer_class = SellerDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}