# Generated by Django 3.0.5 on 2020-10-06 23:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mayoristaAPI', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='mayorista',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mayoristaAPI.Mayorista'),
        ),
    ]