# Generated by Django 5.0.2 on 2024-03-04 18:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0003_alter_hotelfacility_hotel_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotelfacility',
            name='hotel_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Hotel.hotel'),
        ),
    ]
