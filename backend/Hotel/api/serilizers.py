from rest_framework import serializers
from hotel.models import *
from django.db import transaction

class UsersSerilizers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']
    
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','email']

    def create(self, validated_data):
        return User.admin.create_superuser(**validated_data)

   
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['username','password','email']

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)
    


class HotelImageSerilizers(serializers.ModelSerializer):
    class Meta:
        model = HotelImages
        exclude = ['hotel']

class ReviewSerilizers(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())
    class Meta:
        model = Reviews
        fields = '__all__'

    def create(self, validated_data):
        try:
            return Reviews.objects.create(**validated_data)
        except ValidationError as e:
            raise serializers.ValidationError(e.message)

class HotelRoomsSerilizers(serializers.ModelSerializer):
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())
    class Meta:
        model = HotelRooms
        fields = '__all__'

    def create(self, validated_data):
        try:
            print(validated_data)
            print("inside the HotelRoom Serializer create function")
            return HotelRooms.objects.create(**validated_data)
        except ValidationError as e:
            raise serializers.ValidationError(e.message)


class HotelSerilizers(serializers.ModelSerializer):
    images = HotelImageSerilizers(many=True,read_only=True)
    upload_image = serializers.ListField(
        child=serializers.ImageField(max_length=10000000000,allow_empty_file=False,use_url=True),
        write_only = True
    )
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    hotel_room = HotelRoomsSerilizers(many=True,read_only = True)
    hotel_reviews = ReviewSerilizers(many=True,read_only=True)


    class Meta:
        model = Hotel
        fields = ['upload_image','name','total_rooms','rating','description','created_by','rules','near_by','facility','address','hotel_room','images','hotel_reviews']

    def create(self, validated_data):
        images_data = validated_data.pop('upload_image', []) 
        try:
            with transaction.atomic():
                hotel = Hotel.objects.create(**validated_data)

                for image in images_data:
                    HotelImages.objects.create(hotel=hotel,image=image)
                return hotel
        except Exception as e:
            raise serializers.ValidationError(f"Error occurred: {e}")
            

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'