# Aura Nodejs Panics API
===========================

# Users EndPoints

1. Query All Users <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/users
```

2. Retrieve User  <br/>
the url take 1 parameter user username  <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/user/jhondoe
```

3. Create User <br/>
POST METHOD

```
  http://127.0.0.1:8002/api/users/
```

```
  {
    "username": "jhondoe",
    "first_name": "jhon",
    "last_name": "doe",
    "email": "jhondoe@gmail.com",
    "phone_number": 112520000,
    "address_street": "23 Fox Street",
    "address_suburb": "Midrand",
    "address_city": "Johannesburg",
    "address_region": "Gautent",
    "address_country": "South Africa",
    "address_zip": 2220,
  }
```



# Companies EndPoints

1. Search for a Company  <br/>
the url take 2 parameters company name and company phone number <br/>
GET METHOD 

```
  http://127.0.0.1:8002/api/company/Aura/748889941
```


2. Create a Company <br/>
POST METHOD

```
  http://127.0.0.1:8002/api/companies/
```

```
  {
    "name": "Aura",
    "email": "aura@gmail.com",
    "phone_number": 232343455,
    "vat_number": 435454654,
    "address": "23 Fox Street, Johannesburg"
  }
```

3. Query all Companies  <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/companies
```


# Vehicules EndPoints

1. Create a Vehicule <br/>
companies hasMany many vehicules <br/>
POST METHOD

```
  http://127.0.0.1:8002/api/vehicules/
```

```
  {
    "name": "VW",
    "mark": "gti",
    "lincese_number": "RT 564 GP",
    "plate_number": "GH 548 GP",
    "company_id": "ffb64692-9349-4f17-bc6c-96590804a6ec"
  }
```


2. Query All Vehicules <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/vehicules
```

3. Filter Vehicules By Company Id <br/>
the url take 1 paramter company id <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/vehicules/ffb64692-9349-4f17-bc6c-96590804a6ec
```



# Security Agents EndPoints 

1. Query All Agents <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/security_agents/
```


2. Search for an Agent <br/>
the url 2 parameters agent username and agent phone number <br/>
GET METHOD

```
  http://127.0.0.1:8002/api/security_agent/reaganscofield/719885547
```


3. Create Agent <br/>
POST METHOD

```
  http://127.0.0.1:8002/api/security_agents/
```

```
  {
    "username": "jon",
    "first_name": "snow",
    "last_name": "jon",
    "email": "jonsnow@gmail.com",
    "phone_number": 74562587,
    "current_address_street": "23 Fox Street",
    "current_address_suburb": "Midrand",
    "current_address_city": "Johannesburg",
    "current_address_region": "Gautent",
    "current_address_country": "South Africa",
    "current_address_zip": 2220,
    "is_on_trip": false,
    "is_online": true,
    "company_id": "ffb64692-9349-4f17-bc6c-96590804a6ec",
    "vehicule_id": "e131b321-b88a-44fb-accf-77fd26afe19a"
  }
```

4. Update an Agent <br/>
the url take 1 parameter agent id <br/>
PUT METHOD

```
  http://127.0.0.1:8002/api/security_agents/ffb64692-9349-4f17-bc6c-96590804a6ec
```

```
  {
    "first_name": "jon",
    "last_name": "snow",
    "phone_number": 778549865,
    "current_address_street": "23 Fox Street",
    "current_address_suburb": "Midrand",
    "current_address_city": "Johannesburg",
    "current_address_region": "Gautent",
    "current_address_country": "South Africa",
    "current_address_zip": 2220,
    "is_on_trip": false,
    "is_online": true,
    "vehicule_id": "e131b321-b88a-44fb-accf-77fd26afe19a"
  }
```



# Panics EndPoints

1. Query All Panics <br/>
GET METHOD 

```
  http://127.0.0.1:8002/api/panics
```

2. Create Panics <br/>
user hasMany panics  <br/>
POST METHOD

```
  http://127.0.0.1:8002/api/panics/
```

```
  {
    "panics_name": "Armed",
    "company_id": "ffb64692-9349-4f17-bc6c-96590804a6ec",
    "user_id": "656d20c8-a078-467c-afb8-af45e2c08d78",
    "agent_id": "b2bba433-ee8a-41cb-86cc-df7dd84c99a5"
  }
```






# Notifications EndPoints

1. Update Notification  <br/>
the url take 1 parameter notification id <br/>
PUT METHOD

```
  http://127.0.0.1:8002/api/notifications/4065bddc-7e6c-4da4-9944-e55ed150dfaa

```

```
  {
    "is_on_way": false,
    "is_arrived": true,
    "ended_time": "2019-08-16 09:46:47.171+02"
  }
```

2. Filter Notifications <br/>
the url take one parameter agent id <br/>
GET METHOD 

```
  http://127.0.0.1:8002/api/notifications/b2bba433-ee8a-41cb-86cc-df7dd84c99a
```