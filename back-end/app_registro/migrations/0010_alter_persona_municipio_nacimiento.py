# Generated by Django 4.2.13 on 2024-07-08 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_registro', '0009_alter_persona_barrio_residencia_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='municipio_nacimiento',
            field=models.CharField(blank=True, default='Municipio no especificado', max_length=100, null=True),
        ),
    ]
