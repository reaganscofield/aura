# Generated by Django 2.2.2 on 2019-08-08 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aura_backend', '0009_auto_20190808_1301'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='address_region',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
    ]
