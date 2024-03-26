from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
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
        




# Hotel view starts here  
class CreateHotelView(APIView):
    def post(self,request):
        hotel_images = request.data['images']
        hotel_info = {
            'hotel_name' : request.data['hotel_name'],
            'hotel_pincode' : request.data['hotel_pincode'],
            'hotel_rate' : request.data['hotel_rate'],
            'booked_status' : request.data['booked_status'],
            'hotel_address' : request.data['hotel_address'],
            'hotel_type' : request.data['hotel_type']

        }
        hotel_facility = request.data['facility']
        hotel = Hotel.objects.get(hotel_name = hotel_info['hotel_name'])
        for i in hotel_images:
            images = {
                'hotel_id' : hotel.pk,
                'hotel_image' : i['hotel_image']
            }
            abc = []
            for i,j in images.items():
                if i == 'hotel_image':
                    abc.append(j)
            image_serializer = HotelImagesSerializer(data=images,many=True)
            if image_serializer.is_valid():
                print(image_serializer.data)
            else:
                print(image_serializer.errors)
                return Response(image_serializer.errors)

        hotel_serializer = HotelSerializer(data=hotel_info)
        if hotel_serializer.is_valid():
            print(hotel_serializer.data)
        else:
            return Response(hotel_serializer.errors)

        return Response('this is the test message for inserting the data in the data base')

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



