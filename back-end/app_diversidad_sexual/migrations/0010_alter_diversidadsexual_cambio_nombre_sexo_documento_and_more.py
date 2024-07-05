# Generated by Django 4.2.13 on 2024-07-04 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_diversidad_sexual', '0009_alter_diversidadsexual_id_persona'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diversidadsexual',
            name='cambio_nombre_sexo_documento',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='diversidadsexual',
            name='expresiones_de_genero',
            field=models.ManyToManyField(blank=True, max_length=200, to='app_diversidad_sexual.expresiongenero'),
        ),
        migrations.AlterField(
            model_name='diversidadsexual',
            name='identidades_de_genero',
            field=models.ManyToManyField(blank=True, max_length=200, to='app_diversidad_sexual.identidadgenero'),
        ),
        migrations.AlterField(
            model_name='diversidadsexual',
            name='orientaciones_sexuales',
            field=models.ManyToManyField(blank=True, max_length=200, to='app_diversidad_sexual.orientacionsexual'),
        ),
    ]