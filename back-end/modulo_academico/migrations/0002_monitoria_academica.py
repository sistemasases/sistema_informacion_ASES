# Generated by Django 4.1 on 2024-08-20 05:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("modulo_instancia", "0001_initial"),
        ("modulo_academico", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="monitoria_academica",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("materia", models.CharField(default=None, max_length=200, null=True)),
                (
                    "id_monitor",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="id_monitor_in_monitoria_academica",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "id_sede",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="id_sede_in_monitoria_academica",
                        to="modulo_instancia.sede",
                    ),
                ),
                (
                    "id_semestre",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="id_semestre_in_monitoria_academica",
                        to="modulo_instancia.semestre",
                    ),
                ),
            ],
            options={"db_table": "monitoria_academica",},
        ),
    ]
