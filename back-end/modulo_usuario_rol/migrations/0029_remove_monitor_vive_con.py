# Generated by Django 4.1.2 on 2023-07-30 02:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0028_remove_monitor_cod_univalle'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='monitor',
            name='vive_con',
        ),
    ]
