# SISTEMA DE INFORMACIÓN ASES
Este es un proyecto modular basado en Python, Djando y React. Se ha realizado para actualizar y mejorar la plataforma de apoyo académico existente en la estrategia de apoyo ASES. La nueva versión está diseñada para ser más eficiente, intuitiva, fácil de usar, y para proporcionar una experiencia de usuario más completa y enriquecedora para monitores, practicantes y profesionales.
	Mayor eficiencia: Las nuevas tecnologías permiten una programación más eficiente y rápida, lo que significa que se puede desarrollar el sistema en menos tiempo y con menos recursos.
	Mejora de la experiencia del usuario: React, en particular, es conocido por proporcionar una experiencia de usuario más fluida y dinámica, lo que significa que los estudiantes y profesores pueden interactuar con la plataforma de manera más efectiva.
	Mayor escalabilidad: Las nuevas tecnologías permiten que el sistema sea escalable y adaptable, lo que significa que se puede mejorar y actualizar en el futuro sin necesidad de cambiar completamente de tecnología.


Estructura del proyecto
El proyecto está estructurado en módulos y separado entre su parte logica con su parte estetica.

	backend: Este módulo contiene el código fuente de la aplicación Django.
	frontend: Este módulo contiene el código fuente de la aplicación React.


# INSTALACIÓN
El proceso de instalacion se divide en 2 partes, una para realizar el set-up de los archivos en un repositorio local y otra para tener el ambiente correcto para el funcionamiento del front-end y back-end.

INSTALACION : Repositorio

	1. Realizar un git git clone al repositorio "https://github.com/Rhazek12/modulo_ases.git" 
	2. Se require la instalación de Python con version 3.9.5 o superior

INSTALACIÓN : Front-end

	1. Se requiere la instalacion de Node.js con los comandos ____ sobre la ruta C:\"ruta hacia el proyecto"\modulo_ases
	2. Se requiere la instalacion de NPM con el comando "NPM INSTALL --force" sobre la ruta C:\"ruta hacia el proyecto"\modulo_ases\front-end

INSTALACIÓN : back-end
Los siguientes requerimientos deben se todos instalados sobre la ruta C:\"ruta hacia el proyecto"\modulo_ases\back-end

	1. Se require la instalación de Django con el comando "pip install Django"
	2. Se require la instalación de django-cors-headers con el comando "pip install django-cors-headers"
	3. Se require la instalación de djangorestframework con el comando "pip install djangorestframework"
	4. Se require la instalación de djangorestframework con el comando "pip install djangorestframework-simplejwt"
	5. Se require la instalación de psycopg2  o  psycopg2-binary con el comando "pip install psycopg2"
	6. Se require la instalación de pandas con el comando "pip install pandas"


# INICIO DEL SISTEMA
Para la inicialización del sistema en un host local se requiere :

	1. Entrar en la ruta : C:\"ruta hacia el proyecto"\modulo_ases\back-end y correr el comando "python manage.py runserver"
	2. Entrar en la ruta : C:\"ruta hacia el proyecto"\modulo_ases\front-end y correr el comando "npm start"


# COLABOLADORES :

	Cesar Alberto Becerra - Rhazek12
	Deiby Rodriguez - Dalex11
	José David Erazo - JoseD32


# CONCLUSIONES
En resumen, el nuevo sistema modular ASES es una plataforma de apoyo académico actualizada y mejorada que utiliza las últimas tecnologías para proporcionar una experiencia de usuario más eficiente, intuitiva y efectiva. La decisión de actualizar la plataforma existente se tomó debido a la necesidad de una mayor funcionalidad, una mejor experiencia del usuario y una mayor eficiencia en el proceso de enseñanza y aprendizaje. Esperamos que esta nueva versión de ASES tenga un impacto positivo en la educación superior en Colombia y que proporcione una plataforma de apoyo más completa y efectiva para estudiantes y profesores.
