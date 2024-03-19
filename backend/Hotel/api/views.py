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
class HotelView(APIView):
    def get(self,request):
        hotels = Hotel.objects.all()
        serializer = HotelSerializer(hotels,many=True)
        return Response(serializer.data)

class HotelTypeView(APIView):
    def get(self,request):
        catagories = Catagories.objects.all()
        serializer = HotelCatogorySerializer(catagories,many=True)
        return Response(serializer.data)
    
class HotelDetaileView(APIView):
    def get(self,request,id):
        hotel = Hotel.objects.get(pk=id)
        hotel_Serial = HotelSerializer(hotel)
        return Response(hotel_Serial.data)



