# Generated by Django 4.2.4 on 2023-08-16 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0007_firma_tratamiento_datos_correo_firma'),
    ]

    operations = [
        migrations.AddField(
            model_name='firma_tratamiento_datos',
            name='tipo_id_estudiante',
            field=models.CharField(default=None, max_length=10),
        ),
    ]