# Links Web Apps

Monorepo de aplicaciones web para el proyecto Links.

## Instalación

```bash
pnpm install
```

## Gestor de Paquetes

Este proyecto utiliza **pnpm** como gestor de paquetes. Asegúrate de tenerlo instalado globalmente:

```bash
npm install -g pnpm
```

## Comandos

### Desarrollo

Ejecutar todas las aplicaciones en modo desarrollo:

```bash
pnpm dev
```

Ejecutar una aplicación específica:

```bash
# Extensión de Chrome
pnpm turbo run dev --filter=links-extension

# Aplicación Web
pnpm turbo run dev --filter=web
```

### Build

Compilar todas las aplicaciones:

```bash
pnpm build
```

Compilar una aplicación específica:

```bash
# Extensión de Chrome
pnpm turbo run build --filter=links-extension

# Aplicación Web
pnpm turbo run build --filter=web
```