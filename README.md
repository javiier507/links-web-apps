# Wlinks Web Apps

Web applications monorepo for **Wlinks**, an application for saving and organizing links. This repository contains the source code for the web version and the browser extension.

For more information about the project, visit: [wlinks-app.netlify.app/about](https://wlinks-app.netlify.app/about)

## Monorepo Architecture

This project is organized as a **monorepo** composed of **2 applications** and **several reusable packages**.

### Applications

- **`apps/web`** - Wlinks web version, built with Next.js
- **`apps/extension`** - Extension for Chromium-based browsers, allowing users to save links directly from the browser

### Packages

- **`packages/api`** - Handles communication with the backend (Appwrite)
- **`packages/ui`** - Encapsulates styling logic (themes with Tailwind CSS) and reusable components shared across applications

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **pnpm** | Package manager and monorepo |
| **Turbo** | Monorepo task manager |
| **TypeScript** | Programming language |
| **React** | Base framework for UIs |
| **Next.js** | Framework for web application |
| **Next Auth** | Authentication system for web version |
| **Vite** | Build tool for UI package and extension |
| **Appwrite** | Backend as a Service ([appwrite.io](https://appwrite.io/)) |
| **Tailwind CSS** | CSS styling framework |
| **Biome** | Code formatter and linter |

## Getting Started

Make sure you have **pnpm** installed globally:

```bash
npm install -g pnpm
```

### Installation

Install all monorepo dependencies:

```bash
pnpm install
```

### Development Commands

Run all applications in development mode:

```bash
pnpm dev
```

Run a specific application:

```bash
# Chrome Extension
pnpm turbo run dev --filter=extension

# Web Application
pnpm turbo run dev --filter=web
```

### Build

Compile all applications:

```bash
pnpm build
```

Compile a specific application:

```bash
# Chrome Extension
pnpm turbo run build --filter=extension

# Web Application
pnpm turbo run build --filter=web
```

### Other Commands

Linting and Formatting

```bash
# Run linter on all packages
pnpm lint

# Format code
pnpm format

# Check and fix with Biome
pnpm check
```

Type Checking

```bash
pnpm check-types
```