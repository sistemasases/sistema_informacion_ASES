# Generated by Django 5.0.4 on 2024-05-07 22:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0006_alter_firma_tratamiento_datos_id_estudiante'),
    ]

    operations = [
        migrations.AlterField(
            model_name='firma_tratamiento_datos',
            name='id_estudiante',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante'),
        ),
    ]
