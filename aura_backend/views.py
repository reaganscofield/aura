# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import status


class UsersView(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializers

class CompaniesView(viewsets.ModelViewSet):
    queryset = Companies.objects.all()
    serializer_class = CompaniesSerielizers

class VehiculeView(viewsets.ModelViewSet):
    queryset = Vehicule.objects.all()
    serializer_class = VehiculeSerializers

class SecuriyAgentsView(viewsets.ModelViewSet):
    queryset = SecurityAgents.objects.all()
    serializer_class = SecurityAgentsSerializers


class PanicsView(viewsets.ModelViewSet):
    queryset = Panics.objects.all()
    serializer_class = PanicsSerializers

    def create(self, request):
        client_username = request.data["client_username"]
        security_agent = request.data["agent_id"]
        client_phone_number = request.data["client_phone_number"]
        client_email = request.data["client_email"]

        serializer = PanicsSerializers(data = request.data)

        if Users.objects.filter(username=client_username, phone_number=client_phone_number).exists():
            get_user = Users.objects.get(username=client_username, phone_number=client_phone_number)
            get_agent = SecurityAgents.objects.get(id=security_agent)

            print(" a id ", get_agent.id)
            print(" c id ", get_agent.company_id.address)

            if serializer.is_valid(raise_exception=True):
                createPanics = Panics.objects.create(
                    client_id = get_user,
                    company_id = get_agent.company_id,
                    agent_id = get_agent,
                    client_username = serializer["client_username"].value,
                    client_phone_number = int(serializer["client_phone_number"].value),
                    client_email = serializer["client_email"].value,
                    panics_name = serializer["panics_name"].value
                )
                createPanics.save()
              
                

                #serializer.save()

                # mails to be send to all parties
                # code goes here 

                return Response(serializer.data, status=status.HTTP_201_CREATED)
              
        else:
            return Response({"Error": "username not and phone number finds please create an account"})    