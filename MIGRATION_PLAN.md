# Plan: Migración de Appwrite → Turso + Better Auth

## Context

Appwrite ha bloqueado el proyecto repetidamente. Se migra en dos fases:

- **Fase 1**: Base de datos → Turso (SQLite en el edge) + Drizzle ORM
- **Fase 2**: Auth → Better Auth (reemplaza NextAuth + Appwrite auth)

La migración es progresiva: al final de cada fase el proyecto debe funcionar correctamente.

---

## Fase 1: Turso (BD)

**Objetivo:** Reemplazar Appwrite como base de datos. Auth sigue igual (NextAuth + Appwrite).

### Dependencias

| Paquete | Donde | Versión |
|---|---|---|
| `drizzle-orm` | `packages/api` | latest exact |
| `@libsql/client` | `packages/api` | latest exact |
| `drizzle-kit` | `packages/api` (dev) | latest exact |

### Variables de entorno nuevas

```
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
```

Las variables de Appwrite y NextAuth se mantienen hasta la Fase 2.

### Schema Drizzle (`packages/api/src/db/schema.ts`)

Solo la tabla de links. Better Auth agregará sus tablas en Fase 2.

```ts
links {
  id: text (primary key, generado)
  url: text (not null)
  title: text (not null)
  imageOriginalUrl: text (nullable)
  imagePlaceholderUrl: text (nullable)
  tags: text (JSON serializado, default "[]")
  userId: text (not null)
  createdAt: integer (timestamp)
  updatedAt: integer (timestamp)
}
```

### Conexión BD (`packages/api/src/db/index.ts`)

```ts
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
```

### Drizzle config (`packages/api/drizzle.config.ts`)

```ts
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
};
```

### Archivos a CREAR

| Archivo | Descripción |
|---|---|
| `packages/api/src/db/schema.ts` | Schema Drizzle (tabla links) |
| `packages/api/src/db/index.ts` | Conexión BD (Turso) |
| `packages/api/drizzle.config.ts` | Config migraciones |
| `apps/web/app/api/metadata/route.ts` | Extraer metadata de URLs (reemplaza Appwrite Function) |

### Archivos a MODIFICAR

| Archivo | Cambio |
|---|---|
| `packages/api/src/link.ts` | Tipo `Link` ya no extiende `Models.Row`, usar campos del schema Drizzle |
| `packages/api/src/link.api.ts` | Reescribir CRUD con Drizzle. `userId` sigue viniendo de la sesión actual |
| `packages/api/package.json` | Agregar `drizzle-orm`, `@libsql/client`, `drizzle-kit`. Mantener `node-appwrite` |
| `apps/web/libs/api/resources.ts` | Llamar metadata API route propia en vez de Appwrite Function |

### Archivos a ELIMINAR

| Archivo | Razón |
|---|---|
| `packages/api/src/link.mapper.ts` | Drizzle retorna tipos correctos directamente |

### Setup

```bash
turso db create wlinks
turso db tokens create wlinks
pnpm drizzle-kit push
```

### Verificación Fase 1

1. `pnpm drizzle-kit push` — tablas creadas en Turso
2. `pnpm dev` — app arranca sin errores
3. Google sign in → sigue funcionando (NextAuth/Appwrite)
4. Crear link → se guarda en Turso, metadata extraída por API route propia
5. Listar links → búsqueda y paginación funcionan
6. Eliminar link → borrado correcto en Turso

---

## Fase 2: Better Auth

**Objetivo:** Reemplazar NextAuth + Appwrite auth con Better Auth. Eliminar Appwrite completamente.

**Prerequisito:** Fase 1 completada y funcionando.

### Dependencias

| Paquete | Donde | Versión |
|---|---|---|
| `better-auth` | `packages/api` | latest exact |
| `better-auth` | `apps/web` | latest exact |

### Variables de entorno nuevas

```
BETTER_AUTH_SECRET=random-secret
BETTER_AUTH_URL=http://localhost:3000  (o URL de producción)
```

Las variables de Appwrite y NextAuth se eliminan.

### Better Auth config (`packages/api/src/auth.ts`)

```ts
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite" }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
```

Better Auth genera sus propias tablas (`user`, `session`, `account`) con:

```bash
npx @better-auth/cli generate
pnpm drizzle-kit push
```

### Archivos a CREAR

| Archivo | Descripción |
|---|---|
| `packages/api/src/auth.ts` | Instancia Better Auth server |
| `apps/web/libs/auth/client.ts` | Cliente Better Auth (React) |
| `apps/web/app/api/auth/[...all]/route.ts` | Handler Better Auth (reemplaza NextAuth) |

### Archivos a MODIFICAR

| Archivo | Cambio |
|---|---|
| `packages/api/src/db/schema.ts` | Agregar tablas de Better Auth (`user`, `session`, `account`) |
| `packages/api/package.json` | Agregar `better-auth`, eliminar `node-appwrite` |
| `apps/web/package.json` | Eliminar `next-auth`, agregar `better-auth` |
| `apps/web/libs/auth/index.ts` | Reescribir: exportar Better Auth helpers |
| `apps/web/libs/auth/actions.ts` | Usar `authClient.signIn.social({ provider: "google" })` |
| `apps/web/libs/auth/server-functions.ts` | Usar Better Auth `auth.api.getSession()` |
| `apps/web/libs/api/resources.ts` | Obtener `userId` de Better Auth session |
| `apps/web/libs/api/auth.ts` | Simplificar — ya no hay dual session system |
| `apps/web/middleware.ts` | Adaptar a Better Auth middleware |

### Archivos a ELIMINAR

| Archivo | Razón |
|---|---|
| `packages/api/src/appwrite.ts` | Ya no se usa Appwrite |
| `packages/api/src/environment.ts` | Variables de Appwrite obsoletas |
| `apps/web/libs/api/cookie.ts` | Better Auth maneja cookies internamente |
| `apps/web/libs/auth/client-functions.tsx` | Reemplazada por `client.ts` |
| `apps/web/app/api/auth/[...nextauth]/` | Reemplazada por `[...all]/` |

### Verificación Fase 2

1. `pnpm drizzle-kit push` — tablas de Better Auth creadas
2. `pnpm dev` — app arranca sin errores
3. Google sign in → redirect correcto, sesión activa (Better Auth)
4. Crear link → se guarda en Turso, `userId` de Better Auth
5. Listar links → búsqueda y paginación funcionan
6. Eliminar link → borrado correcto
7. Sign out → sesión limpiada por Better Auth
8. Ruta protegida sin auth → redirect a `/login`
9. Extension (si aplica) → verificar que sigue funcionando
