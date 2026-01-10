# Autenticación de Extensión Chrome - Device Flow Simplificado

## Resumen

Este documento describe la implementación del flujo de autenticación para permitir que la extensión Chrome (`apps/extension`) guarde enlaces en el backend a través de la web app (`apps/web`).

**Patrón:** Device Flow simplificado (OAuth 2.0 Device Authorization Grant)

## Arquitectura Actual

```
apps/web (Next.js)
├── NextAuth.js → Autenticación con Google
├── Appwrite sessionSecret → Guardado en cookie httpOnly
└── Cookie: wlinks.cookie.token (no accesible desde JS)

apps/extension (Chrome Extension)
├── Captura URLs del navegador
└── Necesita token para guardar enlaces
```

## Flujo Propuesto (Opción A - Recomendada)

```
┌─────────────────┐                    ┌──────────────────┐
│   Web App       │                    │    Extension     │
│  (apps/web)     │                    │ (apps/extension) │
└────────┬────────┘                    └────────┬─────────┘
         │                                      │
         │                         1. Usuario abre extensión
         │                            (no autenticada)
         │                                      │
         │                         2. Click "Abrir web app"
         │                                      │
         │            3. chrome.tabs.create()   │
         │         ←───────────────────────────┘│
         │                                      │
    4. Usuario ya autenticado                   │
       (Google + Appwrite)                      │
         │                                      │
    5. useEffect → POST /api/extension/request-code
         │                                      │
    6. ← { code: "ABC123", expires: 5min }      │
         │                                      │
    7. Mostrar código automáticamente           │
         │                                      │
    8. Usuario copia código ───────────────────→│ 9. Vuelve a la extensión
         │                                      │    y pega código
         │                                      │
         │                10. POST /api/extension/exchange-token
         │                    { code: "ABC123" }│
         │                                      │
   11. Validar código + generar token           │
         │                                      │
   12. ← { token: "eyJhbG...", expires: 1y }    │
         │                                      │
         │                                 13. chrome.storage.local
         │                                     .set({ apiToken })
         │                                      │
         │                 14. POST /api/links  │
         │                     Authorization:   │
         │                     Bearer eyJhbG... │
         │                                      │
   15. Validar token + crear enlace             │
         │                                      │
   16. ← { success: true, link: {...} }         │
```

**Mejora de UX:** La extensión inicia el proceso y abre automáticamente la web.
El código se genera automáticamente cuando la web carga.

## Cambios a Implementar

### 1. Base de Datos (Appwrite)

#### Nueva colección: `extension_codes`

```typescript
{
  $id: string,              // ID autogenerado
  code: string,             // Código temporal (ej: "XY7K9P")
  userId: string,           // ID del usuario que generó el código
  createdAt: Date,          // Fecha de creación
  expiresAt: Date,          // Expira en 5 minutos
  used: boolean,            // Si ya fue canjeado
}
```

**Permisos:**
- Create: Usuarios autenticados
- Read: Usuarios autenticados (solo sus propios códigos)
- Update: Usuarios autenticados
- Delete: Usuarios autenticados

**Índices:**
- `code` (unique)
- `userId`
- `expiresAt`

#### Nueva colección: `extension_tokens`

```typescript
{
  $id: string,              // ID autogenerado
  token: string,            // Token hasheado (SHA-256)
  userId: string,           // ID del usuario dueño
  name: string,             // Nombre descriptivo (ej: "Chrome - Windows")
  createdAt: Date,          // Fecha de creación
  lastUsedAt: Date,         // Última vez usado
  expiresAt: Date,          // Expira en 1 año (renovable)
  revoked: boolean,         // Si fue revocado manualmente
}
```

**Permisos:**
- Create: Usuarios autenticados
- Read: Usuarios autenticados (solo sus propios tokens)
- Update: Usuarios autenticados
- Delete: Usuarios autenticados

**Índices:**
- `token` (unique)
- `userId`
- `expiresAt`

---

### 2. Shared Package API (`packages/api`)

#### Archivo nuevo: `packages/api/src/extension.api.ts`

```typescript
import { Databases, ID, Query } from "node-appwrite";
import { SessionClient } from "./appwrite";
import crypto from "crypto";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID!;
const CODES_COLLECTION_ID = "extension_codes";
const TOKENS_COLLECTION_ID = "extension_tokens";

interface ExtensionCode {
  code: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  used: boolean;
}

interface ExtensionToken {
  token: string;
  userId: string;
  name: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
  revoked: boolean;
}

/**
 * Genera un código alfanumérico de 6 caracteres
 */
function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Genera un token seguro y lo hashea
 */
function generateToken(): { raw: string; hashed: string } {
  const raw = crypto.randomBytes(32).toString("base64url");
  const hashed = crypto.createHash("sha256").update(raw).digest("hex");
  return { raw, hashed };
}

/**
 * Crea un código temporal para vincular la extensión
 */
export async function createExtensionCode(
  sessionSecret: string
): Promise<{ code: string; expiresAt: string }> {
  const { databases, account } = await SessionClient(sessionSecret);
  const user = await account.get();

  const code = generateCode();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutos

  await databases.createDocument(
    DATABASE_ID,
    CODES_COLLECTION_ID,
    ID.unique(),
    {
      code,
      userId: user.$id,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      used: false,
    }
  );

  return { code, expiresAt: expiresAt.toISOString() };
}

/**
 * Intercambia un código por un token de larga duración
 */
export async function exchangeCodeForToken(
  code: string,
  deviceName: string = "Chrome Extension"
): Promise<{ token: string; expiresAt: string } | null> {
  // Usar un cliente sin sesión para validar el código
  const { databases } = await SessionClient(process.env.APPWRITE_API_KEY!);

  // Buscar el código
  const result = await databases.listDocuments<ExtensionCode>(
    DATABASE_ID,
    CODES_COLLECTION_ID,
    [Query.equal("code", code), Query.equal("used", false)]
  );

  if (result.documents.length === 0) {
    return null;
  }

  const codeDoc = result.documents[0];

  // Verificar expiración
  if (new Date(codeDoc.expiresAt) < new Date()) {
    return null;
  }

  // Marcar como usado
  await databases.updateDocument(
    DATABASE_ID,
    CODES_COLLECTION_ID,
    codeDoc.$id,
    { used: true }
  );

  // Generar token
  const { raw, hashed } = generateToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 año

  await databases.createDocument(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    ID.unique(),
    {
      token: hashed,
      userId: codeDoc.userId,
      name: deviceName,
      createdAt: now.toISOString(),
      lastUsedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      revoked: false,
    }
  );

  return { token: raw, expiresAt: expiresAt.toISOString() };
}

/**
 * Valida un token de extensión y retorna el userId
 */
export async function validateExtensionToken(
  token: string
): Promise<string | null> {
  const { databases } = await SessionClient(process.env.APPWRITE_API_KEY!);

  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const result = await databases.listDocuments<ExtensionToken>(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    [Query.equal("token", hashed), Query.equal("revoked", false)]
  );

  if (result.documents.length === 0) {
    return null;
  }

  const tokenDoc = result.documents[0];

  // Verificar expiración
  if (new Date(tokenDoc.expiresAt) < new Date()) {
    return null;
  }

  // Actualizar lastUsedAt
  await databases.updateDocument(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    tokenDoc.$id,
    { lastUsedAt: new Date().toISOString() }
  );

  return tokenDoc.userId;
}

/**
 * Lista todos los tokens activos del usuario
 */
export async function listExtensionTokens(
  sessionSecret: string
): Promise<ExtensionToken[]> {
  const { databases, account } = await SessionClient(sessionSecret);
  const user = await account.get();

  const result = await databases.listDocuments<ExtensionToken>(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    [Query.equal("userId", user.$id), Query.equal("revoked", false)]
  );

  return result.documents;
}

/**
 * Revoca un token de extensión
 */
export async function revokeExtensionToken(
  sessionSecret: string,
  tokenId: string
): Promise<boolean> {
  const { databases, account } = await SessionClient(sessionSecret);
  const user = await account.get();

  // Verificar que el token pertenece al usuario
  const tokenDoc = await databases.getDocument<ExtensionToken>(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    tokenId
  );

  if (tokenDoc.userId !== user.$id) {
    return false;
  }

  await databases.updateDocument(
    DATABASE_ID,
    TOKENS_COLLECTION_ID,
    tokenId,
    { revoked: true }
  );

  return true;
}
```

---

### 3. Web App (`apps/web`)

#### Archivo nuevo: `app/api/extension/request-code/route.ts`

```typescript
import { NextResponse } from "next/server";
import { GetAuthUser } from "@/libs/api/resources";
import { GetSessionSecret } from "@/libs/api/cookie";
import { createExtensionCode } from "@repo/api/extension.api";

export async function POST() {
  try {
    // Verificar autenticación
    const user = await GetAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionSecret = await GetSessionSecret();
    if (!sessionSecret) {
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }

    // Generar código
    const { code, expiresAt } = await createExtensionCode(sessionSecret);

    return NextResponse.json({ code, expiresAt });
  } catch (error) {
    console.error("Error creating extension code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Archivo nuevo: `app/api/extension/exchange-token/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@repo/api/extension.api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, deviceName } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    // Intercambiar código por token
    const result = await exchangeCodeForToken(code, deviceName);

    if (!result) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Archivo nuevo: `app/api/links/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { validateExtensionToken } from "@repo/api/extension.api";
import { createLink } from "@repo/api/link.api";

export async function POST(request: NextRequest) {
  try {
    // Obtener token del header Authorization
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Validar token
    const userId = await validateExtensionToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Obtener datos del body
    const body = await request.json();
    const { url, title, tags } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Crear enlace (necesitarás adaptar esto según tu API)
    // Nota: createLink necesita un sessionSecret, pero aquí tenemos un token de extensión
    // Solución: crear una variante de createLink que acepte userId directamente
    const link = await createLink(process.env.APPWRITE_API_KEY!, {
      url,
      title: title || url,
      tags: tags || [],
      userId,
    });

    return NextResponse.json({ success: true, link });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Archivo nuevo: `app/extension/page.tsx`

```typescript
"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button/Button";

export default function ExtensionPage() {
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Generar código automáticamente al cargar la página
  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = async () => {
    setIsLoading(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch("/api/extension/request-code", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate code");
      }

      const data = await response.json();
      setCode(data.code);
    } catch (err) {
      setError("Error al generar el código. ¿Estás autenticado?");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Conectar Extensión Chrome</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Instrucciones:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Copia el código que aparece abajo</li>
          <li>Vuelve a la extensión de Chrome</li>
          <li>Pega el código en la extensión</li>
          <li>Click en "Conectar"</li>
          <li>El código expira en 5 minutos</li>
        </ol>
      </div>

      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
          <p className="text-blue-700">Generando código...</p>
        </div>
      )}

      {code && (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Tu código de vinculación:</p>
          <div className="flex items-center gap-4">
            <code className="text-3xl font-mono font-bold text-green-700">
              {code}
            </code>
            <Button onClick={copyCode} size="sm">
              {copied ? "Copiado!" : "Copiar"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Este código expira en 5 minutos
          </p>
          <div className="mt-4">
            <Button onClick={generateCode} size="sm" variant="outline">
              Generar nuevo código
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
```

---

### 4. Extension (`apps/extension`)

#### Archivo nuevo: `src/services/api.ts`

```typescript
const API_BASE_URL = "https://tu-dominio.com"; // Cambiar por tu URL

interface ExchangeTokenResponse {
  token: string;
  expiresAt: string;
}

interface CreateLinkResponse {
  success: boolean;
  link: {
    $id: string;
    url: string;
    title: string;
  };
}

/**
 * Intercambia un código por un token
 */
export async function exchangeCodeForToken(
  code: string
): Promise<ExchangeTokenResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/extension/exchange-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        deviceName: `Chrome - ${navigator.platform}`,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error exchanging code:", error);
    return null;
  }
}

/**
 * Guarda un enlace usando el token
 */
export async function createLink(
  token: string,
  url: string,
  title?: string
): Promise<CreateLinkResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
        title: title || url,
        tags: [],
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating link:", error);
    return null;
  }
}
```

#### Archivo nuevo: `src/services/storage.ts`

```typescript
interface StorageData {
  apiToken?: string;
  tokenExpiresAt?: string;
}

/**
 * Guarda el token en chrome.storage.local
 */
export async function saveToken(token: string, expiresAt: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set(
      {
        apiToken: token,
        tokenExpiresAt: expiresAt,
      },
      () => resolve()
    );
  });
}

/**
 * Obtiene el token guardado
 */
export async function getToken(): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["apiToken", "tokenExpiresAt"], (result: StorageData) => {
      if (!result.apiToken || !result.tokenExpiresAt) {
        resolve(null);
        return;
      }

      // Verificar si expiró
      if (new Date(result.tokenExpiresAt) < new Date()) {
        resolve(null);
        return;
      }

      resolve(result.apiToken);
    });
  });
}

/**
 * Elimina el token
 */
export async function clearToken(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(["apiToken", "tokenExpiresAt"], () => resolve());
  });
}
```

#### Modificar: `src/App.tsx`

```typescript
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button/Button";
import { getToken, saveToken, clearToken } from "./services/storage";
import { exchangeCodeForToken, createLink } from "./services/api";

function App() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Verificar si hay token
        const token = await getToken();
        setIsAuthenticated(!!token);

        // Obtener URL actual
        if (chrome?.tabs) {
          const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
          });
          if (tab?.url) {
            setCurrentUrl(tab.url);
          } else {
            setError("Could not get tab URL");
          }
        } else {
          setCurrentUrl(window.location.href);
        }
      } catch (err) {
        console.error("Error initializing:", err);
        setError("Error initializing extension");
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleAuthenticate = async () => {
    if (!authCode.trim()) {
      setError("Por favor ingresa el código");
      return;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      const result = await exchangeCodeForToken(authCode.trim().toUpperCase());

      if (!result) {
        setError("Código inválido o expirado");
        return;
      }

      await saveToken(result.token, result.expiresAt);
      setIsAuthenticated(true);
      setAuthCode("");
    } catch (err) {
      console.error("Error authenticating:", err);
      setError("Error al autenticar");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSaveLink = async () => {
    if (!currentUrl) return;

    setIsSaving(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setIsAuthenticated(false);
        setError("Token expirado, vuelve a autenticar");
        return;
      }

      const result = await createLink(token, currentUrl);

      if (!result) {
        setError("Error al guardar el enlace");
        return;
      }

      alert("Enlace guardado correctamente!");
    } catch (err) {
      console.error("Error saving link:", err);
      setError("Error al guardar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnect = async () => {
    await clearToken();
    setIsAuthenticated(false);
  };

  const handleOpenWebApp = () => {
    // Abre la web app en una nueva pestaña
    chrome.tabs.create({ url: "https://tu-dominio.com/extension" });
  };

  if (isLoading) {
    return (
      <div className="w-[350px] h-[200px] flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-[350px] min-h-[280px] mx-auto bg-dark-1 border border-dark-1 rounded-xl p-4 box-border">
        <p className="m-0 font-semibold text-gray-1 text-center text-base mb-4">
          Wlinks
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-1 block mb-2">
              Código de vinculación:
            </label>
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="w-full bg-dark-2 border border-dark-2 rounded-lg p-2.5 text-gray-1 text-center text-lg font-mono"
            />
          </div>
          <Button
            onClick={handleAuthenticate}
            loading={isAuthenticating}
            disabled={isAuthenticating || !authCode.trim()}
            fullWidth
            color="yellow"
          >
            Conectar
          </Button>
          {error && (
            <p className="text-red-1 text-sm text-center">{error}</p>
          )}
          <div className="border-t border-dark-2 pt-4">
            <p className="text-xs text-gray-400 text-center mb-2">
              ¿No tienes un código?
            </p>
            <button
              onClick={handleOpenWebApp}
              className="w-full text-sm text-yellow-1 hover:text-yellow-2 underline"
            >
              Abrir web app para obtener código
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[350px] h-[200px] mx-auto bg-dark-1 border border-dark-1 rounded-xl p-2.5 box-border grid gap-4 grid-rows-[auto_1fr_auto_auto]">
      <p className="m-0 font-semibold text-gray-1 text-center text-base">
        Wlinks
      </p>
      <div
        className={`bg-dark-2 border border-dark-2 rounded-lg p-2.5 m-0 text-sm overflow-hidden break-all line-clamp-3 ${
          error ? "text-red-1" : "text-gray-1"
        }`}
      >
        {error || currentUrl || "No URL available"}
      </div>
      <Button
        onClick={handleSaveLink}
        disabled={!currentUrl || isSaving}
        loading={isSaving}
        fullWidth
        color="yellow"
      >
        Guardar
      </Button>
      <button
        onClick={handleDisconnect}
        className="text-xs text-gray-400 hover:text-gray-1 underline"
      >
        Desconectar
      </button>
    </div>
  );
}

export default App;
```

---

## Consideraciones de Seguridad

### 1. Tokens hasheados
- Los tokens se guardan hasheados (SHA-256) en la base de datos
- Solo el token original (raw) se envía a la extensión una vez
- Imposible recuperar el token desde la base de datos

### 2. Códigos temporales
- Expiran en 5 minutos
- Un solo uso (flag `used`)
- Alfanuméricos de 6 caracteres (2.176.782.336 combinaciones)

### 3. Validación en cada request
- El endpoint `/api/links` valida el token en cada llamada
- Verifica expiración y revocación
- Actualiza `lastUsedAt` para auditoría

### 4. HTTPS obligatorio
- Todas las llamadas deben ser por HTTPS
- Los tokens nunca se envían por HTTP

### 5. Rate limiting (opcional pero recomendado)
- Limitar intentos de canjear códigos
- Limitar creación de códigos por usuario

---

## Flujo de Usuario Final

### Primera vez (vinculación)

**Opción A: La extensión abre la web automáticamente** ⭐ (Recomendado - Mejor UX)

1. Usuario abre la extensión de Chrome
2. La extensión detecta que no está autenticada
3. Muestra botón "Conectar con Wlinks"
4. Al hacer click, la extensión abre automáticamente `https://tu-app.com/extension` en una nueva pestaña
5. La web (si el usuario ya está logueado) genera el código automáticamente → muestra `ABC123`
6. Usuario copia el código
7. Vuelve a la pestaña de la extensión
8. Pega `ABC123` y click "Conectar"
9. Extensión intercambia código por token
10. Token se guarda en `chrome.storage.local`
11. Extensión muestra "Conectado"

**Código para abrir la web desde la extensión:**
```typescript
// En src/App.tsx
const handleOpenWebApp = () => {
  chrome.tabs.create({ url: "https://tu-app.com/extension" });
};
```

**Opción B: Device Flow completo** (Más automático, similar a OAuth Device Flow real)

1. Usuario abre la extensión de Chrome
2. La extensión solicita un código al endpoint (sin autenticación necesaria)
3. La extensión muestra: "Código: ABC123" + botón "Autorizar en la web"
4. Al hacer click, abre `https://tu-app.com/extension/authorize?code=ABC123`
5. La web valida que el usuario esté autenticado (si no, redirige a login)
6. La web muestra: "¿Autorizar extensión con código ABC123?"
7. Usuario acepta → La web asocia el código con su `userId`
8. Usuario vuelve a la extensión
9. La extensión hace polling cada 3 segundos o tiene botón "Ya autoricé"
10. Cuando detecta que el código fue autorizado, intercambia el código por token
11. Token se guarda en `chrome.storage.local`
12. Extensión muestra "Conectado"

**Ventajas Opción B:**
- Usuario no copia/pega nada
- Más automático
- Experiencia similar a vincular Slack, GitHub CLI, etc.

**Desventajas Opción B:**
- Requiere endpoint adicional para autorizar código
- Polling puede consumir recursos
- Más complejo de implementar

### Uso diario

1. Usuario navega a una página interesante
2. Click en el ícono de la extensión
3. La extensión muestra la URL actual
4. Click en "Guardar"
5. La extensión envía `POST /api/links` con `Authorization: Bearer <token>`
6. El enlace se guarda en Appwrite
7. Usuario ve confirmación

### Desconexión

1. Click en "Desconectar" en la extensión
2. Token se elimina de `chrome.storage.local`
3. Extensión vuelve a pedir código

---

## Variables de Entorno Necesarias

### `apps/web/.env.local`

```bash
# Ya existentes
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id

# Nuevas (si aplicable)
NEXT_PUBLIC_API_URL=https://tu-dominio.com
```

### `apps/extension/.env`

```bash
VITE_API_URL=https://tu-dominio.com
```

---

## Pasos de Implementación

### Fase 1: Backend (Appwrite + API)
1. Crear colecciones en Appwrite (`extension_codes`, `extension_tokens`)
2. Configurar permisos e índices
3. Implementar `packages/api/src/extension.api.ts`
4. Exportar funciones en `packages/api/src/index.ts`

### Fase 2: Web App
1. Crear endpoint `POST /api/extension/request-code`
2. Crear endpoint `POST /api/extension/exchange-token`
3. Crear endpoint `POST /api/links`
4. Crear página `/extension` para mostrar código
5. Agregar link en la navegación (opcional)

### Fase 3: Extension
1. Implementar `src/services/api.ts`
2. Implementar `src/services/storage.ts`
3. Modificar `src/App.tsx`
4. Actualizar `manifest.json` con permisos de storage
5. Configurar variable `VITE_API_URL`

### Fase 4: Testing
1. Abrir extensión sin estar autenticado
2. Click en "Abrir web app para obtener código"
3. Verificar que se abre la web y genera código automáticamente
4. Copiar código y volver a la extensión
5. Pegar código y conectar
6. Guardar enlace de prueba
7. Verificar en la web que se guardó
8. Probar expiración de código (esperar 5 min)
9. Probar desconexión/reconexión

### Fase 5: Mejoras opcionales
1. Página para gestionar tokens vinculados
2. Notificaciones push cuando se guarda un link
3. Sincronización automática
4. Rate limiting
5. Logs de auditoría

---

## FAQ

### ¿Qué pasa si el token expira?
El token dura 1 año. Cuando expire, la extensión mostrará error y pedirá re-autenticación.

### ¿Puedo tener múltiples dispositivos conectados?
Sí, cada dispositivo tendrá su propio token. Puedes gestionarlos desde la web.

### ¿Es seguro guardar el token en chrome.storage.local?
Sí, `chrome.storage.local` es aislado por extensión y no es accesible desde sitios web.

### ¿Qué pasa si alguien roba mi token?
Puedes revocarlo desde la web app. El token robado dejará de funcionar inmediatamente.

### ¿Necesito estar logueado en la web para usar la extensión?
No, una vez vinculada, la extensión funciona independientemente.

---

## Mejoras de UX Implementadas

Este documento fue actualizado para mejorar la experiencia de usuario:

### Mejora 1: La extensión es el punto de inicio
**Antes:** El usuario tenía que abrir manualmente la web, generar código, y luego abrir la extensión.

**Ahora:** El usuario abre la extensión y esta le ofrece un botón para abrir automáticamente la web app.

### Mejora 2: Generación automática de código
**Antes:** La web tenía un botón "Generar código" que el usuario debía presionar.

**Ahora:** La página `/extension` genera el código automáticamente al cargar (usando `useEffect`).

### Mejora 3: Flujo intuitivo
El flujo completo ahora es:
1. Usuario abre extensión
2. Click en "Abrir web app para obtener código"
3. La web se abre y muestra el código inmediatamente
4. Usuario copia y vuelve a la extensión
5. Pega y conecta

**Resultado:** Menos clics, menos confusión, mejor experiencia.

---

## Referencias

- [OAuth 2.0 Device Flow (RFC 8628)](https://datatracker.ietf.org/doc/html/rfc8628)
- [Chrome Extension Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)
- [Appwrite Authentication](https://appwrite.io/docs/authentication)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
