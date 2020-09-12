# Proyecto Backend de Mayorium
## Stack
Python con framework Django REST y djongo para ORM con mongodb.

### Instalacion
 Sobre el directorio raiz del repositorio, correr el comando
 <br />
`virtualenv env -p python3` -- crea la carpeta env con las dependencias
<br />
`python manage.py makemigrations` y `python manage.py migrate` -- crean los documentos de los modelos de los servicios REST en Mongodb.
<br />
`python manage.py runserver` -- para correr la server, previamente la **BD Mongo debe estar en ejecucion**.
<br />
`mongod` -- para iniciar la BD de mongo, ademas es recomendable obtener *MongoDB Compass Community* para administrarla.

 
 ### Configuracion
 La direccion por default es [http://localhost:8000](http://localhost:8000) y puede verse los endpoints en los ficheros urls.py de *backend* y *mayoristaAPI*.
 
