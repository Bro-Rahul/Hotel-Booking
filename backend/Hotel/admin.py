from django.contrib import admin
from Hotel.models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Hotel)
admin.site.register(HotelBooking)
admin.site.register(HotelImages)
admin.site.register(HotelReviews)
admin.site.register(Payment)
admin.site.register(Catagories)
admin.site.register(HotelFacility)