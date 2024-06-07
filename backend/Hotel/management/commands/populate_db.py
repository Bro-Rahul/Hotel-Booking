from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        call_command("makemigrations")
        call_command("migrate")
        call_command("loaddata","users.json")
        call_command("loaddata", "category.json")
        call_command("loaddata","Hotel.json")
        call_command("loaddata","images.json")
        call_command("loaddata","hotel_room.json")
        call_command("loaddata","reviews.json")



    