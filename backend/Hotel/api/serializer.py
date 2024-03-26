from rest_framework.serializers import ModelSerializer
from Hotel.models import *

class AdminAuthenticationserializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password','is_superuser']
    

class CustomerAuthenticationserializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id','username','email','password','is_superuser']

class AuthenticationSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','role']

    


class HotelSerializer(ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class HotelImagesSerializer(ModelSerializer):
    class Meta:
        model = HotelImages
        fields = '__all__'

class HotelFacilitySerializer(ModelSerializer):
    class Meta:
        model = HotelFacility
        fields = ['hotel_facility']

class HotelReviewSerializer(ModelSerializer):
    class Meta:
        model = HotelReviews
        fields = ['review','rating']

class HotelDetaileSerializer(ModelSerializer):
    images = HotelImagesSerializer(many=True)
    facility = HotelFacilitySerializer(many=True)
    reviews = HotelReviewSerializer(many=True)
    
    class Meta:
        model = Hotel
        fields = '__all__'

class HotelCatogorySerializer(ModelSerializer):
    type = HotelReviewSerializer(many=True)
    class Meta:
        model = Catagories
        fields = '__all__'
