# Generated by Django 5.1.1 on 2024-09-08 18:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_discapacidad', '0006_rename_curausencia_materiales_impresossos_percepcion_discapacidad_ausencia_materiales_impresos_and_m'),
    ]

    operations = [
        migrations.CreateModel(
            name='datos_entrevistado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('desarrollaActividad', models.BooleanField(default=False, null=True)),
                ('desarrollaActividadData', models.CharField(default=None, max_length=100, null=True)),
                ('orientacionSexual', models.CharField(default=None, max_length=50, null=True)),
                ('orientacionSexualOtro', models.CharField(default=None, max_length=100, null=True)),
                ('autoreconocimientoEtnico', models.CharField(default=None, max_length=100, null=True)),
                ('autoreconocimientoEtnicoOtro', models.CharField(default=None, max_length=100, null=True)),
                ('estadoCivil', models.CharField(default=None, max_length=50, null=True)),
                ('actividadesOcio', models.BooleanField(default=False, null=True)),
                ('actividadesOcioData', models.CharField(default=None, max_length=100, null=True)),
                ('actividadDeportiva', models.BooleanField(default=False, null=True)),
                ('actividadDeportivaData', models.CharField(default=None, max_length=100, null=True)),
                ('programaAcompanamiento', models.BooleanField(default=False, null=True)),
                ('programaAcompanamientoOtro', models.CharField(default=None, max_length=100, null=True)),
                ('programaAcompanamientoOtroData', models.CharField(default=None, max_length=100, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='caracterizacion',
            name='id_datos_entrevistado',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='id_datos_entrevistado_in_caracterizacion', to='modulo_discapacidad.datos_entrevistado'),
        ),
    ]