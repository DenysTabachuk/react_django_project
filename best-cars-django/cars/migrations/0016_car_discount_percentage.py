# Generated by Django 5.1.4 on 2025-01-18 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0015_alter_car_brand_alter_car_engine_power_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='car',
            name='discount_percentage',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5, null=True),
        ),
    ]
