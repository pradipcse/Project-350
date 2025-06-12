from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..serializers.adminReg import AdminUserCreateSerializer

class CreateAdminUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.user_type != 'admin' and not request.user.is_superuser:
            return Response({'detail': 'Only admins or superusers can create other admins.'},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = AdminUserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Admin created successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
