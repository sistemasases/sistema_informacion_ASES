# Generated by Django 4.1.1 on 2023-05-16 21:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("modulo_instancia", "0005_sede_remove_cohorte_sede_id_instancia_and_more"),
        ("modulo_programa", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(name="sede",),
        migrations.AlterField(
            model_name="programa",
            name="id_sede",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="id_sede_in_programa",
                to="modulo_instancia.sede",
            ),
        ),
    ]
