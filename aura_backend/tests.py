from __future__ import unicode_literals
from .models import *
from django.test import TestCase
from rest_framework.test import APITestCase
import datetime
import random 


class APITestCase(APITestCase):
    def setUp(self):
        Users = Users(
            username = "tester",
            first_name = "tester first_name",
            email = "tester@gmail.com",
            last_name = "tester lastname",
            phone_number = 784562145,
            address_street = "23 Fox Street",
            address_suburb = "Broklyn",
            address_city = "Washigton",
            address_region = "Colombia Distric",
            adress_country = "United State"
        )
        Users.save()

        company = Companies.objects.create(
            name = "Aura",
            email = "aura@tech.com",
            address = "22, Lincoln Street, Baltimore, Maryland, United State",
            phone_number = 748569741,
            vat_number = 7458414,
            is_active = True,
            timestamp = datetime.datetime.now()
        )
        company.save()

        vehicule = Vehicule.objects.create(
            company_id = company,
            name =  "BWM",
            mark = "235i",
            license_number = "235GP",
            plate_number = "av 25641 gp",
            is_active = True,
            timestamp = datetime.datetime.now()
        )
        vehicule.save()

        agent = SecurityAgents.objects.create(
            company_id = company,
            vehicule_id = vehicule,
            username = "Testing Agent",
            first_name = "Testing Lastname",
            last_name = "Testing Firstname",
            email = "testing@gmail.com",
            phone_number = 789658451,
            current_location_street = "23 Fox Street",
            current_location_suburb = "Midrand",
            current_location_city = "Johannesburg",
            current_location_country = "South Africa",
            current_location_region = "Gauteng",
            current_location_zip = 2000,
            is_online = False,
            is_active = True,
            timestamp = datetime.datetime.now(),
        )
        agent.save()

        panics = Panics.objects.create(
            client_id = Users,
            company_id = company,
            agent_id = agent,
            client_username =  "testing",
            client_phone_number = 47512458,
            client_email = "testing@gmail.com",
            panics_name = "Emergency",
            panics_number = random.randint(0,93445565),
            is_active = True,
            timestamp = datetime.datetime.now()
        )
        panics.save()

        def test(self):
            users = Users.objects.count()
            self.assertEqual(users, 1)

        def test_company(self):
            companies = Companies.objects.count()
            self.assertEqual(companies, 1)

        def test_vehicule(self):
            vehicule = Vehicule.objects.count()
            self.assertEqual(vehicule, 1)

        def test_agent(self):
            agent = SecurityAgents.objects.count()
            self.assertEqual(agent, 1)
        
        def test_panics(self):
            panics = Panics.objects.count()
            self.assertEqual(panics, 1)
