# LearnBee App

LearnBee es una aplicación para que los profesores compartan nuevas metodologías de enseñanza, aliviando la carga administrativa del MINEDU y promoviendo un intercambio fluido de contenido educativo entre ellos.

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) y con NativeWind.

## Descripción de la Aplicación

Esta aplicación permite a los profesores crear y gestionar proyectos, incluyendo la posibilidad de añadir imágenes, descripciones detalladas y realizar evaluaciones mediante encuestas estudiantiles. Está diseñada para facilitar la organización y la recopilación de feedback sobre diversos proyectos.

## Empezar

### 1. Instalar dependencias

```bash
npm install
```

### 2. Activación de servicios de Firebase

Es necesario activar los siguientes servicios en un nuevo proyecto Firebase.

1. Authentication
2. Firestore Database
3. Storage

Luego, en Storage se debe cambiar las reglas a lo siguiente:

```
rules_version = '1';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/profile.jpg {
      allow read, write;
    }
    match /projects/{projectId}/image.jpg {
      allow read, write;
    }
  }
}
```

### 3. Variables de Entorno

Para configurar las variables de entorno necesarias para el proyecto, copia el archivo de ejemplo y cambiale de nombre a `.env`.

```bash
mv .env.sample .env
```

Luego, crea una "Web App" dentro de tu proyecto de Firebase y agrega las credenciales en el archivo `.env`.

### 4. Iniciar la aplicación

```bash
npx expo start
```

En la salida, encontrarás opciones para abrir la aplicación en:

- [build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), un entorno limitado para probar el desarrollo de aplicaciones con Expo

Recomendamos usar la aplicación en emulardor Android, simulador de iOS o en la aplicación Expo Go para smartphones.

## Funcionalidades Principales

- **Crear Proyectos**: Los profesores pueden crear proyectos con un nombre, descripción, curso, tema y subir una imagen asociada.
- **Gestión de Proyectos**: Los profesores pueden ver sus proyectos en progreso y los ya evaluados.
- **Evaluaciones**: Los estudiantes pueden evaluar los proyectos mediante encuestas, proporcionando feedback útil para el creador del proyecto.
- **Gestión de Usuarios**: Los profesores pueden registrarse, iniciar sesión y gestionar su perfil.

## Aprender más

Para aprender más sobre el desarrollo de tu proyecto con Expo, consulta los siguientes recursos:

- [Documentación de Expo](https://docs.expo.dev/): Aprende los fundamentos o explora temas avanzados con nuestras [guías](https://docs.expo.dev/guides).
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/): Sigue un tutorial paso a paso donde crearás un proyecto que se ejecuta en Android, iOS y la web.
