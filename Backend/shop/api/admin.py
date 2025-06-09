from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models.accounts import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'phone_number', 'user_type', 'is_staff', 'is_active')
    list_filter = ('user_type', 'is_staff', 'is_active')
    search_fields = ('email', 'phone_number')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'phone_number', 'password', 'user_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone_number', 'user_type', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

    # This restricts the 'admin' choice to superusers only
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            allowed_types = [('seller', 'Seller'), ('user', 'Normal User')]
            form.base_fields['user_type'].choices = allowed_types
        return form

admin.site.register(CustomUser, CustomUserAdmin)