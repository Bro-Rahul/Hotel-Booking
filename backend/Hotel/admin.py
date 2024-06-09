from django.contrib import admin
from hotel import models
# Register your models here.


admin.site.register(models.Customer)
admin.site.register(models.User)
admin.site.register(models.Reviews)
admin.site.register(models.Hotel)
admin.site.register(models.HotelRooms)
admin.site.register(models.HotelImages)
admin.site.register(models.Booking)


