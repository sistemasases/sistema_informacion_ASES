# Generated by Django 4.0 on 2022-10-10 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0016_alter_estudiante_cod_univalle'),
    ]

    operations = [
        migrations.AlterField(
            model_name='estudiante',
            name='cod_univalle',
            field=models.CharField(max_length=12, unique=True),
        ),
    ]
