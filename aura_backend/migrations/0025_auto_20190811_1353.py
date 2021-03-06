# Generated by Django 2.2.2 on 2019-08-11 13:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('aura_backend', '0024_auto_20190811_0635'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='panics',
            options={'ordering': ('timestamp',)},
        ),
        migrations.AlterModelOptions(
            name='vehicule',
            options={},
        ),
        migrations.AlterField(
            model_name='panics',
            name='company_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aura_backend.Companies'),
        ),
        migrations.AlterField(
            model_name='panics',
            name='panics_number',
            field=models.IntegerField(default=90696746),
        ),
        migrations.AlterUniqueTogether(
            name='panics',
            unique_together=set(),
        ),
        migrations.AlterUniqueTogether(
            name='vehicule',
            unique_together=set(),
        ),
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('from_address', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('to_address', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('is_arrived', models.BooleanField(default=False)),
                ('is_on_way', models.BooleanField(default=False)),
                ('start_time', models.DateTimeField()),
                ('ended_time', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('agent_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aura_backend.SecurityAgents')),
                ('client_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('company_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aura_backend.Companies')),
                ('panic_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aura_backend.Panics')),
            ],
            options={
                'ordering': ('timestamp',),
            },
        ),
        migrations.RemoveField(
            model_name='panics',
            name='client_email',
        ),
        migrations.RemoveField(
            model_name='panics',
            name='client_phone_number',
        ),
        migrations.RemoveField(
            model_name='panics',
            name='client_username',
        ),
    ]
