# Generated by Django 4.2.1 on 2024-05-06 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_informacion_academica', '0004_alter_informacionacademica_id_persona'),
    ]

    operations = [
        migrations.AlterField(
            model_name='informacionacademica',
            name='nombre_programa_academico',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='informacionacademica',
            name='sede_universidad',
            field=models.CharField(max_length=200),
        ),
    ]
