import os
import environ

env = environ.Env(
    DEBUG=(bool, False),
    SECRET_KEY=(str, ''),
    CORS_ORIGIN_ALLOW_ALL=(bool, True),
    DB_PORT=(int, None),
    DB_HOST=(str, ''),
    DB_PASSWORD=(str, ''),
    DB_USER=(str, ''),
    DB_NAME=(str, ''),
    DB_ENGINE=(str, ''),
    MAIL_BACKEND=(str, ''),
    MAIL_USE_TLS=(bool, False),
    MAIL_HOST=(str, ''),
    MAIL_HOST_USER=(str, ''),
    MAIL_HOST_PASSWORD=(str, ''),
    MAIL_PORT=(int, None)
)

environ.Env.read_env(env.str('ENV_PATH', '.env'))


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = env('SECRET_KEY')
DEBUG = env('DEBUG')

ALLOWED_HOSTS = []

EMAIL_BACKEND = env('MAIL_BACKEND')
EMAIL_USE_TLS = env('MAIL_USE_TLS')
EMAIL_HOST =  env('MAIL_HOST')
EMAIL_HOST_USER = env('MAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('MAIL_HOST_PASSWORD')
EMAIL_PORT = env('MAIL_PORT')


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'aura_backend',
    'rest_framework',
    'corsheaders'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'aura_project.urls'
AUTH_USER_MODEL = 'aura_backend.Users'
CORS_ORIGIN_ALLOW_ALL = env('CORS_ORIGIN_ALLOW_ALL')


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'aura_project.wsgi.application'


DATABASES = {
   'default': {
       'ENGINE': env('DB_ENGINE'), 
       'NAME': env('DB_NAME'),
       'USER': env('DB_USER'),
       'PASSWORD': env('DB_PASSWORD'),
       'HOST': env('DB_HOST'),
       'PORT': env('DB_PORT')
   }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
