# Generated by Django 4.2 on 2023-06-06 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('modulo_usuario_rol', '0021_act_simultanea_cond_excepcion_discap_men_and_more'),
        ('modulo_instancia', '0006_delete_instancia'),
        ('modulo_programa', '0003_estado_programa_remove_programa_estudiante_estado_and_more'),
        ('modulo_academico', '0002_initial'),
    ]
    

    operations = [
        # migrations.CreateModel(
        #     name='items_historico',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('nombre', models.CharField(default=None, max_length=50)),
        #         ('nota_minima', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('nota_maxima', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('porcentaje', models.DecimalField(decimal_places=2, max_digits=5)),
        #     ],
        # ),
        # migrations.CreateModel(
        #     name='items_semestre',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('nombre', models.CharField(default=None, max_length=50)),
        #         ('nota_minima', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('nota_maxima', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('porcentaje', models.DecimalField(decimal_places=2, max_digits=5)),
        #     ],
        # ),
        migrations.CreateModel(
            name='profesor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default=None, max_length=50)),
                ('nombre', models.CharField(default=None, max_length=50)),
                ('apellido', models.CharField(default=None, max_length=50)),
                ('correo', models.EmailField(default=None, max_length=254)),
            ],
        ),
        migrations.AddField(
            model_name='historial_academico',
            name='id_estudiante',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante'),
        ),
        migrations.AddField(
            model_name='materia',
            name='franja',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='materia',
            name='id_facultad',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='modulo_programa.facultad'),
        ),
        migrations.AddField(
            model_name='materia',
            name='id_sede',
            field=models.ForeignKey(default=14, on_delete=django.db.models.deletion.CASCADE, to='modulo_instancia.sede'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='materia',
            name='id_semestre',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, to='modulo_instancia.semestre'),
            preserve_default=False,
        ),
        # migrations.CreateModel(
        #     name='notas_semestre',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('calificacion', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('id_estudiante', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante')),
        #         ('id_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.items_semestre')),
        #     ],
        # ),
        # migrations.CreateModel(
        #     name='notas_historico',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('calificacion', models.DecimalField(decimal_places=2, max_digits=5)),
        #         ('id_estudiante', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante')),
        #         ('id_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.items_historico')),
        #     ],
        # ),
        # migrations.CreateModel(
        #     name='matricula',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('id_curso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.materia')),
        #         ('id_estudiante', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='modulo_usuario_rol.estudiante')),
        #     ],
        # ),
        # migrations.AddField(
        #     model_name='items_semestre',
        #     name='id_curso',
        #     field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.materia'),
        # ),
        # migrations.AddField(
        #     model_name='items_semestre',
        #     name='id_semestre',
        #     field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_instancia.semestre'),
        # ),
        # migrations.AddField(
        #     model_name='items_historico',
        #     name='id_curso',
        #     field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.materia'),
        # ),
        # migrations.AddField(
        #     model_name='items_historico',
        #     name='id_semestre',
        #     field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='modulo_instancia.semestre'),
        # ),
        migrations.AddField(
            model_name='materia',
            name='id_profesor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='modulo_academico.profesor'),
            preserve_default=False,
        ),
    ]
