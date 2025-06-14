from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("❌ Serializer errors:", serializer.errors)  # <-- this will print to your server console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CarouselRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer
    permission_classes = [IsAdminOrReadOnly]
