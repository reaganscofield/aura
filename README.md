# Aura Solution 
===============

Requirements
    : Linux Distro or Darwin 
    : Note (for windows users your will need to review Makefile and change sudo priviledge)
    : Docker 

please note that every commmand you run will promp you to provide your password 

Build
run command:

```
    $ make build
```

Run 
run command

```
    $ make run
```

your can open your browser to access PGADMIN INTERFACE 

URL :  127.0.0.1:5556

now you can login to your PGADMIN INTERFACE with 

email : pgadmin4@pgadmin.org
password : admin


Create PostgreSQL Server in your PGADMIN INTERFACE with

name : postgres
host : postgres
port : 5432
username : postgres
password : postgres


Now Create Database 

name : aura_database


Stop your docker images
run command

```
    $ ctrl + c
```

Setup Environment Variables

Back-End environment variables

create file ".env" in root directory and add the below code

```
    DEBUG=True
    SECRET_KEY=ffp90ec4ow(548eh+w$ahde6tjpnp^=pp)4*_e_nj*@++xj3v8
    CORS_ORIGIN_ALLOW_ALL=True

    DB_PORT=5432
    DB_HOST=postgres
    DB_PASSWORD=postgres
    DB_USER=postgres
    DB_NAME=aura_database
    DB_ENGINE=django.db.backends.postgresql_psycopg2

    MAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
    MAIL_USE_TLS=True
    MAIL_HOST=smtp.gmail.com
    MAIL_HOST_USER=''
    MAIL_HOST_PASSWORD=''
    MAIL_PORT=587
```

Front-END environment variables

create file  "aura_frontend/.env" in root directory and add the below code

```
    REACT_APP_HOST_NAME=127.0.0.1
    REACT_APP_HOST_PORT=4700
```

Now Run Migrations Commands 

Makemigrartions 
run command

```
    $ make migrations
```

Migrate
run command

```
    $ make migrate
```

Great Good Job! you haven't yet finished so let now run last command 

Run Your Application
run command

```
    $ make run 
```

Well Done! there is not place like "127.0.0.1" best place to be in all the time


Your Back-End is EXPOSE on 127.0.0.1:4700
Your Front-End is EXPOSE on 127.0.0.1:6075
Your Database is EXPOSE on 127.0.0.1:5556

last thing

Your can run unit tests with command
run command

```
    $ make test
```






