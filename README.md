# Prueba 2 - SWAPI API

Implementación completa de la API de **Star Wars (SWAPI)** siguiendo los requerimientos solicitados.
Además de consumir los recursos de SWAPI, el proyecto incorpora operaciones **CRUD** para administrar la información almacenada en la base de datos.

---

## Requisitos

Antes de comenzar, asegúrese de contar con:

- Node.js instalado.
- PNPM instalado.
- MongoDB en ejecución.
- El proyecto clonado en su computadora.

---

## Instalación

### 1. Crear el archivo `.env`

Cree un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/swapi
SWAPI_URL=https://swapi.dev/api
```

> **Importante**
>
> La base de datos **debe llamarse `swapi`**, ya que el proceso de autollenado utiliza ese nombre por defecto.

---

### 2. Instalar las dependencias

```bash
pnpm install
```

---

### 3. Iniciar el proyecto

```bash
pnpm run dev
```

---

## Tecnologías utilizadas

- JavaScript
- Express.js
- MongoDB
- Mongoose
- PNPM

---

## Endpoints

Dentro del proyecto encontrará una carpeta llamada **`endpoints`** que contiene los archivos necesarios para probar todos los endpoints de la API.

Para utilizarlos se recomienda instalar la extensión de Visual Studio Code:

- **REST Client**

Con ella podrá ejecutar las peticiones directamente desde VS Code.

---

## Autor

**Christian José Lugo Rodríguez**