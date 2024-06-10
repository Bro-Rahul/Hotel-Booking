# Hotel-Booking
AN FULL STACK WEB APPLICATION FOR THE HOTEL BOOKING MANAGEMENT 

******** Backend **********
To run the backend server follow the following instructions step by step

1.create a virtual environment first in the backend folder 
    command -> python3 -m venv menv (the menv is the name of the environment variable u can give any name !)
    after then type .\menv\Script\activate  or some time it is .\menv\bin\activate this wil acivate the environment 
    configure that environment interpreter by opening any python file and goto the bottom right part of the vs code that will show the select interpreter
    alfer click on that select the recommended option which will select that environment variable 

2. install the requiredments dependency
    commands -> pip install -r requiredment.txt 

3. Acivate the django server 
    command -> python manage.py runserver

this will start the django server 


API ENDPOINTS 
BASE URL = http://127.0.0.1:8000/     
actual endpoinst 
    /filter-hotel        #  filtering the data of the hotel based on facility,rating,number of guess,general facility 
    /filter-hotelroom    #  filtering the hotel rooms based in the room specific facility 
    /hotel               #  this is endpoint is use for the hotel related informations u can perform the get and post operation for your created hotel 
                            Note:- you have to provide the token first foe the permission related check that if u are able to perform the operation or not such as post,put and delete the data but u can use it for                             get request to simple know the hotel lists 
    /hotel/<int:id>      #  this is use for the put and delete the data of the hotel that the admin user created by specifying the id and token for the validations purpose ae mention in the Note above 
    /hotel/room          # this is the used for creating the rooms in the hotel provide the token and hotel name that u have created earlier
    /hotel/room/<int:id> # this is use to put and delete the hotel room of the hotel by providing simply the token 
    /hotel/room/booking  # this is for booking the hotel  
    /reviews             # u can use this ennpoint for the reviews given to the hotel get and post method are allowed
    /reviews/<int:id>    # reviewed user can update and delete the review by providing the token in the header for the varifications purpose 
    /auth                # this is used to generate the token for an user by providing the username and password 
    /create/admin        # create a admin user who is able to create a new hotel and respective rooms of that hotel 
    /create/customer     # create a customer user who can booked the hotel and not able to create a hotel but can review the any hotel  
    /available-rooms     # this endpoint is used to fetch the rooms that are not currently booked for this time period 
    /booked-rooms        # this ennpoint is used to fetch the booked rooms for the currrent time period 
