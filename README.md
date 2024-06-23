# LearnBee App

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Descripción de la Aplicación

Esta aplicación permite a los profesores crear y gestionar proyectos, incluyendo la posibilidad de añadir imágenes, descripciones detalladas y realizar evaluaciones mediante encuestas estudiantiles. Está diseñada para facilitar la organización y la recopilación de feedback sobre diversos proyectos.

## Empezar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar la aplicación

```bash
npx expo start
```

En la salida, encontrarás opciones para abrir la aplicación en:

- [build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para probar el desarrollo de aplicaciones con Expo

Puedes comenzar a desarrollar editando los archivos dentro del directorio **app**. Este proyecto utiliza [rutas basadas en archivos](https://docs.expo.dev/router/introduction).

## Funcionalidades Principales

- **Crear Proyectos**: Los profesores pueden crear proyectos con un nombre, descripción, curso, tema y subir una imagen asociada.
- **Gestión de Proyectos**: Los profesores pueden ver sus proyectos en progreso y los ya evaluados.
- **Evaluaciones**: Los estudiantes pueden evaluar los proyectos mediante encuestas, proporcionando feedback útil para el creador del proyecto.
- **Gestión de Usuarios**: Los profesores pueden registrarse, iniciar sesión y gestionar su perfil.

## Aprender más

Para aprender más sobre el desarrollo de tu proyecto con Expo, consulta los siguientes recursos:

- [Documentación de Expo](https://docs.expo.dev/): Aprende los fundamentos o explora temas avanzados con nuestras [guías](https://docs.expo.dev/guides).
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/): Sigue un tutorial paso a paso donde crearás un proyecto que se ejecuta en Android, iOS y la web.

## Instrucciones Adicionales

### Variables de Entorno

Asegúrate de configurar las variables de entorno necesarias para el proyecto, incluyendo las credenciales de Firebase. Puedes utilizar un archivo `.env` para gestionar estas variables. Por ello, utiliza .env.sample y cambiale de nombre con tus credenciales de Firebase.
