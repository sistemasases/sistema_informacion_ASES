# Generated by Django 4.0 on 2022-10-10 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0012_estudiante_apellido_estudiante_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='estudiante',
            name='cod_univalle',
            field=models.CharField(default=None, max_length=12),
        ),
    ]
