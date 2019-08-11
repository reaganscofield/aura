# Aura Solution 
===============

Requirements <br />
    : Linux Distro or Darwin  <br />
    : Note (for windows users your will need to review Makefile and change sudo priviledge) <br />
    : Docker <br />

please note that every commmand you run will promp you to provide your password <br />

Build<br />
run command:

```
    $ make build
```

Run <br />
run command

```
    $ make run
```

your can open your browser to access PGADMIN INTERFACE <br />

URL :  127.0.0.1:5556 <br />

now you can login to your PGADMIN INTERFACE with  <br />

email : pgadmin4@pgadmin.org <br />
password : admin <br />


Create PostgreSQL Server in your PGADMIN INTERFACE with <br />

name : postgres <br />
host : postgres <br />
port : 5432 <br />
username : postgres <br />
password : postgres <br />


Now Create Database  <br />

name : aura_database <br />


Stop your docker images <br />
run command

```
    $ ctrl + c
```

Setup Environment Variables <br />

Back-End environment variables <br />

create file ".env" in root directory and add the below code <br />

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

Front-END environment variables <br />

create file  "aura_frontend/.env" in root directory and add the below code <br />

```
    REACT_APP_HOST_NAME=127.0.0.1
    REACT_APP_HOST_PORT=4700
```

Now Run Migrations Commands  <br />

Makemigrartions <br />
run command

```
    $ make migrations
```

Migrate  <br />
run command

```
    $ make migrate
```

Great Good Job! you haven't yet finished so let now run last command  <br />

Run Your Application <br />
run command

```
    $ make run 
```

Well Done! there is not place like "127.0.0.1" best place to be in all the time <br />


Your Back-End is EXPOSE on 127.0.0.1:4700 <br />
Your Front-End is EXPOSE on 127.0.0.1:6075 <br />
Your Database is EXPOSE on 127.0.0.1:5556 <br />







