# Generated by Django 2.2.2 on 2019-08-09 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aura_backend', '0010_users_address_region'),
    ]

    operations = [
        migrations.AddField(
            model_name='securityagents',
            name='username',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
    ]
