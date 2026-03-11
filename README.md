# 🗺️ Maps App

Aplicación de mapas interactivos construida con **Angular 21** y **MapLibre GL**, sin necesidad de token de API. Permite explorar mapas, añadir marcadores personalizados y visualizar propiedades con su ubicación.

## 🚀 Tecnologías

- Angular 21
- MapLibre GL
- TailwindCSS
- DaisyUI

## ⚙️ Instalación

1. Clonar el repositorio
```
git clone https://github.com/RaulSanchez119/angular-maps-app
```
2. Instalar dependencias
```
npm install
```
3. Iniciar el servidor
```
ng serve
```
4. Abrir `http://localhost:4200/`

## ✨ Funcionalidades

- 🗺️ Mapa a pantalla completa con control de zoom y coordenadas en tiempo real
- 📍 Añadir marcadores arrastrables con colores aleatorios
- 🗑️ Eliminar marcadores con doble clic
- 🏠 Listado de propiedades con mini-mapa integrado en cada tarjeta
- 📱 Diseño responsive

## 📚 Conceptos aplicados

- Integración de paquetes externos en Angular (MapLibre GL)
- `signal` y `effect` para reactividad con el mapa
- `viewChild` y `AfterViewInit` para acceso al DOM
- Componentes reutilizables (mini-map)

## 📁 Estructura del proyecto

```
src/app/
└── maps/
    ├── components/
    │   └── mini-map/
    └── pages/
        ├── fullscreen-map-page/
        ├── markers-page/
        └── houses-page/
```

## 👤 Autor

Raul Sanchez — [LinkedIn](https://www.linkedin.com/in/raul-sanchez)
