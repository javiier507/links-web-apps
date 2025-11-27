# Wlinks Project Agent Guidelines

This document provides instructions for AI coding agents working on the Wlinks project. Adhering to these guidelines is crucial for maintaining code quality, consistency, and stability across the monorepo.

## Monorepo Structure

This is a **monorepo** for the Wlinks project.

### Applications (`apps/`)

-   **`apps/web`**: The main web application, built with Next.js and using Next Auth for authentication.
-   **`apps/extension`**: A browser extension for Chromium, built with Vite, used for saving links.

### Packages (`packages/`)

-   **`packages/ui`**: The central UI component library.
    -   **CRITICAL**: This is the single source of truth for all styling.
    -   Contains the Tailwind CSS v4 theme, color palette, and reusable React components.
    -   All applications **MUST** use this package for UI and styling. Do not duplicate styling logic.
-   **`packages/api`**: The backend integration layer.
    -   Handles all communication with the Appwrite backend.
    -   All backend calls **MUST** go through this package. Do not make direct API calls from applications.

## Styling Guidelines

-   **Framework**: All styling is done using Tailwind CSS v4.
-   **Configuration**: The single source of truth for Tailwind configuration is `packages/ui/tailwind.config.ts`.
-   **Theme**: The main theme file is `packages/ui/src/styles.css`, which uses the `@theme` directive.
-   **Usage**: Applications must import the styles via `@import '@repo/ui/styles';` in their main CSS file.
-   **DO NOT**:
    -   Define custom colors or themes within individual applications.
    -   Duplicate or create new Tailwind configurations.

## Typescript Code Style

Code is automatically formatted with Biome on commit. You must follow these conventions:

-   **Type Safety**: Always maintain strict type safety.
-   **`type` vs `interface`**: **Prefer `type`** for all type definitions.
    -   *Correct*: `type User = { name: string; }`
    -   *Incorrect*: `interface User { name: string; }`
-   **Constants**: **All constants must be in `UPPER_CASE`** with underscore separators.
    -   *Correct*: `const API_BASE_URL = '...';`
    -   *Incorrect*: `const apiBaseUrl = '...';`
-   **Functions and Classes**: **All function and class names must be in `PascalCase`**.
    -   *Correct*: `function CalculateTotal() { ... }` | `class UserService { ... }`
    -   *Incorrect*: `function calculateTotal() { ... }` | `class userService { ... }`
-   **Function Implementation**: **Prefer named functions** over arrow functions for top-level definitions to improve debugging. Arrow functions are acceptable for callbacks and React components.
-   **Function Parameters**: **Avoid destructuring in function parameters** unless you are providing default values.
    -   *Correct*: `function ProcessUser(user: User) { ... }`
    -   *Incorrect*: `function ProcessUser({ name, email }: User) { ... }`
-   **Exports**: **Always use named exports**. Do not use default exports.
    -   *Correct*: `export function CalculateTotal() { ... }`
    -   *Incorrect*: `export default function CalculateTotal() { ... }`
-   **Imports**: **ALWAYS use path aliases (`@/`)** instead of relative imports (`../`). The `@/` alias maps to the `src/` directory.
    -   *Correct*: `import { MyComponent } from "@/components/MyComponent";`
    -   *Incorrect*: `import { MyComponent } from "../../components/MyComponent";`

## Dependencies

-   **Adding Dependencies**:
    -   To the workspace root: `pnpm add -w <package>`
    -   To a specific app/package: `pnpm add <package> --filter <app-name>`
-   **Version Pinning (CRITICAL)**: **All dependencies in `package.json` files MUST use exact versions**. Do not use version ranges like `^` or `~`. This is essential for ensuring reproducible builds.
    -   *Correct*: `"next": "15.5.0"`
    -   *Incorrect*: `"next": "^15.5.0"`
    -   After adding a new dependency, you must manually edit the `package.json` to remove any version range operators.
