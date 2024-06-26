from rest_framework.response import Response
from rest_framework.views import APIView
from .serilizers import *
from rest_framework import status
from hotel.models import *
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.generics import ListAPIView,RetrieveAPIView
from .permissions import HotelOwnerOrReadOnly,HotelRoomOwnerOrReadOnly,ReviewOwnerOrReadOnly,BookingPermissions
from .paginations import Paginations
from django.db.models import Q


class AdminUsersView(APIView):
    model = User
    serializer = AdminSerializer
    def post(self,request):     
        try:
            data = request.data
            serializer = self.serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class CustomerUsersView(APIView):
    model = Customer
    serializer = CustomerSerializer
    def post(self,request):     
        try:
            data = request.data
            serializer = self.serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'info':'email fields is required !'},status=status.HTTP_400_BAD_REQUEST)


class AuthenticationView(ObtainAuthToken):
    model = User
    serialier = UsersSerilizers
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            user_info = User.objects.get(username = user)
            user_serializer = self.serialier(user_info)
            info = {
                'user_info':user_serializer.data,
                'token' : token.key
            }
            print("saving the data in teh request user ")
            request.user = user_info.username

            return Response(info,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error" : "please enter valid creadencials !"},status=status.HTTP_400_BAD_REQUEST)
    



class HotelView(APIView):
    model = Hotel
    serializer = HotelSerilizers

    def get_permissions(self):
        if self.request.method == 'POST':
            self.authentication_classes = [TokenAuthentication]
            self.permission_classes = [IsAuthenticated,IsAdminUser]
        elif self.request.method in ['PUT', 'DELETE']:
            self.authentication_classes = [TokenAuthentication]
            self.permission_classes = [IsAuthenticated, HotelOwnerOrReadOnly]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def get(self,request):
        data = Hotel.objects.all()
        paginator = Paginations()
        paginated_queryset = paginator.paginate_queryset(data, request)
        serializer = HotelSerilizers(paginated_queryset,many=True)
        return paginator.get_paginated_response(serializer.data)
        
    def post(self,request):
        try:
            data = request.data
            serializer = HotelSerilizers(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(serializer.error_messages)
        

    def put(self,request,id):
        try:
            instance = self.model.objects.get(pk=id)
            self.check_object_permissions(request,instance)

            serializer = self.serializer(instance=instance,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                print(serializer.errors)
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.message,status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request,id):
        try:
            hotel = self.model.objects.get(pk=id)
            self.check_object_permissions(request,hotel)
            if not hotel:
                raise ValidationError('cant find the hotel please enter a valid hotel')
            else:
                hotel.delete()
                return Response({'delete':'hotel has been delete successfully !!'},status=status.HTTP_200_OK)
        except ValidationError as v:
            return Response(v.message)
                

class HotelRoomsView(APIView):
    model = HotelRooms
    serializer = HotelRoomsSerilizers
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsAdminUser]
        elif self.request.method in ['PUT', 'DELETE']:
            self.permission_classes = [IsAuthenticated, HotelRoomOwnerOrReadOnly]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
    

    def get(self,request):
        print(request.user)
        data = self.model.objects.all()
        serializer = self.serializer(data,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        try:
            print("inside the post method")
            data = request.data
            serializer = self.serializer(data=data)
            if serializer.is_valid():
                print("saving the data ")
                serializer.save()
                return Response(serializer.data)
            else:
                print("inside the else ")
                return Response(serializer.error_messages)
        except ValidationError as v:
            return Response(serializer.errors)
        
    def put(self,request,id):
        try:
            print("inside the put ",id)
            instance = self.model.objects.get(pk=id)
            self.check_object_permissions(request,instance)
            serializer = self.serializer(instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except self.model.DoesNotExist as e:
            return Response({'info' : "Room does not exists ! "},status=status.HTTP_400_BAD_REQUEST)

        
    def delete(self,request,id):
        try:
            room = self.model.objects.get(pk=id)
            self.check_object_permissions(request,room)
            if not room:
                raise ValidationError("No such room exists ")
            room.delete()
            return Response({'info':'Room has been deleted successfully'},status=status.HTTP_200_OK)
        except self.model.DoesNotExist as e:
            return Response({'info':'Room does not exists'},status=status.HTTP_400_BAD_REQUEST)

class ReviewsView(APIView):
    model = Reviews
    serializer = ReviewSerilizers
    def get_permissions(self):
        if self.request.method == 'POST':
            self.authentication_classes = [TokenAuthentication]
            self.permission_classes = [IsAuthenticated]
        elif self.request.method in ['PUT', 'DELETE']:
            self.authentication_classes = [TokenAuthentication]  
            self.permission_classes = [IsAuthenticated, ReviewOwnerOrReadOnly]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()
    
    def get(self,request):
        try:
            data = self.model.objects.all()
            pagination  = Paginations()
            pagination_queryset = pagination.paginate_queryset(data,request)
            serializer = self.serializer(pagination_queryset,many=True)
            return pagination.get_paginated_response(serializer.data)
        except self.model.DoesNotExist as e:
            return Response({'info':"can't fetch the data for now please try later !"},status=status.HTTP_306_RESERVED)

    def post(self,request):
        try:
            data = request.data
            serializer = self.serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.message,status=status.HTTP_400_BAD_REQUEST)
        
    def put(self,request,id):
        try:
            instance = self.model.objects.get(pk=id)
            self.check_object_permissions(request,instance)
            serializer = self.serializer(instance,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_401_UNAUTHORIZED)
        except self.model.DoesNotExist:
            return Response({'info':"review does not exists !"},status=status.HTTP_400_BAD_REQUEST) 
        
    def delete(self,request,id):
        try:
            instance = self.model.objects.get(pk=id)
            self.check_object_permissions(request,instance)
            if not instance:
                raise ValidationError("No such room exists ")
            instance.delete()
            return Response({'info':'Review has been deleted successfully'},status=status.HTTP_200_OK)
        except self.model.DoesNotExist as e:
            return Response({'info':'Review does not exists'},status=status.HTTP_400_BAD_REQUEST)


class BookingView(APIView):
    model = Booking
    serializer = BookingSerializer
    authentication_classes = [TokenAuthentication]
    def get_permissions(self):
        if self.request.method in ['DELETE','PUT']:
            self.permission_classes = [IsAuthenticated,BookingPermissions]
        elif self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        else :
            self.permission_classes = [AllowAny]
        return super().get_permissions()
    

    def get(self,request):
        data = self.model.objects.all()
        serializers = BookingSerializer(data,many=True)
        return Response(serializers.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        try:
            data = request.data
            serializer = self.serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'info' : 'something went wrong !'},status=status.HTTP_408_REQUEST_TIMEOUT)
        
    def put(self,request,id):
        new_data = request.data
        try:
            old_data = self.model.objects.get(pk=id)
        except self.model.DoesNotExist as e:
            return Response({'info' : 'no such data exists !'},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer(old_data,data=new_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'info' : 'Booking has been updates succesfully '},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request,id):
        try:
            data = self.model.objects.get(pk=id)
        except self.model.DoesNotExist as e:
            return Response({'info' : 'no such data exists !'},status=status.HTTP_400_BAD_REQUEST)
        data.delete()
        return Response({'info':'Booking has been cancel successfully'},status=status.HTTP_200_OK)
    
    

class AvailableRoomsView(APIView):
    model = Booking
    serializer_class = FormatedHotelRoomSerilizer
    data = model.objects.all()

    def get(self,request):
        serializer = self.serializer_class(self.data)
        return Response(serializer.data,status=status.HTTP_200_OK)

class CurrentlyBookedHotelRoomView(APIView):
    model = Booking
    serializer_class = BookedHotelRoomSerilizer
    data = model.objects.all()

    def get(self,request):
        serializer = self.serializer_class(self.data)
        return Response(serializer.data,status=status.HTTP_200_OK)