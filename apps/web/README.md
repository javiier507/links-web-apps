# Links Web App

Web application for link management built with Next.js, Auth.js, and Appwrite.

## Environment Setup

This project requires environment variables configuration for authentication and backend. Create a `.env` file in the project root:

### `.env` File Template

```bash
cp .env.example .env
```

```env
# Auth.js Configuration
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Provider
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Appwrite Backend
APPWRITE_ENDPOINT=
APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_TABLE_ID=
APPWRITE_WEB_AUTH_API_KEY=
```

### Environment Variables Description

#### Auth.js Authentication

- **`AUTH_SECRET`**: Secret key to encrypt tokens and sessions. Generate a secure random string (minimum 32 characters). You can use: `openssl rand -base64 32`
- **`NEXTAUTH_URL`**: Base URL of your application. In development use `http://localhost:3000`, in production use your domain.

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

📖 [Google Provider Documentation in Auth.js](https://authjs.dev/getting-started/providers/google)

#### Appwrite Backend

- **`APPWRITE_ENDPOINT`**: URL of your Appwrite instance
  - Cloud: `https://cloud.appwrite.io/v1`
  - Self-hosted: `https://[YOUR-DOMAIN]/v1`

- **`APPWRITE_PROJECT`**: Your Appwrite project ID
  - Go to your [Appwrite console](https://cloud.appwrite.io/console)
  - Create or select a project
  - Copy the Project ID from project settings

- **`APPWRITE_WEB_AUTH_API_KEY`**: API Key with appropriate permissions
  - In your Appwrite project, go to "Settings" → "API Keys"
  - Create a new API Key with the following permissions:
    - Auth (for server-side rendering)
    - Databases (read/write)
  - Copy the generated key

- **`APPWRITE_DATABASE_ID`**: Your database ID
  - In the Appwrite console, go to "Databases"
  - Create a new database or select an existing one
  - Copy the Database ID from settings

- **`APPWRITE_TABLE_ID`**: Your collection/table ID
  - Inside your database, create a collection to store the links
  - Define the necessary attributes (title, URL, description, etc.)
  - Copy the Collection ID from the collection settings

📖 Appwrite References:
- [Server-Side Rendering with Appwrite](https://appwrite.io/docs/products/auth/server-side-rendering)
- [Databases Quick Start](https://appwrite.io/docs/products/databases/quick-start)
