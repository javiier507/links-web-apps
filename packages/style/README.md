# @repo/style

Paquete de estilos compartidos para el monorepo de Links.

## Estructura

```
src/
├── index.css       # Exporta todos los estilos
├── variables.css   # Variables CSS del tema
└── base.css        # Estilos base y reset
```

## Variables de tema

El paquete incluye las siguientes variables CSS:

```css
--dark1: #181818;    /* Fondo principal */
--dark2: #282828;    /* Fondo secundario */
--dark3: #232323;    /* Fondo terciario */
--yellow1: #CB8A05;  /* Amarillo hover/activo */
--yellow2: #EBB309;  /* Amarillo principal */
--white1: #FFFFFF;   /* Blanco */
--gray1: #bdbdbd;    /* Gris para texto */
--red1: #E53935;     /* Rojo para errores */
```

## Uso

### Importar todos los estilos

```css
@import '@repo/style';
```

### Importar solo variables

```css
@import '@repo/style/variables';
```

### Importar solo estilos base

```css
@import '@repo/style/base';
```

## Aplicaciones que usan este paquete

- `apps/extension` - Extensión del navegador
- `apps/web` - Aplicación web
