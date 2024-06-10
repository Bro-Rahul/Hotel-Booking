from rest_framework.permissions import BasePermission,SAFE_METHODS
from rest_framework.permissions import IsAdminUser
class HotelOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in SAFE_METHODS:
            return True
        return obj.created_by == request.user
    
class HotelRoomOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.hotel.created_by == request.user
    

class ReviewOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user
    
class BookingPermissions(BasePermission):

    def has_object_permission(self, request, view, obj):
        
        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user