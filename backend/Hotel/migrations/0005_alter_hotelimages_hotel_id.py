# Generated by Django 5.0.2 on 2024-03-04 18:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0004_alter_hotelfacility_hotel_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotelimages',
            name='hotel_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Hotel.hotel'),
        ),
    ]
