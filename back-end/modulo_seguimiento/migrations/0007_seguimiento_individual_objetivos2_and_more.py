# Generated by Django 4.1 on 2024-07-29 03:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("modulo_seguimiento", "0006_alter_historial_ficha_fecha"),
    ]

    operations = [
        migrations.AddField(
            model_name="seguimiento_individual",
            name="objetivos2",
            field=models.CharField(blank=True, max_length=10000, null=True),
        ),
        migrations.AddField(
            model_name="seguimiento_individual",
            name="objetivos3",
            field=models.CharField(blank=True, max_length=10000, null=True),
        ),
    ]
