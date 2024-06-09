from hotel.models import *
from hotel.api.serilizers import *
from .api.filters import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from hotel.api.paginations import Paginations
# Create your views here.

class HotelFilterView(ListAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerilizers
    filter_backends = [DjangoFilterBackend,]
    filterset_class = HotelFilter
    pagination_class = Paginations


class HotelRoomFilterView(ListAPIView):
    queryset = HotelRooms.objects.all()
    serializer_class = HotelRoomsSerilizers
    filter_backends = [DjangoFilterBackend,]
    filterset_class = HotelRoomFilter
    pagination_class = Paginations
    


