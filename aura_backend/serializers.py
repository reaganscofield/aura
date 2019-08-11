from .models import *
from rest_framework import serializers


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 
            "id", 
            "email", 
            "username", 
            "first_name", 
            "last_name", 
            "phone_number", 
            "address_zip",
            "address_street", 
            "address_suburb", 
            "address_city", 
            "address_country", 
            "address_region", 
        ]
        read_only_fields = ["id"]

    def validate(self, values):
        if values["phone_number"] == None:
            raise serializers.ValidationError(
                "phone number is required"
            )
        if values["address_street"] == None:
            raise serializers.ValidationError(
                "address street is required"
            )
        if values["address_suburb"] == None:
            raise serializers.ValidationError(
                "address suburb is required"
            )
        if values["address_city"] == None:
            raise serializers.ValidationError(
                "address city is required"
            )
        values["first_name"] = values["first_name"].capitalize()
        values["last_name"] = values["last_name"].capitalize()

        return values

    
class CompaniesSerielizers(serializers.ModelSerializer):
    vehicules = serializers.StringRelatedField(many=True, read_only=True)  
    class Meta:
        model = Companies
        fields = [
            "id", 
            "name", 
            "email", 
            "address", 
            "phone_number", 
            "vat_number", 
            "vehicules"
        ]
        read_only_fields = ["id"]

    def validate(self, values):
        if values["name"] == None:
            raise serializers.ValidationError(
                "name is required"
            )
        if values["email"] == None:
            raise serializers.ValidationError(
                "email is required"
            )
        if values["phone_number"] == None:
            raise serializers.ValidationError(
                "phone number is required"
            )
        values["name"] = values["name"].capitalize()
     
        return values


class VehiculeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Vehicule
        fields = [
            "id", 
            "company_id", 
            "name", "mark", 
            "license_number", 
            "plate_number"
        ]
        read_only_fields = ["id"]
    
    def validate(self, values):
        if values["name"] == None:
            raise serializers.ValidationError(
                "name is required"
            )
        if values["plate_number"] == None:
            raise serializers.ValidationError(
                "plate number is required"
            )
        values["name"] = values["name"].capitalize()
         
        return values


        
class SecurityAgentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = SecurityAgents
        fields = [ 
            "id", 
            "email", 
            "username", 
            "company_id", 
            "first_name", 
            "last_name", 
            "is_on_trip",
            "phone_number", 
            "current_location_street", 
            "current_location_suburb", 
            "current_location_city", 
            "current_location_country", 
            "vehicule_id", 
            "current_location_zip", "is_online"
        ]
        read_only_fields = ["id"]



class PanicsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Panics
        fields = [
            "id", 
            "client_id", 
            "agent_id", 
            "panics_name", 
            "timestamp", 
            "panics_number",
            "company_id",
        ]
        read_only_fields = ["id", "panics_number", "timestamp"]
    
class PanicsFetchSerializers(serializers.Serializer):
    id = serializers.UUIDField()
    panic_number = serializers.IntegerField()
    panic_name = serializers.CharField()
    timestamp = serializers.DateTimeField()

    client_firstname = serializers.CharField()
    client_last_name = serializers.CharField()
    client_phone_number = serializers.IntegerField()
    client_phone_email = serializers.CharField()
    client_address = serializers.CharField()

    agent_firstname = serializers.CharField()
    agent_lastname = serializers.CharField()
    agent_phone_number = serializers.IntegerField()
    agent_phone_email = serializers.CharField()
    agent_current_address = serializers.CharField()

    vehicule_name = serializers.CharField()
    vehicule_plate = serializers.CharField()
    company_name = serializers.CharField()


class AgentsFetchSerializers(serializers.Serializer):
    id = serializers.UUIDField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    phone_number = serializers.IntegerField()
    current_location_street = serializers.CharField()
    current_location_suburb = serializers.CharField()
    current_location_city = serializers.CharField()
    current_location_country = serializers.CharField()
    current_location_region = serializers.CharField()
    current_location_zip = serializers.IntegerField()
    is_online = serializers.BooleanField()
    is_on_trip = serializers.BooleanField()

    vehicule_id = serializers.UUIDField()
    vehicule_name = serializers.CharField()
    vehicule_mark = serializers.CharField()
    vehicule_license_number = serializers.CharField()
    vehicule_plate_number = serializers.CharField()

    company_id = serializers.UUIDField()
    company_name = serializers.CharField()
    company_email = serializers.CharField()
    company_phone_number = serializers.IntegerField()


class NotificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = [
            "id",
            "client_id",
            "panic_id",
            "agent_id",
            "company_id",
            "from_address",
            "to_address",
            "is_arrived",
            "is_on_way",
            "start_time",
            "ended_time",
            "is_active"
        ]
        read_only_fields = [
            "id", 
            "client_id",
            "panic_id",
            "agent_id",
            "company_id",
        ]

class NotificationsFetchSerializers(serializers.Serializer):
    id = serializers.UUIDField()

    client_id = models.UUIDField()
    client_firstname = serializers.CharField()
    client_lastname = serializers.CharField()
    client_phone_number = serializers.IntegerField()

    panic_id =  serializers.UUIDField()
    panic_name = serializers.CharField()
    panic_number = serializers.IntegerField()
    agent_id = serializers.UUIDField()
    company_id = serializers.UUIDField()

    from_address = serializers.CharField()
    to_address = serializers.CharField()

    is_arrived = models.BooleanField()
    is_on_way = models.BooleanField()

    start_time = serializers.DateTimeField()
    ended_time = serializers.DateTimeField()

    is_active = serializers.BooleanField()