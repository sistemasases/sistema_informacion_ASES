# Generated by Django 4.2.4 on 2023-08-14 19:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('modulo_usuario_rol', '0001_initial'),
        ('modulo_instancia', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='asignacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.BooleanField(default=True)),
                ('estado2', models.BooleanField(default=True)),
                ('id_estudiante', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante')),
                ('id_semestre', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='modulo_instancia.semestre')),
                ('id_usuario', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='id_usuario_UE', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'asignacion',
            },
        ),
    ]