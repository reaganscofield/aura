# Generated by Django 2.2.2 on 2019-08-11 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aura_backend', '0026_auto_20190811_1356'),
    ]

    operations = [
        migrations.AddField(
            model_name='securityagents',
            name='is_on_trip',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='panics',
            name='panics_number',
            field=models.IntegerField(default=55025242),
        ),
    ]
