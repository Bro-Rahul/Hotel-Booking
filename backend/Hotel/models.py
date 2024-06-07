from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator,MaxValueValidator,MaxLengthValidator,MinLengthValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
import datetime

# Create your models here.

class Role(models.TextChoices):
    ADMIN = "AD",_("Admin")
    CUSTOMER = "CU",_("Cutomer")

GUESS = ['1','2','3','4','5','6','7']

class Beds(models.TextChoices):
    KING1 = 'ks1' , _("1 KING SiZE BED")
    DOUBLE1 = 'db1' , _("1 DOUBLE SIZE BED")
    KING2 = 'ks2' , _("2 KING SiZE BED")
    DOUBLE2 = 'db2' , _("2 DOUBLE SIZE BED")
    

class AdminManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role=Role.ADMIN)
    
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        print("inside the create_superuser")
        extra_fields.setdefault('role', Role.ADMIN)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        email = self.normalize_email(email)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class UserModelManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset()


class User(AbstractUser):
    role = models.CharField(max_length=2 , choices=Role.choices,default=Role.ADMIN)
    base_role = Role.ADMIN
    profile = models.ImageField(upload_to="user-profile/",blank=True,null=True)
    objects = UserModelManager()
    admin = AdminManager()

    class Meta:
        verbose_name_plural = "Admin User"

    def save(self,*args,**kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args,**kwargs)
        
    def __str__(self) -> str:
        return f"{self.username}"


class CustomerManager(BaseUserManager):
    def get_queryset(self,*args,**kwargs) -> models.QuerySet:
        quary =  super().get_queryset(*args,**kwargs)
        return quary.filter(role = Role.CUSTOMER)
    
    def create(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Customer(User):
    class Meta:
        proxy = True

    objects = CustomerManager()

    base_role = Role.CUSTOMER

    def __str__(self) -> str:
        return f"{self.username}"
    

class Category(models.Model):
    name = models.CharField(max_length=50,unique=True,validators=[MinLengthValidator(3,"Please Enter a valid name for the hotel category "),MaxLengthValidator(50,"Please Enter an smaller name for the hotel category ")])
    def __str__(self) -> str:
        return self.name
    
    def __str__(self) -> str:
        return self.name
 
class Hotel(models.Model):
    name = models.CharField(max_length=100,unique=True)
    slug = models.SlugField(editable=False)
    description = models.TextField(max_length=300)
    created_by = models.ForeignKey(User,on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True,editable=False)
    updated_at = models.DateTimeField(auto_now=True,editable=False)
    rules = models.JSONField(default=dict)
    near_by = models.JSONField(default=dict)
    facility = models.JSONField(default=dict)
    address = models.JSONField(default=dict)
    total_rooms = models.PositiveIntegerField(default=20)
    rating = models.DecimalField(max_digits=3,decimal_places=2,default=0.00)

    class Meta:
        verbose_name = 'Hotel'
        verbose_name_plural = 'Hotels'

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args,**kwargs)
    

    def __str__(self) -> str:
        return self.name

class HotelRooms(models.Model):
    hotel = models.ForeignKey(Hotel,related_name="hotel_room",on_delete=models.CASCADE)
    rate = models.DecimalField(max_digits=10,decimal_places=2,validators=[MinValueValidator(5,"Please enter a valid price of the hotel "),MaxValueValidator(99999999.99,"please enter a shorter amount !!")])
    room_facility = models.JSONField()
    bed = models.CharField(max_length=50,choices=Beds.choices,default=Beds.DOUBLE1)
    number_of_guess = models.CharField(max_length=20)
        
    def save(self,*args, **kwargs):
        hotel_id = self.hotel
        total_rooms = hotel_id.total_rooms
        total_rooms_created = HotelRooms.objects.filter(hotel_id = hotel_id).count()
        if total_rooms > total_rooms_created:
            return super().save(*args,**kwargs)
        else:
            print("Can't create a new room of this hotel type try to increase the capacity of the rooms first !!")
            raise ValidationError("Can't create a new room of this hotel type. Try to increase the capacity of the rooms first!")
        


class HotelImages(models.Model):
    image = models.ImageField(upload_to='images/')
    hotel = models.ForeignKey(Hotel,on_delete=models.CASCADE,related_name='images')

    def __str__(self) -> str:
        return f"{self.hotel} image" 
    


class Reviews(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0,"Rating must be greater then or equal to 0 !"),MaxValueValidator(5,"Rating should be less then equal to 5 !")])
    description = models.TextField()
    hotel = models.ForeignKey(Hotel,on_delete=models.CASCADE,related_name="hotel_reviews")

    def save(self,*args, **kwargs):
        try:
            print("inside the save")
            rating = self.rating
            hotel = Hotel.objects.get(pk = self.hotel_id)
            if not hotel.rating:
                hotel.rating = rating
            else:
                hotel.rating = (hotel.rating+rating)/2
            hotel.save()
            return super().save(*args,**kwargs)
        except Hotel.DoesNotExist as e:
            return ValidationError("Hotel Does not exists !")


    def __str__(self) -> str:
        return f"{self.rating}"


class Booking(models.Model):
    booking_date = models.DateTimeField(auto_now=True)
    hotel = models.ForeignKey(Hotel,on_delete=models.CASCADE, related_name="hotel_booking")
    #amount filde in the api add it 
    checkin_date = models.DateTimeField()
    checkout_date = models.DateTimeField()
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_booked") 
    payment_mode = models.CharField(max_length=100,)
    number_of_person = models.PositiveIntegerField()
    room_id = models.ForeignKey(HotelRooms,related_name="hotel_room",on_delete=models.CASCADE)


    def check_booking(self,reservation):
        hotel_id = reservation.hotel_id
        booked_rooms = Booking.objects.filter(pk = reservation.pk , hotel_id=hotel_id , checkout_date__lt=timezone.now())
        if len(booked_rooms) != 0:
            room = Booking.objects.get(pk = reservation.pk)
            room.booking_date = timezone.now()
            room.checkin_date = datetime.datetime(reservation.checkout_date)
            room.user = reservation.user
            room.payment_mode = "Cash"
            room.number_of_person = reservation.persons
            room.room_id = reservation.room_id
            room.save()
        else:
            raise ValueError("No Room is Available at the moment for this room type !!")

    def __str__(self) -> str:
        return self.booking_date
    