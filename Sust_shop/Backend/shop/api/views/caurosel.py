from rest_framework import generics, permissions
from ..models.caurosel import Carousel
from ..serializers.caurosel import CarouselSerializer

# Admin-only permissions
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow read-only access to anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Otherwise, only admin (staff) can modify
        return request.user and request.user.is_staff

class CarouselListCreateView(generics.ListCreateAPIView):
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer
    permission_classes = [IsAdminOrReadOnly]

class CarouselRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer
    permission_classes = [IsAdminOrReadOnly]
