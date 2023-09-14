# Student Admin Web App

Este proyecto es una aplicación web para administrar estudiantes. Permite agregar, actualizar y eliminar estudiantes en una base de datos.

## Contenido

1. [Introducción](#introducción)
2. [Requisitos](#requisitos)
3. [Instrucciones de Uso](#instrucciones-de-uso)
4. [Frontend](#frontend)
5. [Funcionalidades del Frontend](#funcionalidades-del-frontend)
6. [Backend](#backend)
7. [Funcionalidades del Backend](#funcionalidades-del-backend)
8. [Licencia](#licencia)

## Introducción

Este proyecto consta de una aplicación web que interactúa con un backend para administrar estudiantes. Los usuarios pueden agregar, actualizar y eliminar estudiantes utilizando la interfaz web.

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) para ejecutar el servidor backend.
- [Firebase](https://firebase.google.com/) para almacenar los datos de los estudiantes.
- [Axios](https://github.com/axios/axios) para realizar solicitudes HTTP desde el frontend.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local.

2. Configura las variables de entorno para Firebase en el backend. Crea un archivo `.env` en la carpeta del backend y configura las siguientes variables:

   ```dotenv
   FIREBASE_API_KEY=TuApiKey
   FIREBASE_AUTH_DOMAIN=TuAuthDomain
   FIREBASE_PROJECT_ID=TuProjectId
   FIREBASE_STORAGE_BUCKET=TuStorageBucket
   FIREBASE_MESSAGING_SENDER_ID=TuMessagingSenderId
   FIREBASE_APP_ID=TuAppId

## Frontend

El frontend de la aplicación se encuentra en la carpeta `frontend` y está construido en HTML, CSS y JavaScript. Permite a los usuarios interactuar con la base de datos de estudiantes y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Funcionalidades del Frontend

- Agregar un estudiante.
- Actualizar los datos de un estudiante.
- Eliminar un estudiante.
- Visualizar la lista de estudiantes.

## Backend

El backend de la aplicación se encuentra en la carpeta `backend` y está construido con Node.js y Firebase. Gestiona las solicitudes del frontend y realiza operaciones en la base de datos de Firebase.

## Funcionalidades del Backend

- Leer la lista de estudiantes.
- Agregar un estudiante.
- Actualizar los datos de un estudiante.
- Eliminar un estudiante.

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).

¡Disfruta de la administración de estudiantes!
