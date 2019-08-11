# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework import viewsets, generics
from django.shortcuts import render
from .models import *
from .serializers import *
from django.db.models import Q
from rest_framework import status


class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers

class FindUser(generics.RetrieveAPIView):
    lookup_field = 'username'
    queryset = Users.objects.all()
    serializer_class = UsersSerializers    


class CompaniesView(viewsets.ModelViewSet):
    queryset = Companies.objects.all()
    serializer_class = CompaniesSerielizers


class CompaniesSearch(generics.ListAPIView):
    serializer_class = CompaniesSerielizers
        
    def get_queryset(self):
        qs = Companies.objects.all()
        
        name = self.request.query_params.get('name', None)
        phone_number = self.request.query_params.get('phone_number', "0")
    
        qs = qs.filter(
            Q(name=name) |
            Q(phone_number=int(phone_number)) 
        )
        
        return qs


class VehiculeView(viewsets.ModelViewSet):
    queryset = Vehicule.objects.all()
    serializer_class = VehiculeSerializers

class VehiculesFilters(generics.ListAPIView):
    serializer_class = VehiculeSerializers
            
    def get_queryset(self):
        qs = Vehicule.objects.all()
            
        company_id = self.request.query_params.get('company_id', None)
    
        qs = qs.filter(
            Q(company_id=company_id) 
        )
            
        return qs


class SecuriyAgentsView(viewsets.ModelViewSet):
    queryset = SecurityAgents.objects.all()
    serializer_class = SecurityAgentsSerializers

class AgentsSearch(generics.ListAPIView):
    serializer_class = SecurityAgentsSerializers
    
    def get_queryset(self):
        qs = SecurityAgents.objects.all()
        username = self.request.query_params.get('username', None)
        phone_number = self.request.query_params.get('phone_number', "0")
        qs = qs.filter(
            Q(username=username) |
            Q(phone_number=int(phone_number)) 
        )
        return qs


class PanicsView(viewsets.ModelViewSet):
    queryset = Panics.objects.all()
    serializer_class = PanicsSerializers

    def create(self, request):
        client_id = request.data["client_id"]
        security_agent = request.data["agent_id"]


        serializer = PanicsSerializers(data = request.data)

        if Users.objects.filter(id=client_id).exists():
            get_user = Users.objects.get(id=client_id)
            get_agent = SecurityAgents.objects.get(id=security_agent)

            if serializer.is_valid(raise_exception=True):


                agent_street = get_agent.current_location_street
                agent_suburb = get_agent.current_location_suburb
                agent_city = get_agent.current_location_city
                agent_region = get_agent.current_location_region
                agent_country = get_agent.current_location_country

                agent_address = f"{agent_street}, {agent_suburb}, {agent_city}, {agent_country}"

                street = get_user.address_street
                suburb = get_user.address_suburb
                city = get_user.address_city
                region = get_user.address_region
                country = get_user.address_country

                client_address = f"{street}, {suburb}, {city}, {country}"

                createPanics = Panics.objects.create(
                    client_id = get_user,
                    company_id = get_agent.company_id,
                    agent_id = get_agent,
                    panics_name = serializer["panics_name"].value
                )
                createPanics.save()

                if createPanics:
                    notify = Notifications.objects.create(
                        client_id = get_user,
                        panic_id = createPanics,
                        agent_id = get_agent,
                        company_id = get_agent.company_id,
                        from_address = agent_address,
                        to_address = client_address,
                        is_active = True,
                    )
                    notify.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)
              
        else:
            return Response({"Error": "user not finds please create an account"})    


class NotificationView(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationSerializers


class FilteredNotificationsByAgent(generics.ListAPIView):
    serializer_class = NotificationsFetchSerializers
            
    def list(self, request):
        qs = Notifications.objects.filter(is_active=True)
        agent_id = self.request.query_params.get('agent_id', None)
    
        qs = qs.filter(
            Q(agent_id=agent_id)
        )

        notify_data = []
        for i in qs:
            data = {
                "id": i.id,
                "client_id": i.client_id.id,
                "client_firstname": i.client_id.first_name,
                "client_lastname": i.client_id.last_name,
                "client_phone_number": i.client_id.phone_number,
                "panic_id": i.panic_id.id,
                "panic_name": i.panic_id.panics_name,
                "panic_number": i.panic_id.panics_number,
                "agent_id": i.agent_id.id,
                "company_id": i.company_id.id,
                "from_address": i.to_address, 
                "to_address": i.from_address,
                "is_arrived": i.is_arrived,
                "is_on_way" : i.is_on_way,
                "start_time": i.start_time,
                "ended_time": i.ended_time,
                "is_active": i.is_active, 
            }
            notify_data.append(data)
                
        serializer = NotificationsFetchSerializers(notify_data, many=True)
        return Response(serializer.data)


class FetchAllPanics(generics.ListAPIView):
    queryset = Panics.objects.all()
    serializer_class = PanicsSerializers

    def list(self, request):
        queryset = Panics.objects.all()

        data_panics = []
        for i in queryset:

            client_address = "{}, {}, {}".format(
                i.client_id.address_street, 
                i.client_id.address_suburb, 
                i.client_id.address_city
            )

            agent_current_address = "{}, {}, {}".format(
                i.agent_id.current_location_street, 
                i.agent_id.current_location_suburb, 
                i.agent_id.current_location_city
            )

            data = {
                "id": i.id,
                "panic_number": i.panics_number,
                "panic_name": i.panics_name,
                "timestamp": i.timestamp,
                "client_firstname": i.client_id.first_name,
                "client_last_name": i.client_id.last_name,
                "client_phone_number": i.client_id.phone_number,
                "client_phone_email": i.client_id.email,
                "client_address": client_address,
                "agent_firstname": i.agent_id.first_name,
                "agent_lastname": i.agent_id.last_name,
                "agent_phone_number": i.agent_id.phone_number,
                "agent_phone_email": i.agent_id.email,
                "agent_current_address": agent_current_address,
                "vehicule_plate": i.agent_id.vehicule_id.plate_number,
                "vehicule_name": i.agent_id.vehicule_id.name,
                "company_name": i.company_id.name
            }
            data_panics.append(data)

        serializer = PanicsFetchSerializers(data_panics, many=True)
        return Response(serializer.data)

        
class FetchOnlineAgents(generics.ListAPIView):
    queryset = SecurityAgents.objects.all()
    serializer_class = AgentsFetchSerializers

    def list(self, request):
        queryset = SecurityAgents.objects.filter(is_online=True, is_on_trip=False)
        agent_data = []

        for i in queryset:
            data = {
                "id": i.id,
                "first_name": i.first_name,
                "last_name": i.last_name,
                "email": i.email,
                "phone_number":  i.phone_number,
                "current_location_street": i.current_location_street,
                "current_location_suburb": i.current_location_suburb,
                "current_location_city": i.current_location_city,
                "current_location_country": i.current_location_country,
                "current_location_region": i.current_location_region,
                "current_location_zip": i.current_location_zip,
                "is_on_trip": i.is_on_trip,
                "is_online": i.is_online,
                "vehicule_id": i.vehicule_id.id,
                "vehicule_name": i.vehicule_id.name,
                "vehicule_mark": i.vehicule_id.mark,
                "vehicule_license_number": i.vehicule_id.license_number,
                "vehicule_plate_number": i.vehicule_id.plate_number,
                "company_id": i.company_id.id,
                "company_name": i.company_id.name,
                "company_email": i.company_id.email,
                "company_phone_number": i.company_id.phone_number,
            }
            agent_data.append(data)
        serializer = AgentsFetchSerializers(agent_data, many=True)
        return Response(serializer.data)