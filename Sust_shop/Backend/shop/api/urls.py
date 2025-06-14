from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static
from api.views.admin import AdminUserViewSet
from api.views.adminReg import  CreateAdminUserView
from api.views.cart import CartItemViewSet
from api.views.category import CategoryViewSet# SubCategoryViewSet
from api.views.caurosel import CarouselListCreateView, CarouselRetrieveUpdateDestroyView
from api.views.freeProduct import FreeProductListCreateView, FreeProductRetrieveUpdateDestroyView
from api.views.login import LoginView
from api.views.mainSearch import ProductSearchView
from api.views.orders import OrderCreateFromCartView, OrderListView
from api.views.product import ProductViewSet
from api.views.register import RegisterView
from api.views.review import ReviewViewSet
from api.views.seller import SellerDetailsCreateView, SellerDetailsDetailView
from api.views.sellerOrder import   SellerOrderView
from api.views.user import CurrentUserView
from api.views.userManagement import RoleBasedUserDetailView, RoleBasedUserListView
from shop import settings
from rest_framework.routers import DefaultRouter


# Base router
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register('reviews', ReviewViewSet)
router.register(r'products', ProductViewSet)
router.register(r'admin-user', AdminUserViewSet, basename='admin-user')
router.register(r'cart', CartItemViewSet, basename='cart')

# router.register(r'subcategories', SubCategoryViewSet)



urlpatterns = [
    path('user/me/', CurrentUserView.as_view(), name='current-user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('create-admin/', CreateAdminUserView.as_view(), name='admin-register'),
    path('login/', LoginView.as_view(), name='login'),
    # List users by role
    path('users/<str:user_tpye>/', RoleBasedUserListView.as_view(), name='user-role-list'),
    # Detail view (update/delete user by ID and role)
    path('users/<str:user_type>/<int:pk>/', RoleBasedUserDetailView.as_view(), name='user-role-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('seller-details/create/', SellerDetailsCreateView.as_view(), name='seller-details-create'),
    path('seller-details/', SellerDetailsDetailView.as_view(), name='seller-details-detail'),
    # path('cart/',CartItemViewSet.as_view(), name='cart-item' ),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/create-from-cart/', OrderCreateFromCartView.as_view(), name='order-from-cart'),
    path('seller/orders/', SellerOrderView.as_view(), name='seller-order-list'),
    path('seller/orders/<int:pk>/', SellerOrderView.as_view(), name='seller-order-delete'),
    path('carousel/', CarouselListCreateView.as_view(), name='carousel-list-create'),
    path('carousel/<int:pk>/', CarouselRetrieveUpdateDestroyView.as_view(), name='carousel-detail'),
    path('free-products/', FreeProductListCreateView.as_view(), name='freeproduct-list-create'),
    path('free-products/<int:pk>/', FreeProductRetrieveUpdateDestroyView.as_view(), name='freeproduct-detail'),
     path('main/products/search/', ProductSearchView.as_view(), name='product-search'),
    path('v1/', include(router.urls)),
    
]
