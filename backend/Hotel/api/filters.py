from hotel.models import *
import django_filters


class HotelFilter(django_filters.FilterSet):
    hotel_facility = django_filters.CharFilter(field_name="facility__general", lookup_expr="icontains",label='General Facility')
    
    reservation_policy = django_filters.CharFilter(field_name="facility__Reservation policy", lookup_expr="icontains",label="Payment Related")

    country = django_filters.CharFilter(field_name="address__country",lookup_expr="icontains",label="country")

    city = django_filters.CharFilter(field_name="address__city",lookup_expr="icontains",label="city")

    class Meta:
        model = Hotel
        fields = {
            'rating' : ['gt','gte'],
        }

class HotelRoomFilter(django_filters.FilterSet):
    bathroom_filter = django_filters.CharFilter(field_name="room_facility__Bathroom",lookup_expr="icontains",label="Bathroom Filter")

    number_of_guess = django_filters.CharFilter(field_name="number_of_guess",lookup_expr="gte",label="People Stay")

    price = django_filters.CharFilter(field_name="rate",lookup_expr="gte",label="Price")

    category = django_filters.CharFilter(field_name="category",lookup_expr="exact",label="Category")

    class Meata:
        model = HotelRooms

        fields = []