from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views
urlpatterns = [

    #authentcation paths starts here
    path("auth/create/admin",views.CreateAdminUserView.as_view()),
    path("auth/create/customer",views.CreateCustomerUserView.as_view()),
    path("auth/login",views.Authentication.as_view()),
    path("auth/customer/<int:id>",views.CustomerAuthenticationView.as_view()),
    path("auth/admin/<int:id>",views.AdminAuthenticationView.as_view()),

    #hotel path starts here
    path("hotel/create",views.CreateHotelView.as_view()),
    path("hotel/type",views.HotelTypeView.as_view()),
    path("hotel/",views.HotelDetaileView.as_view()),

]
