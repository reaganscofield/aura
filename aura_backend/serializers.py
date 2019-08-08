from .models import *
from rest_framework import serializers


class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 
            "id", "email", "username", "first_name", "last_name", "phone_number", "address_zip",
            "address_street", "address_suburb", "address_city", "address_country"
        ]
        read_only_fields = ["id"]

    def validate(self, values):
        if values["phone_number"] == None:
            raise serializers.ValidationError("phone number is required")

        if values["address_street"] == None:
            raise serializers.ValidationError("address street is required")

        if values["address_suburb"] == None:
            raise serializers.ValidationError("address suburb is required")
        
        if values["address_city"] == None:
            raise serializers.ValidationError("address city is required")

        values["first_name"] = values["first_name"].capitalize()
        values["last_name"] = values["last_name"].capitalize()

        return values


        
class CompaniesSerielizers(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ["id", "name", "email", "address", "phone_number", "vat_number"]
        read_only_fields = ["id"]

    def validate(self, values):
        if values["name"] == None:
            raise serializers.ValidationError("name is required")
    
        if values["email"] == None:
            raise serializers.ValidationError("email is required")
    
        if values["phone_number"] == None:
            raise serializers.ValidationError("phone number is required")
    
        values["name"] = values["name"].capitalize()
     
        return values



class VehiculeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Vehicule
        fields = ["id", "company_id", "name", "mark", "license_number", "plate_number"]
        read_only_fields = ["id"]
    
    def validate(self, values):
        if values["name"] == None:
            raise serializers.ValidationError("name is required")
        
        if values["plate_number"] == None:
            raise serializers.ValidationError("plate number is required")
        
        values["name"] = values["name"].capitalize()
         
        return values


        
class SecurityAgentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = SecurityAgents
        fields = [ 
            "id", "email", "company_id", "first_name", "last_name", "phone_number", 
            "current_location_street", "current_location_suburb", "current_location_city", 
            "current_location_country", "vehicule_id", "current_location_zip", "is_online"
        ]
        read_only_fields = ["id"]



class PanicsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Panics
        fields = [
            "id", "client_id", "agent_id", "panics_name", "timestamp",
            "client_phone_number", "client_username", "company_id", "client_email"
        ]
        read_only_fields = ["id", "timestamp"]
    
    def validate(self, values):
        if values["client_phone_number"] == None or values["client_phone_number"] is "":
            raise serializers.ValidationError("phone number is required")
        if values["client_username"] == None:
            raise serializers.ValidationError("username is required")
 
        return values
 