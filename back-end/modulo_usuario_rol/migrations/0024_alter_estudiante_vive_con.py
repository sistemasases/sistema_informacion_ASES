# Generated by Django 4.1.2 on 2023-07-25 19:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0023_delete_estudiante_cohorte'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='vive_con',
            field=models.JSONField(default=None, null=True),
        ),
    ]
