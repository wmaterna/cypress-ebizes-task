# Generated by Django 4.0.3 on 2022-05-23 17:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vetclinic', '0006_species_animal_date_of_birth_animal_gender_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
