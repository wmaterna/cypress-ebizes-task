# Generated by Django 4.0.3 on 2022-04-24 13:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vetclinic', '0004_alter_visit_animal_id_alter_visit_doctor_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='visit',
            old_name='animal_id',
            new_name='animal',
        ),
        migrations.RenameField(
            model_name='visit',
            old_name='doctor_id',
            new_name='doctor',
        ),
    ]