# Generated by Django 3.2.10 on 2021-12-14 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('country_map_master', '0003_alter_countrymap_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='countrymap',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]
