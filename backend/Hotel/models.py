from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager,PermissionsMixin
from django.core.validators import MinValueValidator,MaxValueValidator,MaxLengthValidator
import datetime


class Role(models.TextChoices):
    ADMIN = "ADMIN","Admin"
    CUSTOMER = "CUSTOMER","Cutomer"
    
class UserModelManager(BaseUserManager):
    """ def get_queryset(self):
        return super().get_queryset().filter(role=Role.ADMIN)
   """

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('role', Role.ADMIN)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        email = self.normalize_email(email)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)



class User(AbstractUser,PermissionsMixin):
    role = models.CharField(max_length=50 , choices=Role.choices)
    base_role = Role.ADMIN
    profile = models.FileField(upload_to="user-profile",blank=True,editable=True)
    amount = models.PositiveIntegerField(null=True)
    objects = UserModelManager()

    class Meta:
        verbose_name_plural = "Admin User"

    def save(self,*args,**kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args,**kwargs)
        
    def __str__(self) -> str:
        return f"{self.username}"


class CustomerManager(BaseUserManager):
    """    def get_queryset(self,*args,**kwargs) -> models.QuerySet:
        quary =  super().get_queryset(*args,**kwargs)
        return quary.filter(role = Role.CUSTOMER) """
    
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

class Catagories(models.Model):
    catogory = models.CharField(max_length=50)
    def __str__(self):
        return self.catogory
        


class Hotel(models.Model):
    hotel_name = models.CharField(max_length=100)
    hotel_pincode = models.DecimalField(max_digits=10,decimal_places=0)
    hotel_address = models.CharField(
        max_length=250,
        validators=[MaxLengthValidator(250,"Enter the Smaller Address !")])
    hotel_type = models.ForeignKey(Catagories,on_delete=models.CASCADE,related_name ="type")
    hotel_rate = models.PositiveIntegerField()
    booked_status = models.BooleanField(default=False)

    def __str__(self):
        return self.hotel_name
    
class HotelFacility(models.Model):
    hotel_name = models.ForeignKey(Hotel,on_delete= models.SET_NULL,null=True,related_name = "facility")
    hotel_facility = models.CharField(max_length = 250)


class HotelReviews(models.Model):
    hotel_name = models.ForeignKey(Hotel,on_delete=models.CASCADE,related_name="reviews")
    customer_name = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name = "user_id")
    review = models.CharField(max_length=200)
    rating = models.FloatField(
        validators=[MinValueValidator(0.0,"The rating should be greater then or equal to 0 !!"),MaxValueValidator(5.0,"The rating should be less then or equal to 5 !!")],
        default=0) 
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.hotel_name.hotel_name + ' | ' + str(self.rating)


class Payment(models.Model):
    customer_name = models.ForeignKey(Customer,on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    hotel_name = models.ForeignKey(Hotel,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.customer_name + " " + self.hotel_name


class HotelBooking(models.Model):
    admin = models.ForeignKey(User,on_delete=models.CASCADE,related_name="admin")
    customer_name = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="booking_customer")
    hotel_name = models.ForeignKey(Hotel,on_delete=models.CASCADE)
    checkin_date = models.DateField()
    checkout_date = models.DateField()

    def setBooking(self):
        hotel = Hotel.objects.get(hotel_name=self.hotel_name)
        hotel.booked_status = True
        hotel.save()

    def calculateDays(self,checkin,checkout):
       date1 = datetime.fromisoformat(checkin)
       date2 = datetime.fromisoformat(checkout)
       return date2-date1
    
    def setAmount(self):
        customer = Customer.objects.get(customer_name=self.customer_name)
        user = User.objects.get(username=self.admin)
        total_days = self.calculateDays(self.checkin_date,self.checkout_date)
        total_amount = total_days * self.hotel_name.hotel_rate
        user.amount+=total_amount
        customer.amount+=total_amount

    def __str__(self) -> str:
        return f"Hotel {self.hotel_name} Booked By "+self.customer_name 


class HotelImages(models.Model):
    hotel_image = models.FileField(upload_to="media")
    hotel_id = models.ForeignKey(Hotel,on_delete=models.CASCADE,related_name = "images")

    def __str__(self) -> str:
        return f"image of hotel {self.hotel_id.hotel_name}"

