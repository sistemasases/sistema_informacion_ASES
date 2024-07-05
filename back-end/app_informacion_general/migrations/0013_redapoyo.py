# Generated by Django 4.2.1 on 2023-06-09 22:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_informacion_general', '0012_alter_convivenciavivienda_id_informacion_general_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RedApoyo',
            fields=[
                ('id_red_apoyo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_red_apoyo', models.CharField(max_length=200)),
                ('observacion_red_apoyo', models.TextField(blank=True, default='Sin observacion')),
                ('id_informacion_general', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='redes_de_apoyo', to='app_informacion_general.informaciongeneral')),
            ],
            options={
                'db_table': 'Informacion_general_red_apoyo',
            },
        ),
    ]