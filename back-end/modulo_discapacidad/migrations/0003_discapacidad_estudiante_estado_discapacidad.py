# Generated by Django 4.2.6 on 2023-10-31 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_discapacidad', '0002_discapacidad_estudiante_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='discapacidad_estudiante',
            name='estado_discapacidad',
            field=models.BooleanField(default=True),
        ),
    ]