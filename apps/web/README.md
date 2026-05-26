# Links Web App

Web application for link management built with Next.js, Better Auth, and Turso.

## Environment Setup

Create a `.env` file in the `apps/web` directory:

```bash
cp .env.example .env
```

```env
# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth Provider
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Turso Database
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

### Environment Variables Description

#### Better Auth

- **`BETTER_AUTH_SECRET`**: Secret key to encrypt tokens and sessions. Generate with: `openssl rand -base64 32`
- **`BETTER_AUTH_URL`**: Base URL of your application. In development use `http://localhost:3000`, in production use your domain.

#### Google OAuth Provider

- **`AUTH_GOOGLE_ID`**: Google OAuth Client ID
- **`AUTH_GOOGLE_SECRET`**: Google OAuth Client Secret

To obtain these credentials:

1. Go to [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Go to "Credentials" → "Create credentials" → "OAuth 2.0 Client ID"
4. Configure the OAuth consent screen if necessary
5. In "Authorized JavaScript origins" add: `http://localhost:3000`
6. In "Authorized redirect URIs" add: `http://localhost:3000/api/auth/callback/google`
7. Copy the **Client ID** to `AUTH_GOOGLE_ID` and the **Client Secret** to `AUTH_GOOGLE_SECRET`

📖 [Better Auth Google Provider Documentation](https://www.better-auth.com/docs/authentication/google)

#### Turso Database

- **`TURSO_DATABASE_URL`**: Your Turso database URL (`libsql://your-db.turso.io`)
- **`TURSO_AUTH_TOKEN`**: Auth token for your Turso database

To obtain these:

1. Install the Turso CLI: `brew install tursodatabase/tap/turso`
2. Create a database: `turso db create wlinks`
3. Get the URL: `turso db show wlinks --url`
4. Create a token: `turso db tokens create wlinks`

📖 [Turso Documentation](https://docs.turso.tech/quickstart)

> **Note:** In production on Vercel, the app automatically uses the `VERCEL_URL` environment variable (injected by Vercel) for internal API calls — no extra configuration needed.
