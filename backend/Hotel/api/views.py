from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.parsers import MultiPartParser
from rest_framework.authtoken.models import Token
from .serializer import *
from Hotel.models import *




# this is for the Admin users  authentication views     
class AdminAuthenticationView(APIView):
    def get(self,request,id):
        users = User.objects.get(pk=id)
        serializer = AdminAuthenticationserializer(users)
        return Response(serializer.data)


class CreateAdminUserView(APIView):
    def get(self,request):
        users = User.objects.all()
        serializer = AdminAuthenticationserializer(users,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializers = AdminAuthenticationserializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)     




# this is for the customer authentication views     
class CustomerAuthenticationView(APIView):                  
    def get(self,request,id):
        users = Customer.objects.get(pk=id)
        serializer = CustomerAuthenticationserializer(users)
        return Response(serializer.data)
    
    def post(self,request):
        serializers = CustomerAuthenticationserializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


class CreateCustomerUserView(APIView):
    def get(self,request):
        users = Customer.objects.all()
        serializer = CustomerAuthenticationserializer(users,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializers = CustomerAuthenticationserializer(data=request.data)
        try:
            if serializers.is_valid():
                serializers.save()
                return Response({'detaile':'user has been created !','status':status.HTTP_201_CREATED})
        except:
            return Response({"error":'username is already exists'},status=status.HTTP_406_NOT_ACCEPTABLE)
        



class Authentication(ObtainAuthToken):
    def get(self,request):
        user = request.session.get('user',None)
        print(user)
        token = Token.objects.get(user=user)
        user_info = User.objects.get(username = user)
        user_serializer = AuthenticationSerializer(user_info)
        info = {
            **user_serializer.data,
            'token' : token.key
        }
        return Response(info)
     
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user_info = User.objects.get(username = user)
        user_serializer = AuthenticationSerializer(user_info)
        info = {
            **user_serializer.data,
            'token' : token.key
        }
        request.session['user'] = user_info.username
        print(request.session.get('username',None))
        return Response(info)
        

class HotelTypeView(APIView):
    def get(self,request):
        catagories = Catagories.objects.all()
        serializer = HotelCatogorySerializer(catagories,many=True)
        return Response(serializer.data)
    
class HotelDetaileView(APIView):
    def get(self,request):
        hotel = Hotel.objects.all()
        hotel_Serial = HotelDetaileSerializer(hotel,many=True)
        return Response(hotel_Serial.data)

        
class CreateNewHotelView(APIView):
    parser_classes = [MultiPartParser]
    def post(self,request):
        catogory , create = Catagories.objects.get_or_create(catogory = request.data.get('Hotel Type'))
        hotel_data = {
            'hotel_name' : request.data.get('Hotel Name'),
            'hotel_pincode' : request.data.get('Hotel Pin'),
            'hotel_address' : request.data.get('Hotel Address'),
            'hotel_type' : catogory.pk,
            'hotel_rate' : request.data.get('Hotel Rate'),
            'booked_status' : False
        }
        hotel_serilizer = HotelSerializer(data=hotel_data)
        if hotel_serilizer.is_valid():
            hotel_serilizer.save()
            hotel = Hotel.objects.get(hotel_name = hotel_data['hotel_name'])
            
            hotel_images = request.FILES.getlist('images')
            images = [{ 'hotel_id':hotel.pk,'hotel_image': image } for image in hotel_images]
            for i in images:
                image_serilizer = HotelImagesSerializer(data=i)
                if image_serilizer.is_valid():
                    image_serilizer.save()
                else :
                    return Response(image_serilizer.errors)
            facility_data = {
                'hotel_name' : hotel.pk,
                'hotel_facility' : request.data.get('Hotel Facility')
            }
            facility_serilizer = HotelFacilitySerializer(data = facility_data)
            if facility_serilizer.is_valid():
                facility_serilizer.save()
            
            return Response("Hotel has been create successfully")
        else:
            return Response("Hotel is not create due to some problems")