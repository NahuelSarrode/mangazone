# MangaZone

Está API fue pensada para los amantes del Manga y anime. Por ejemplo: "Naruto Shippuden" ahora podrás buscar entre sus capitulos de anime (digitalizado), manga (comic), ovas y peliculas. 
Para cada una de las mencionadas existe un CRUD correspondiente que puede ser utilizado segun los permisos con los que cuente el usuario al momento de hacer el login. 
El usuario administrador puede hacer uso de cada uno de los endpoints dispobibles mientras que el usuario "normal" solo puede consultar las secciones mencionadas. 

# Inicialización del proyecto
```
$ npm i
```
# Crear archivo de configuración
Crear el archivo config.js dentro de la carpeta config. Para tal fin, dentro de la carpeta config hay un archivo de ejemplo.

# Ejecutar la aplicación
```
$ npm run dev
```
# Tecnologías usadas

> MySql para la persistencia de datos.
> Express framework para la API
> Nodemailer para el envío de emails, usando el servicio SMTP mailtrap
> Async/await para el manejo de funciones asíncronas
> Winston para el sistema de log
> Jsonwebtoken para el sistema de autenticación
> Squel query builder para el armado dinámico de consultas SQL


# Llamadas API disponibles 
En el repositorio se adjunta la configuración de Postman que se podrá importar para poder consumir todos los endpoints disponibles a fin de testearlos.

# Get all titles 
 >  /titles/
Esta llamada API permite obtener el listado de todos los titulos disponibles. 

# Add title
 >  /titles/
Esta llamada Permite crear un nuevo titulo en la db. 

# Edit title 
 >  /titles/:title_id
Le permite al administrador editar un titulo determinado.  

# Get By ID
 >  /titles/:title_id
Permite obterner un titulo por su ID. 

# Delete title 
>   /titles/:title_id
Permite eliminar un titulo por su id. 

# Login 
>   '/auth/signin' 
Esta llamada permite genera un token permitiéndole al usuario consumir ciertos endpoints.

Por no extender mucho el README y dado que hay muchos endpoints se deja la colleción creada con postman en el repo al igual que la db para que puedan importarla sin necesidad de estar creando datos manualmente.   