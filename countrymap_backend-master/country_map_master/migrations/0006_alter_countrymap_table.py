# Generated by Django 3.2.10 on 2021-12-14 13:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('country_map_master', '0005_alter_countrymap_value'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='countrymap',
            table='maplist',
        ),
    ]
