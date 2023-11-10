# proyecto_final_backend

## DESCRIPCIÓN DEL PROYECTO

Esta aplicación permite a los usuarios almacenar y gestionar sus logros obtenidos en videojuegos, brindando la posibilidad de registrarlos de manera sencilla y eficiente.

En esta aplicación, encontramos tres tipos de usuarios:

*Usuario FREE*: Este tipo de usuario tiene acceso a la aplicación y puede navegar por su contenido, pero su capacidad de *interacción está limitada*. Los usuarios FREE pueden registrarse o iniciar sesión en la aplicación.

*Usuario PREMIUM*:  Son aquellos que se han *registrado en la aplicación*. Disfrutan de una experiencia completa, lo que les permite navegar sin restricciones y además subir sus logros de videojuegos a la plataforma. Para *registrar(crear)* un logro, los usuarios PREMIUM deben completar los siguientes campos:

1.-Título del videojuego: Se proporciona una función de búsqueda para encontrar el juego.
2.-Título del logro.
3.-Plataforma (PC, PS5 o Xbox): Se elige mediante un menú desplegable.
4.-Fecha de obtención del logro.

Además de registrar logros, los usuarios PREMIUM también pueden *modificar* la información de los logros existentes. Para ello, se proporcionan los mismos campos que en la creación de logros.

*Administrador (ADMIN)*: Los administradores tienen privilegios especiales en la aplicación. Pueden *crear*, *modificar* y *eliminar* videojuegos en la plataforma. También tienen la capacidad de desactivar las cuentas de usuarios que hayan violado las normas o los términos y condiciones de la aplicación.

Tanto los usuarios como los administradores tienen la capacidad de *ordenar alfabéticamente* la lista de videojuegos y utilizar una *barra de búsqueda* para encontrar títulos de juegos específicos de manera rápida y sencilla.

Esta aplicación proporciona a los amantes de los videojuegos una plataforma versátil para gestionar y compartir sus logros, brindando a los usuarios una experiencia enriquecedora y a los administradores el control necesario para mantener un entorno seguro y regulado.



## WIREFRAME MID-FI

Esta en la carpeta assets


## API DESIGN

Para Usuarios FREE:

GET /users: Recuperar información de usuarios registrados.✅
POST /users/login: Iniciar sesión.✅
POST /users/register: Registrarse en la aplicación.✅


Para Usuarios PREMIUM:

GET /achievements: Recuperar los logros registrados.✅
POST /achievements: Registrar un nuevo logro.✅
PUT /achievements/:achievement_id: Modificar un logro existente.✅
GET /games: Recuperar la lista de videojuegos.✅

// implementar esto en juegos/logros
GET /games/search?title={search_query}: Buscar videojuegos por título.✅




Para Administradores (ADMIN): 


POST /games: Crear un nuevo videojuego.✅
DELETE /games/:game_id: Eliminar un videojuego de la plataforma.✅
PUT /users/reactivate/:user_id: Reactivar una cuenta de usuario desactivada.✅
PUT /users/deactivate/:user_id: Desactivar una cuenta de usuario.✅