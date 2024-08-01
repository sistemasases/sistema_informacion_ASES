"""
Django settings for modulo_ases project.

Generated by 'django-admin startproject' using Django 4.0.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import os
from pathlib import Path
from datetime import timedelta
import environ
env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DJANGO_INSECURE_SETTINGS') == 'True'

ALLOWED_HOSTS = os.environ.get(
    'DJANGO_ALLOWED_HOSTS', '').split(',') or ['localhost']

# MAIL SENDING
EMAIL_HOST = os.environ.get('DJANGO_EMAIL_HOST')
EMAIL_PORT = os.environ.get('DJANGO_EMAIL_PORT')

EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('DJANGO_EMAIL_HOST_PASSWORD')

EMAIL_USE_TLS = os.environ.get('DJANGO_EMAIL_USE_TLS')
# EMAIL_USE_SSL = os.environ.get('DJANGO_EMAIL_USE_SSL')
#

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_otp',
    'django_otp.plugins.otp_totp',
    'django_otp.plugins.otp_static',
    'modulo_usuario_rol',
    'modulo_geografico',
    'modulo_asignacion',
    'modulo_base',
    'modulo_carga_masiva',
    'modulo_instancia',
    'modulo_seguimiento',
    'modulo_programa',
    'modulo_academico',
    'modulo_reportes',
    'modulo_correos',
    'modulo_alertas',
    'modulo_discapacidad',
    "corsheaders",
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django_otp.middleware.OTPMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]


ROOT_URLCONF = 'modulo_ases.urls'

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = os.environ.get(
    'DJANGO_CORS_ALLOWED_ORIGINS', '').split(',')
CSRF_TRUSTED_ORIGINS = os.environ.get(
    'DJANGO_CORS_ALLOWED_ORIGINS', '').split(',')
CORS_ORIGIN_WHITELIST = os.environ.get(
    'DJANGO_CORS_ALLOWED_ORIGINS', '').split(',')

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

WSGI_APPLICATION = 'modulo_ases.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('DJANGO_DB_NAME'),
        'USER': os.environ.get('DJANGO_DB_USER'),
        'PASSWORD': os.environ.get('DJANGO_DB_PASSWORD'),
        'HOST': os.environ.get('DJANGO_DB_HOST'),
        'DATABASE_PORT': os.environ.get('DJANGO_DB_PORT'),
    }
}


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=300),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACK_LIST_AFTER_ROTATION': True
}


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/staticfiles/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = []

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CSP_DEFAULT_SRC = ("'self'",)

SECURE_BROWSER_XSS_FILTER = os.environ.get('DJANGO_SECURE_SETTINGS') == 'True'
SESSION_COOKIE_SECURE = os.environ.get('DJANGO_SECURE_SETTINGS') == 'True'
CSRF_COOKIE_SECURE = os.environ.get('DJANGO_SECURE_SETTINGS') == 'True'
