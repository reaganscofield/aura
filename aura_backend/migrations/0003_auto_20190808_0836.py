# Generated by Django 2.2.2 on 2019-08-08 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aura_backend', '0002_auto_20190808_0826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companies',
            name='address',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='companies',
            name='email',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='companies',
            name='name',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='companies',
            name='phone_number',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='companies',
            name='vat_number',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='panics',
            name='panics_name',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='current_location_city',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='current_location_country',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='current_location_street',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='current_location_suburb',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='email',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='fist_name',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='last_name',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='securityagents',
            name='phone_number',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='vehicule',
            name='license_number',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='vehicule',
            name='mark',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='vehicule',
            name='name',
            field=models.CharField(default=None, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='vehicule',
            name='plate_number',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
