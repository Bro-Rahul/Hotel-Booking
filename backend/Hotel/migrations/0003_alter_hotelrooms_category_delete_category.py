# Generated by Django 5.0.6 on 2024-06-08 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0002_alter_hotelrooms_room_facility'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotelrooms',
            name='category',
            field=models.CharField(max_length=50),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
