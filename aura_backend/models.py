from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
import random


class Users(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = models.IntegerField(null=True, default=None)
    address_street = models.CharField(max_length=250, null=True, default=None)
    address_suburb = models.CharField(max_length=250, null=True, default=None)
    address_city = models.CharField(max_length=250, null=True, default=None)
    address_region = models.CharField(max_length=250, null=True, default=None)
    address_country = models.CharField(max_length=250, null=True, default=None)
    address_zip = models.IntegerField(null=True, default=None)

    def __str__(self):
        return self.username
    

class Companies(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250, null=True, default=None)
    email = models.CharField(max_length=250, null=True, default=None)
    address = models.CharField(max_length=250, null=True, default=None)
    phone_number = models.IntegerField(null=True, default=None)
    vat_number = models.IntegerField(null=True, default=None)

    is_active = models.BooleanField(default=True)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Vehicule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_id = models.ForeignKey(Companies, related_name='vehicules', on_delete=models.CASCADE)
    name = models.CharField(max_length=250, null=True, default=None)
    mark = models.CharField(max_length=250, null=True, default=None)
    license_number = models.CharField(max_length=250, null=True, default=None)
    plate_number = models.CharField(max_length=250, null=True, default=None)
    
    is_active = models.BooleanField(default=True)
    timestamp = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} {self.plate_number}"

    class Meta:
        unique_together = ['id', 'company_id', 'name', 'mark', 'license_number', 'plate_number']
        ordering = ['name']



class SecurityAgents(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    vehicule_id = models.ForeignKey(Vehicule, on_delete=models.CASCADE)
    username = models.CharField(max_length=250, null=True, default=None)
    first_name = models.CharField(max_length=250, null=True, default=None)
    last_name = models.CharField(max_length=250, null=True, default=None)
    email = models.CharField(max_length=250, null=True, default=None)
    phone_number = models.IntegerField(null=True, default=None)
    current_location_street = models.CharField(max_length=250, null=True, default=None)
    current_location_suburb = models.CharField(max_length=250, null=True, default=None)
    current_location_city = models.CharField(max_length=250, null=True, default=None)
    current_location_country = models.CharField(max_length=250, blank=True, null=True, default=None)
    current_location_region = models.CharField(max_length=250, blank=True, null=True, default=None)
    current_location_zip = models.IntegerField(null=True, default=None)

    is_online = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



class Panics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    agent_id = models.ForeignKey(SecurityAgents, blank=False, null=False, on_delete=models.CASCADE)
    client_username = models.CharField(max_length=250, null=True, default=None)
    client_phone_number = models.IntegerField(null=True, default=None)
    client_email = models.CharField(max_length=250, null=True, default=None)
    panics_name = models.CharField(max_length=250, null=True, default='Emergency')
    panics_number = models.IntegerField(null=False, default=random.randint(0,93445565))

    is_active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_username}"

    class Meta:
        ordering = ('timestamp',)
    