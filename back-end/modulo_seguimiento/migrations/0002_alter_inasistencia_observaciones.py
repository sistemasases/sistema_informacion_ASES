# Generated by Django 4.1.1 on 2023-10-05 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("modulo_seguimiento", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="inasistencia",
            name="observaciones",
            field=models.CharField(max_length=7000),
        ),
    ]
