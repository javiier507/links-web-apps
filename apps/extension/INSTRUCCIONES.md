# Instrucciones para instalar la extensión

## Chrome / Edge / Brave

1. Abre tu navegador y ve a:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. Activa el "Modo de desarrollador" (Developer mode) en la esquina superior derecha

3. Haz clic en "Cargar extensión sin empaquetar" (Load unpacked)

4. Selecciona la carpeta `dist` de este proyecto

5. La extensión se instalará y aparecerá en tu barra de herramientas

## Cómo usar

1. Haz clic en el ícono de la extensión en la barra de herramientas

2. Se abrirá un popup que mostrará automáticamente la URL de la pestaña actual

3. La URL también se imprimirá en la consola del navegador (abre DevTools con F12)

4. Puedes hacer clic en "Actualizar URL" para obtener la URL nuevamente

## Desarrollo

Para seguir desarrollando:

```bash
# Modo desarrollo
pnpm dev

# Compilar para producción
pnpm build
```

Después de cada cambio, compila con `pnpm build` y recarga la extensión en chrome://extensions/
