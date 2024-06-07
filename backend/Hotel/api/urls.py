from django.urls import path,include
from . import views
urlpatterns = [
    path('hotel',views.HotelView.as_view()),
    path('hotel/<int:id>',views.HotelView.as_view()),
    path('hotel/room',views.HotelRoomsView.as_view()),
    path('hotel/room/<int:id>',views.HotelRoomsView.as_view()),
    path('hotel/room/booking',views.BookingView.as_view()),
    path('reviews',views.ReviewsView.as_view()),
    path('auth',views.AuthenticationView.as_view()),
    path('create/admin',views.AdminUsersView.as_view()),
    path('create/customer',views.CustomerUsersView.as_view()),
    path('api-auth',include('rest_framework.urls',namespace="api"))
]
