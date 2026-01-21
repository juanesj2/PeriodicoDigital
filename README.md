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

git clone [https://github.com/TU_USUARIO/PeriodicoDigital.git](https://github.com/TU_USUARIO/PeriodicoDigital.git)

### 2. Instala las dependencias
cd PeriodicoDigital
npm install

### 3. Inicia el servidor
ionic serve

### 4. Generar version nativa de Android
ionic build
ionic cap add android
ionic cap open android
