# Generated by Django 5.0.6 on 2024-06-09 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel', '0004_alter_hotel_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='payment_mode',
            field=models.CharField(default='cash', max_length=100),
        ),
    ]
