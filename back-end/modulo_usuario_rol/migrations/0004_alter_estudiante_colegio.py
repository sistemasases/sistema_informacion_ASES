# Generated by Django 4.2.4 on 2023-08-14 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0003_alter_estudiante_estamento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='colegio',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
