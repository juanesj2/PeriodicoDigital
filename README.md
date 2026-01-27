# 📰 Periódico Digital - Ionic App

![Ionic](https://img.shields.io/badge/Ionic-Framework-3880ff?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

> Proyecto desarrollado para la asignatura de **Desarrollo de Interfaces (2º DAM)**.

Una aplicación móvil multiplataforma diseñada para la lectura de noticias, basada en la arquitectura de **Pestañas (Tabs)** de Ionic. Permite a los usuarios navegar entre portadas, categorías y noticias guardadas de forma fluida.

---

## 📱 Capturas de pantalla
| Tab 1: Portada | Tab 2: Categorías | Tab 3: Favoritos |
|:---:|:---:|:---:|
| <img src="https://via.placeholder.com/200x400?text=Portada" width="200"> | <img src="https://via.placeholder.com/200x400?text=Categorias" width="200"> | <img src="https://via.placeholder.com/200x400?text=Favoritos" width="200"> |

---

## 🚀 Funcionalidades Principales

El proyecto cuenta con una navegación basada en Tabs:

* **📰 Tab 1 (Noticias):** Feed principal con las últimas noticias destacadas.
* **🔍 Tab 2 (Explorar):** Buscador o filtro por categorías (Deportes, Tecnología, Economía, etc.).
* **⭐ Tab 3 (Favoritos):** Lista de noticias guardadas localmente por el usuario.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [Ionic 7+](https://ionicframework.com/)
* **Motor:** [Angular](https://angular.io/) (Standalone Components)
* **Nativo:** [Capacitor](https://capacitorjs.com/) (Para acceso a funcionalidades del dispositivo)
* **Estilos:** SCSS / CSS Variables

---

## 🔧 Instalación y Despliegue

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio

git clone [https://github.com/juanesj2/PeriodicoDigital.git](https://github.com/juanesj2/PeriodicoDigital.git)

### 2. Instala las dependencias
cd PeriodicoDigital
npm install

### 3. Inicia el servidor
ionic serve

# 📱 Generar versión nativa de Android

Este README explica paso a paso cómo generar la versión **nativa de Android** de una aplicación web usando **Ionic + Capacitor**. Ideal si ya tienes tu app funcionando en la web y quieres llevarla a Android sin dolor. 😌

---

## 🧰 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

* **Node.js** (LTS recomendado)
* **npm** o **yarn**
* **Ionic CLI**

  ```bash
  npm install -g @ionic/cli
  ```
* **Android Studio** (con SDK y emulador configurados)

---

## 🚀 Pasos para generar la app Android

### 1️⃣ Inicializar Capacitor

Configura Capacitor con el **ID de la app** y el **directorio web** donde se genera el build.

```bash
npx cap init aplication io.ionic.starter --web-dir www
```

* `aplication`: nombre de la app
* `io.ionic.starter`: App ID (puedes cambiarlo por el de tu empresa)
* `www`: carpeta donde Ionic genera el build

---

### 2️⃣ Construir la aplicación web

Esto genera la carpeta `www` con los archivos listos para producción.

```bash
ionic build
```

---

### 3️⃣ Instalar la plataforma Android

Instala la dependencia necesaria para Android:

```bash
npm install @capacitor/android
```

---

### 4️⃣ Añadir Android al proyecto

Crea el proyecto nativo de Android dentro de la carpeta `android/`.

```bash
npx cap add android
```

---

### 5️⃣ Sincronizar el código web con Android

Copia el build web y sincroniza plugins nativos.

```bash
npx cap sync
```

> 💡 Usa este comando cada vez que hagas cambios en el código web.

---

### 6️⃣ Abrir el proyecto en Android Studio

```bash
npx cap open android
```

Desde aquí puedes:

* Ejecutar la app en un emulador 🤖
* Probar en un dispositivo físico 📲
* Generar el APK o AAB para producción

---

## ✅ Resultado

🎉 ¡Listo! Ya tienes tu aplicación web convertida en una **app nativa de Android** usando Capacitor.

---

## 📌 Tips útiles

* Cambia el **icono y splash** desde `android/app/src/main/res`
* El código web vive en `android/app/src/main/assets/public`
* No edites archivos generados si no es necesario

---

Hecho con ❤️ usando **Ionic + Capacitor**

